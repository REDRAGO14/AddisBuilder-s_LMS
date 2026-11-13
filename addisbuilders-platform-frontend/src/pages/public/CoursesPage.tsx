import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesService } from '../../services/courses.service';
import { categoriesService } from '../../services/categories.service';
import { Course } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/feedback/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpen, Users, Clock } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [loading, setLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState<string[]>(COURSE_CATEGORIES);

  useEffect(() => {
    categoriesService
      .getCategories()
      .then((cats) => setCategoriesList(cats.map((c) => c.name)))
      .catch(() => setCategoriesList(COURSE_CATEGORIES));
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    coursesService
      .getCourses({
        search: search || undefined,
        category: category !== 'All' ? category : undefined,
        level: level !== 'All' ? level : undefined,
      })
      .then((data) => {
        if (isMounted) {
          setCourses(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [search, category, level]);

  const categoryOptions = [
    { value: 'All', label: t('publicPages.courses.allCategories', 'All Categories') },
    ...categoriesList.map((c) => ({ value: c, label: c })),
  ];

  const levelOptions = [
    { value: 'All', label: t('publicPages.courses.allLevels', 'All Levels') },
    ...COURSE_LEVELS,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader
        title={t('publicPages.courses.title', 'Explore University Courses')}
        description={t('publicPages.courses.subtitle', 'Comprehensive technical and engineering curricula designed by university faculty and industry practitioners.')}
        breadcrumbs={[{ label: t('nav.home', 'Home'), href: '/' }, { label: t('nav.courses', 'Courses') }]}
      />

      {/* Filters Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/90 dark:border-neutral-800 shadow-xs mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t('publicPages.courses.searchPlaceholder', 'Search courses by title, topic, or keyword...')}
          className="max-w-md w-full"
        />

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-48">
            <Select
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40">
            <Select
              options={levelOptions}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <LoadingSpinner size="lg" label="Loading available courses..." />
      ) : courses.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No courses matched your filters"
          description="Try broadening your search term or clearing the selected category and difficulty level filters."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('');
                setCategory('All');
                setLevel('All');
              }}
            >
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} hoverEffect className="flex flex-col h-full bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex gap-2">
                  <Badge variant="brand">{course.category}</Badge>
                </div>
                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
                  <span className="text-[11px] font-semibold bg-neutral-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {course.level}
                  </span>
                </div>
              </div>

              <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                      {course.durationWeeks} Weeks
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                      {course.enrolledStudentsCount} Enrolled
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {course.instructorAvatar ? (
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructorName}
                        className="w-7 h-7 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-brand-800 text-white flex items-center justify-center text-xs font-bold">
                        {course.instructorName[0]}
                      </div>
                    )}
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-[120px]">
                      {course.instructorName}
                    </span>
                  </div>

                  <Link to={`/courses/${course.id}`}>
                    <Button size="sm" variant="primary">
                      {t('common.view', 'View Details')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
