
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, User, ChevronDown } from "lucide-react";
import { useAuth } from '@/components/auth/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, signOut, loading } = useAuth();

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // Error handled in auth context
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Top bar */}
        <div className="bg-blue-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>(416) 555-0123</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>jigar@jigarpatelrealestate.com</span>
                </div>
              </div>
              <div className="hidden md:block">
                <span>Your Trusted GTA Realtor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">JP</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-900">Jigar Patel</h1>
                  <p className="text-sm text-gray-600">Real Estate</p>
                </div>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center space-x-1">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        About
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="#listings" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        Listings
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Buyers
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4">
                        <NavigationMenuLink asChild>
                          <Link to="/buyers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Buyers Guide</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Complete guide for home buyers in the GTA
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/buyers/financing-options" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Financing Options</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Explore mortgage and financing solutions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/buyers/first-time-guide" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">First-Time Buyers</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Step-by-step guide for first-time home buyers
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/buyers/home-buying-process" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Home Buying Process</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Understanding the complete buying process
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Sellers
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4">
                        <NavigationMenuLink asChild>
                          <Link to="/sellers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Sellers Guide</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Complete guide for selling your home
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/sellers/valuation" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Home Valuation</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get an accurate estimate of your home's value
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/sellers/marketing-strategy" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Marketing Strategy</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Strategic marketing to sell your home fast
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/sellers/staging-tips" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Staging Tips</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Professional tips to stage your home
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Calculators
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4">
                        <NavigationMenuLink asChild>
                          <Link to="/calculators" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">All Calculators</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Financial tools for real estate decisions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/calculators/mortgage" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Mortgage Calculator</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Calculate monthly mortgage payments
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/calculators/land-transfer-tax" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Land Transfer Tax</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Calculate Ontario land transfer tax
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/calculators/affordability" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Affordability Calculator</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Determine how much home you can afford
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        Contact
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.user_metadata?.first_name || user.email}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAuthClick('signin')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                    size="sm"
                    onClick={() => handleAuthClick('signup')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#listings"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Listings
                </a>
                
                {/* Mobile Buyers submenu */}
                <div className="space-y-1">
                  <div className="text-gray-700 px-3 py-2 text-base font-medium border-b">Buyers</div>
                  <Link to="/buyers" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Buyers Guide
                  </Link>
                  <Link to="/buyers/financing-options" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Financing Options
                  </Link>
                  <Link to="/buyers/first-time-guide" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    First-Time Buyers
                  </Link>
                  <Link to="/buyers/home-buying-process" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Home Buying Process
                  </Link>
                </div>

                {/* Mobile Sellers submenu */}
                <div className="space-y-1">
                  <div className="text-gray-700 px-3 py-2 text-base font-medium border-b">Sellers</div>
                  <Link to="/sellers" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Sellers Guide
                  </Link>
                  <Link to="/sellers/valuation" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Home Valuation
                  </Link>
                  <Link to="/sellers/marketing-strategy" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Marketing Strategy
                  </Link>
                  <Link to="/sellers/staging-tips" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Staging Tips
                  </Link>
                </div>

                {/* Mobile Calculators submenu */}
                <div className="space-y-1">
                  <div className="text-gray-700 px-3 py-2 text-base font-medium border-b">Calculators</div>
                  <Link to="/calculators" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    All Calculators
                  </Link>
                  <Link to="/calculators/mortgage" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Mortgage Calculator
                  </Link>
                  <Link to="/calculators/land-transfer-tax" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Land Transfer Tax
                  </Link>
                  <Link to="/calculators/affordability" className="text-gray-600 block px-6 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Affordability Calculator
                  </Link>
                </div>

                <a
                  href="#contact"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                
                {/* Mobile auth buttons */}
                <div className="pt-4 space-y-2">
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-gray-600">
                        Welcome, {user.user_metadata?.first_name || user.email}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAuthClick('signin')}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full"
                        onClick={() => handleAuthClick('signup')}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default Header;
