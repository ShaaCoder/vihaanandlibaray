'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { MobileMenu } from '@/components/mobile-menu';
import { ContactPopover } from '@/components/contact-popover';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Library', href: '/library' },
  { name: 'Contact', href: '/contact' },
  { name: 'Admission', href: '/admission' },
];

export function Header() {
  const pathname = usePathname();

  // Hide Header on Admin Pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism border-b border-gray-100 shadow-soft">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center shadow-card">
            <Image
              src="/vihaanlogo.png"
              alt="Vihaan Education Academy and Library Logo"
              width={48}
              height={48}
              className="object-contain rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
              Vihaan Education
            </h1>
            <p className="text-xs text-gray-500">Academy & Library</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={`rounded-xl px-4 py-6 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-transparent text-blue-700 shadow-sm border border-blue-100'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            );
          })}

          <div className="ml-4 flex items-center gap-2">
            <Link href="/admin">
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              >
                Admin
              </Button>
            </Link>
            
            <ContactPopover />

            <Link href="/admission">
              <Button className="gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200 transition-all duration-200 hover:shadow-red-300">
                Apply Now
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 lg:hidden">
          <ContactPopover />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
