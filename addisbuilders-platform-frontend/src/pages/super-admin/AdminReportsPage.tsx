import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

export const AdminReportsPage: React.FC = () => {
  const monthlyEnrollmentData = [
    { month: 'Jun', enrollments: 45, applications: 18 },
    { month: 'Jul', enrollments: 72, applications: 28 },
    { month: 'Aug', enrollments: 95, applications: 40 },
    { month: 'Sep', enrollments: 140, applications: 62 },
    { month: 'Oct', enrollments: 240, applications: 98 },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Platform Analytics & Institutional Reports"
        description="Comprehensive platform metrics regarding university enrollment velocity, placement demand, and institutional growth."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Reports' },
        ]}
      />

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-5 bg-white dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase text-neutral-400">Total Enrolled Learners</p>
          <p className="text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-1">414</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">+34% this month</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase text-neutral-400">Assignment Completion</p>
          <p className="text-2xl font-black text-brand-900 mt-1">88.4%</p>
          <p className="text-xs text-neutral-500 mt-1">High academic compliance</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase text-neutral-400">Internship Placements</p>
          <p className="text-2xl font-black text-purple-900 mt-1">54</p>
          <p className="text-xs text-neutral-500 mt-1">Accredited students</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase text-neutral-400">Verified Organizations</p>
          <p className="text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-1">18</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">100% license checked</p>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="bg-white dark:bg-neutral-900 p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle>Enrollment & Internship Placement Trends (2025/2026)</CardTitle>
        </CardHeader>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Line
                type="monotone"
                dataKey="enrollments"
                name="Course Enrollments"
                stroke="#166534"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="applications"
                name="Internship Applications"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
