'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Trophy,
  Users,
  Star,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const images = [
  '/vihaanimg1.webp',
  '/vihaanimg2.webp',
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-red-50/20" />

      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-red-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">

          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-blue-700">
                Excellence in Education Since 2001
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-[0.9] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl xl:text-8xl">
              Your Journey To

              <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-red-600 bg-clip-text text-transparent">
                Success
              </span>

              Starts Here
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
              Vihaan Education Academy & Library empowers
              students through expert faculty, personalized
              mentorship, modern classrooms, and proven
              learning strategies designed for academic success.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link href="/admission">
                <Button
                  size="lg"
                  className="h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-red-600 px-8 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-2xl border-2 border-blue-100 px-8 hover:bg-blue-50"
                >
                  Explore Courses
                </Button>
              </Link>

            </div>

            {/* Stats */}
            <div className="mt-14 grid max-w-xl grid-cols-3 gap-8">

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600">
                  500+
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Students
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600">
                  50+
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Courses
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600">
                  95%
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Success Rate
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative order-1 lg:order-2">

            {/* Glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-300/20 to-red-300/20 blur-3xl" />

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-2xl">

              <div className="relative h-[380px] sm:h-[500px] lg:h-[650px]">

                <Image
                  key={current}
                  src={images[current]}
                  alt="Vihaan Education Academy"
                  fill
                  priority
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-all duration-1000"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-8 left-8 right-8 text-white">

                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-lg">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Admissions Open 2026
                  </div>

                  <h3 className="mt-4 text-3xl font-bold lg:text-4xl">
                    Transform Your Future
                  </h3>

                  <p className="mt-3 text-white/90">
                    Expert Faculty • Modern Library • Proven Results
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}
            <Card className="absolute left-6 top-8 hidden xl:block border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl">
              <CardContent className="flex items-center gap-3 p-4">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    500+
                  </p>
                  <p className="text-xs text-slate-500">
                    Students
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Floating Card 2 */}
            <Card className="absolute right-6 top-24 hidden xl:block border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl">
              <CardContent className="flex items-center gap-3 p-4">
                <Trophy className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    95%
                  </p>
                  <p className="text-xs text-slate-500">
                    Success Rate
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Floating Card 3 */}
            <Card className="absolute bottom-10 left-8 hidden xl:block border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl">
              <CardContent className="flex items-center gap-3 p-4">
                <GraduationCap className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    50+
                  </p>
                  <p className="text-xs text-slate-500">
                    Courses
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}