import React, { useState, useEffect } from 'react';
import { notificationsService } from '../../services/notifications.service';
import { Notification } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/feedback/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { Bell, CheckCircle2, AlertTriangle, Info, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export interface NotificationsPageProps {
  rolePrefix: string;
  roleLabel: string;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ rolePrefix, roleLabel }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const list = await notificationsService.getNotifications();
      setNotifications(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await notificationsService.markAsRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
      toast.success('Notification marked as read');
    } catch {
      toast.error('Failed to update notification');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read');
    } catch {
      toast.error('Failed to update notifications');
    }
  };

  const filtered = notifications.filter((n) => (filter === 'UNREAD' ? !n.isRead : true));

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading notifications..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Notifications & Activity Feed"
        description="Stay informed about application updates, grading feedback, and institutional notices."
        breadcrumbs={[
          { label: roleLabel, href: `/${rolePrefix}/dashboard` },
          { label: 'Notifications' },
        ]}
        actions={
          notifications.some((n) => !n.isRead) ? (
            <Button
              size="sm"
              variant="outline"
              onClick={handleMarkAllRead}
              leftIcon={<Check className="w-4 h-4" />}
            >
              Mark All as Read
            </Button>
          ) : undefined
        }
      />

      <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === 'ALL'
              ? 'bg-brand-900 text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('UNREAD')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === 'UNREAD'
              ? 'bg-brand-900 text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
          }`}
        >
          Unread ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bell className="w-8 h-8" />}
          title={filter === 'UNREAD' ? 'No unread notifications' : 'No notifications'}
          description="You're all caught up! New updates regarding your applications and courses will appear here."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <Card
              key={n.id}
              className={`transition-colors ${
                !n.isRead ? 'bg-brand-50/30 border-brand-200' : 'bg-white dark:bg-neutral-900'
              }`}
            >
              <CardContent className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    {n.type === 'SUCCESS' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : n.type === 'WARNING' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Info className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">{n.title}</h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-brand-600" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{n.message}</p>
                    <p className="text-[11px] text-neutral-400 pt-1">
                      {formatDate(n.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {n.link && (
                    <Link to={n.link}>
                      <Button size="sm" variant="ghost" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View
                      </Button>
                    </Link>
                  )}
                  {!n.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkRead(n.id)}
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
