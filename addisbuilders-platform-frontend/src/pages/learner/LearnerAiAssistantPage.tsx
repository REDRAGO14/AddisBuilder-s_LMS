import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { aiService } from '../../services/ai.service';
import {
  StudyPlanResponse,
  ProgressSummaryResponse,
  InternshipMatchResponse,
  AiAnswerResponse,
} from '../../types';
import {
  Sparkles,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Calendar,
  Send,
  HelpCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { toast } from 'sonner';

export const LearnerAiAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'studyPlan' | 'matches' | 'summary' | 'ask'>('studyPlan');
  const [studyPlan, setStudyPlan] = useState<StudyPlanResponse | null>(null);
  const [progressSummary, setProgressSummary] = useState<ProgressSummaryResponse | null>(null);
  const [matches, setMatches] = useState<InternshipMatchResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Q&A state
  const [question, setQuestion] = useState('');
  const [asking, setAsking] = useState(false);
  const [qaHistory, setQaHistory] = useState<{ question: string; answer: AiAnswerResponse }[]>([]);

  // NOTE: courseId is intentionally omitted — per spec §6.17 the backend then
  // answers from the learner's overall progress instead of one hard-coded course.

  useEffect(() => {
    let isMounted = true;
    // Resilient loading: GET /ai/study-plan?courseId=1 fails (400/403) for a
    // learner without an ACTIVE enrollment in course 1 — degrade to null so the
    // summary and matches still render.
    Promise.all([
      aiService.getStudyPlan(1).catch(() => null),
      aiService.getProgressSummary().catch(() => null),
      aiService.getInternshipMatches(5).catch(() => [] as InternshipMatchResponse[]),
    ]).then(([plan, summary, matchItems]) => {
      if (isMounted) {
        setStudyPlan(plan);
        setProgressSummary(summary);
        setMatches(matchItems);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setAsking(true);
    try {
      // Omit courseId: progress-based answer unless a course-aware flow is added.
      const res = await aiService.askQuestion(question.trim());
      setQaHistory((prev) => [{ question: question.trim(), answer: res }, ...prev]);
      setQuestion('');
    } catch {
      toast.error('Could not retrieve an answer at this time.');
    } finally {
      setAsking(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Initializing Smart Academic Assistant..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Academic & Career Assistant"
        description="Heuristic study pacing, automated curriculum Q&A, and personalized internship matching calibrated to your learning progress."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'AI Assistant' },
        ]}
      />

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('studyPlan')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'studyPlan'
              ? 'border-brand-700 text-brand-900 font-bold'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Personalized Study Plan
        </button>

        <button
          onClick={() => setActiveTab('matches')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'matches'
              ? 'border-brand-700 text-brand-900 font-bold'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Smart Internship Matches
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'summary'
              ? 'border-brand-700 text-brand-900 font-bold'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Progress Summary & Strengths
        </button>

        <button
          onClick={() => setActiveTab('ask')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'ask'
              ? 'border-brand-700 text-brand-900 font-bold'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Curriculum Q&A
        </button>
      </div>

      {/* TAB 1: STUDY PLAN */}
      {activeTab === 'studyPlan' && studyPlan && (
        <div className="space-y-6">
          <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-neutral-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-brand-700 tracking-wider">Paced Schedule</span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{studyPlan.courseTitle}</h3>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="text-center px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-400 block font-medium">Estimated</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{studyPlan.estimatedWeeks} Weeks</span>
                </div>
                <div className="text-center px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-400 block font-medium">Weekly Target</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{studyPlan.weeklyMinutes / 60} hrs/week</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {studyPlan.items.map((item) => (
                <div
                  key={item.lessonId}
                  className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="brand">Week {item.week}</Badge>
                      <span className="text-xs text-neutral-500 font-medium">{item.moduleTitle}</span>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.lessonTitle}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {item.durationMinutes} mins
                    </span>
                    <Badge variant="neutral">{item.status.replace('_', ' ')}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: INTERNSHIP MATCHES */}
      {activeTab === 'matches' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <Card key={match.internshipId} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="brand">{match.category}</Badge>
                  <div className="inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    {match.matchScore}% Match
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-base">{match.title}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">{match.organizationName} • {match.location}</p>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                  <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Matching Insights</p>
                  {match.reasons.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex justify-end">
                <a href={`/internships/${match.internshipId}`}>
                  <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View Listing
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 3: SUMMARY & RECOMMENDATIONS */}
      {activeTab === 'summary' && progressSummary && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-base text-neutral-900 dark:text-neutral-100">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Verified Academic Strengths
              </CardTitle>
            </CardHeader>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed italic bg-neutral-50 dark:bg-neutral-800/60 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
              "{progressSummary.summary}"
            </p>
            <div className="space-y-2 pt-2">
              {progressSummary.strengths.map((str, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-base text-neutral-900 dark:text-neutral-100">
                <TrendingUp className="w-5 h-5 text-brand-700" />
                Targeted Faculty Recommendations
              </CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {progressSummary.recommendations.map((rec, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-950 text-xs flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 4: CURRICULUM Q&A */}
      {activeTab === 'ask' && (
        <Card className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Curriculum & Progress Q&A</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Ask questions about lecture notes, syllabus concepts, assignment requirements, and verified study references.
            </p>
          </div>

          <form onSubmit={handleAsk} className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What does this course cover regarding state management?"
              className="flex-1"
            />
            <Button type="submit" variant="primary" isLoading={asking} leftIcon={<Send className="w-4 h-4" />}>
              Ask
            </Button>
          </form>

          <div className="space-y-4 pt-2">
            {qaHistory.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-400 border border-dashed rounded-xl">
                No questions asked yet. Inquire about any course module or homework requirement above!
              </div>
            ) : (
              qaHistory.map((qa, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 space-y-2">
                  <p className="text-xs font-bold text-brand-900">Q: {qa.question}</p>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">{qa.answer.answer}</p>
                  {qa.answer.sources && qa.answer.sources.length > 0 && (
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500 flex flex-wrap gap-2">
                      <span className="font-semibold text-neutral-600 dark:text-neutral-400">Verified Sources:</span>
                      {qa.answer.sources.map((s, sIdx) => (
                        <span key={sIdx} className="bg-white dark:bg-neutral-900 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
