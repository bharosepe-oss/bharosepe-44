import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GoogleAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private config: GoogleAuthConfig;

  private constructor() {
    this.config = {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      redirectUri: this.getRedirectUri(),
      scope: 'openid email profile'
    };

    if (!this.config.clientId) {
      console.error('❌ Google Client ID not found in environment variables');
    }
  }

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  private getRedirectUri(): string {
    // Force the correct production URL regardless of where we're running
    const currentHost = window.location.hostname;
    
    let baseUrl: string;
    
    if (currentHost.includes('bharosepe-contract-manager.onrender.com') || import.meta.env.PROD) {
      baseUrl = 'https://bharosepe-contract-manager.onrender.com';
    } else if (currentHost.includes('localhost') || currentHost.includes('127.0.0.1')) {
      baseUrl = window.location.origin;
    } else {
      // Default to Render URL for production
      baseUrl = 'https://bharosepe-contract-manager.onrender.com';
    }
    
    console.log('🔗 Redirect URI configured for:', `${baseUrl}/auth/callback`);
    return `${baseUrl}/auth/callback`;
  }

  /**
   * Initiate Google OAuth login flow
   */
  async signInWithGoogle(): Promise<void> {
    try {
      console.log('🔄 Initiating Google OAuth sign-in...');
      
      if (!this.config.clientId) {
        throw new Error('Google Client ID not configured');
      }

      // Use Supabase Auth with Google provider
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: this.config.redirectUri,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) {
        console.error('❌ Google sign-in error:', error);
        throw error;
      }

      console.log('✅ Google sign-in initiated successfully');
      
    } catch (error: any) {
      console.error('❌ Google authentication failed:', error);
      toast.error(error.message || 'Google authentication failed');
      throw error;
    }
  }

  /**
   * Handle the OAuth callback and complete authentication
   */
  async handleCallback(): Promise<any> {
    try {
      console.log('🔄 Handling Google OAuth callback...');
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Error getting session:', error);
        throw error;
      }

      if (!data.session) {
        console.log('⚠️ No session found in callback');
        return null;
      }

      const user = data.session.user;
      console.log('✅ Google authentication successful:', user.email);

      // Extract user information
      const userInfo = {
        id: user.id,
        email: user.email,
        fullName: user.user_metadata?.full_name || user.user_metadata?.name || '',
        firstName: user.user_metadata?.given_name || '',
        lastName: user.user_metadata?.family_name || '',
        profilePicture: user.user_metadata?.picture || user.user_metadata?.avatar_url || '',
        provider: 'google'
      };

      // Check if user profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('❌ Error checking user profile:', profileError);
        throw profileError;
      }

      // Create profile if it doesn't exist
      if (!profile) {
        console.log('📝 Creating new user profile...');
        
        const { error: createError } = await supabase
          .from('profiles')
          .insert([{
            user_id: user.id,
            full_name: userInfo.fullName,
            email: userInfo.email,
            phone: '',
            profile_type: 'both',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (createError) {
          console.error('❌ Error creating user profile:', createError);
          toast.warning('Please complete your profile setup');
        } else {
          console.log('✅ User profile created successfully');
        }
      } else {
        console.log('✅ User profile found:', profile.full_name);
      }

      toast.success(`Welcome back, ${userInfo.fullName || userInfo.email}!`);
      return { user: data.session.user, profile };

    } catch (error: any) {
      console.error('❌ OAuth callback handling failed:', error);
      toast.error('Authentication failed. Please try again.');
      throw error;
    }
  }
}

// Lazy-instantiated singleton accessor
export const getGoogleAuth = (): GoogleAuthService => GoogleAuthService.getInstance();

// Preserve compatibility for any existing imports that still use `googleAuth`
// while keeping initialization lazy until the instance is first accessed.
export const googleAuth = new Proxy({}, {
  get(_target, prop: string | symbol) {
    const instance = GoogleAuthService.getInstance() as any;
    const value = instance[prop as keyof typeof instance];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
}) as unknown as GoogleAuthService;