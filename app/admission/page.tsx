import type { Metadata } from 'next';
import AdmissionForm from '@/components/admission-form';

export const metadata: Metadata = {
  title: 'Admission Open 2026 | Vihaan Education Academy and Library',
  description:
    'Apply online for Undergraduate, Postgraduate, Teacher Training, and Healthcare Programs at Vihaan Education Academy and Library. Get expert admission guidance and career counseling.',
  keywords: [
    'Vihaan Education Academy',
    'Vihaan Education Academy and Library',
    'Admission Open',
    'B.Tech Admission',
    'MBA Admission',
    'B.Ed Admission',
    'JBT Admission',
    'MLT Admission',
    'Healthcare Courses',
    'Career Counseling',
  ],
  openGraph: {
    title: 'Admission Open | Vihaan Education Academy and Library',
    description:
      'Apply online and receive expert admission guidance from Vihaan Education Academy and Library.',
    type: 'website',
  },
};

export default function Page() {
  return <AdmissionForm />;
}
