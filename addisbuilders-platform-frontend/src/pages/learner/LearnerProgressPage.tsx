import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Award, BookOpen, CheckCircle2, TrendingUp, Clock, Calendar, Lock, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { gamificationService } from '../../services/gamification.service';
import { AchievementResponse } from '../../types';

export const LearnerProgressPage: React.FC = () => {
  const [achievements, setAchievements] = useState<AchievementResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gamificationService
      .getMyAchievements()
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const weeklyActivityData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.0 },
    { day: 'Thu', hours: 5.1 },
    { day: 'Fri', hours: 3.8 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 2.5 },
  ];

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading learning milestones & achievements..." />;
  }

  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Learning Progress & Milestones"
        description="Comprehensive analytics tracking your curriculum completion, assignment performance, and skill growth."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Learning Progress' },
        ]}
      />

      {/* Top Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Course Completion</span>
            <Badge variant="brand">66.7%</Badge>
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-neutral-100">28 of 42 Lessons</p>
          <div className="w-full h-2 bg-neutral-200 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-brand-700 rounded-full" style={{ width: '66.7%' }} />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Average Grade</span>
            <Badge variant="success">91.5%</Badge>
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-neutral-100">Grade A (High Honors)</p>
          <p className="text-xs text-neutral-500 mt-2">Verified across graded university submissions</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Milestones Earned</span>
            <Badge variant="neutral">{earnedCount} of {achievements.length}</Badge>
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-neutral-100">{earnedCount} Badges</p>
          <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> High Academic Distinction
          </p>
        </Card>
      </div>

      {/* Charts & Competencies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white dark:bg-neutral-900 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle>Weekly Study & Coding Activity</CardTitle>
          </CardHeader>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="h" />
                <Tooltip
                  formatter={(val: any) => [`${val} hours`, 'Study Time']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="hours" fill="#166534" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-white dark:bg-neutral-900 p-6 space-y-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle>Acquired Technical Competencies</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {[
              { skill: 'React & TypeScript Component Architecture', level: 90 },
              { skill: 'REST API & Spring Boot Architecture', level: 85 },
              { skill: 'Relational Database Schema Design (MySQL)', level: 80 },
              { skill: 'Responsive Web Design & Tailwind CSS', level: 95 },
              { skill: 'Automated Unit Testing with Vitest', level: 75 },
            ].map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-800 dark:text-neutral-200">{s.skill}</span>
                  <span className="text-neutral-500">{s.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-800 rounded-full" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Earned Platform Badges & Milestones */}
      <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-700" />
              Accredited Achievement Badges
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Official institutional badges awarded automatically as you hit curriculum, grading, and placement milestones.
            </p>
          </div>
          <Badge variant="brand">{earnedCount} Earned</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.code}
              className={`p-4 rounded-xl border transition-all ${
                ach.earned
                  ? 'border-emerald-200 bg-emerald-50/40 shadow-xs'
                  : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    ach.earned
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {ach.earned ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>
                <Badge variant={ach.earned ? 'success' : 'neutral'}>
                  {ach.earned ? 'Earned' : 'Locked'}
                </Badge>
              </div>

              <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{ach.title}</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">{ach.description}</p>
              {ach.progressHint && (
                <p className="text-[11px] text-neutral-400 mt-2 font-medium">
                  Status: {ach.progressHint}
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
