import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  HeartPulse,
  BookOpen,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Courses | Vihaan Education Academy and Library",
  description:
    "Explore Undergraduate, Postgraduate, Teacher Training, Healthcare and Paramedical Courses at Vihaan Education Academy. Get expert admission guidance and career counseling.",
  keywords: [
    "Vihaan Education Academy",
    "Vihaan Education Academy and Library",
    "B.Tech Admission",
    "BBA Admission",
    "MBA Admission",
    "B.Ed Admission",
    "JBT Admission",
    "MLT Course",
    "Optometry Course",
    "Radiology Course",
    "Healthcare Courses",
    "UG Courses",
    "PG Courses",
    "Career Counseling",
    "Admission Guidance",
  ],
  openGraph: {
    title: "Courses | Vihaan Education Academy and Library",
    description:
      "Admission guidance and career counseling for UG, PG, Teacher Training and Healthcare Programs.",
    type: "website",
  },
};

const undergraduateCourses = [
  "B.A.",
  "B.Sc.",
  "B.Tech",
  "BBA",
];

const postgraduateCourses = [
  "M.A.",
  "M.Sc.",
  "MBA",
];

const healthcareCourses = [
  "Optometry",
  "Radiology & Imaging Technology",
  "Medical Lab Technology (MLT)",
  "OT & Anesthesia Technology",
  "Physician Assistant Programs",
];

const teacherTrainingCourses = [
  "JBT (Junior Basic Training)",
  "B.Ed. (Bachelor of Education)",
];

const whyChooseUs = [
  "Quality Education Support",
  "Experienced Faculty & Counselors",
  "Career Guidance & Admission Assistance",
  "Modern Learning Environment",
  "Multiple Course Options Under One Roof",
  "Student-Centered Approach",
  "Trusted Academic Support",
  "Personalized Counseling",
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm mb-6 border border-white/20 backdrop-blur">
            Empowering Minds, Shaping Futures ✨
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Courses & Admission Guidance
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
            Vihaan Education Academy and Library provides expert admission guidance,
            career counseling, and academic support for Undergraduate,
            Postgraduate, Teacher Training, and Healthcare Programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link href="/admission" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-xl shadow-lg font-semibold"
              >
                Apply Now
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white text-white hover:bg-white/10 rounded-xl font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Explore Our Academic Programs
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We help students choose the right educational path through
            personalized counseling, admission assistance, and career-focused
            guidance. Whether you are looking for a degree program,
            teacher training course, or healthcare education, we are here
            to support your journey.
          </p>
        </div>
      </section>

      {/* Undergraduate */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Undergraduate Programs
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {undergraduateCourses.map((course) => (
              <div
                key={course}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover"
              >
                <h3 className="font-bold text-xl mb-3 text-gray-900">{course}</h3>
                <p className="text-gray-600">
                  Professional undergraduate program with expert admission
                  support.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Postgraduate */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Postgraduate Programs
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {postgraduateCourses.map((course) => (
              <div
                key={course}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover"
              >
                <h3 className="font-bold text-xl mb-3 text-gray-900">{course}</h3>
                <p className="text-gray-600">
                  Advanced postgraduate education for career growth and
                  specialization.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Healthcare & Paramedical Courses
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthcareCourses.map((course) => (
              <div
                key={course}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover"
              >
                <h3 className="font-bold text-lg mb-3 text-gray-900">{course}</h3>
                <p className="text-gray-600">
                  Industry-focused healthcare education with excellent career
                  opportunities.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Training */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Teacher Training Programs
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {teacherTrainingCourses.map((course) => (
              <div
                key={course}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover"
              >
                <h3 className="font-bold text-xl mb-3 text-gray-900">{course}</h3>
                <p className="text-gray-600">
                  Build a successful teaching career through professional
                  training and certification.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
            Why Choose Vihaan Education Academy?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-blue-600 w-5 h-5" />
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-red-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            To empower students with the right education, guidance, and
            opportunities that help them build successful careers and achieve
            their goals.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Academic Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized counseling, admission guidance, and career support
            from our experienced team.
          </p>
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="text-lg">92126 44428</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span className="text-lg">vihaaneducationacademy@gmail.com</span>
            </div>
          </div>
          <Link href="/admission" className="inline-flex w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold gap-2 shadow-lg"
            >
              Apply For Admission
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
