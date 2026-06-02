'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Loader2,
  GraduationCap,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

import { createClient } from '@/lib/supabase/client';
import { AdmissionFormData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdmissionForm() {
  const [formData, setFormData] = useState<AdmissionFormData>({
    student_name: '',
    email: '',
    phone: '',
    course: '',
    class: '',
    subjects: '',
    reference_number: '',
    parent_name: '',
    parent_phone: '',
    address: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const supabase = createClient();
  const { toast } = useToast();

  const inputClass =
    'h-12 rounded-xl border-blue-100 focus:border-blue-500 focus:ring-blue-500';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const { error } = await (supabase
        .from('admissions') as any)
        .insert([
          {
            ...formData,
            class: formData.class || null,
            subjects: formData.subjects || null,
            reference_number:
              formData.reference_number || null,
            parent_name:
              formData.parent_name || null,
            parent_phone:
              formData.parent_phone || null,
            address: formData.address || null,
            message: formData.message || null,
          },
        ]);

      if (error) throw error;

      toast({
        title: 'Success!',
        description:
          'Application submitted successfully.',
      });

      setSubmitted(true);
    } catch {
      toast({
        title: 'Error',
        description:
          'Failed to submit application.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            Application Submitted
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Thank you for choosing Vihaan
            Education Academy. Our team will
            contact you soon.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/">
              <Button variant="outline">
                Back Home
              </Button>
            </Link>

            <Button
              onClick={() => {
                setSubmitted(false);
              }}
            >
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm">
            Admissions Open 2026
          </div>

          <h1 className="text-4xl font-bold md:text-6xl">
            Start Your Academic Journey
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            Undergraduate, Postgraduate,
            Teacher Training and Healthcare
            Programs with expert admission
            guidance.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16">
        {/* BENEFITS */}
        <div className="mb-10 grid gap-4 md:grid-cols-4">
          {[
            'Expert Counseling',
            'Admission Guidance',
            'Career Support',
            'Trusted Academy',
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-5 text-center shadow-md"
            >
              <p className="font-semibold">
                ✅ {item}
              </p>
            </div>
          ))}
        </div>

        <Card className="overflow-hidden border-0 shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8" />

              <div>
                <h2 className="text-3xl font-bold">
                  Admission Form
                </h2>

                <p className="text-blue-100">
                  Fill your details and our
                  team will contact you.
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Student Name *"
                  className={inputClass}
                  required
                  value={formData.student_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student_name:
                        e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Email *"
                  type="email"
                  className={inputClass}
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Phone *"
                  className={inputClass}
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Course *"
                  className={inputClass}
                  required
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      course: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Class / Grade"
                  className={inputClass}
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      class: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Subjects"
                  className={inputClass}
                  value={formData.subjects}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subjects:
                        e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Parent Name"
                  className={inputClass}
                  value={formData.parent_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parent_name:
                        e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Parent Phone"
                  className={inputClass}
                  value={formData.parent_phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parent_phone:
                        e.target.value,
                    })
                  }
                />
              </div>

              <Textarea
                placeholder="Address"
                className="rounded-xl"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
              />

              <Textarea
                placeholder="Additional Message"
                className="rounded-xl"
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
              />

              <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
                🔒 Your information is secure
                and only used for admission
                assistance.
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CONTACT */}
        <section className="mt-12 rounded-3xl bg-white p-8 shadow-lg">
          <h3 className="mb-6 text-2xl font-bold">
            Need Help?
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Phone className="mb-2 h-6 w-6 text-blue-600" />
              <p className="font-semibold">
                92126 44428
              </p>
            </div>

            <div>
              <Mail className="mb-2 h-6 w-6 text-blue-600" />
              <p className="font-semibold">
                vihaaneducationacademy@gmail.com
              </p>
            </div>

            <div>
              <GraduationCap className="mb-2 h-6 w-6 text-blue-600" />
              <p className="font-semibold">
                Career Counseling
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}