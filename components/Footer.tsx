import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Brand Column */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center shadow-card">
                <Image
                  src="/vihaanlogo.png"
                  alt="Vihaan Education Academy and Library"
                  width={48}
                  height={48}
                  className="object-contain rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Vihaan Education
                </h3>
                <p className="text-sm text-gray-500">Academy & Library</p>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              Transforming lives through quality education since 2001.
              Helping students achieve success in NIOS, CBSE, and other
              educational programs.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-xl bg-gray-100 p-2.5 text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-xl bg-gray-100 p-2.5 text-gray-700 transition hover:bg-pink-100 hover:text-pink-600"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-xl bg-gray-100 p-2.5 text-gray-700 transition hover:bg-blue-100 hover:text-blue-700"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-xl bg-gray-100 p-2.5 text-gray-700 transition hover:bg-cyan-100 hover:text-cyan-600"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links & Contact */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Quick Links */}
            <div>
              <h4 className="mb-5 text-base font-semibold text-gray-900">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1 transition hover:text-blue-600"
                  >
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 transition hover:text-blue-600"
                  >
                    <span>About</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-1 transition hover:text-blue-600"
                  >
                    <span>Courses</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-1 transition hover:text-blue-600"
                  >
                    <span>Blogs</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admission"
                    className="inline-flex items-center gap-1 transition hover:text-blue-600"
                  >
                    <span>Admission</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 transition hover:text-blue-600"
                  >
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-5 text-base font-semibold text-gray-900">
                Contact Info
              </h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
                  <span className="leading-relaxed">
                    2nd Floor, Vijay Vihar,
                    <br />
                    Phase 1, Sector 4, Rohini,
                    <br />
                    New Delhi - 110085
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <a
                    href="tel:+919212644428"
                    className="hover:text-blue-600 transition"
                  >
                    +91 92126 44428
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span>WhatsApp Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-red-600" />
                  <span className="break-all">info@vihaaneducation.in</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Operating Hours & Map Preview */}
          <div className="space-y-6">
            <div>
              <h4 className="mb-5 text-base font-semibold text-gray-900">
                Operating Hours
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Mon - Fri : 9:00 AM - 8:00 PM</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Saturday : 10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Sunday : Closed</span>
                </li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
              <div className="h-[200px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218.70294315081043!2d77.10189916194851!3d28.7121608012656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d06ae769c788f%3A0xac313f49064bf5d9!2sVIHAAN%20EDUCATION%20ACADEMY!5e0!3m2!1sen!2sin!4v1779955985930!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vihaan Education Academy and Library Location"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-gray-500">
              © 2026 Vihaan Education Academy and Library. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <Link
                href="/privacy-policy"
                className="transition hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition hover:text-blue-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
