import Link from 'next/link';
import Image from 'next/image';

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Course } from '@/lib/types';

interface CoursesSectionProps {
  courses: Course[];
}

export function CoursesSection({
  courses,
}: CoursesSectionProps) {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-red-50/30" />

      <div className="relative">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
            <BookOpen className="h-4 w-4" />
            Featured Programs
          </div>

          <h2 className="mt-5 text-4xl font-black text-slate-900 lg:text-5xl">
            Explore Our
            <span className="ml-2 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Academic programs designed to help students
            achieve excellence and build a successful future.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Top Gradient */}
              <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-red-600" />

              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                {course.image_url ? (
                  <Image
                    src={course.image_url}
                    alt={course.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-red-100">
                    <GraduationCap className="h-20 w-20 text-blue-600" />
                  </div>
                )}

                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-blue-700 backdrop-blur">
                    Popular Course
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                  {course.title}
                </h3>

                <p className="line-clamp-3 text-sm leading-7 text-slate-600">
                  {course.description || 'Professional course designed for academic excellence and career growth.'}
                </p>

                {/* Stats */}
                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Enrolled Students
                      </p>

                      <p className="font-semibold text-slate-900">
                        100+
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full rounded-xl"
                    >
                      Details
                    </Button>
                  </Link>

                  <Link
                    href="/admission"
                    className="flex-1"
                  >
                    <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700">
                      Enroll
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link href="/courses">
            <Button
              size="lg"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-red-600 px-8 shadow-lg hover:from-blue-700 hover:to-red-700"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}