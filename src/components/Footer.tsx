import { Leaf, Github, Linkedin, Twitter, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Site Footer</h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground text-2xl tracking-tight">NutriCart</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Nourishing your body, simplifying your life. We deliver healthy, organic food straight to your door.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-foreground text-lg tracking-tight">Company</h3>
            <nav className="flex flex-col gap-3" aria-label="Company Navigation">
              <Link to="/about" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-fit">About Us</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-fit">Contact</Link>
              <Link to="/careers" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-fit">Careers</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-fit">Blog</Link>
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-foreground text-lg tracking-tight">Legal</h3>
            <nav className="flex flex-col gap-3" aria-label="Legal Navigation">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-fit">Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-fit">Terms of Service</Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-fit">Cookie Policy</Link>
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-foreground text-lg tracking-tight">Stay Connected</h3>
            <p className="text-muted-foreground">Join our newsletter for healthy tips and exclusive offers.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center gap-2">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input 
                  type="email" 
                  id="email-address"
                  placeholder="Enter your email" 
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button type="submit" aria-label="Subscribe" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NutriCart. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Made with <span className="text-red-500" aria-hidden="true">♥</span> for healthy living.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
