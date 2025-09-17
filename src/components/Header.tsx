import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { TokenDisplay } from "@/components/tokens/TokenDisplay";

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">Cyblick</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <TokenDisplay />
                <Link to="/app">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/app">
                  <Button>Start Building</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;