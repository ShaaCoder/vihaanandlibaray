'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { MobileMenu } from '@/components/mobile-menu';
import { ContactPopover } from '@/components/contact-popover';

const navItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Courses',
    href: '/courses',
  },
  {
    name: 'Blogs',
    href: '/blogs',
  },
  {
    name: 'Library',
    href: '/library',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Admission',
    href: '/admission',
  },
];

export function Header() {
  const pathname = usePathname();

  // Hide Header on Admin Pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
        >
          <Image
            src="/vihaanlogo.png"
            alt="Vihaan Education Academy Logo"
            width={50}
            height={50}
            className="h-10 w-10 rounded-xl object-contain sm:h-12 sm:w-12"
          />

          <div>
            {/* Mobile Logo Text */}
            <div className="block md:hidden">
              <h1 className="text-base font-bold text-gray-900">
                Vihaan
              </h1>

              <p className="text-[10px] text-gray-500">
                Academy
              </p>
            </div>

            {/* Desktop Logo Text */}
            <div className="hidden md:block">
              <h1 className="whitespace-nowrap text-xl font-bold text-gray-900 lg:text-2xl">
                Vihaan Education Academy
              </h1>

              <p className="text-xs text-gray-500">
                Admission Guidance & Library
              </p>
            </div>
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
                  className={`rounded-xl px-3 xl:px-4 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            );
          })}

          <Link href="/admin">
            <Button
              variant="outline"
              className="ml-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Admin
            </Button>
          </Link>

          <Link href="/admission">
            <Button className="ml-2 gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600">
              Apply Now
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>

          <div className="ml-2">
            <ContactPopover />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 lg:hidden">
          <ContactPopover />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}