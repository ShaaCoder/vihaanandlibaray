'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import FeeReceipt from '@/components/admin/FeeReceipt';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@/lib/supabase/client';
import { LibraryStudent, LibraryAttendance, LibraryPayment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserPlus, Clock, CreditCard, TrendingUp, Trash2, CreditCard as Edit2, Search, Download, CircleCheck as CheckCircle, CircleAlert as AlertCircle, DollarSign, Calendar, Phone as PhoneIcon, Mail, Power, PowerOff, Printer, MailCheck, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const MEMBERSHIP_FEES = {
  basic: 500,
  premium: 1000,
  annual: 10000,
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function LibraryDashboard() {
  const supabase = useRef(createClient()).current;
  const { toast } = useToast();

  const [libraryStudents, setLibraryStudents] = useState<LibraryStudent[]>([]);
  const [attendance, setAttendance] = useState<LibraryAttendance[]>([]);
  const [payments, setPayments] = useState<LibraryPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeletePaymentDialog, setShowDeletePaymentDialog] = useState(false);
  const [deletePaymentId, setDeletePaymentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMembership, setFilterMembership] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
const [receiptPayment, setReceiptPayment] =
  useState<LibraryPayment | null>(null);

const [receiptStudent, setReceiptStudent] =
  useState<LibraryStudent | undefined>(undefined);
const [isSendingReminders, setIsSendingReminders] = useState(false);
const [reminderResult, setReminderResult] = useState<
  | { sent: number; skipped: number; failed: number; total: number; details: { student: string; email: string; type: string; status: string; error?: string }[] }
  | null
>(null);
const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [studentForm, setStudentForm] = useState<{
    name: string;
    phone: string;
    email: string;
    membership_type: 'monthly' | 'quarterly' | 'yearly' | 'half_day' | 'full_day';
    membership_start: string;
    membership_end: string;
  }>({
    name: '',
    phone: '',
    email: '',
    membership_type: 'monthly',
    membership_start: new Date().toISOString().split('T')[0],
    membership_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [attendanceForm, setAttendanceForm] = useState({
    student_id: '',
    check_in: new Date().toISOString(),
    date: new Date().toISOString().split('T')[0],
  });

  const [paymentForm, setPaymentForm] = useState({
    student_id: '',
    amount: 0,
    payment_type: 'membership' as const,
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [studentsRes, attendanceRes, paymentsRes] = await Promise.all([
        (supabase.from('library_students') as any).select('*').order('created_at', { ascending: false }),
        (supabase.from('library_attendance') as any).select('*').order('created_at', { ascending: false }).limit(100),
        (supabase.from('library_payments') as any).select('*').order('created_at', { ascending: false }).limit(100),
      ]);

      setLibraryStudents((studentsRes.data || []) as LibraryStudent[]);
      setAttendance((attendanceRes.data || []) as LibraryAttendance[]);
      setPayments((paymentsRes.data || []) as LibraryPayment[]);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load library data', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [supabase, toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmitStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        const { error } = await (supabase.from('library_students') as any)
          .update({
            name: studentForm.name,
            phone: studentForm.phone,
            email: studentForm.email.trim() || null,
            membership_type: studentForm.membership_type,
            membership_start: studentForm.membership_start,
            membership_end: studentForm.membership_end,
          })
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: 'Success', description: 'Student updated' });
      } else {
        const { error } = await (supabase.from('library_students') as any).insert([
          {
            name: studentForm.name,
            phone: studentForm.phone,
            email: studentForm.email.trim() || null,
            membership_type: studentForm.membership_type,
            membership_start: studentForm.membership_start,
            membership_end: studentForm.membership_end,
            status: 'active',
          },
        ]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Student added' });
      }
      resetStudentForm();
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save student', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await (supabase.from('library_attendance') as any).insert([
        {
          student_id: attendanceForm.student_id,
          check_in: attendanceForm.check_in,
          date: attendanceForm.date,
        },
      ]);

      if (error) throw error;
      toast({ title: 'Success', description: 'Check-in recorded' });
      setAttendanceForm({ student_id: '', check_in: new Date().toISOString(), date: new Date().toISOString().split('T')[0] });
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to record attendance', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await (supabase.from('library_payments') as any).insert([
        {
          student_id: paymentForm.student_id,
          amount: paymentForm.amount,
          payment_type: paymentForm.payment_type,
          payment_date: new Date().toISOString().split('T')[0],
          status: 'completed',
        },
      ]);

      if (error) throw error;

      toast({ title: 'Success', description: 'Payment recorded' });
      setPaymentForm({ student_id: '', amount: 0, payment_type: 'membership' });
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to record payment', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (student: LibraryStudent) => {
    setEditingId(student.id);
    setStudentForm({
      name: student.name,
      phone: student.phone,
      email: student.email || '',
      membership_type: student.membership_type as 'monthly' | 'quarterly' | 'yearly' | 'half_day' | 'full_day',
      membership_start: student.membership_start ? new Date(student.membership_start).toISOString().split('T')[0] : '',
      membership_end: student.membership_end ? new Date(student.membership_end).toISOString().split('T')[0] : '',
    });
  };

  const toggleStudentStatus = async (student: LibraryStudent) => {
    const nextStatus = student.status === 'active' ? 'inactive' : 'active';
    try {
      const { error } = await (supabase.from('library_students') as any)
        .update({ status: nextStatus })
        .eq('id', student.id);
      if (error) throw error;
      toast({ title: 'Success', description: nextStatus === 'active' ? 'Student activated' : 'Student deactivated' });
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const { error } = await (supabase.from('library_students') as any).delete().eq('id', deleteId);
      if (error) throw error;
      toast({ title: 'Success', description: 'Student deleted' });
      setShowDeleteDialog(false);
      setDeleteId(null);
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete student', variant: 'destructive' });
    }
  };

  const handleDeletePayment = async () => {
    if (!deletePaymentId) return;
    try {
      const { error } = await (supabase.from('library_payments') as any).delete().eq('id', deletePaymentId);
      if (error) throw error;
      toast({ title: 'Success', description: 'Payment deleted' });
      setShowDeletePaymentDialog(false);
      setDeletePaymentId(null);
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete payment', variant: 'destructive' });
    }
  };

const handlePrintPayment = (payment: LibraryPayment) => {
  const student = libraryStudents.find(
    (s) => s.id === payment.student_id
  );

  setReceiptPayment(payment);
  setReceiptStudent(student);
};

  const escapeCsvValue = (value: string | number | null | undefined): string => {
    const str = String(value ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const downloadCsv = (filename: string, headers: string[], rows: (string | number | null | undefined)[][]) => {
    const csvContent = [headers, ...rows]
      .map(row => row.map(escapeCsvValue).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadStudentsCsv = () => {
    const headers = ['Name', 'Phone', 'Email', 'Membership Type', 'Start Date', 'End Date', 'Status', 'Created At'];
    const rows = filteredStudents.map(s => [
      s.name,
      s.phone,
      s.email || '',
      s.membership_type,
      s.membership_start || '',
      s.membership_end || '',
      s.status,
      new Date(s.created_at).toLocaleString(),
    ]);
    downloadCsv(`library-students-${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
    toast({ title: 'Success', description: `Downloaded ${rows.length} student records` });
  };

  const handleDownloadPaymentsCsv = () => {
    const headers = ['Receipt ID', 'Date', 'Student Name', 'Student Phone', 'Amount', 'Payment Type', 'Status', 'Notes', 'Created At'];
    const rows = payments.map(p => {
      const student = libraryStudents.find(s => s.id === p.student_id);
      return [
        p.id.slice(0, 8).toUpperCase(),
        new Date(p.payment_date).toLocaleDateString(),
        student?.name || '-',
        student?.phone || '-',
        p.amount,
        p.payment_type,
        p.status,
        p.notes || '',
        new Date(p.created_at).toLocaleString(),
      ];
    });
    downloadCsv(`library-payments-${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
    toast({ title: 'Success', description: `Downloaded ${rows.length} payment records` });
  };

  const handleSendFeeReminders = async () => {
    setIsSendingReminders(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/send-fee-reminders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      });
      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Request failed (${response.status}): ${errBody}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Unknown error');
      }
      setReminderResult(data.summary ? { ...data.summary, details: data.details || [] } : null);
      setShowReminderDialog(true);
      toast({ title: 'Fee reminders sent', description: `${data.summary.sent} email(s) sent, ${data.summary.skipped} skipped, ${data.summary.failed} failed` });
      loadData();
    } catch (error) {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to send fee reminders', variant: 'destructive' });
    } finally {
      setIsSendingReminders(false);
    }
  };

  const resetStudentForm = () => {
    setStudentForm({
      name: '',
      phone: '',
      email: '',
      membership_type: 'monthly',
      membership_start: new Date().toISOString().split('T')[0],
      membership_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setEditingId(null);
  };

  const filteredStudents = libraryStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.phone.includes(searchQuery);
    const matchesMembership = filterMembership === 'all' || student.membership_type === filterMembership;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesMembership && matchesStatus;
  });

  const stats = {
    totalStudents: libraryStudents.length,
    activeStudents: libraryStudents.filter(s => s.status === 'active').length,
    pendingPayments: libraryStudents.filter(s => s.status === 'expired').length,
    expiredMemberships: libraryStudents.filter(s => s.membership_end && new Date(s.membership_end) < new Date()).length,
    monthlyRevenue: payments
      .filter(p => {
        const paymentDate = new Date(p.created_at);
        const now = new Date();
        return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, p) => sum + p.amount, 0),
  };

  const attendanceByDay = Object.entries(
    attendance.reduce((acc: Record<string, number>, att) => {
      acc[att.date] = (acc[att.date] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, count]) => ({ date, visits: count })).slice(-7);

  const revenueByMonth = Object.entries(
    payments.reduce((acc: Record<string, number>, p) => {
      const month = new Date(p.created_at).toLocaleDateString('en-US', { month: 'short' });
      acc[month] = (acc[month] || 0) + p.amount;
      return acc;
    }, {})
  ).map(([month, amount]) => ({ month, revenue: amount })).slice(-6);

  const membershipDistribution = [
    { name: 'Monthly', value: libraryStudents.filter(s => s.membership_type === 'monthly').length },
    { name: 'Quarterly', value: libraryStudents.filter(s => s.membership_type === 'quarterly').length },
    { name: 'Yearly', value: libraryStudents.filter(s => s.membership_type === 'yearly').length },
    { name: 'Half Day', value: libraryStudents.filter(s => s.membership_type === 'half_day').length },
    { name: 'Full Day', value: libraryStudents.filter(s => s.membership_type === 'full_day').length },
  ];

 const inputClass = 'border-blue-200 focus:border-blue-500 focus:ring-blue-500';

if (receiptPayment) {
  return (
    <FeeReceipt
      payment={receiptPayment}
      student={receiptStudent}
      onClose={() => {
        setReceiptPayment(null);
        setReceiptStudent(undefined);
      }}
    />
  );
}

return (
  <Tabs value={activeTab} onValueChange={setActiveTab} className="min-w-0 w-full">
      <TabsList className="mb-4 flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl bg-blue-50 p-1.5">
        <TabsTrigger value="overview" className="shrink-0 whitespace-nowrap text-xs sm:text-sm">Overview</TabsTrigger>
        <TabsTrigger value="students" className="shrink-0 whitespace-nowrap text-xs sm:text-sm">Students</TabsTrigger>
        <TabsTrigger value="attendance" className="shrink-0 whitespace-nowrap text-xs sm:text-sm">Attendance</TabsTrigger>
        <TabsTrigger value="payments" className="shrink-0 whitespace-nowrap text-xs sm:text-sm">Payments</TabsTrigger>
        <TabsTrigger value="analytics" className="shrink-0 whitespace-nowrap text-xs sm:text-sm">Analytics</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Active Students</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-green-600">{stats.activeStudents}</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</p>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-gradient-to-br from-red-50 to-pink-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Expired Memberships</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-red-600">{stats.expiredMemberships}</p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Fee Reminders</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-gray-500 mb-3">Send email notifications to students with expired or expiring memberships.</p>
              <Button
                type="button"
                size="sm"
                onClick={handleSendFeeReminders}
                disabled={isSendingReminders}
                className="w-full gap-1.5 bg-blue-600 hover:bg-blue-700"
              >
                {isSendingReminders ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending...</> : <><MailCheck className="h-3.5 w-3.5" /> Send Reminders</>}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-gray-600">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold text-purple-600">₹{stats.monthlyRevenue}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-blue-100">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-sm">Attendance Trends (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-[250px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                  <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-sm">Revenue Trends (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-[250px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-100">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-sm">Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="h-[250px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={membershipDistribution} cx="50%" cy="50%" labelLine={false} label={{ fill: '#666', fontSize: 12 }} outerRadius={80} fill="#8884d8" dataKey="value">
                  {membershipDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Students Tab */}
      <TabsContent value="students" className="space-y-6">
        <Card className="border-blue-100">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle>{editingId ? 'Edit Student' : 'Add New Library Student'}</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmitStudent} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} required placeholder="Full name" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input value={studentForm.phone} onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })} required placeholder="Phone number" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} placeholder="Email address" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Membership Type *</Label>
                  <Select value={studentForm.membership_type} onValueChange={(value) => {
                    setStudentForm({ ...studentForm, membership_type: value as any });
                  }}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="half_day">Half Day</SelectItem>
                      <SelectItem value="full_day">Full Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Membership Start</Label>
                  <Input type="date" value={studentForm.membership_start} onChange={(e) => setStudentForm({ ...studentForm, membership_start: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Membership End</Label>
                  <Input type="date" value={studentForm.membership_end} onChange={(e) => setStudentForm({ ...studentForm, membership_end: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="submit" disabled={isSubmitting} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 sm:w-auto">
                  {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Add'} Student
                </Button>
                {editingId && <Button type="button" variant="outline" onClick={resetStudentForm} className="w-full sm:w-auto">Cancel</Button>}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Students List</CardTitle>
              <Button type="button" size="sm" variant="outline" onClick={handleDownloadStudentsCsv} className="gap-1.5 shrink-0">
                <Download className="h-3.5 w-3.5" /> CSV
              </Button>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search by name or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <Select value={filterMembership} onValueChange={setFilterMembership}>
                  <SelectTrigger><SelectValue placeholder="Membership" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Memberships</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="half_day">Half Day</SelectItem>
                    <SelectItem value="full_day">Full Day</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <div className="overflow-x-auto">
              <Table className="min-w-[760px] text-xs sm:text-sm">
                <TableHeader>
                  <TableRow className="border-blue-100">
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="border-blue-50 hover:bg-blue-50">
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{student.membership_type}</span></TableCell>
                      <TableCell>{student.membership_start ? new Date(student.membership_start).toLocaleDateString() : '-'}</TableCell>
                      <TableCell>{student.membership_end ? new Date(student.membership_end).toLocaleDateString() : '-'}</TableCell>
                      <TableCell><span className={`px-2 py-1 rounded text-xs font-medium capitalize ${student.status === 'active' ? 'bg-green-100 text-green-700' : student.status === 'expired' ? 'bg-red-100 text-red-700' : student.status === 'inactive' ? 'bg-gray-200 text-gray-700' : 'bg-yellow-100 text-yellow-700'}`}>{student.status}</span></TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(student)} title="Edit"><Edit2 className="h-3 w-3" /></Button>
                          {student.status === 'active' ? (
                            <Button size="sm" variant="outline" onClick={() => toggleStudentStatus(student)} title="Deactivate" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"><PowerOff className="h-3 w-3" /></Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => toggleStudentStatus(student)} title="Activate" className="text-green-600 hover:text-green-700 hover:bg-green-50"><Power className="h-3 w-3" /></Button>
                          )}
                          <Button size="sm" variant="destructive" onClick={() => { setDeleteId(student.id); setShowDeleteDialog(true); }} title="Delete"><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Attendance Tab */}
      <TabsContent value="attendance" className="space-y-6">
        <Card className="border-blue-100">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle>Record Check-In</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmitAttendance} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Student *</Label>
                  <Select value={attendanceForm.student_id} onValueChange={(value) => setAttendanceForm({ ...attendanceForm, student_id: value })}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {libraryStudents.filter(s => s.status === 'active').map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input type="date" value={attendanceForm.date} onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Check-In Time *</Label>
                  <Input type="datetime-local" value={attendanceForm.check_in.slice(0, 16)} onChange={(e) => setAttendanceForm({ ...attendanceForm, check_in: new Date(e.target.value).toISOString() })} className={inputClass} />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 sm:w-auto">
                <Clock className="h-4 w-4" /> Record Check-In
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <div className="overflow-x-auto">
              <Table className="min-w-[560px] text-xs sm:text-sm">
                <TableHeader>
                  <TableRow className="border-blue-100">
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Check-In</TableHead>
                    <TableHead>Check-Out</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.slice(0, 20).map((att) => {
                    const student = libraryStudents.find(s => s.id === att.student_id);
                    return (
                      <TableRow key={att.id} className="border-blue-50 hover:bg-blue-50">
                        <TableCell>{att.date}</TableCell>
                        <TableCell>{student?.name || '-'}</TableCell>
                        <TableCell>{att.check_in ? new Date(att.check_in).toLocaleTimeString() : '-'}</TableCell>
                        <TableCell>{att.check_out ? new Date(att.check_out).toLocaleTimeString() : '-'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Payments Tab */}
      <TabsContent value="payments" className="space-y-6">
        <Card className="border-blue-100">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle>Record Payment</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>Student *</Label>
                  <Select value={paymentForm.student_id} onValueChange={(value) => setPaymentForm({ ...paymentForm, student_id: value })}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {libraryStudents.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (₹) *</Label>
                  <Input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: parseFloat(e.target.value) })} required placeholder="0" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <Label>Payment Type</Label>
                  <Select value={paymentForm.payment_type} onValueChange={(value) => setPaymentForm({ ...paymentForm, payment_type: value as any })}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="membership">Membership</SelectItem>
                      <SelectItem value="half_day">Half Day</SelectItem>
                      <SelectItem value="full_day">Full Day</SelectItem>
                      <SelectItem value="fine">Fine</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 sm:w-auto">
                <DollarSign className="h-4 w-4" /> Record Payment
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Payment History</CardTitle>
              <Button type="button" size="sm" variant="outline" onClick={handleDownloadPaymentsCsv} className="gap-1.5 shrink-0">
                <Download className="h-3.5 w-3.5" /> CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <div className="overflow-x-auto">
              <Table className="min-w-[620px] text-xs sm:text-sm">
                <TableHeader>
                  <TableRow className="border-blue-100">
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.slice(0, 20).map((payment) => {
                    const student = libraryStudents.find(s => s.id === payment.student_id);
                    return (
                      <TableRow key={payment.id} className="border-blue-50 hover:bg-blue-50">
                        <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                        <TableCell>{student?.name || '-'}</TableCell>
                        <TableCell className="font-medium">₹{payment.amount}</TableCell>
                        <TableCell>{payment.payment_type}</TableCell>
                        <TableCell><span className={`px-2 py-1 rounded text-xs font-medium ${payment.status === 'completed' ? 'bg-green-100 text-green-700' : payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{payment.status}</span></TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button type="button" size="sm" variant="outline" onClick={() => handlePrintPayment(payment)} title="Print fee slip"><Printer className="h-3 w-3" /></Button>
                            <Button type="button" size="sm" variant="destructive" onClick={() => { setDeletePaymentId(payment.id); setShowDeletePaymentDialog(true); }} title="Delete payment"><Trash2 className="h-3 w-3" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics" className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-blue-100">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-sm">Daily Attendance</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-[300px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                  <Bar dataKey="visits" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-sm">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-[300px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} formatter={(value) => `₹${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-100">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-sm">Payment Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm text-green-600 font-medium">Active</p>
                <p className="text-2xl font-bold text-green-700">{libraryStudents.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm text-red-600 font-medium">Expired</p>
                <p className="text-2xl font-bold text-red-700">{libraryStudents.filter(s => s.status === 'expired').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Fee Reminder Results Dialog */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-lg">
          <DialogHeader>
            <DialogTitle>Fee Reminder Results</DialogTitle>
            <DialogDescription>
              {reminderResult ? `${reminderResult.sent} sent, ${reminderResult.skipped} skipped, ${reminderResult.failed} failed out of ${reminderResult.total} students` : ''}
            </DialogDescription>
          </DialogHeader>
          {reminderResult && reminderResult.details.length > 0 && (
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reminderResult.details.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-xs">{d.student}</TableCell>
                      <TableCell className="text-xs">{d.email}</TableCell>
                      <TableCell className="text-xs capitalize">{d.type.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${d.status === 'sent' ? 'bg-green-100 text-green-700' : d.status === 'skipped' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'}`} title={d.error || ''}>
                          {d.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReminderDialog(false)} className="w-full sm:w-auto">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Payment Dialog */}
      <Dialog open={showDeletePaymentDialog} onOpenChange={setShowDeletePaymentDialog}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Payment</DialogTitle>
            <DialogDescription>Are you sure you want to delete this payment record? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDeletePaymentDialog(false)} className="w-full sm:w-auto">Cancel</Button>
            <Button variant="destructive" onClick={handleDeletePayment} className="w-full sm:w-auto">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>Are you sure you want to delete this student? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="w-full sm:w-auto">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} className="w-full sm:w-auto">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
