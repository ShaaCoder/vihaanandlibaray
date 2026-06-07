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
  MapPin,
  Award,
} from "lucide-react";
export const metadata = {
title:
"Best Study Library in Rohini Sector 5 Delhi | Vihaan Library",

description:
"Looking for a study library in Rohini? Vihaan Library offers a peaceful study environment, comfortable seating, focused learning spaces, and student-friendly facilities in Rohini Sector 5, Delhi.",

keywords: [
"Library in Rohini",
"Library in Rohini Sector 5",
"Study Library Rohini",
"Study Library Delhi",
"Reading Room Rohini",
"Reading Library Rohini",
"Student Library Rohini",
"Library Near Me",
"Best Library in Rohini",
"Best Library in Delhi",
"Silent Study Library",
"Study Center Rohini",
"Library Membership Rohini",
"Competitive Exam Library",
"UPSC Study Library",
"SSC Study Library",
"Government Exam Library",
"Library for Students",
"Study Room Delhi",
"Learning Center Rohini",
"Vihaan Library",
"Library Sector 5 Rohini",
"Rohini Delhi Library",
"Reading Room Delhi"
],

alternates: {
canonical: "https://www.vihaanacademy.com/library",
},

openGraph: {
title:
"Best Study Library in Rohini Sector 5 Delhi",
description:
"Peaceful study environment, comfortable seating, focused learning spaces and student-friendly facilities at Vihaan Library.",
url: "https://www.vihaanacademy.com/library",
siteName: "Vihaan Education Academy & Library",
type: "website",
},
};

export default function LibraryPage() {
  const whatWeProvide = [
    {
      title: "Peaceful & Silent Study Environment",
      description: "Distraction-free atmosphere for maximum concentration.",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Comfortable Seating Arrangements",
      description: "Ergonomic seating for long study sessions.",
      icon: Users,
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Well-Lit & Clean Study Space",
      description: "Clean, organized, and well-illuminated environment.",
      icon: LampDesk,
      color: "from-blue-700 to-indigo-700",
    },
    {
      title: "Student-Friendly Atmosphere",
      description: "Motivating and supportive learning community.",
      icon: GraduationCap,
      color: "from-indigo-600 to-indigo-700",
    },
    {
      title: "Safe & Secure Environment",
      description: "CCTV surveillance for complete peace of mind.",
      icon: Shield,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Long Study Hours",
      description: "Extended timings to suit your study schedule.",
      icon: Clock,
      color: "from-red-600 to-red-700",
    },
    {
      title: "Individual Study Desks",
      description: "Personal workspace for focused learning.",
      icon: BookMarked,
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "Dedicated Learning Space",
      description: "Perfect for all types of students and learners.",
      icon: Target,
      color: "from-blue-500 to-red-600",
    },
  ];

  const whyChooseUs = [
    "Peaceful & Silent Study Environment",
    "Comfortable Seating Arrangements",
    "Well-Lit & Clean Study Space",
    "Student-Friendly Atmosphere",
    "Safe & Secure Environment",
    "Long Study Hours",
    "Individual Study Desks",
    "Dedicated Learning Space",
  ];

  const competitiveExams = [
    "UPSC & Civil Services",
    "SSC Exams",
    "Banking Exams",
    "Railways Exams",
    "Delhi Government Exams",
    "Teaching Exams",
    "Defence Exams",
    "Entrance Examinations",
    "Professional Certification Programs",
  ];

  const studentGroups = [
    "Class 10th Students",
    "Class 12th Students",
    "NIOS Students",
    "Undergraduate Students",
    "Postgraduate Students",
    "Distance Learning Students",
    "Professional Course Students",
  ];

  const rohiniSectors = [
    "Sector 5",
    "Sector 6",
    "Sector 7",
    "Sector 8",
    "Sector 9",
    "Sector 10",
    "Sector 11",
    "Sector 13",
    "Sector 14",
    "Sector 15",
    "Sector 16",
    "Sector 17",
    "Sector 18",
    "Sector 24",
    "Sector 25",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-red-100/40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left */}
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200">
                <Library className="mr-2 h-4 w-4" />
                Best Study Library in Rohini
              </div>

              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Best Study Library in
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  {" "}
                  Rohini Sector 5, Delhi
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Welcome to Vihaan Library, a modern study library in Rohini Sector 5, Delhi, designed for students, competitive exam aspirants, working professionals, and lifelong learners who need a peaceful and productive environment to achieve their goals.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                In today's fast-paced world, finding a distraction-free study space can be challenging. At Vihaan Library, we provide a comfortable, disciplined, and motivating atmosphere where students can focus on learning, improve productivity, and maximize their study hours.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/admission" className="w-full sm:w-auto">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white shadow-lg shadow-red-200 transition hover:from-red-700 hover:to-red-800 hover:scale-105 sm:w-auto">
                    Join Academy
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>

                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-50 sm:w-auto">
                    Visit Library
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
                  alt="Library"
                  width={800}
                  height={600}
                  className="h-[300px] sm:h-[400px] lg:h-[500px] w-full object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 p-4 shadow-xl border border-gray-100 backdrop-blur sm:-bottom-6 sm:-left-6 sm:p-5">
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
      <section className="py-16 sm:py-20 bg-white">
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
                  className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl card-hover"
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Why Choose Vihaan Library?
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-4xl">
                Why Choose Vihaan Library?
              </h2>

              <p className="mb-8 text-base leading-relaxed text-gray-600">
                At Vihaan Library, we understand that a great study environment plays a crucial role in academic success. That's why we have created a space where students can study with complete focus and confidence.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {whyChooseUs.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-red-50 px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-lg flex items-center gap-3 card-hover"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop"
                alt="Study Environment"
                width={800}
                height={600}
                className="h-[300px] sm:h-[400px] lg:h-[450px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Exam Preparation */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="Competitive Exam Preparation"
                width={800}
                height={600}
                className="h-[300px] sm:h-[400px] lg:h-[450px] w-full object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 border border-red-200">
                <Target className="mr-2 h-4 w-4" />
                For Competitive Exams
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-4xl">
                Library for Competitive Exam Preparation
              </h2>

              <p className="mb-8 text-base leading-relaxed text-gray-600">
                Vihaan Library is an excellent choice for students preparing for competitive exams. Our focused environment helps students maintain consistency, concentration, and discipline throughout their preparation journey.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {competitiveExams.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-lg flex items-center gap-3 card-hover"
                  >
                    <Check className="h-5 w-5 text-red-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School & College Students */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200">
                <GraduationCap className="mr-2 h-4 w-4" />
                For Students
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-4xl">
                Library for School & College Students
              </h2>

              <p className="mb-8 text-base leading-relaxed text-gray-600">
                The library is equally beneficial for school and college students. Whether you need a quiet place for revision, assignments, project work, or exam preparation, Vihaan Library provides the perfect study atmosphere.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {studentGroups.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-red-50 px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-lg flex items-center gap-3 card-hover"
                  >
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop"
                alt="School & College Students"
                width={800}
                height={600}
                className="h-[300px] sm:h-[400px] lg:h-[450px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serving Students Across Rohini */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200">
              <MapPin className="mr-2 h-4 w-4" />
              Convenient Location
            </div>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
              Serving Students Across Rohini
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600">
              Students from various sectors of Rohini and nearby areas choose Vihaan Library as their preferred study destination. Our convenient location makes us one of the most accessible and trusted study libraries in Rohini, Delhi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {rohiniSectors.map((sector, index) => (
              <div
                key={index}
                className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5 card-hover"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Than Just a Library */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-red-100 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-blue-700 to-red-700 bg-clip-text text-transparent border border-blue-200">
            <Award className="mr-2 h-5 w-5" />
            More Than Just a Library
          </div>

          <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-4xl">
            More Than Just a Library
          </h2>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600">
            As part of Vihaan Education Academy & Library, students also benefit from academic guidance, educational support, and a learning-focused community dedicated to helping them achieve academic excellence.
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-600">
            We believe that success begins with the right environment, consistent effort, and proper guidance.
          </p>
        </div>
      </section>

      {/* Join Vihaan Library Today */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 p-6 text-center text-white shadow-2xl sm:p-12">
            <h2 className="text-2xl font-bold sm:text-4xl">
              Join Vihaan Library Today
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
              If you are looking for a study library in Rohini that offers a peaceful atmosphere, focused learning environment, and student-friendly facilities, Vihaan Library is the perfect place for you.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-base opacity-90">
              Start your journey toward academic excellence with a library designed for serious learners and future achievers.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-2">
              <p className="text-2xl font-bold opacity-95">
                Vihaan Library
              </p>
              <p className="text-xl font-semibold opacity-90">
                Learn Better. Focus More. Achieve Success.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100 shadow-lg sm:w-auto">
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
