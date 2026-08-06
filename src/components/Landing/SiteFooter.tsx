const SiteFooter = () => {
  return (
    <footer className="bg-background py-10">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 text-sm text-foreground sm:grid-cols-3">
        <div className="min-w-0">
          <a href="https://www.bharosepe.co.in/" className="inline-flex items-center gap-3 text-base font-semibold text-foreground hover:text-primary">
            <img src="https://www.bharosepe.co.in/assets/LOGO-Dwcj1dnC.png" alt="Bharose Pe" className="h-8 w-8 rounded-lg bg-muted p-1" />
            Bharose Pe
          </a>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Bharose Pe is India's digital trust platform that helps buyers and sellers complete secure transactions through digital agreements, milestone-based payments, transparent transaction management, and dispute support.
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Quick Links</p>
          <ul className="mt-2 space-y-2 text-xs text-foreground/70">
            <li>
              <a href="https://www.bharosepe.co.in/how-it-works" className="transition hover:text-foreground">How It Works</a>
            </li>
            <li>
              <a href="https://www.bharosepe.co.in/privacy-policy" className="transition hover:text-foreground">Privacy Policy</a>
            </li>
            <li>
              <a href="https://www.bharosepe.co.in/terms-of-service" className="transition hover:text-foreground">Terms of Service</a>
            </li>
            <li>
              <a href="https://www.bharosepe.co.in/contact" className="transition hover:text-foreground">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Contact</p>
          <ul className="mt-2 space-y-1 text-xs text-foreground/70">
            <li className="truncate">connectwithus@bharosepe.co.in</li>
            <li>+91-8374155974</li>
            <li>Hyderabad, Telangana, India</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-6 max-w-6xl px-4 text-xs text-muted-foreground">
        © 2026 Bharose Pe. All rights reserved.
      </div>
    </footer>
  );
};

export default SiteFooter;
