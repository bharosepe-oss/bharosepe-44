import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Star, ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

interface SavedParty {
  id: string;
  name: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  transactionCount?: number;
  lastTransaction?: string;
}

interface ModernSavedPartiesProps {
  userMode: 'Buyer' | 'Seller';
  parties?: SavedParty[];
  onViewAll: () => void;
  onContactParty: (partyId: string) => void;
}

const ModernSavedParties: React.FC<ModernSavedPartiesProps> = ({
  userMode,
  parties = [],
  onViewAll,
  onContactParty
}) => {
  const { user } = useAuth();
  const [liveParties, setLiveParties] = useState<SavedParty[]>(parties);
  const [loading, setLoading] = useState(false);
  const isBuyer = userMode === 'Buyer';
  const title = isBuyer ? 'Saved Sellers' : 'Frequent Buyers';
  const emptyText = isBuyer ? 'No saved sellers yet' : 'No frequent buyers yet';
  const emptySubtext = isBuyer 
    ? 'Save trusted sellers for quick access to their products'
    : 'Your loyal customers will appear here automatically';

  // Prefer liveParties (fetched from server), fallback to passed `parties` or empty
  const partiesToShow = liveParties.length > 0 ? liveParties : parties;

  // Fetch recent parties based on transactions and saved list
  const loadParties = async () => {
    if (!user) return;
    setLoading(true);

    try {
      if (userMode === 'Buyer') {
        // For buyers - compute saved sellers/frequent sellers from transactions
        const { data: txs, error: txError } = await supabase
          .from('transactions')
          .select('seller_id, created_at')
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false })
          .limit(200);

        if (txError) throw txError;

        const counts: Record<string, { count: number; last: string }> = {};
        (txs || []).forEach((t: any) => {
          const id = t.seller_id;
          if (!id) return;
          if (!counts[id]) counts[id] = { count: 0, last: t.created_at };
          counts[id].count += 1;
          if (new Date(t.created_at) > new Date(counts[id].last)) counts[id].last = t.created_at;
        });

        const sellerIds = Object.keys(counts).slice(0, 20);
        if (sellerIds.length === 0) {
          setLiveParties([]);
          setLoading(false);
          return;
        }

        const { data: profiles, error: pErr } = await supabase
          .from('profiles')
          .select('user_id, full_name, phone, avatar_url')
          .in('user_id', sellerIds);

        if (pErr) throw pErr;

        const mapped: SavedParty[] = (profiles || []).map((p: any) => ({
          id: p.user_id,
          name: p.full_name || p.user_id,
          phone: p.phone,
          avatar: p.avatar_url,
          rating: undefined,
          transactionCount: counts[p.user_id]?.count || 0,
          lastTransaction: counts[p.user_id]?.last ? new Date(counts[p.user_id].last).toLocaleString() : undefined
        }));

        setLiveParties(mapped);
      } else {
        // For sellers - frequent buyers (buyers who transact with me)
        const { data: txs, error: txError } = await supabase
          .from('transactions')
          .select('buyer_id, created_at')
          .eq('seller_id', user.id)
          .order('created_at', { ascending: false })
          .limit(200);

        if (txError) throw txError;

        const counts: Record<string, { count: number; last: string }> = {};
        (txs || []).forEach((t: any) => {
          const id = t.buyer_id;
          if (!id) return;
          if (!counts[id]) counts[id] = { count: 0, last: t.created_at };
          counts[id].count += 1;
          if (new Date(t.created_at) > new Date(counts[id].last)) counts[id].last = t.created_at;
        });

        const buyerIds = Object.keys(counts).slice(0, 20);
        if (buyerIds.length === 0) {
          setLiveParties([]);
          setLoading(false);
          return;
        }

        const { data: profiles, error: pErr } = await supabase
          .from('profiles')
          .select('user_id, full_name, phone, avatar_url')
          .in('user_id', buyerIds);

        if (pErr) throw pErr;

        const mapped: SavedParty[] = (profiles || []).map((p: any) => ({
          id: p.user_id,
          name: p.full_name || p.user_id,
          phone: p.phone,
          avatar: p.avatar_url,
          rating: undefined,
          transactionCount: counts[p.user_id]?.count || 0,
          lastTransaction: counts[p.user_id]?.last ? new Date(counts[p.user_id].last).toLocaleString() : undefined
        }));

        setLiveParties(mapped);
      }
    } catch (err) {
      console.error('Failed to load saved parties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParties();

    // Subscribe to transactions changes for real-time updates
    if (!user) return;

    const channel = supabase.channel(`public:transactions:user-${user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, (payload) => {
        // If the change affects the current user's transactions, reload
        const record = payload.record || payload.new || payload;
        if (!record) return;
        const isRelevant = (userMode === 'Buyer' && record.buyer_id === user.id) || (userMode === 'Seller' && record.seller_id === user.id) || (record.buyer_id === user.id) || (record.seller_id === user.id);
        if (isRelevant) loadParties();
      })
      .subscribe();

    return () => {
      try { channel.unsubscribe(); } catch (e) { /* ignore */ }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userMode]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (partiesToShow.length === 0) {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        </div>
        
        <motion.div 
          className="bg-card rounded-2xl p-8 text-center border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            {isBuyer ? (
              <Heart className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Users className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          
          <h3 className="text-lg font-medium text-foreground mb-2">{emptyText}</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">{emptySubtext}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewAll}
          className="text-muted-foreground hover:text-foreground"
        >
          View All
        </Button>
      </div>
      
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="overflow-x-auto md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-1 md:gap-3 min-w-max md:min-w-0">
          {partiesToShow.slice(0, 3).map((party, index) => (
            <motion.div
              key={party.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-72 md:w-full"
            >
              <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200 border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={party.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                        {getInitials(party.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {party.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {party.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{party.rating}</span>
                          </div>
                        )}
                        {party.transactionCount && (
                          <Badge variant="secondary" className="text-xs">
                            {party.transactionCount} deals
                          </Badge>
                        )}
                      </div>
                      {party.lastTransaction && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Last: {party.lastTransaction}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContactParty(party.id);
                      }}
                      className="p-2 h-8 w-8"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {partiesToShow.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-4"
        >
          <Button 
            variant="outline" 
            onClick={onViewAll}
            className="w-full"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            View All {title}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ModernSavedParties;