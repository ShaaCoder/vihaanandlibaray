'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname.startsWith('/admin')) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-[88px] items-center justify-between px-4 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
          >
            <div className="relative h-16 w-16 lg:h-20 lg:w-20">
              <Image
                src="/vihaanlogo.png"
                alt="Vihaan Education Academy & Library"
                fill
                priority
                sizes="80px"
                className="object-contain"
              />
            </div>

            <div className="leading-tight">
              <h1 className="text-xl lg:text-3xl font-extrabold">
                <span className="text-blue-600">Vihaan</span>{' '}
                <span className="text-red-600">Education</span>
              </h1>

              <p className="text-xs lg:text-sm font-semibold tracking-wide">
                <span className="text-red-600">
                  Academy
                </span>

                <span className="mx-1 text-slate-400">
                  &
                </span>

                <span className="text-blue-600">
                  Library
                </span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                >
                  <Button
                    variant="ghost"
                    className={`h-11 rounded-xl px-4 text-sm font-medium transition-all ${
                      active
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/admin">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Admin
              </Button>
            </Link>

            <ContactPopover />

            <Link href="/admission">
              <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white shadow-lg">
                Apply Now
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <ContactPopover />

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="rounded-xl border"
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-red-600" />
              ) : (
                <Menu className="h-6 w-6 text-blue-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen
              ? 'max-h-[600px]'
              : 'max-h-0'
          }`}
        >
          <div className="border-t bg-white p-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active =
                  pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    <Button
                      variant="ghost"
                      className={`h-12 w-full justify-start rounded-xl ${
                        active
                          ? 'bg-blue-50 text-blue-700'
                          : ''
                      }`}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}

              <div className="mt-3 border-t pt-3 space-y-3">
                <Link
                  href="/admin"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Admin
                  </Button>
                </Link>

                <Link
                  href="/admission"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white">
                    Apply Now
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}