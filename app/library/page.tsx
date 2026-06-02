// app/library/page.tsx

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  Star,
  ArrowRight,
  Library,
  BookMarked,
  Wifi,
  Shield,
  Utensils,
  Target,
  CheckCircle2,
  Check,
  Phone,
  LampDesk,
} from "lucide-react";

export default function LibraryPage() {
  const whatWeProvide = [
    {
      title: "Quiet & Peaceful Study Environment",
      description: "Distraction-free atmosphere designed for focused learning.",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Well-Equipped Reading Area",
      description: "Modern facilities for comfortable reading and studying.",
      icon: LampDesk,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "High-Speed Wi-Fi Access",
      description: "Reliable internet for online resources and digital learning.",
      icon: Wifi,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Comfortable Seating",
      description: "Ergonomic seating for long study sessions.",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "CCTV Surveillance",
      description: "Safety and security with 24/7 monitoring.",
      icon: Shield,
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Flexible Timings",
      description: "Open 7:00 AM – 10:00 PM for your convenience.",
      icon: Clock,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Separate Dining Area",
      description: "Space to refresh and recharge during study breaks.",
      icon: Utensils,
      color: "from-amber-500 to-yellow-500",
    },
    {
      title: "For All Aspirants",
      description: "Perfect for school, college, and competitive exam students.",
      icon: Target,
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const whyChooseUs = [
    "Distraction-Free Learning Environment",
    "Study-Friendly Atmosphere",
    "Clean & Hygienic Facilities",
    "Safe & Secure Premises",
    "Spacious Reading & Study Area",
    "Reliable Internet Connectivity",
    "Long Operating Hours",
    "Affordable Membership Plans",
  ];

  const highlights = [
    "Peaceful Environment for Better Concentration",
    "Modern Study Facilities",
    "High-Speed Wi-Fi",
    "CCTV Monitored Premises",
    "Comfortable Seating",
    "Flexible Timings",
    "Dedicated Reading Space",
    "Student-Focused Environment",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-cyan-100/40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left */}
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <Library className="mr-2 h-4 w-4" />
                Your Library, Your Success
              </div>

              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Welcome to
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {" "}
                  Vihaan Library
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Vihaan Library offers a quiet and comfortable place for students to study, read, and prepare for exams. With a peaceful environment, Wi-Fi, and modern facilities, we help students stay focused and achieve their goals. 📚✨
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/admission" className="w-full sm:w-auto">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 sm:w-auto">
                    Join Academy
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>

                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full rounded-xl border-2 border-blue-300 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 sm:w-auto">
                    Visit Library
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
                  alt="Library"
                  width={800}
                  height={600}
                  className="h-[300px] sm:h-[400px] lg:h-[500px] w-full object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur sm:-bottom-6 sm:-left-6 sm:p-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      500+
                    </h4>

                    <p className="text-sm text-gray-600">
                      Active Readers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
              What We Provide
            </h2>

            <p className="mt-4 text-gray-600">
              Everything students need for better learning and preparation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeProvide.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color}`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Why Choose Vihaan Library?
            </div>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Us?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-lg flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Highlights */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop"
                alt="Study Environment"
                width={800}
                height={600}
                className="h-[300px] sm:h-[400px] lg:h-[450px] w-full object-cover"
              />
            </div>

            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                <GraduationCap className="mr-2 h-4 w-4" />
                Our Mission
              </div>

              <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
                Our Mission
              </h2>

              <p className="mt-5 text-base leading-relaxed text-gray-600">
                To create a positive and inspiring learning environment where students can focus, learn, grow, and succeed in achieving their academic and career goals.
              </p>

              <div className="mt-8 space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-700">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Slogan */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 p-6 text-center text-white shadow-2xl sm:p-12">
            <h2 className="text-2xl font-bold sm:text-4xl">
              Start Learning Today
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
              Visit our library and explore thousands of educational resources designed to help students succeed academically.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Phone className="h-5 w-5" />
                <span>📞 Contact: 9350211222</span>
              </div>
              <p className="text-xl font-bold opacity-95 mt-2">
                “Read • Learn • Grow • Succeed” 📚✨
              </p>
              <p className="text-sm opacity-90">
                Your Library, Your Success.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300 sm:w-auto">
                  Visit Library
                </button>
              </Link>

              <Link href="/admission" className="w-full sm:w-auto">
                <button className="w-full rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                  Take Admission
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
