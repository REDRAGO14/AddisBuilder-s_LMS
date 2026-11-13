import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { gamificationService } from '../../services/gamification.service';
import { LeaderboardEntryResponse } from '../../types';
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const LearnerLeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryResponse[]>([]);
  const [myRank, setMyRank] = useState<LeaderboardEntryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Resilient loading: GET /leaderboard/me is learner-only (403 for other
    // roles) — the board should still render without the personal rank card.
    Promise.all([
      gamificationService.getLeaderboard(10),
      gamificationService.getMyRank().catch(() => null),
    ]).then(([topTen, currentRank]) => {
      if (isMounted) {
        setLeaderboard(topTen);
        setMyRank(currentRank);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Retrieving national platform leaderboard..." />;
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
          <Trophy className="w-4 h-4 text-amber-600" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
          <Medal className="w-4 h-4 text-slate-600" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-900 flex items-center justify-center font-bold">
          <Medal className="w-4 h-4 text-amber-800" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center text-xs font-bold">
        #{rank}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Student Excellence Leaderboard"
        description="Celebrating high-achieving university scholars across Ethiopian faculties. Points are earned through verified lesson completions, assignment scores, and mentor evaluations."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Leaderboard' },
        ]}
      />

      {/* Current Learner Banner */}
      {myRank && (
        <Card className="p-6 bg-gradient-to-r from-brand-900 to-brand-800 text-white border-0 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-neutral-900/10 backdrop-blur-md flex items-center justify-center text-amber-300 shrink-0">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-brand-200 font-semibold">Your Ranking</span>
                  <Badge className="bg-amber-400 text-amber-950 font-bold border-0">Rank #{myRank.rank}</Badge>
                </div>
                <h3 className="text-2xl font-black mt-0.5">{myRank.learnerName}</h3>
                <p className="text-xs text-brand-200 mt-1 flex items-center gap-2">
                  <span>{myRank.university}</span>
                  <span>•</span>
                  <span>{myRank.department}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-white/15 pt-4 sm:pt-0 sm:pl-6">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-brand-200 font-semibold">Total Points</p>
                <p className="text-3xl font-extrabold text-amber-300 mt-0.5">{myRank.points}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-brand-200 font-semibold">Average Grade</p>
                <p className="text-3xl font-extrabold text-white mt-0.5">{myRank.averageGrade}%</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Points Calculation Criteria */}
      <Card className="p-5 bg-blue-50/70 border border-blue-200 text-blue-900">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-sm">Official AddisBuilder's Scoring Formula</p>
            <p className="text-blue-800">
              Score = <code className="bg-white dark:bg-neutral-900/80 px-1.5 py-0.5 rounded text-blue-950 font-mono">(Completed Lessons × 10) + (Graded Submissions × 5) + Round(Average Grade)</code>
            </p>
            <p className="text-blue-700">
              Rankings update automatically upon completion of curriculum modules and verified mentor grading.
            </p>
          </div>
        </div>
      </Card>

      {/* Leaderboard Table */}
      <Card className="bg-white dark:bg-neutral-900 overflow-hidden shadow-xs border border-neutral-200 dark:border-neutral-800">
        <CardHeader className="border-b border-neutral-100 p-5">
          <CardTitle className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-700" />
            Top 10 University Scholars
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-[11px] uppercase font-bold text-neutral-500 tracking-wider border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="py-3 px-4 w-16">Rank</th>
                <th className="py-3 px-4">Student Scholar</th>
                <th className="py-3 px-4 hidden md:table-cell">Institution & Department</th>
                <th className="py-3 px-4 text-center">Lessons</th>
                <th className="py-3 px-4 text-center">Submissions</th>
                <th className="py-3 px-4 text-center">Avg Grade</th>
                <th className="py-3 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {leaderboard.map((entry) => {
                const isMe = myRank?.learnerId === entry.learnerId;
                return (
                  <tr
                    key={entry.learnerId}
                    className={`transition-colors ${
                      isMe ? 'bg-amber-50/70 font-semibold' : 'hover:bg-neutral-50/80'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold">
                      <div className="flex items-center gap-2">
                        {getRankBadge(entry.rank)}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-900 dark:text-neutral-100">{entry.learnerName}</span>
                        {isMe && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-100 text-brand-800 font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-500 md:hidden mt-0.5">
                        {entry.university}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <p className="text-neutral-800 dark:text-neutral-200 text-xs font-medium">{entry.university}</p>
                      <p className="text-neutral-500 text-[11px]">{entry.department}</p>
                    </td>
                    <td className="py-3.5 px-4 text-center text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      {entry.completedLessons}
                    </td>
                    <td className="py-3.5 px-4 text-center text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      {entry.gradedSubmissions}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {entry.averageGrade}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-sm font-black text-brand-900">{entry.points}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
