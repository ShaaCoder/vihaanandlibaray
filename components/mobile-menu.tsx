'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Menu,
  X,
  Home,
  Info,
  Phone,
  BookOpen,
  UserPlus,
  LayoutDashboard,
  FileText,
  ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Blogs', href: '/blogs', icon: FileText },
  { name: 'Library', href: '/library', icon: BookOpen },
  { name: 'Contact', href: '/contact', icon: Phone },
  { name: 'Admission', href: '/admission', icon: UserPlus },
  { name: 'Admin', href: '/admin', icon: LayoutDashboard },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative z-[100]">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white shadow-soft hover:bg-gray-50 transition-all duration-200"
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-white shadow-2xl z-[70] flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: isOpen ? 'visible' : 'hidden',
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-red-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Vihaan Education</h2>
              <p className="text-sm text-blue-100 mt-1">Academy & Library</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <div
                  className={`group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-transparent text-blue-700 border border-blue-100 shadow-sm'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                        isActive
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive
                            ? 'text-blue-700'
                            : 'text-gray-500'
                        }`}
                      />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                      isActive
                        ? 'text-blue-700'
                        : 'text-gray-400'
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <Link href="/admission" onClick={() => setIsOpen(false)}>
            <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200 transition-all duration-200">
              Apply Now
            </Button>
          </Link>
          <div className="text-center text-xs text-gray-500">
            © 2026 Vihaan Education Academy and Library
          </div>
        </div>
      </div>
    </div>
  );
}
