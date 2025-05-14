
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, LogIn, Tags, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { LogoIcon } from '@/components/icons/logo-icon';
import { cn } from '@/lib/utils';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/#pricing', label: 'Pricing', icon: <Tags className="h-4 w-4" /> },
    // Login/Logout will be handled separately based on user state
  ];

  const renderAuthButtons = (isMobile: boolean) => {
    if (isLoading) {
      return (
        <Button variant="ghost" disabled className={isMobile ? "w-full justify-start" : ""}>
          Loading...
        </Button>
      );
    }
    if (user) {
      return (
        <>
          {user.picture && !isMobile && (
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={user.picture} alt={user.name || 'User avatar'} />
              <AvatarFallback>{user.name?.charAt(0) || <UserCircle className="h-4 w-4" />}</AvatarFallback>
            </Avatar>
          )}
           {/* {user.name && !isMobile && <span className="text-sm mr-3 text-foreground hidden lg:inline">{user.name}</span>} */}
          <Button variant="ghost" asChild className={isMobile ? "w-full justify-start items-center" : "items-center"}>
            <Link href="/api/auth/logout">
              {isMobile && <LogOut className="mr-3 h-4 w-4" />}
              {!isMobile && <LogOut className="mr-2 h-4 w-4" />}
              Logout
            </Link>
          </Button>
        </>
      );
    }
    return (
      <Button variant="ghost" asChild className={isMobile ? "w-full justify-start items-center" : "items-center"}>
        <Link href="/api/auth/login">
           {isMobile && <LogIn className="mr-3 h-4 w-4" />}
           {!isMobile && <LogIn className="mr-2 h-4 w-4" />}
          Login
        </Link>
      </Button>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="JingleBox Home">
            <LogoIcon className="h-8 w-auto text-primary" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/#pricing">
                <Tags className="mr-2 h-4 w-4" /> Pricing
              </Link>
            </Button>
            {renderAuthButtons(false)}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background p-6">
                <div className="mb-6 flex justify-between items-center">
                   <Link href="/" className="flex items-center" aria-label="JingleBox Home">
                     <LogoIcon className="h-8 w-auto text-primary" />
                   </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" aria-label="Close menu">
                        <X className="h-6 w-6" />
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-2">
                  {user && user.picture && (
                     <div className="flex items-center space-x-2 px-3 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.picture} alt={user.name || 'User avatar'} />
                          <AvatarFallback>{user.name?.charAt(0) || <UserCircle className="h-5 w-5" />}</AvatarFallback>
                        </Avatar>
                        {user.name && <span className="text-sm font-medium text-foreground">{user.name}</span>}
                     </div>
                  )}
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    {renderAuthButtons(true)}
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
