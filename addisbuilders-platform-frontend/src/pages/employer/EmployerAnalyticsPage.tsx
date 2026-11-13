import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const EmployerAnalyticsPage: React.FC = () => {
  const funnelData = [
    { stage: 'Applications', count: 48 },
    { stage: 'Reviewed', count: 32 },
    { stage: 'Shortlisted', count: 18 },
    { stage: 'Interviews', count: 12 },
    { stage: 'Offers Made', count: 6 },
  ];

  const universityData = [
    { name: 'Addis Ababa University', value: 24 },
    { name: 'ASTU', value: 12 },
    { name: 'Bahir Dar University', value: 8 },
    { name: 'Hawassa University', value: 4 },
  ];

  const COLORS = ['#166534', '#15803d', '#22c55e', '#86efac'];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Recruitment Analytics"
        description="Data-driven insights into your candidate pipelines, review velocities, and university candidate origins."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'Analytics' },
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-white dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase text-neutral-400">Total Pipeline Reach</p>
          <p className="text-3xl font-black text-neutral-900 dark:text-neutral-100 mt-1">48 Candidates</p>
          <p className="text-xs text-neutral-500 mt-2">Across 4 published opportunities</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase text-neutral-400">Interview Conversion</p>
          <p className="text-3xl font-black text-emerald-800 mt-1">25.0%</p>
          <p className="text-xs text-neutral-500 mt-2">12 candidates invited for interviews</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase text-neutral-400">Avg. Time to Review</p>
          <p className="text-3xl font-black text-brand-900 mt-1">1.8 Days</p>
          <p className="text-xs text-neutral-500 mt-2">Fast candidate response speed</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white dark:bg-neutral-900 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle>Recruitment Funnel Breakdown</CardTitle>
          </CardHeader>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData}>
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  formatter={(v: any) => [`${v} Candidates`, 'Volume']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#14532d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-white dark:bg-neutral-900 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle>Applicant University Distribution</CardTitle>
          </CardHeader>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={universityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {universityData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any) => [`${v} Candidates`, 'Origin']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
