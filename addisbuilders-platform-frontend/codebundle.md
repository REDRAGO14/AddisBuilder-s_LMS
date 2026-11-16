# CodeBundle: AddisBuilders
Generated: 2026-11-02T08:16:56.114Z
Root: c:\Users\HP\Desktop\AddisBuilders
Files: 128

## How to apply changes
- Return changes as **unified diffs** per file whenever possible. 
- Files are delimited with `<!-- FILE: ... -->` markers.

## Project tree
```
├─ .gitignore
├─ .oxlintrc.json
├─ index.html
├─ package.json
├─ postcss.config.js
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ components
│  │  ├─ common
│  │  │  └─ PageHeader.tsx
│  │  ├─ feedback
│  │  │  ├─ EmptyState.tsx
│  │  │  └─ ErrorState.tsx
│  │  ├─ forms 
│  │  │  └─ FormField.tsx
│  │  ├─ layout
│  │  │  ├─ AuthLayout.tsx
│  │  │  ├─ DashboardLayout.tsx
│  │  │  ├─ DashboardSidebar.tsx
│  │  │  ├─ DashboardTopbar.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  └─ PublicLayout.tsx
│  │  └─ ui
│  │     ├─ Badge.tsx
│  │     ├─ Button.tsx
│  │     ├─ Card.tsx
│  │     ├─ ConfirmDialog.tsx
│  │     ├─ DataTable.tsx
│  │     ├─ FileUpload.tsx
│  │     ├─ Input.tsx
│  │     ├─ LoadingSpinner.tsx
│  │     ├─ Modal.tsx
│  │     ├─ Pagination.tsx
│  │     ├─ ProfilePhotoUploader.tsx
│  │     ├─ SearchInput.tsx
│  │     ├─ Select.tsx
│  │     ├─ Skeleton.tsx
│  │     ├─ StatusBadge.tsx
│  │     └─ Textarea.tsx
│  ├─ constants
│  │  └─ index.ts
│  ├─ contexts
│  │  └─ AuthContext.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ auth
│  │  │  ├─ ForgotPasswordPage.tsx
│  │  │  ├─ LoginPage.tsx
│  │  │  ├─ RegisterPage.tsx
│  │  │  └─ ResetPasswordPage.tsx
│  │  ├─ common
│  │  │  └─ NotificationsPage.tsx
│  │  ├─ employer
│  │  │  ├─ EmployerAnalyticsPage.tsx
│  │  │  ├─ EmployerApplicantsPage.tsx
│  │  │  ├─ EmployerDashboardPage.tsx
│  │  │  ├─ EmployerInternshipEditorPage.tsx
│  │  │  ├─ EmployerInternshipsPage.tsx
│  │  │  ├─ EmployerProfilePage.tsx
│  │  │  └─ EmployerVerificationPage.tsx
│  │  ├─ internship-manager
│  │  │  ├─ CoordinatorApplicationsPage.tsx
│  │  │  ├─ CoordinatorDashboardPage.tsx
│  │  │  ├─ CoordinatorInternshipEditorPage.tsx
│  │  │  └─ CoordinatorInternshipsPage.tsx
│  │  ├─ learner
│  │  │  ├─ LearnerApplicationsPage.tsx
│  │  │  ├─ LearnerAssignmentsPage.tsx
│  │  │  ├─ LearnerCourseLearnPage.tsx
│  │  │  ├─ LearnerCoursesPage.tsx
│  │  │  ├─ LearnerDashboardPage.tsx
│  │  │  ├─ LearnerProfilePage.tsx
│  │  │  ├─ LearnerProgressPage.tsx
│  │  │  └─ LearnerSavedInternshipsPage.tsx
│  │  ├─ mentor
│  │  │  ├─ MentorAssignmentsPage.tsx
│  │  │  ├─ MentorCourseEditorPage.tsx
│  │  │  ├─ MentorCoursesPage.tsx
│  │  │  ├─ MentorDashboardPage.tsx
│  │  │  ├─ MentorMaterialsPage.tsx
│  │  │  ├─ MentorStudentsPage.tsx
│  │  │  └─ MentorSubmissionsPage.tsx
│  │  ├─ public
│  │  │  ├─ AboutPage.tsx
│  │  │  ├─ AccessDeniedPage.tsx
│  │  │  ├─ ContactPage.tsx
│  │  │  ├─ CoordinatorPendingPage.tsx
│  │  │  ├─ CourseDetailPage.tsx
│  │  │  ├─ CoursesPage.tsx
│  │  │  ├─ HomePage.tsx
│  │  │  ├─ InternshipDetailPage.tsx
│  │  │  ├─ InternshipsPage.tsx
│  │  │  ├─ NotFoundPage.tsx
│  │  │  └─ ServicesPage.tsx
│  │  └─ super-admin
│  │     ├─ AdminAuditLogsPage.tsx
│  │     ├─ AdminCoordinatorApprovalsPage.tsx
│  │     ├─ AdminCoursesPage.tsx
│  │     ├─ AdminDashboardPage.tsx
│  │     ├─ AdminModerationPage.tsx
│  │     ├─ AdminOrganizationsPage.tsx
│  │     ├─ AdminReportsPage.tsx
│  │     ├─ AdminSettingsPage.tsx
│  │     └─ AdminUsersPage.tsx
│  ├─ routes
│  │  ├─ index.tsx
│  │  └─ RouteGuards.tsx
│  ├─ schemas
│  │  └─ index.ts
│  ├─ services
│  │  ├─ api.ts
│  │  ├─ applications.service.ts
│  │  ├─ assignments.service.ts
│  │  ├─ auth.service.ts
│  │  ├─ coordinators.service.ts
│  │  ├─ courses.service.ts
│  │  ├─ enrollments.service.ts
│  │  ├─ internships.service.ts
│  │  ├─ mockData.ts
│  │  ├─ mockStorage.ts
│  │  ├─ notifications.service.ts
│  │  ├─ organizations.service.ts
│  │  ├─ reports.service.ts
│  │  ├─ uploads.service.ts
│  │  └─ users.service.ts
│  ├─ test
│  │  ├─ AuthValidation.test.ts
│  │  ├─ CourseEnrollmentRestrictions.test.tsx
│  │  ├─ EmptyState.test.tsx
│  │  ├─ MentorStudents.test.tsx
│  │  ├─ ProfilePhotoValidation.test.tsx
│  │  ├─ PublicNavigation.test.tsx
│  │  ├─ RoleGuards.test.tsx
│  │  ├─ setup.ts
│  │  └─ StatusBadge.test.tsx
│  ├─ types
│  │  └─ index.ts
│  ├─ utils
│  │  └─ index.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsc_out.txt
├─ tsc_out2.txt
├─ tsconfig.app.json
├─ tsconfig.app.tsbuildinfo
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## Files list

- `.gitignore` (253 bytes)
- `.oxlintrc.json` (245 bytes)
- `index.html` (954 bytes)
- `package.json` (1055 bytes)
- `postcss.config.js` (80 bytes)
- `README.md` (1278 bytes)
- `src/App.css` (52 bytes)
- `src/App.tsx` (467 bytes)
- `src/components/common/PageHeader.tsx` (2005 bytes)
- `src/components/feedback/EmptyState.tsx` (935 bytes)
- `src/components/feedback/ErrorState.tsx` (1199 bytes)
- `src/components/forms/FormField.tsx` (823 bytes)
- `src/components/layout/AuthLayout.tsx` (1613 bytes)
- `src/components/layout/DashboardLayout.tsx` (1420 bytes)
- `src/components/layout/DashboardSidebar.tsx` (9950 bytes)
- `src/components/layout/DashboardTopbar.tsx` (9203 bytes)
- `src/components/layout/Footer.tsx` (4605 bytes)
- `src/components/layout/Navbar.tsx` (5944 bytes)
- `src/components/layout/PublicLayout.tsx` (396 bytes)
- `src/components/ui/Badge.tsx` (1189 bytes)
- `src/components/ui/Button.tsx` (2329 bytes)
- `src/components/ui/Card.tsx` (1762 bytes)
- `src/components/ui/ConfirmDialog.tsx` (2023 bytes)
- `src/components/ui/DataTable.tsx` (2437 bytes)
- `src/components/ui/FileUpload.tsx` (5939 bytes)
- `src/components/ui/Input.tsx` (2393 bytes)
- `src/components/ui/LoadingSpinner.tsx` (774 bytes)
- `src/components/ui/Modal.tsx` (2463 bytes)
- `src/components/ui/Pagination.tsx` (2096 bytes)
- `src/components/ui/ProfilePhotoUploader.tsx` (8269 bytes)
- `src/components/ui/SearchInput.tsx` (1512 bytes)
- `src/components/ui/Select.tsx` (1809 bytes)
- `src/components/ui/Skeleton.tsx` (589 bytes)
- `src/components/ui/StatusBadge.tsx` (3255 bytes)
- `src/components/ui/Textarea.tsx` (1621 bytes)
- `src/constants/index.ts` (1861 bytes)
- `src/contexts/AuthContext.tsx` (3854 bytes)
- `src/index.css` (884 bytes)
- `src/main.tsx` (226 bytes)
- `src/pages/auth/ForgotPasswordPage.tsx` (2946 bytes)
- `src/pages/auth/LoginPage.tsx` (7577 bytes)
- `src/pages/auth/RegisterPage.tsx` (7985 bytes)
- `src/pages/auth/ResetPasswordPage.tsx` (3020 bytes)
- `src/pages/common/NotificationsPage.tsx` (6445 bytes)
- `src/pages/employer/EmployerAnalyticsPage.tsx` (4439 bytes)
- `src/pages/employer/EmployerApplicantsPage.tsx` (8029 bytes)
- `src/pages/employer/EmployerDashboardPage.tsx` (8850 bytes)
- `src/pages/employer/EmployerInternshipEditorPage.tsx` (7613 bytes)
- `src/pages/employer/EmployerInternshipsPage.tsx` (3788 bytes)
- `src/pages/employer/EmployerProfilePage.tsx` (5404 bytes)
- `src/pages/employer/EmployerVerificationPage.tsx` (8613 bytes)
- `src/pages/internship-manager/CoordinatorApplicationsPage.tsx` (6077 bytes)
- `src/pages/internship-manager/CoordinatorDashboardPage.tsx` (8591 bytes)
- `src/pages/internship-manager/CoordinatorInternshipEditorPage.tsx` (7430 bytes)
- `src/pages/internship-manager/CoordinatorInternshipsPage.tsx` (3542 bytes)
- `src/pages/learner/LearnerApplicationsPage.tsx` (6260 bytes)
- `src/pages/learner/LearnerAssignmentsPage.tsx` (8878 bytes)
- `src/pages/learner/LearnerCourseLearnPage.tsx` (18561 bytes)
- `src/pages/learner/LearnerCoursesPage.tsx` (4465 bytes)
- `src/pages/learner/LearnerDashboardPage.tsx` (24214 bytes)
- `src/pages/learner/LearnerProfilePage.tsx` (5304 bytes)
- `src/pages/learner/LearnerProgressPage.tsx` (5029 bytes)
- `src/pages/learner/LearnerSavedInternshipsPage.tsx` (4731 bytes)
- `src/pages/mentor/MentorAssignmentsPage.tsx` (7846 bytes)
- `src/pages/mentor/MentorCourseEditorPage.tsx` (8292 bytes)
- `src/pages/mentor/MentorCoursesPage.tsx` (3596 bytes)
- `src/pages/mentor/MentorDashboardPage.tsx` (8359 bytes)
- `src/pages/mentor/MentorMaterialsPage.tsx` (7679 bytes)
- `src/pages/mentor/MentorStudentsPage.tsx` (25813 bytes)
- `src/pages/mentor/MentorSubmissionsPage.tsx` (7844 bytes)
- `src/pages/public/AboutPage.tsx` (4881 bytes)
- `src/pages/public/AccessDeniedPage.tsx` (2162 bytes)
- `src/pages/public/ContactPage.tsx` (5903 bytes)
- `src/pages/public/CoordinatorPendingPage.tsx` (4506 bytes)
- `src/pages/public/CourseDetailPage.tsx` (10470 bytes)
- `src/pages/public/CoursesPage.tsx` (7177 bytes)
- `src/pages/public/HomePage.tsx` (18389 bytes)
- `src/pages/public/InternshipDetailPage.tsx` (14274 bytes)
- `src/pages/public/InternshipsPage.tsx` (8078 bytes)
- `src/pages/public/NotFoundPage.tsx` (1447 bytes)
- `src/pages/public/ServicesPage.tsx` (12607 bytes)
- `src/pages/super-admin/AdminAuditLogsPage.tsx` (2733 bytes)
- `src/pages/super-admin/AdminCoordinatorApprovalsPage.tsx` (5899 bytes)
- `src/pages/super-admin/AdminCoursesPage.tsx` (3671 bytes)
- `src/pages/super-admin/AdminDashboardPage.tsx` (7998 bytes)
- `src/pages/super-admin/AdminModerationPage.tsx` (4133 bytes)
- `src/pages/super-admin/AdminOrganizationsPage.tsx` (6923 bytes)
- `src/pages/super-admin/AdminReportsPage.tsx` (3781 bytes)
- `src/pages/super-admin/AdminSettingsPage.tsx` (5395 bytes)
- `src/pages/super-admin/AdminUsersPage.tsx` (8366 bytes)
- `src/routes/index.tsx` (12068 bytes)
- `src/routes/RouteGuards.tsx` (2318 bytes)
- `src/schemas/index.ts` (6870 bytes)
- `src/services/api.ts` (1042 bytes)
- `src/services/applications.service.ts` (2000 bytes)
- `src/services/assignments.service.ts` (2313 bytes)
- `src/services/auth.service.ts` (4634 bytes)
- `src/services/coordinators.service.ts` (1424 bytes)
- `src/services/courses.service.ts` (3039 bytes)
- `src/services/enrollments.service.ts` (3356 bytes)
- `src/services/internships.service.ts` (2670 bytes)
- `src/services/mockData.ts` (32846 bytes)
- `src/services/mockStorage.ts` (20186 bytes)
- `src/services/notifications.service.ts` (1070 bytes)
- `src/services/organizations.service.ts` (1757 bytes)
- `src/services/reports.service.ts` (1698 bytes)
- `src/services/uploads.service.ts` (1187 bytes)
- `src/services/users.service.ts` (2841 bytes)
- `src/test/AuthValidation.test.ts` (1501 bytes)
- `src/test/CourseEnrollmentRestrictions.test.tsx` (3825 bytes)
- `src/test/EmptyState.test.tsx` (699 bytes)
- `src/test/MentorStudents.test.tsx` (2992 bytes)
- `src/test/ProfilePhotoValidation.test.tsx` (2606 bytes)
- `src/test/PublicNavigation.test.tsx` (1682 bytes)
- `src/test/RoleGuards.test.tsx` (4624 bytes)
- `src/test/setup.ts` (43 bytes)
- `src/test/StatusBadge.test.tsx` (942 bytes)
- `src/types/index.ts` (6043 bytes)
- `src/utils/index.ts` (1283 bytes)
- `src/vite-env.d.ts` (252 bytes)
- `tailwind.config.js` (1068 bytes)
- `tsc_out.txt` (14018 bytes)
- `tsc_out2.txt` (5 bytes)
- `tsconfig.app.json` (641 bytes)
- `tsconfig.app.tsbuildinfo` (4585 bytes)
- `tsconfig.json` (119 bytes)
- `tsconfig.node.json` (558 bytes)
- `vite.config.ts` (449 bytes)

---
<!-- FILE: .gitignore -->
## .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```
<!-- END_FILE -->

---
<!-- FILE: .oxlintrc.json -->
## .oxlintrc.json

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```
<!-- END_FILE -->

---
<!-- FILE: index.html -->
## index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="AddisBuilder's — University Learning & Internship Platform bridging students, mentors, coordinators, organizations, and administrators." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <title>AddisBuilder’s — University Learning & Internship Platform</title>
  </head>
  <body class="bg-neutral-50 text-neutral-900 antialiased selection:bg-brand-100 selection:text-brand-900">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```
<!-- END_FILE -->

---
<!-- FILE: package.json -->
## package.json

```json
{
  "name": "adis",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "test": "vitest run",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.9.2",
    "axios": "^1.20.0",
    "clsx": "^2.1.1",
    "lucide-react": "^1.59.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-hook-form": "^7.90.0",
    "react-router-dom": "^7.18.4",
    "recharts": "^3.10.1",
    "sonner": "^2.0.8",
    "tailwind-merge": "^3.7.0",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@types/node": "^24.19.2",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "autoprefixer": "^10.6.1",
    "jsdom": "^29.1.1",
    "oxlint": "^1.81.0",
    "postcss": "^8.5.31",
    "tailwindcss": "^3.4.1",
    "typescript": "~6.0.2",
    "vite": "^8.3.0",
    "vitest": "^5.0.5"
  }
}

```
<!-- END_FILE -->

---
<!-- FILE: postcss.config.js -->
## postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```
<!-- END_FILE -->

---
<!-- FILE: README.md -->
## README.md

```md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

```
<!-- END_FILE -->

---
<!-- FILE: src/App.css -->
## src/App.css

```css
/* Custom application component styles if needed */

```
<!-- END_FILE -->

---
<!-- FILE: src/App.tsx -->
## src/App.tsx

```tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import { Toaster } from 'sonner';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" richColors closeButton expand={false} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

```
<!-- END_FILE -->

---
<!-- FILE: src/components/common/PageHeader.tsx -->
## src/components/common/PageHeader.tsx

```tsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  badge,
}) => {
  return (
    <div className="mb-6 sm:mb-8 pb-5 border-b border-neutral-200/80">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-1.5 text-xs text-neutral-500 mb-2">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />}
                {item.href && !isLast ? (
                  <Link to={item.href} className="hover:text-brand-800 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'font-medium text-neutral-800' : ''}>
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="text-sm text-neutral-500 mt-1.5 max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/feedback/EmptyState.tsx -->
## src/components/feedback/EmptyState.tsx

```tsx
import React from 'react';
import { FolderOpen } from 'lucide-react';
import { cn } from '../../utils';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center p-8 sm:p-12', className)}>
      <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4 shadow-inner">
        {icon || <FolderOpen className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mt-1.5 leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/feedback/ErrorState.tsx -->
## src/components/feedback/ErrorState.tsx

```tsx
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load content',
  message = 'An unexpected error occurred while communicating with the server. Please verify your connection or try again.',
  onRetry,
}) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50/60 p-8 text-center flex flex-col items-center max-w-lg mx-auto my-8">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-600 mt-1.5 max-w-md">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="mt-4 bg-white"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/forms/FormField.tsx -->
## src/components/forms/FormField.tsx

```tsx
import React from 'react';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  htmlFor,
  children,
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-neutral-800">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/layout/AuthLayout.tsx -->
## src/components/layout/AuthLayout.tsx

```tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100/70 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="w-11 h-11 rounded-xl bg-brand-900 flex items-center justify-center p-2 text-white shadow-sm transition-transform group-hover:scale-105">
            <img src="/logo.svg" alt="AddisBuilder's Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-neutral-900">
            AddisBuilder<span className="text-brand-600">’s</span>
          </span>
        </Link>
        <p className="text-sm text-neutral-600">
          University Learning & Internship Platform
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-neutral-200/90 rounded-2xl">
          <Outlet />
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-medium text-neutral-500 hover:text-brand-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to AddisBuilder’s home
          </Link>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/layout/DashboardLayout.tsx -->
## src/components/layout/DashboardLayout.tsx

```tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopbar } from './DashboardTopbar';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-neutral-100/60 text-neutral-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40">
        <DashboardSidebar />
      </div>

      {/* Mobile Slide-over Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-50">
            <DashboardSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <DashboardTopbar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/layout/DashboardSidebar.tsx -->
## src/components/layout/DashboardSidebar.tsx

```tsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  BookmarkCheck,
  FileText,
  TrendingUp,
  UserCheck,
  Building2,
  Users,
  ShieldCheck,
  FolderKanban,
  GraduationCap,
  Bell,
  Settings,
  ClipboardList,
  Layers,
  FileCheck,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react';
import { USER_ROLES } from '../../constants';
import { getInitials } from '../../utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export interface DashboardSidebarProps {
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onCloseMobile }) => {
  const { user, role, logout } = useAuth();

  const getRoleNavItems = (): NavItem[] => {
    switch (role) {
      case 'LEARNER':
        return [
          { label: 'Overview', href: '/learner/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'My Courses', href: '/learner/courses', icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Assignments', href: '/learner/assignments', icon: <ClipboardList className="w-4 h-4" /> },
          { label: 'Find Internships', href: '/learner/internships', icon: <Briefcase className="w-4 h-4" /> },
          { label: 'Saved Internships', href: '/learner/saved-internships', icon: <BookmarkCheck className="w-4 h-4" /> },
          { label: 'Applications', href: '/learner/applications', icon: <FileText className="w-4 h-4" /> },
          { label: 'Learning Progress', href: '/learner/progress', icon: <TrendingUp className="w-4 h-4" /> },
          { label: 'Profile', href: '/learner/profile', icon: <UserCheck className="w-4 h-4" /> },
          { label: 'Notifications', href: '/learner/notifications', icon: <Bell className="w-4 h-4" /> },
        ];

      case 'MENTOR':
        return [
          { label: 'Overview', href: '/mentor/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'My Courses', href: '/mentor/courses', icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Students', href: '/mentor/students', icon: <Users className="w-4 h-4" /> },
          { label: 'Course Materials', href: '/mentor/materials', icon: <Layers className="w-4 h-4" /> },
          { label: 'Assignments', href: '/mentor/assignments', icon: <ClipboardList className="w-4 h-4" /> },
          { label: 'Submissions', href: '/mentor/submissions', icon: <FileCheck className="w-4 h-4" /> },
          { label: 'Learner Progress', href: '/mentor/progress', icon: <TrendingUp className="w-4 h-4" /> },
          { label: 'Profile', href: '/mentor/profile', icon: <UserCheck className="w-4 h-4" /> },
          { label: 'Notifications', href: '/mentor/notifications', icon: <Bell className="w-4 h-4" /> },
        ];

      case 'INTERNSHIP_COORDINATOR':
        return [
          { label: 'Overview', href: '/internship-manager/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Internships', href: '/internship-manager/internships', icon: <Briefcase className="w-4 h-4" /> },
          { label: 'Applications', href: '/internship-manager/applications', icon: <FileText className="w-4 h-4" /> },
          { label: 'Profile', href: '/internship-manager/profile', icon: <UserCheck className="w-4 h-4" /> },
          { label: 'Notifications', href: '/internship-manager/notifications', icon: <Bell className="w-4 h-4" /> },
        ];

      case 'EMPLOYER':
        return [
          { label: 'Overview', href: '/employer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Organization Profile', href: '/employer/organization', icon: <Building2 className="w-4 h-4" /> },
          { label: 'Verification', href: '/employer/verification', icon: <ShieldCheck className="w-4 h-4" /> },
          { label: 'My Internships', href: '/employer/internships', icon: <Briefcase className="w-4 h-4" /> },
          { label: 'Applicants', href: '/employer/applicants', icon: <FileText className="w-4 h-4" /> },
          { label: 'Recruitment Analytics', href: '/employer/analytics', icon: <TrendingUp className="w-4 h-4" /> },
          { label: 'Notifications', href: '/employer/notifications', icon: <Bell className="w-4 h-4" /> },
        ];

      case 'SUPER_ADMIN':
        return [
          { label: 'Overview', href: '/super-admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Users', href: '/super-admin/users', icon: <Users className="w-4 h-4" /> },
          { label: 'Coordinator Approvals', href: '/super-admin/coordinator-approvals', icon: <GraduationCap className="w-4 h-4" /> },
          { label: 'Organizations', href: '/super-admin/organizations', icon: <Building2 className="w-4 h-4" /> },
          { label: 'Internship Moderation', href: '/super-admin/moderation', icon: <Briefcase className="w-4 h-4" /> },
          { label: 'Course Management', href: '/super-admin/courses', icon: <FolderKanban className="w-4 h-4" /> },
          { label: 'Reports & Analytics', href: '/super-admin/reports', icon: <TrendingUp className="w-4 h-4" /> },
          { label: 'Audit Logs', href: '/super-admin/audit-logs', icon: <FileCheck className="w-4 h-4" /> },
          { label: 'Settings', href: '/super-admin/settings', icon: <Settings className="w-4 h-4" /> },
        ];

      default:
        return [];
    }
  };

  const navItems = getRoleNavItems();
  const roleConfig = role ? USER_ROLES[role] : null;

  return (
    <aside className="w-64 h-full bg-white border-r border-neutral-200 flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-200">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-900 flex items-center justify-center p-1.5 text-white">
              <img src="/logo.svg" alt="AddisBuilder's" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 tracking-tight text-base">AddisBuilder’s</span>
              <span className="block text-[10px] text-brand-800 font-semibold tracking-wider uppercase">Portal</span>
            </div>
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Role Badge Indicator */}
        {roleConfig && (
          <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50/70">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
              Active Workspace
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-neutral-800">{roleConfig.label}</span>
            </div>
          </div>
        )}

        {/* Navigation items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]" aria-label="Dashboard sidebar">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-900 font-semibold shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-neutral-500 group-hover:text-brand-800">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 font-semibold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Profile / Logout */}
      <div className="p-3 border-t border-neutral-200 bg-neutral-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200">
          <div className="flex items-center gap-2.5 min-w-0">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover border border-neutral-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {getInitials(user?.fullName)}
              </div>
            )}
            <div className="min-w-0 text-left">
              <p className="text-xs font-semibold text-neutral-900 truncate">{user?.fullName}</p>
              <p className="text-[11px] text-neutral-500 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/layout/DashboardTopbar.tsx -->
## src/components/layout/DashboardTopbar.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { notificationsService } from '../../services/notifications.service';
import { Notification, UserRole } from '../../types';
import {
  Menu,
  Bell,
  Search,
  ExternalLink,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getInitials } from '../../utils';
import { USER_ROLES } from '../../constants';

export interface DashboardTopbarProps {
  onOpenMobileSidebar: () => void;
}

export const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ onOpenMobileSidebar }) => {
  const { user, role, logout, switchDemoRole } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    notificationsService.getNotifications().then((list) => {
      if (isMounted) setNotifications(list);
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = async () => {
    await notificationsService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleRoleChange = async (targetRole: UserRole) => {
    setRoleSwitcherOpen(false);
    await switchDemoRole(targetRole);
    const dest = USER_ROLES[targetRole]?.defaultPath || '/learner/dashboard';
    navigate(dest);
  };

  return (
    <header className="h-16 bg-white border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left section: mobile hamburger & breadcrumb or title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
          <span>AddisBuilder’s</span>
          <span>/</span>
          <span className="font-semibold text-neutral-800">
            {role ? USER_ROLES[role]?.label : 'Portal'}
          </span>
        </div>
      </div>

      {/* Right section: demo role quick-switcher, public site link, notifications & profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher (Awesome for examiners/reviewers!) */}
        <div className="relative">
          <button
            onClick={() => {
              setRoleSwitcherOpen(!roleSwitcherOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-50 border border-brand-200 text-brand-900 hover:bg-brand-100 transition-colors shadow-xs"
            title="Switch demo persona to test any role dashboard"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span className="hidden md:inline">Switch Role:</span>
            <span>{role ? USER_ROLES[role]?.label.split('/')[0].trim() : 'Select'}</span>
            <ChevronDown className="w-3 h-3 text-brand-700" />
          </button>

          {roleSwitcherOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-neutral-200 shadow-lg py-2 z-50 text-left">
              <div className="px-3 py-1.5 border-b border-neutral-100">
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Test Any Dashboard
                </p>
              </div>
              {(Object.keys(USER_ROLES) as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                    role === r ? 'font-semibold text-brand-800 bg-brand-50/70' : 'text-neutral-700'
                  }`}
                >
                  <span>{USER_ROLES[r].label}</span>
                  {role === r && <CheckCircle2 className="w-3.5 h-3.5 text-brand-700" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Public Platform */}
        <Link
          to="/"
          className="hidden lg:flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-brand-800 px-2 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          title="Go to Public Website"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Public Portal</span>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setRoleSwitcherOpen(false);
            }}
            className="relative p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white border border-neutral-200 shadow-xl py-2 z-50 text-left">
              <div className="px-4 py-2 border-b border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
                  Notifications ({notifications.length})
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-brand-800 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100">
                {notifications.length === 0 ? (
                  <p className="p-4 text-xs text-neutral-500 text-center">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs hover:bg-neutral-50 transition-colors ${
                        !n.isRead ? 'bg-brand-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {n.type === 'SUCCESS' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : n.type === 'WARNING' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900">{n.title}</p>
                          <p className="text-neutral-600 mt-0.5 leading-relaxed">{n.message}</p>
                          {n.link && (
                            <Link
                              to={n.link}
                              onClick={() => setNotifOpen(false)}
                              className="text-brand-800 font-semibold hover:underline mt-1 inline-block"
                            >
                              View details →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-8 h-8 rounded-full object-cover border border-neutral-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center text-xs font-bold">
              {getInitials(user?.fullName)}
            </div>
          )}
          <span className="hidden md:block text-xs font-medium text-neutral-800 truncate max-w-[120px]">
            {user?.fullName}
          </span>
        </div>
      </div>
    </header>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/layout/Footer.tsx -->
## src/components/layout/Footer.tsx

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center p-2 text-white">
                <img src="/logo.svg" alt="AddisBuilder's" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">AddisBuilder’s</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Empowering Ethiopian university talent with modern, industry-aligned learning, mentorship, and verified internship opportunities.
            </p>
            <div className="pt-2 text-xs text-brand-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Brolf Tech Remote Internship Challenge 2026
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="/internships" className="hover:text-white transition-colors">
                  Browse Internships
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About AddisBuilder’s
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* User Roles */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              For Participants
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Students & Learners
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Mentors & Faculty
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Internship Coordinators
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Employers & Organizations
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Partners */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              University Linkage
            </h4>
            <p className="text-sm text-neutral-400 mb-3 leading-relaxed">
              Partnering with higher education institutions and leading tech employers across Ethiopia.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-medium text-brand-300 border border-neutral-700">
              <GraduationCap className="w-4 h-4" />
              Accredited Linkage Program
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} AddisBuilder’s. Developed for Brolf Tech Challenge 2026. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Team AddisBuilder’s
          </p>
        </div>
      </div>
    </footer>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/layout/Navbar.tsx -->
## src/components/layout/Navbar.tsx

```tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Menu, X, Home, Info, Briefcase, Mail, LogIn, LayoutDashboard } from 'lucide-react';
import { USER_ROLES } from '../../constants';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { label: 'HOME', href: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'ABOUT', href: '/about', icon: <Info className="w-4 h-4" /> },
    { label: 'SERVICES', href: '/services', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'CONTACT', href: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    return USER_ROLES[user.role]?.defaultPath || '/learner/dashboard';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center p-2 text-white shadow-sm transition-transform group-hover:scale-105">
              <img src="/logo.svg" alt="AddisBuilder's Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-brand-800 transition-colors">
                AddisBuilder<span className="text-brand-600">’s</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-neutral-500">
                Learning & Internships
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-800 bg-brand-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link to={getDashboardPath()}>
                  <Button variant="primary" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-neutral-700 hover:bg-neutral-100"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <Link to={getDashboardPath()} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Register Now
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/layout/PublicLayout.tsx -->
## src/components/layout/PublicLayout.tsx

```tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Badge.tsx -->
## src/components/ui/Badge.tsx

```tsx
import React from 'react';
import { cn } from '../../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    brand: 'bg-brand-50 text-brand-900 border-brand-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border tracking-wide whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Button.tsx -->
## src/components/ui/Button.tsx

```tsx
import React from 'react';
import { cn } from '../../utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.99]';

    const variants = {
      primary:
        'bg-brand-800 text-white hover:bg-brand-900 focus:ring-brand-700 shadow-sm',
      secondary:
        'bg-brand-50 text-brand-900 hover:bg-brand-100 focus:ring-brand-600 border border-brand-200',
      outline:
        'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 focus:ring-brand-700 shadow-sm',
      ghost:
        'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-400',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-2.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Card.tsx -->
## src/components/ui/Card.tsx

```tsx
import React from 'react';
import { cn } from '../../utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, hoverEffect = false, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-neutral-200/80 shadow-sm overflow-hidden transition-all duration-200',
        hoverEffect && 'hover:shadow-md hover:border-brand-200 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn('p-5 sm:p-6 pb-3 sm:pb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h3 className={cn('text-lg font-semibold text-neutral-900 tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={cn('text-sm text-neutral-500 mt-1', className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn('p-5 sm:p-6 pt-0', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn('p-5 sm:p-6 pt-0 border-t border-neutral-100 flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/ConfirmDialog.tsx -->
## src/components/ui/ConfirmDialog.tsx

```tsx
import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, Info } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            variant === 'danger'
              ? 'bg-red-100 text-red-600'
              : variant === 'warning'
              ? 'bg-amber-100 text-amber-600'
              : 'bg-brand-100 text-brand-800'
          }`}
        >
          {variant === 'danger' || variant === 'warning' ? (
            <AlertTriangle className="w-6 h-6" />
          ) : (
            <Info className="w-6 h-6" />
          )}
        </div>
        <h4 className="text-lg font-semibold text-neutral-900">{title}</h4>
        <p className="text-sm text-neutral-600 mt-2">{message}</p>

        <div className="flex gap-3 w-full mt-6">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant === 'danger' ? 'danger' : 'primary'}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/DataTable.tsx -->
## src/components/ui/DataTable.tsx

```tsx
import React from 'react';
import { Skeleton } from './Skeleton';
import { EmptyState } from '../feedback/EmptyState';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  rowKey: (item: T) => string;
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items to display at this time.',
  emptyAction,
  rowKey,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl border border-neutral-200 overflow-hidden p-4 space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-neutral-200/90 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="bg-neutral-50/80 border-b border-neutral-200 text-xs uppercase font-semibold text-neutral-500 tracking-wider">
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col" className={`py-3.5 px-4 sm:px-6 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200/70">
            {data.map((item) => (
              <tr key={rowKey(item)} className="hover:bg-neutral-50/60 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`py-4 px-4 sm:px-6 ${col.className || ''}`}>
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/FileUpload.tsx -->
## src/components/ui/FileUpload.tsx

```tsx
import React, { useState, useRef } from 'react';
import { UploadCloud, File, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Button } from './Button';
import { uploadsService } from '../../services/uploads.service';
import { cn } from '../../utils';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeBytes?: number; // e.g., 5 * 1024 * 1024 (5MB)
  purpose: 'CV' | 'VERIFICATION_DOC' | 'COURSE_MATERIAL' | 'AVATAR';
  onUploadSuccess: (result: { url: string; filename: string }) => void;
  error?: string;
  currentFileUrl?: string;
  currentFileName?: string;
  helperText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Upload Document',
  accept = '.pdf,.doc,.docx',
  maxSizeBytes = 10 * 1024 * 1024, // 10MB default
  purpose,
  onUploadSuccess,
  error,
  currentFileUrl,
  currentFileName,
  helperText,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeBytes) {
      setUploadError(`File is too large. Maximum allowed size is ${maxMb}MB.`);
      setSelectedFile(null);
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
    setUploading(true);

    try {
      const res = await uploadsService.uploadFile(file, purpose);
      setUploadSuccess(true);
      onUploadSuccess({ url: res.url, filename: res.filename });
    } catch (err: any) {
      setUploadError(err.message || 'File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-sm font-medium text-neutral-800">{label}</label>}

      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-5 text-center transition-colors',
          uploadError || error
            ? 'border-red-300 bg-red-50/50'
            : uploadSuccess
            ? 'border-emerald-300 bg-emerald-50/40'
            : 'border-neutral-300 hover:border-brand-600 bg-neutral-50/50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={`upload-${purpose}`}
        />

        {uploading ? (
          <div className="py-2 flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-brand-800 border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm font-medium text-neutral-700">Uploading {selectedFile?.name}...</p>
            <p className="text-xs text-neutral-400 mt-1">Please wait while the file is processed.</p>
          </div>
        ) : uploadSuccess && selectedFile ? (
          <div className="flex items-center justify-between bg-white border border-emerald-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-neutral-800 truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-xs text-emerald-700">Uploaded successfully ({(selectedFile.size / 1024).toFixed(0)} KB)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearSelection}
              className="text-neutral-400 hover:text-neutral-600 p-1"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : currentFileName ? (
          <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-left">
              <File className="w-5 h-5 text-brand-700 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-neutral-800">{currentFileName}</p>
                <p className="text-xs text-neutral-500">Currently attached file</p>
              </div>
            </div>
            <label
              htmlFor={`upload-${purpose}`}
              className="text-xs text-brand-800 font-medium hover:underline cursor-pointer"
            >
              Replace
            </label>
          </div>
        ) : (
          <div className="flex flex-col items-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="w-9 h-9 text-neutral-400 mb-2" />
            <p className="text-sm font-medium text-neutral-700">
              <span className="text-brand-800 underline font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Accepted: {accept.replace(/\./g, ' ').toUpperCase()} (Max {maxMb}MB)
            </p>
          </div>
        )}
      </div>

      {(uploadError || error) && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError || error}</span>
        </div>
      )}

      {helperText && !uploadError && !error && (
        <p className="text-xs text-neutral-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Input.tsx -->
## src/components/ui/Input.tsx

```tsx
import React from 'react';
import { cn } from '../../utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-800">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'block w-full rounded-lg border border-neutral-300 bg-white py-2 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-colors',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              props.disabled && 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-red-600 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-neutral-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/LoadingSpinner.tsx -->
## src/components/ui/LoadingSpinner.tsx

```tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label = 'Loading...',
  className,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 gap-3', className)} role="status">
      <Loader2 className={cn('animate-spin text-brand-800', sizes[size])} />
      {label && <p className="text-sm font-medium text-neutral-500 animate-pulse">{label}</p>}
      <span className="sr-only">{label}</span>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Modal.tsx -->
## src/components/ui/Modal.tsx

```tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth,
  size,
}) => {
  const effectiveSize = size || maxWidth || 'md';
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />

        <div
          className={cn(
            'relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 w-full p-6 border border-neutral-200',
            maxWidths[effectiveSize]
          )}
        >
          <div className="flex items-start justify-between pb-3">
            <div>
              {title && <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>}
              {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-700"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Pagination.tsx -->
## src/components/ui/Pagination.tsx

```tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems || currentPage * pageSize);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2 border-t border-neutral-200">
      <div className="text-sm text-neutral-500">
        {totalItems ? (
          <span>
            Showing <span className="font-medium text-neutral-800">{startItem}</span> to{' '}
            <span className="font-medium text-neutral-800">{endItem}</span> of{' '}
            <span className="font-medium text-neutral-800">{totalItems}</span> results
          </span>
        ) : (
          <span>
            Page <span className="font-medium text-neutral-800">{currentPage}</span> of{' '}
            <span className="font-medium text-neutral-800">{totalPages}</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous
        </Button>
        <span className="text-sm font-medium text-neutral-700 px-2">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/ProfilePhotoUploader.tsx -->
## src/components/ui/ProfilePhotoUploader.tsx

```tsx
import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { Camera, Trash2, UploadCloud, Check, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { usersService } from '../../services/users.service';
import { useAuth } from '../../contexts/AuthContext';
import { getInitials } from '../../utils';

export interface ProfilePhotoUploaderProps {
  currentAvatarUrl?: string;
  userName?: string;
  onAvatarUpdated?: (newAvatarUrl?: string) => void;
  maxSizeBytes?: number; // default 5MB
  allowedFormats?: string[]; // default ['image/jpeg', 'image/png', 'image/webp']
}

export const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  currentAvatarUrl,
  userName = 'User',
  onAvatarUpdated,
  maxSizeBytes = 5 * 1024 * 1024, // 5 MB
  allowedFormats = ['image/jpeg', 'image/png', 'image/webp'],
}) => {
  const { updateCurrentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // File type validation
    if (!allowedFormats.includes(file.type)) {
      const errorMsg = 'Invalid file format. Please upload a JPG, PNG, or WebP image.';
      setValidationError(errorMsg);
      toast.error(errorMsg);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // File size validation
    if (file.size > maxSizeBytes) {
      const errorMsg = `Image file exceeds maximum allowed limit of ${(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB.`;
      setValidationError(errorMsg);
      toast.error(errorMsg);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Set preview
    const preview = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(preview);
  };

  const handleCancelPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setValidationError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setValidationError(null);

    try {
      const updatedUser = await usersService.uploadProfilePhoto(selectedFile);
      updateCurrentUser(updatedUser);
      onAvatarUpdated?.(updatedUser.avatarUrl);
      toast.success('Profile photo updated successfully!');
      handleCancelPreview();
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to upload photo. Please try again.';
      setValidationError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm('Are you sure you want to remove your profile photo?')) return;

    setIsRemoving(true);
    try {
      const updatedUser = await usersService.removeProfilePhoto();
      updateCurrentUser(updatedUser);
      onAvatarUpdated?.(undefined);
      toast.success('Profile photo removed.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove photo.');
    } finally {
      setIsRemoving(false);
    }
  };

  const displayAvatar = previewUrl || currentAvatarUrl;

  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar Display */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-200 shadow-inner bg-neutral-100 flex items-center justify-center">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={`${userName}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-brand-800 text-white flex items-center justify-center text-2xl font-bold tracking-tight">
                {getInitials(userName)}
              </div>
            )}
          </div>

          {/* Quick trigger overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 text-white rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
            aria-label="Change profile picture"
          >
            <Camera className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold">Change</span>
          </button>
        </div>

        {/* Action Controls & Instructions */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Profile Photo</h3>
            <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
              Upload a clear professional headshot. Accepted formats: JPG, PNG, or WebP (max 5MB).
            </p>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleFileSelect}
            aria-label="Select profile picture file"
          />

          {/* Validation Error Alert */}
          {validationError && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Button Actions */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
            {previewUrl ? (
              <>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleConfirmUpload}
                  isLoading={isUploading}
                  leftIcon={<Check className="w-4 h-4" />}
                >
                  Save Photo
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelPreview}
                  disabled={isUploading}
                  leftIcon={<X className="w-4 h-4" />}
                >
                  Cancel
                </Button>
                <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  Preview mode (click Save to confirm)
                </span>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<UploadCloud className="w-4 h-4" />}
                >
                  {currentAvatarUrl ? 'Replace Photo' : 'Upload Photo'}
                </Button>

                {currentAvatarUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleRemovePhoto}
                    isLoading={isRemoving}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Remove
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/SearchInput.tsx -->
## src/components/ui/SearchInput.tsx

```tsx
import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className,
  ...props
}) => {
  return (
    <div className={cn('relative w-full max-w-md', className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-9 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-colors shadow-sm"
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Select.tsx -->
## src/components/ui/Select.tsx

```tsx
import React from 'react';
import { cn } from '../../utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-neutral-800">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'block w-full rounded-lg border border-neutral-300 bg-white py-2 px-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-colors shadow-sm',
            error && 'border-red-500 focus:ring-red-500',
            props.disabled && 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-neutral-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Skeleton.tsx -->
## src/components/ui/Skeleton.tsx

```tsx
import React from 'react';
import { cn } from '../../utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-neutral-200',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'h-4 rounded',
        variant === 'rectangular' && 'rounded-lg',
        className
      )}
      {...props}
    />
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/StatusBadge.tsx -->
## src/components/ui/StatusBadge.tsx

```tsx
import React from 'react';
import { Badge } from './Badge';
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  FileCheck,
  Building2,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { ApprovalStatus, ApplicationStatus, VerificationStatus } from '../../types';

export interface StatusBadgeProps {
  status:
    | ApprovalStatus
    | ApplicationStatus
    | VerificationStatus
    | 'DRAFT'
    | 'PUBLISHED'
    | 'CLOSED'
    | 'ARCHIVED'
    | 'SUBMITTED'
    | 'GRADED'
    | 'LATE'
    | 'ACTIVE'
    | 'INACTIVE'
    | 'PENDING_APPROVAL';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  switch (status) {
    case 'APPROVED':
    case 'VERIFIED':
    case 'ACCEPTED':
    case 'PUBLISHED':
    case 'ACTIVE':
    case 'GRADED':
      return (
        <Badge variant="success" className={className}>
          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
          {status === 'PUBLISHED'
            ? 'Published'
            : status === 'VERIFIED'
            ? 'Verified'
            : status === 'APPROVED'
            ? 'Approved'
            : status === 'ACCEPTED'
            ? 'Accepted'
            : status === 'GRADED'
            ? 'Graded'
            : 'Active'}
        </Badge>
      );

    case 'PENDING':
    case 'SUBMITTED':
    case 'PENDING_APPROVAL':
      return (
        <Badge variant="warning" className={className}>
          <Clock className="w-3 h-3 mr-1 text-amber-600" />
          {status === 'SUBMITTED' ? 'Submitted' : status === 'PENDING_APPROVAL' ? 'Pending Approval' : 'Pending Review'}
        </Badge>
      );

    case 'REVIEWING':
    case 'SHORTLISTED':
    case 'INTERVIEW_SCHEDULED':
      return (
        <Badge variant="info" className={className}>
          <Send className="w-3 h-3 mr-1 text-blue-600" />
          {status === 'REVIEWING'
            ? 'Under Review'
            : status === 'SHORTLISTED'
            ? 'Shortlisted'
            : 'Interview Scheduled'}
        </Badge>
      );

    case 'UNVERIFIED':
      return (
        <Badge variant="neutral" className={className}>
          <Building2 className="w-3 h-3 mr-1 text-slate-500" />
          Unverified
        </Badge>
      );

    case 'DRAFT':
      return (
        <Badge variant="neutral" className={className}>
          <FileCheck className="w-3 h-3 mr-1 text-slate-500" />
          Draft
        </Badge>
      );

    case 'REJECTED':
      return (
        <Badge variant="danger" className={className}>
          <XCircle className="w-3 h-3 mr-1 text-red-600" />
          Rejected
        </Badge>
      );

    case 'SUSPENDED':
    case 'CLOSED':
    case 'ARCHIVED':
    case 'INACTIVE':
    case 'LATE':
      return (
        <Badge variant="danger" className={className}>
          <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" />
          {status === 'SUSPENDED'
            ? 'Suspended'
            : status === 'CLOSED'
            ? 'Closed'
            : status === 'ARCHIVED'
            ? 'Archived'
            : status === 'LATE'
            ? 'Late'
            : 'Inactive'}
        </Badge>
      );

    default:
      return <Badge className={className}>{status}</Badge>;
  }
};

```
<!-- END_FILE -->

---
<!-- FILE: src/components/ui/Textarea.tsx -->
## src/components/ui/Textarea.tsx

```tsx
import React from 'react';
import { cn } from '../../utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-neutral-800">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'block w-full rounded-lg border border-neutral-300 bg-white py-2 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-colors shadow-sm',
            error && 'border-red-500 focus:ring-red-500',
            props.disabled && 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-neutral-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

```
<!-- END_FILE -->

---
<!-- FILE: src/constants/index.ts -->
## src/constants/index.ts

```ts
import { UserRole } from '../types';

export const APP_NAME = "AddisBuilder's";
export const APP_TAGLINE = 'University Learning & Internship Platform';

export const USER_ROLES: Record<UserRole, { label: string; badgeColor: string; defaultPath: string }> = {
  LEARNER: {
    label: 'Student / Learner',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    defaultPath: '/learner/dashboard',
  },
  MENTOR: {
    label: 'Mentor / Instructor',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    defaultPath: '/mentor/dashboard',
  },
  INTERNSHIP_COORDINATOR: {
    label: 'Internship Coordinator',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    defaultPath: '/internship-manager/dashboard',
  },
  EMPLOYER: {
    label: 'Organization / Employer',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    defaultPath: '/employer/dashboard',
  },
  SUPER_ADMIN: {
    label: 'Super Admin',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    defaultPath: '/super-admin/dashboard',
  },
};

export const COURSE_CATEGORIES = [
  'Computer Science',
  'Software Engineering',
  'Data Science & AI',
  'Cybersecurity',
  'Electrical Engineering',
  'Business & Entrepreneurship',
  'UI/UX Design',
  'Cloud & DevOps',
];

export const INTERNSHIP_CATEGORIES = [
  'Software Development',
  'Frontend Engineering',
  'Backend Engineering',
  'Mobile App Development',
  'Data Analysis',
  'Network Engineering',
  'UI/UX Design',
  'Project Management',
];

export const WORK_MODES = [
  { value: 'REMOTE', label: 'Remote' },
  { value: 'HYBRID', label: 'Hybrid' },
  { value: 'ONSITE', label: 'On-site' },
];

export const COURSE_LEVELS = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
];

```
<!-- END_FILE -->

---
<!-- FILE: src/contexts/AuthContext.tsx -->
## src/contexts/AuthContext.tsx

```tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, ApprovalStatus } from '../types';
import { authService } from '../services/auth.service';
import { LoginFormData, RegisterFormData } from '../schemas';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  coordinatorStatus?: ApprovalStatus;
  login: (credentials: LoginFormData) => Promise<User>;
  register: (data: RegisterFormData) => Promise<User>;
  logout: () => Promise<void>;
  updateCurrentUser: (updated: Partial<User>) => void;
  switchDemoRole: (role: UserRole) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from localStorage on initial load
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = authService.getCurrentUser();
        const token = authService.getToken();
        if (storedUser && token) {
          setUser(storedUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginFormData): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.user);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const updateCurrentUser = useCallback((updated: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updated };
      localStorage.setItem('addis_auth_user', JSON.stringify(next));
      return next;
    });
  }, []);

  // Helpful convenience method to test-drive any of the 5 roles instantly with preloaded demo data
  const switchDemoRole = async (targetRole: UserRole): Promise<void> => {
    const demoAccounts: Record<UserRole, { email: string; pass: string }> = {
      LEARNER: { email: 'learner@addisbuilder.edu', pass: 'password123' },
      MENTOR: { email: 'mentor@addisbuilder.edu', pass: 'password123' },
      INTERNSHIP_COORDINATOR: { email: 'coordinator@addisbuilder.edu', pass: 'password123' },
      EMPLOYER: { email: 'employer@addisbuilder.edu', pass: 'password123' },
      SUPER_ADMIN: { email: 'admin@addisbuilder.edu', pass: 'password123' },
    };

    const target = demoAccounts[targetRole];
    if (target) {
      await login({ email: target.email, password: target.pass });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        isLoading,
        coordinatorStatus: user?.coordinatorStatus,
        login,
        register,
        logout,
        updateCurrentUser,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

```
<!-- END_FILE -->

---
<!-- FILE: src/index.css -->
## src/index.css

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@layer base {
  :root {
    --primary: 20 83 45; /* #14532d brand-900 */
    --primary-foreground: 255 255 255;
    --secondary: 22 101 52;
    --background: 248 250 252; /* neutral-50 */
    --surface: 255 255 255;
    --border: 226 232 240; /* neutral-200 */
    --text-primary: 15 23 42; /* neutral-900 */
    --text-secondary: 71 85 105; /* neutral-600 */
  }

  body {
    @apply bg-neutral-50 text-neutral-900 font-sans antialiased min-h-screen selection:bg-brand-100 selection:text-brand-900;
  }
}

/* Custom modern scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

```
<!-- END_FILE -->

---
<!-- FILE: src/main.tsx -->
## src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/auth/ForgotPasswordPage.tsx -->
## src/pages/auth/ForgotPasswordPage.tsx

```tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../schemas';
import { authService } from '../../services/auth.service';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const ForgotPasswordPage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const res = await authService.forgotPassword(data.email);
      setSuccessMessage(res.message);
      toast.success('Password reset instructions dispatched.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to dispatch reset request');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Reset Password</h2>
        <p className="text-xs text-neutral-500 mt-1">
          Enter your registered email address to receive password recovery instructions.
        </p>
      </div>

      {successMessage ? (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <p className="text-xs text-emerald-900 leading-relaxed font-medium">{successMessage}</p>
          <div className="pt-2">
            <Link to="/login">
              <Button variant="primary" size="sm" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@university.edu"
            {...register('email')}
            error={errors.email?.message}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isSubmitting}
            leftIcon={<Mail className="w-4 h-4" />}
          >
            Send Reset Link
          </Button>
        </form>
      )}

      <div className="text-center pt-2">
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-semibold text-brand-800 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Return to Sign In
        </Link>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/auth/LoginPage.tsx -->
## src/pages/auth/LoginPage.tsx

```tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginSchema, LoginFormData } from '../../schemas';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import { USER_ROLES } from '../../constants';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || searchParams.get('returnUrl');
  const from = (location.state as any)?.from?.pathname || (location.state as any)?.from || redirectParam;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    try {
      const user = await login(data);
      toast.success(`Welcome back, ${user.fullName}!`);

      if (from) {
        navigate(from, { replace: true });
        return;
      }

      // Role-based redirect
      const defaultPath = USER_ROLES[user.role]?.defaultPath || '/learner/dashboard';
      navigate(defaultPath, { replace: true });
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleQuickDemoLogin = (email: string) => {
    setValue('email', email);
    setValue('password', 'password123');
    handleSubmit(onSubmit)();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Sign In to AddisBuilder’s</h2>
        <p className="text-xs text-neutral-500 mt-1">
          Access your courses, assignments, and verified internship portals.
        </p>
      </div>

      {from && (
        <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Authentication Required</p>
            <p className="text-[11px] text-brand-800 mt-0.5">
              Please sign in with your student account to complete enrollment or internship applications. You will be redirected back automatically upon signing in.
            </p>
          </div>
        </div>
      )}

      {authError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@university.edu"
          {...register('email')}
          error={errors.email?.message}
          required
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : '***REDACTED***'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <div className="flex justify-end pt-1">
            <Link
              to="/forgot-password"
              className="text-xs text-brand-800 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
          leftIcon={<LogIn className="w-4 h-4" />}
        >
          Sign In
        </Button>
      </form>

      {/* Demo Fast Login Box */}
      <div className="pt-4 border-t border-neutral-200 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-700" />
          <span>One-Click Demo Personas</span>
        </div>
        <p className="text-[11px] text-neutral-400">
          Click any role below to prefill and log in instantly:
        </p>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('learner@addisbuilder.edu')}
            className="text-left p-2 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 text-xs font-medium text-emerald-900 transition-colors"
          >
            🎓 Student Learner
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('mentor@addisbuilder.edu')}
            className="text-left p-2 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 text-xs font-medium text-blue-900 transition-colors"
          >
            👨‍🏫 Faculty Mentor
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('coordinator@addisbuilder.edu')}
            className="text-left p-2 rounded-lg border border-purple-200 bg-purple-50/50 hover:bg-purple-100/60 text-xs font-medium text-purple-900 transition-colors"
          >
            🏛️ Approved Coordinator
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('pending.coordinator@addisbuilder.edu')}
            className="text-left p-2 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 text-xs font-medium text-amber-900 transition-colors"
          >
            ⏳ Pending Coordinator
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('employer@addisbuilder.edu')}
            className="text-left p-2 rounded-lg border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/60 text-xs font-medium text-indigo-900 transition-colors"
          >
            🏢 Tech Employer
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('admin@addisbuilder.edu')}
            className="text-left p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 text-xs font-medium text-rose-900 transition-colors"
          >
            🛡️ Super Admin
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-neutral-500 pt-2">
        Don’t have an account?{' '}
        <Link to="/register" className="font-semibold text-brand-800 hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/auth/RegisterPage.tsx -->
## src/pages/auth/RegisterPage.tsx

```tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { registerSchema, RegisterFormData } from '../../schemas';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Eye, EyeOff, UserPlus, Info, ShieldCheck } from 'lucide-react';
import { USER_ROLES } from '../../constants';
import { toast } from 'sonner';

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || searchParams.get('returnUrl');
  const from = (location.state as any)?.from?.pathname || (location.state as any)?.from || redirectParam;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'LEARNER',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError(null);
    try {
      const user = await registerUser(data);
      toast.success(`Account registered successfully as ${USER_ROLES[user.role]?.label}!`);

      if (user.role === 'INTERNSHIP_COORDINATOR') {
        navigate('/coordinator-pending', { replace: true });
        return;
      }

      if (from && user.role === 'LEARNER') {
        navigate(from, { replace: true });
        return;
      }

      const defaultPath = USER_ROLES[user.role]?.defaultPath || '/learner/dashboard';
      navigate(defaultPath, { replace: true });
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed. Please verify your information.');
    }
  };

  const roleOptions = [
    { value: 'LEARNER', label: 'Student / Learner' },
    { value: 'MENTOR', label: 'Mentor / Faculty Instructor' },
    { value: 'INTERNSHIP_COORDINATOR', label: 'Internship Coordinator' },
    { value: 'EMPLOYER', label: 'Organization / Employer' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Create an Account</h2>
        <p className="text-xs text-neutral-500 mt-1">
          Join the AddisBuilder’s university learning and internship platform.
        </p>
      </div>

      {authError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Legal Name"
          placeholder="e.g. Abebe Kebede"
          {...register('fullName')}
          error={errors.fullName?.message}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@university.edu"
          {...register('email')}
          error={errors.email?.message}
          required
        />

        <Select
          label="I am joining as"
          options={roleOptions}
          {...register('role')}
          error={errors.role?.message}
          required
        />

        {/* Role-specific conditional guidance and fields */}
        {selectedRole === 'LEARNER' && (
          <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-200/80 space-y-3">
            <div className="flex items-start gap-2 text-xs text-brand-900">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-brand-700" />
              <span>Provide your university details to unlock enrolled coursework and internships.</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="University"
                placeholder="e.g. Addis Ababa University"
                {...register('university')}
              />
              <Input
                label="Department"
                placeholder="e.g. Computer Science"
                {...register('department')}
              />
            </div>
            <Input
              label="Student ID Number"
              placeholder="e.g. AAU/CS/2023/042"
              {...register('studentId')}
            />
          </div>
        )}

        {selectedRole === 'INTERNSHIP_COORDINATOR' && (
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-3">
            <div className="flex items-start gap-2 text-xs text-purple-900">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-purple-700" />
              <span>
                <strong>Approval Required:</strong> Institutional coordinator accounts must be approved by the Super Admin before posting listings.
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="University / Institution"
                placeholder="e.g. Addis Ababa Institute of Technology"
                {...register('university')}
              />
              <Input
                label="Employee / Staff ID"
                placeholder="e.g. AAU/STAFF/771"
                {...register('employeeId')}
              />
            </div>
          </div>
        )}

        {selectedRole === 'EMPLOYER' && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-3">
            <div className="flex items-start gap-2 text-xs text-amber-900">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
              <span>
                <strong>Verification Required:</strong> Organizations must submit business registration and TIN proofs before publishing live internships.
              </span>
            </div>
            <Input
              label="Organization Legal Name"
              placeholder="e.g. Brolf Technologies"
              {...register('organizationName')}
            />
          </div>
        )}

        {/* Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min 6 chars"
            {...register('password')}
            error={errors.password?.message}
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          <Input
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Create Account
        </Button>
      </form>

      <div className="text-center text-xs text-neutral-500 pt-2">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-800 hover:underline">
          Sign in here
        </Link>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/auth/ResetPasswordPage.tsx -->
## src/pages/auth/ResetPasswordPage.tsx

```tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPasswordSchema, ResetPasswordFormData } from '../../schemas';
import { authService } from '../../services/auth.service';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export const ResetPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'mock-reset-token';
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await authService.resetPassword(token, data.password);
      toast.success('Your password has been reset successfully. Please log in.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Set New Password</h2>
        <p className="text-xs text-neutral-500 mt-1">
          Enter and confirm your new secure account password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Min 6 characters"
          {...register('password')}
          error={errors.password?.message}
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <Input
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Repeat new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
          leftIcon={<KeyRound className="w-4 h-4" />}
        >
          Update Password
        </Button>
      </form>

      <div className="text-center pt-2">
        <Link to="/login" className="text-xs font-semibold text-brand-800 hover:underline">
          Cancel and return to login
        </Link>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/common/NotificationsPage.tsx -->
## src/pages/common/NotificationsPage.tsx

```tsx
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

      <div className="flex gap-2 border-b border-neutral-200 pb-3">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === 'ALL'
              ? 'bg-brand-900 text-white'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('UNREAD')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === 'UNREAD'
              ? 'bg-brand-900 text-white'
              : 'text-neutral-600 hover:bg-neutral-100'
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
                !n.isRead ? 'bg-brand-50/30 border-brand-200' : 'bg-white'
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
                      <h4 className="font-semibold text-neutral-900 text-sm">{n.title}</h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-brand-600" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{n.message}</p>
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

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/employer/EmployerAnalyticsPage.tsx -->
## src/pages/employer/EmployerAnalyticsPage.tsx

```tsx
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
        <Card className="p-6 bg-white">
          <p className="text-xs font-semibold uppercase text-neutral-400">Total Pipeline Reach</p>
          <p className="text-3xl font-black text-neutral-900 mt-1">48 Candidates</p>
          <p className="text-xs text-neutral-500 mt-2">Across 4 published opportunities</p>
        </Card>

        <Card className="p-6 bg-white">
          <p className="text-xs font-semibold uppercase text-neutral-400">Interview Conversion</p>
          <p className="text-3xl font-black text-emerald-800 mt-1">25.0%</p>
          <p className="text-xs text-neutral-500 mt-2">12 candidates invited for interviews</p>
        </Card>

        <Card className="p-6 bg-white">
          <p className="text-xs font-semibold uppercase text-neutral-400">Avg. Time to Review</p>
          <p className="text-3xl font-black text-brand-900 mt-1">1.8 Days</p>
          <p className="text-xs text-neutral-500 mt-2">Fast candidate response speed</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white p-6">
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

        <Card className="bg-white p-6">
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

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/employer/EmployerApplicantsPage.tsx -->
## src/pages/employer/EmployerApplicantsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { applicationsService } from '../../services/applications.service';
import { InternshipApplication, ApplicationStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { formatDate } from '../../utils';
import { FileCheck, Download, UserCheck, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerApplicantsPage: React.FC = () => {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('PENDING');
  const [statusNotes, setStatusNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadData = async () => {
    try {
      const data = await applicationsService.getApplications();
      setApplications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenReview = (app: InternshipApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setStatusNotes(app.notes || '');
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setUpdating(true);
    try {
      await applicationsService.updateStatus(selectedApp.id, newStatus, statusNotes);
      toast.success(`Application status updated to ${newStatus}`);
      setSelectedApp(null);
      await loadData();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const columns: Column<InternshipApplication>[] = [
    {
      key: 'applicant',
      header: 'Candidate Name & Email',
      render: (app) => (
        <div>
          <p className="font-semibold text-neutral-900">{app.applicantName}</p>
          <p className="text-xs text-neutral-500">{app.applicantEmail}</p>
          {app.university && (
            <p className="text-[11px] text-brand-800 font-medium mt-0.5">
              {app.university} - {app.department}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'internshipTitle',
      header: 'Applied Position',
      render: (app) => (
        <span className="font-medium text-neutral-800 text-xs sm:text-sm">
          {app.internshipTitle}
        </span>
      ),
    },
    {
      key: 'appliedAt',
      header: 'Applied Date',
      render: (app) => <span className="text-xs text-neutral-600">{formatDate(app.appliedAt)}</span>,
    },
    {
      key: 'status',
      header: 'Recruitment Stage',
      render: (app) => <StatusBadge status={app.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (app) => (
        <Button size="sm" variant="outline" onClick={() => handleOpenReview(app)}>
          Review Candidate
        </Button>
      ),
    },
  ];

  const statusOptions = [
    { value: 'PENDING', label: 'Pending Review' },
    { value: 'REVIEWING', label: 'Under Review' },
    { value: 'SHORTLISTED', label: 'Shortlisted' },
    { value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled' },
    { value: 'ACCEPTED', label: 'Accepted (Offer Extended)' },
    { value: 'REJECTED', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidate Review Pipeline"
        description="Evaluate candidate qualifications, inspect submitted cover letters and CVs, and advance recruitment stages."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'Applicants' },
        ]}
      />

      <DataTable
        columns={columns}
        data={applications}
        isLoading={loading}
        rowKey={(a) => a.id}
        emptyTitle="No candidates applied yet"
        emptyDescription="Applications for your published corporate internships will appear here."
      />

      {/* Candidate Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Review Candidate: ${selectedApp.applicantName}`}
          description={`Position: ${selectedApp.internshipTitle}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveStatus} className="space-y-4 mt-3">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedApp.applicantEmail}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedApp.applicantPhone || 'No phone supplied'}</span>
              </div>
              <div className="sm:col-span-2 pt-1 border-t border-neutral-200">
                <p>
                  <strong>University / Department:</strong> {selectedApp.university || 'Enrolled Student'}{' '}
                  ({selectedApp.department || 'N/A'})
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Candidate Cover Letter
              </p>
              <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto">
                {selectedApp.coverLetter}
              </div>
            </div>

            {selectedApp.cvUrl && (
              <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-200 flex items-center justify-between text-xs text-brand-900">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-brand-700" />
                  <span>{selectedApp.cvFileName || 'Candidate_Resume.pdf'}</span>
                </div>
                <a
                  href={selectedApp.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline flex items-center gap-1 hover:text-brand-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  Open Document
                </a>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 pt-2">
              <Select
                label="Recruitment Pipeline Stage"
                options={statusOptions}
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
              />

              <Textarea
                label="Recruitment Notes / Feedback for Candidate"
                placeholder="Optional notes or interview invitation instructions..."
                rows={3}
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setSelectedApp(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={updating}>
                Save Candidate Status
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/employer/EmployerDashboardPage.tsx -->
## src/pages/employer/EmployerDashboardPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { organizationsService } from '../../services/organizations.service';
import { internshipsService } from '../../services/internships.service';
import { applicationsService } from '../../services/applications.service';
import { Organization, Internship, InternshipApplication } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import {
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const EmployerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [org, setOrg] = useState<Organization | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applicants, setApplicants] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      organizationsService.getMyOrganization(),
      internshipsService.getInternships(),
      applicationsService.getApplications(),
    ]).then(([myOrg, allInternships, allApps]) => {
      if (isMounted) {
        setOrg(myOrg);
        setInternships(allInternships);
        setApplicants(allApps);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading employer recruitment portal..." />;
  }

  const isVerified = org?.verificationStatus === 'VERIFIED';
  const totalApplicants = applicants.length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${org?.name || 'Organization'} Portal`}
        description="Manage corporate profiles, publish verified internship listings, and review qualified university applicants."
        breadcrumbs={[{ label: 'Employer', href: '/employer/dashboard' }, { label: 'Dashboard' }]}
        badge={<StatusBadge status={org?.verificationStatus || 'UNVERIFIED'} />}
        actions={
          <div className="flex gap-2.5">
            <Link to="/employer/internships/new">
              <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
                Post Internship
              </Button>
            </Link>
          </div>
        }
      />

      {/* Verification Notice Banner if not verified */}
      {!isVerified && (
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs text-amber-900">
              <p className="font-bold">Organization Verification Pending</p>
              <p className="mt-0.5">
                Submit official registration documents and TIN clearance to receive full publication approval.
              </p>
            </div>
          </div>
          <Link to="/employer/verification">
            <Button size="sm" variant="outline" className="bg-white">
              Complete Verification
            </Button>
          </Link>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Open Listings</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{internships.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Applicants</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{totalApplicants}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Verification</p>
            <p className="text-base font-bold text-neutral-900 mt-1">{org?.verificationStatus}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Shortlisted</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">
              {applicants.filter((a) => a.status === 'SHORTLISTED').length}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Internships */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Posted Internships</CardTitle>
            <Link to="/employer/internships">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {internships.map((i) => (
              <div
                key={i.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 text-sm truncate">{i.title}</h4>
                    <StatusBadge status={i.status} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {i.workMode} • Deadline: {formatDate(i.deadline)} • {i.applicantsCount} Applicants
                  </p>
                </div>

                <Link to="/employer/internships">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Applicants */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Candidate Pipeline</CardTitle>
            <Link to="/employer/applicants">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Review All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {applicants.map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 text-sm truncate">{app.applicantName}</h4>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">Applied for: {app.internshipTitle}</p>
                </div>

                <Link to="/employer/applicants">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/employer/EmployerInternshipEditorPage.tsx -->
## src/pages/employer/EmployerInternshipEditorPage.tsx

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { internshipSchema, InternshipFormData } from '../../schemas';
import { internshipsService } from '../../services/internships.service';
import { organizationsService } from '../../services/organizations.service';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { INTERNSHIP_CATEGORIES, WORK_MODES } from '../../constants';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerInternshipEditorPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema) as any,
    defaultValues: {
      category: 'Frontend Engineering',
      workMode: 'HYBRID',
      durationMonths: 6,
      status: 'PUBLISHED',
      stipend: 'ETB 11,000 / month',
      responsibilities: 'Develop modern responsive web features in React and TypeScript\nIntegrate REST endpoints with JSON payloads\nParticipate in agile sprint ceremonies',
      requirements: 'Enrolled in Computer Science or Software Engineering\nExperience with modern JavaScript / React\nGood communication and collaborative spirit',
      eligibility: 'Open to undergraduate university students graduating in 2026 or 2027.',
    },
  });

  const onSubmit = async (data: InternshipFormData) => {
    const responsibilitiesArr = data.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean);
    const requirementsArr = data.requirements.split('\n').map((s) => s.trim()).filter(Boolean);

    try {
      const myOrg = await organizationsService.getMyOrganization();

      await internshipsService.createInternship({
        ...data,
        organizationId: myOrg.id,
        organizationName: myOrg.name,
        responsibilities: responsibilitiesArr,
        requirements: requirementsArr,
        postedById: user?.id || 'user-employer-1',
        postedByRole: 'EMPLOYER',
      });

      toast.success('Internship listing published successfully!');
      navigate('/employer/internships');
    } catch {
      toast.error('Failed to create internship');
    }
  };

  const categoryOptions = INTERNSHIP_CATEGORIES.map((c) => ({ value: c, label: c }));
  const workModeOptions = WORK_MODES;
  const statusOptions = [
    { value: 'PUBLISHED', label: 'Published' },
    { value: 'DRAFT', label: 'Draft' },
    { value: 'CLOSED', label: 'Closed' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/employer/internships"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-brand-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Listings
      </Link>

      <PageHeader
        title="Publish Employer Internship"
        description="Create an industry-ready internship opening for qualified university students."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'My Internships', href: '/employer/internships' },
          { label: 'New Listing' },
        ]}
      />

      <Card className="bg-white">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Internship Position Title"
              placeholder="e.g. Junior Cloud Infrastructure Engineer Intern"
              {...register('title')}
              error={errors.title?.message}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                {...register('category')}
                error={errors.category?.message}
                required
              />
              <Select
                label="Work Arrangement"
                options={workModeOptions}
                {...register('workMode')}
                error={errors.workMode?.message}
                required
              />
              <Input
                label="Office Location / City"
                placeholder="e.g. Addis Ababa (Bole Medhanealem)"
                {...register('location')}
                error={errors.location?.message}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Program Duration (Months)"
                type="number"
                min={1}
                max={24}
                {...register('durationMonths')}
                error={errors.durationMonths?.message}
                required
              />
              <Input
                label="Application Deadline"
                type="date"
                {...register('deadline')}
                error={errors.deadline?.message}
                required
              />
              <Input
                label="Monthly Stipend / Allowance"
                placeholder="e.g. ETB 12,000 / month"
                {...register('stipend')}
                error={errors.stipend?.message}
              />
            </div>

            <Textarea
              label="Comprehensive Job Description"
              placeholder="Describe the projects the intern will contribute to, mentorship available, and technologies used..."
              rows={4}
              {...register('description')}
              error={errors.description?.message}
              required
            />

            <Textarea
              label="Key Responsibilities (One per line)"
              rows={3}
              {...register('responsibilities')}
              error={errors.responsibilities?.message}
              required
            />

            <Textarea
              label="Candidate Requirements (One per line)"
              rows={3}
              {...register('requirements')}
              error={errors.requirements?.message}
              required
            />

            <Input
              label="University Eligibility Criteria"
              placeholder="e.g. 3rd or 4th-year university undergraduate students with GPA 3.0+"
              {...register('eligibility')}
              error={errors.eligibility?.message}
              required
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/employer/internships')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Publish Internship
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/employer/EmployerInternshipsPage.tsx -->
## src/pages/employer/EmployerInternshipsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../utils';
import { PlusCircle, Edit, Users, ExternalLink } from 'lucide-react';

export const EmployerInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    internshipsService.getInternships().then((data) => {
      setInternships(data);
      setLoading(false);
    });
  }, []);

  const columns: Column<Internship>[] = [
    {
      key: 'title',
      header: 'Job Title & Category',
      render: (i) => (
        <div className="max-w-md">
          <p className="font-semibold text-neutral-900">{i.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="brand">{i.category}</Badge>
            <span className="text-xs text-neutral-500">{i.workMode}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (i) => <span className="text-xs text-neutral-700">{i.location}</span>,
    },
    {
      key: 'deadline',
      header: 'Deadline',
      render: (i) => <span className="text-xs text-neutral-700">{formatDate(i.deadline)}</span>,
    },
    {
      key: 'applicants',
      header: 'Applicants',
      render: (i) => (
        <span className="font-bold text-neutral-900">{i.applicantsCount} candidates</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (i) => (
        <div className="flex items-center justify-end gap-2">
          <Link to={`/employer/applicants`}>
            <Button size="sm" variant="outline" leftIcon={<Users className="w-3.5 h-3.5" />}>
              Applicants
            </Button>
          </Link>
          <Link to={`/internships/${i.id}`} target="_blank">
            <Button size="sm" variant="ghost" title="View live listing">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Internship Postings"
        description="Publish and maintain corporate internship listings for university talent across Ethiopia."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'My Internships' },
        ]}
        actions={
          <Link to="/employer/internships/new">
            <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Post New Internship
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={internships}
        isLoading={loading}
        rowKey={(i) => i.id}
        emptyTitle="No internships posted yet"
        emptyDescription="Create your first internship posting to connect with top university applicants."
        emptyAction={
          <Link to="/employer/internships/new">
            <Button size="sm" variant="primary">
              Post New Internship
            </Button>
          </Link>
        }
      />
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/employer/EmployerProfilePage.tsx -->
## src/pages/employer/EmployerProfilePage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { organizationProfileSchema, OrganizationProfileFormData } from '../../schemas';
import { organizationsService } from '../../services/organizations.service';
import { Organization } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Save, Building2, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerProfilePage: React.FC = () => {
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationProfileFormData>({
    resolver: zodResolver(organizationProfileSchema),
  });

  useEffect(() => {
    organizationsService.getMyOrganization().then((data) => {
      setOrg(data);
      reset({
        name: data.name,
        industry: data.industry,
        description: data.description,
        website: data.website,
        location: data.location,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        registrationNumber: data.registrationNumber || '',
        taxId: data.taxId || '',
      });
      setLoading(false);
    });
  }, [reset]);

  const onSubmit = async (data: OrganizationProfileFormData) => {
    try {
      const updated = await organizationsService.updateMyOrganization(data);
      setOrg(updated);
      toast.success('Organization profile updated successfully!');
    } catch {
      toast.error('Failed to update organization profile');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading organization profile..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Organization Profile"
        description="Maintain corporate identity, industry classifications, and official contact channels."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'Organization Profile' },
        ]}
        badge={<StatusBadge status={org?.verificationStatus || 'UNVERIFIED'} />}
      />

      <Card className="bg-white">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Organization Legal Name"
                placeholder="e.g. Brolf Technologies"
                {...register('name')}
                error={errors.name?.message}
                required
              />
              <Input
                label="Primary Industry"
                placeholder="e.g. Software & Cloud Solutions"
                {...register('industry')}
                error={errors.industry?.message}
                required
              />
            </div>

            <Textarea
              label="Corporate Overview & Mission"
              placeholder="Describe your company, engineering squad, and technological focus..."
              rows={4}
              {...register('description')}
              error={errors.description?.message}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Official Website URL"
                placeholder="https://company.example.com"
                {...register('website')}
                error={errors.website?.message}
                required
              />
              <Input
                label="Headquarters Location"
                placeholder="e.g. Addis Ababa, Bole, Ethiopia"
                {...register('location')}
                error={errors.location?.message}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Recruitment Contact Email"
                type="email"
                placeholder="careers@company.example.com"
                {...register('contactEmail')}
                error={errors.contactEmail?.message}
                required
              />
              <Input
                label="Direct Contact Phone"
                placeholder="+251 11 661 2345"
                {...register('contactPhone')}
                error={errors.contactPhone?.message}
                required
              />
            </div>

            <div className="flex justify-end pt-3 border-t border-neutral-100">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Organization Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/employer/EmployerVerificationPage.tsx -->
## src/pages/employer/EmployerVerificationPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { organizationVerificationSchema, OrganizationVerificationFormData } from '../../schemas';
import { organizationsService } from '../../services/organizations.service';
import { Organization } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { FileUpload } from '../../components/ui/FileUpload';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { ShieldCheck, FileCheck, AlertCircle, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerVerificationPage: React.FC = () => {
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [docUrl, setDocUrl] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationVerificationFormData>({
    resolver: zodResolver(organizationVerificationSchema),
  });

  const loadOrg = async () => {
    try {
      const data = await organizationsService.getMyOrganization();
      setOrg(data);
      if (data.registrationNumber) setValue('registrationNumber', data.registrationNumber);
      if (data.taxId) setValue('taxId', data.taxId);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrg();
  }, [setValue]);

  const onSubmit = async (data: OrganizationVerificationFormData) => {
    try {
      const updated = await organizationsService.submitVerification({
        registrationNumber: data.registrationNumber,
        taxId: data.taxId,
        documentName: data.documentName,
        documentUrl: docUrl || data.documentUrl,
      });

      setOrg(updated);
      toast.success('Verification package submitted for Super Admin review!');
      reset();
    } catch {
      toast.error('Failed to submit verification');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading compliance and verification records..." />;
  }

  const isVerified = org?.verificationStatus === 'VERIFIED';
  const isPending = org?.verificationStatus === 'PENDING';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Organization Compliance & Verification"
        description="Verify corporate legitimacy by submitting official Ethiopian trade licenses, tax clearance, and TIN certifications."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'Verification' },
        ]}
        badge={<StatusBadge status={org?.verificationStatus || 'UNVERIFIED'} />}
      />

      {/* Current Status Box */}
      <div
        className={`p-6 rounded-2xl border ${
          isVerified
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : isPending
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-neutral-50 border-neutral-200 text-neutral-900'
        }`}
      >
        <div className="flex items-start gap-3">
          {isVerified ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : isPending ? (
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-neutral-500 shrink-0 mt-0.5" />
          )}

          <div className="space-y-1">
            <h3 className="font-bold text-base">
              {isVerified
                ? 'Accredited & Verified Corporate Partner'
                : isPending
                ? 'Verification Package Under Administrative Review'
                : 'Verification Documents Required'}
            </h3>
            <p className="text-xs leading-relaxed opacity-90">
              {isVerified
                ? 'Your organization has been officially vetted by AddisBuilder’s Super Administrators. Your internship listings will carry the verified partner trust badge.'
                : isPending
                ? 'Your documentation has been dispatched to the platform compliance office. Decisions are normally rendered within 24–48 hours.'
                : 'To protect university students and guarantee accredited placements, all employers must submit business registration and TIN proofs before publishing live internships.'}
            </p>
          </div>
        </div>
      </div>

      {/* Submitted Documents History */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Archived Compliance Documents ({org?.documents?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {org?.documents && org.documents.length > 0 ? (
            <div className="space-y-2.5">
              {org.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-brand-700" />
                    <div>
                      <p className="font-semibold text-neutral-900 text-xs sm:text-sm">{doc.name}</p>
                      <p className="text-[11px] text-neutral-400">
                        Type: {doc.type} • Uploaded: {formatDate(doc.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-brand-800 font-semibold">Verified File</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-500 italic">No verification documents on file yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Submit Verification Form */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Submit / Update Verification Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Commercial Registration Number"
                placeholder="e.g. ETH-MINT-2023-8849"
                {...register('registrationNumber')}
                error={errors.registrationNumber?.message}
                required
              />
              <Input
                label="Tax Identification Number (TIN)"
                placeholder="e.g. TIN-0092837411"
                {...register('taxId')}
                error={errors.taxId?.message}
                required
              />
            </div>

            <Input
              label="Document Title"
              placeholder="e.g. Official Business Trade License 2025/2026"
              {...register('documentName')}
              error={errors.documentName?.message}
              required
            />

            <FileUpload
              label="Verification Proof File (PDF / Image)"
              purpose="VERIFICATION_DOC"
              accept=".pdf,.png,.jpg,.jpeg"
              onUploadSuccess={(res) => {
                setDocUrl(res.url);
                setValue('documentUrl', res.url);
              }}
              error={errors.documentUrl?.message}
              helperText="Upload official certificate of incorporation, trade license, or tax clearance document."
            />

            <Textarea
              label="Additional Compliance Notes (Optional)"
              placeholder="Any additional information or university MOU linkage notes..."
              rows={3}
              {...register('notes')}
            />

            <div className="flex justify-end pt-3 border-t border-neutral-100">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Submit Documents for Review
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/internship-manager/CoordinatorApplicationsPage.tsx -->
## src/pages/internship-manager/CoordinatorApplicationsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { applicationsService } from '../../services/applications.service';
import { InternshipApplication, ApplicationStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { formatDate } from '../../utils';
import { FileCheck, ExternalLink, User } from 'lucide-react';
import { toast } from 'sonner';

export const CoordinatorApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);
  const [statusInput, setStatusInput] = useState<ApplicationStatus>('PENDING');

  const loadData = async () => {
    try {
      const data = await applicationsService.getApplications();
      setApplications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenReview = (app: InternshipApplication) => {
    setSelectedApp(app);
    setStatusInput(app.status);
  };

  const handleUpdateStatus = async () => {
    if (!selectedApp) return;
    try {
      await applicationsService.updateStatus(selectedApp.id, statusInput);
      toast.success('Applicant placement status updated');
      setSelectedApp(null);
      await loadData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const columns: Column<InternshipApplication>[] = [
    {
      key: 'student',
      header: 'Applicant',
      render: (app) => (
        <div>
          <p className="font-semibold text-neutral-900">{app.applicantName}</p>
          <p className="text-xs text-neutral-500">{app.applicantEmail}</p>
          {app.university && (
            <p className="text-[11px] text-brand-800 font-medium mt-0.5">
              {app.university} - {app.department}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'internship',
      header: 'Internship Role',
      render: (app) => (
        <div>
          <p className="font-semibold text-neutral-900">{app.internshipTitle}</p>
          <p className="text-xs text-neutral-500">{app.organizationName}</p>
        </div>
      ),
    },
    {
      key: 'appliedAt',
      header: 'Applied Date',
      render: (app) => <span className="text-xs text-neutral-600">{formatDate(app.appliedAt)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (app) => <StatusBadge status={app.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (app) => (
        <Button size="sm" variant="outline" onClick={() => handleOpenReview(app)}>
          Review Candidate
        </Button>
      ),
    },
  ];

  const statusOptions = [
    { value: 'PENDING', label: 'Pending Review' },
    { value: 'REVIEWING', label: 'Under Review' },
    { value: 'SHORTLISTED', label: 'Shortlisted' },
    { value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'REJECTED', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Placement Applications"
        description="Monitor student submissions, evaluate resume credentials, and verify institutional endorsements."
        breadcrumbs={[
          { label: 'Coordinator', href: '/internship-manager/dashboard' },
          { label: 'Applications' },
        ]}
      />

      <DataTable
        columns={columns}
        data={applications}
        isLoading={loading}
        rowKey={(a) => a.id}
        emptyTitle="No applications submitted yet"
        emptyDescription="Student applications for your institutional listings will appear here."
      />

      {/* Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Candidate: ${selectedApp.applicantName}`}
          description={`Target Position: ${selectedApp.internshipTitle}`}
          maxWidth="lg"
        >
          <div className="space-y-4 mt-3">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
              <p>
                <strong>Email:</strong> {selectedApp.applicantEmail} • <strong>Phone:</strong>{' '}
                {selectedApp.applicantPhone || '—'}
              </p>
              <p>
                <strong>University:</strong> {selectedApp.university || 'Enrolled Student'} (
                {selectedApp.department || 'N/A'})
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                Cover Letter
              </p>
              <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto">
                {selectedApp.coverLetter}
              </div>
            </div>

            <Select
              label="Update Placement Status"
              options={statusOptions}
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value as any)}
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setSelectedApp(null)}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleUpdateStatus}>
                Save Decision
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/internship-manager/CoordinatorDashboardPage.tsx -->
## src/pages/internship-manager/CoordinatorDashboardPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { internshipsService } from '../../services/internships.service';
import { applicationsService } from '../../services/applications.service';
import { Internship, InternshipApplication } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import {
  Briefcase,
  Users,
  Building2,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export const CoordinatorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      internshipsService.getInternships(),
      applicationsService.getApplications(),
    ]).then(([allInternships, allApps]) => {
      if (isMounted) {
        setInternships(allInternships);
        setApplications(allApps);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading coordinator dashboard..." />;
  }

  const activeCount = internships.filter((i) => i.status === 'PUBLISHED').length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`University Linkage Desk: ${user?.fullName || 'Coordinator'}`}
        description="Oversee university-partnered internship programs, review applicant placements, and manage institutional opportunities."
        breadcrumbs={[
          { label: 'Coordinator', href: '/internship-manager/dashboard' },
          { label: 'Dashboard' },
        ]}
        badge={
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Accredited University Coordinator
          </div>
        }
        actions={
          <Link to="/internship-manager/internships/new">
            <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Publish Internship
            </Button>
          </Link>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Listings</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{internships.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Active Listings</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{activeCount}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Applicants</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{applications.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Approval Status</p>
            <p className="text-lg font-bold text-emerald-700 mt-0.5">Approved</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Managed Listings */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Partner Internship Listings</CardTitle>
            <Link to="/internship-manager/internships">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 text-sm truncate">
                      {internship.title}
                    </h4>
                    <StatusBadge status={internship.status} />
                  </div>
                  <p className="text-xs text-brand-800 font-medium mt-0.5 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {internship.organizationName}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Deadline: {formatDate(internship.deadline)} • {internship.applicantsCount} Applicants
                  </p>
                </div>

                <Link to={`/internship-manager/internships`}>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Student Applicants */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Placement Applications</CardTitle>
            <Link to="/internship-manager/applications">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                All Applicants
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 text-sm truncate">
                      {app.applicantName}
                    </h4>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Target: <strong>{app.internshipTitle}</strong>
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {app.university || 'University Student'} • Applied: {formatDate(app.appliedAt)}
                  </p>
                </div>

                <Link to="/internship-manager/applications">
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/internship-manager/CoordinatorInternshipEditorPage.tsx -->
## src/pages/internship-manager/CoordinatorInternshipEditorPage.tsx

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { internshipSchema, InternshipFormData } from '../../schemas';
import { internshipsService } from '../../services/internships.service';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { INTERNSHIP_CATEGORIES, WORK_MODES } from '../../constants';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const CoordinatorInternshipEditorPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema) as any,
    defaultValues: {
      category: 'Software Development',
      workMode: 'HYBRID',
      durationMonths: 4,
      status: 'PUBLISHED',
      stipend: 'ETB 9,000 / month',
      responsibilities: 'Participate in team agile sprints\nDesign modular REST APIs\nCollaborate on frontend components',
      requirements: 'Enrolled university student\nSolid foundational computer science coursework\nKnowledge of Git and JavaScript',
      eligibility: 'Open to 3rd and 4th-year university undergraduate students.',
    },
  });

  const onSubmit = async (data: InternshipFormData) => {
    const responsibilitiesArr = data.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean);
    const requirementsArr = data.requirements.split('\n').map((s) => s.trim()).filter(Boolean);

    try {
      await internshipsService.createInternship({
        ...data,
        organizationId: 'org-brolf-1',
        organizationName: `${user?.university || 'University Linkage'} Partner Organization`,
        responsibilities: responsibilitiesArr,
        requirements: requirementsArr,
        postedById: user?.id || 'user-coord-1',
        postedByRole: 'INTERNSHIP_COORDINATOR',
      });

      toast.success('University internship opportunity published!');
      navigate('/internship-manager/internships');
    } catch {
      toast.error('Failed to publish internship');
    }
  };

  const categoryOptions = INTERNSHIP_CATEGORIES.map((c) => ({ value: c, label: c }));
  const workModeOptions = WORK_MODES;
  const statusOptions = [
    { value: 'PUBLISHED', label: 'Published' },
    { value: 'DRAFT', label: 'Draft' },
    { value: 'CLOSED', label: 'Closed' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/internship-manager/internships"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-brand-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Listings
      </Link>

      <PageHeader
        title="Publish Accredited Internship"
        description="Author an institutional internship placement listing for verified university learners."
        breadcrumbs={[
          { label: 'Coordinator', href: '/internship-manager/dashboard' },
          { label: 'Internships', href: '/internship-manager/internships' },
          { label: 'New Listing' },
        ]}
      />

      <Card className="bg-white">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Internship Position Title"
              placeholder="e.g. Junior Systems Integration Intern"
              {...register('title')}
              error={errors.title?.message}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                {...register('category')}
                error={errors.category?.message}
                required
              />
              <Select
                label="Work Mode"
                options={workModeOptions}
                {...register('workMode')}
                error={errors.workMode?.message}
                required
              />
              <Input
                label="Location / Campus"
                placeholder="e.g. Addis Ababa (Kazanchis)"
                {...register('location')}
                error={errors.location?.message}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Duration (Months)"
                type="number"
                min={1}
                max={24}
                {...register('durationMonths')}
                error={errors.durationMonths?.message}
                required
              />
              <Input
                label="Application Deadline"
                type="date"
                {...register('deadline')}
                error={errors.deadline?.message}
                required
              />
              <Input
                label="Monthly Stipend / Allowance"
                placeholder="e.g. ETB 10,000 / month"
                {...register('stipend')}
                error={errors.stipend?.message}
              />
            </div>

            <Textarea
              label="Full Description"
              placeholder="Detailed description of the internship role, team environment, and mentorship support..."
              rows={4}
              {...register('description')}
              error={errors.description?.message}
              required
            />

            <Textarea
              label="Responsibilities (One per line)"
              rows={3}
              {...register('responsibilities')}
              error={errors.responsibilities?.message}
              required
            />

            <Textarea
              label="Requirements (One per line)"
              rows={3}
              {...register('requirements')}
              error={errors.requirements?.message}
              required
            />

            <Input
              label="Institutional Eligibility"
              placeholder="e.g. 3rd or 4th-year university undergraduate students with GPA 3.0+"
              {...register('eligibility')}
              error={errors.eligibility?.message}
              required
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/internship-manager/internships')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Publish Opportunity
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/internship-manager/CoordinatorInternshipsPage.tsx -->
## src/pages/internship-manager/CoordinatorInternshipsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../utils';
import { PlusCircle, Edit, ExternalLink, Building2 } from 'lucide-react';

export const CoordinatorInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    internshipsService.getInternships().then((data) => {
      setInternships(data);
      setLoading(false);
    });
  }, []);

  const columns: Column<Internship>[] = [
    {
      key: 'title',
      header: 'Listing & Organization',
      render: (i) => (
        <div className="max-w-md">
          <p className="font-semibold text-neutral-900">{i.title}</p>
          <p className="text-xs text-brand-800 font-medium flex items-center gap-1 mt-0.5">
            <Building2 className="w-3.5 h-3.5" />
            {i.organizationName}
          </p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Mode',
      render: (i) => (
        <div className="flex flex-col gap-1">
          <Badge variant="brand">{i.category}</Badge>
          <span className="text-[11px] text-neutral-500">{i.workMode}</span>
        </div>
      ),
    },
    {
      key: 'deadline',
      header: 'Deadline',
      render: (i) => <span className="text-xs text-neutral-700">{formatDate(i.deadline)}</span>,
    },
    {
      key: 'applicants',
      header: 'Applicants',
      render: (i) => (
        <span className="font-bold text-neutral-900">{i.applicantsCount} candidates</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (i) => (
        <div className="flex items-center justify-end gap-2">
          <Link to={`/internships/${i.id}`} target="_blank">
            <Button size="sm" variant="ghost" title="Preview public listing">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Internship Listings"
        description="Review, draft, and publish accredited industry internship placements for university students."
        breadcrumbs={[
          { label: 'Coordinator', href: '/internship-manager/dashboard' },
          { label: 'Internships' },
        ]}
        actions={
          <Link to="/internship-manager/internships/new">
            <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Publish New Internship
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={internships}
        isLoading={loading}
        rowKey={(i) => i.id}
        emptyTitle="No internships published"
        emptyDescription="Create your first university-partnered internship posting."
      />
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/learner/LearnerApplicationsPage.tsx -->
## src/pages/learner/LearnerApplicationsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { applicationsService } from '../../services/applications.service';
import { InternshipApplication } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { formatDate } from '../../utils';
import { FileText, Building2, Calendar, FileCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearnerApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);

  useEffect(() => {
    applicationsService
      .getApplications({ applicantId: user?.id })
      .then((data) => {
        setApplications(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading application tracking logs..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Internship Applications"
        description="Track your real-time recruitment progression with corporate partners and coordinators."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Applications' },
        ]}
        actions={
          <Link to="/learner/internships">
            <Button size="sm" variant="primary">
              Apply to More Roles
            </Button>
          </Link>
        }
      />

      {applications.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-8 h-8" />}
          title="No Applications Submitted"
          description="Explore open internship postings and submit your application to accelerate your career."
          action={
            <Link to="/learner/internships">
              <Button size="sm" variant="primary">
                Find Internships
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Card key={app.id} className="bg-white hover:border-brand-300 transition-colors">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-base">{app.internshipTitle}</span>
                    <StatusBadge status={app.status} />
                  </div>

                  <p className="text-xs font-semibold text-brand-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {app.organizationName}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      Applied: {formatDate(app.appliedAt)}
                    </span>
                    {app.cvFileName && (
                      <span className="flex items-center gap-1 text-neutral-600">
                        <FileCheck className="w-3.5 h-3.5 text-brand-700" />
                        {app.cvFileName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedApp(app)}
                  >
                    View Submission
                  </Button>
                  <Link to={`/internships/${app.internshipId}`}>
                    <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      Listing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application: ${selectedApp.internshipTitle}`}
          description={`Employer: ${selectedApp.organizationName}`}
          maxWidth="lg"
        >
          <div className="space-y-4 mt-3">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-xs text-neutral-600">Current Recruitment Stage:</span>
              <StatusBadge status={selectedApp.status} />
            </div>

            {selectedApp.notes && (
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                <p className="font-bold">Employer Status Note:</p>
                <p>{selectedApp.notes}</p>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                Submitted Cover Letter
              </p>
              <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                {selectedApp.coverLetter}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/learner/LearnerAssignmentsPage.tsx -->
## src/pages/learner/LearnerAssignmentsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { assignmentsService } from '../../services/assignments.service';
import { Assignment, AssignmentSubmission } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { ClipboardList, Clock, CheckCircle2, Award, Send, FileCheck } from 'lucide-react';
import { toast } from 'sonner';

export const LearnerAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsg, setSelectedAsg] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const [allAsg, allSubs] = await Promise.all([
        assignmentsService.getAssignments(),
        assignmentsService.getSubmissions(),
      ]);
      setAssignments(allAsg);
      setSubmissions(allSubs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSubmissionForAsg = (asgId: string) => {
    return submissions.find((s) => s.assignmentId === asgId);
  };

  const handleSubmitWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg) return;

    if (!submissionContent.trim() || submissionContent.length < 20) {
      toast.error('Please provide a submission description or link of at least 20 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await assignmentsService.submitAssignment({
        assignmentId: selectedAsg.id,
        assignmentTitle: selectedAsg.title,
        courseId: selectedAsg.courseId,
        courseTitle: selectedAsg.courseTitle,
        content: submissionContent,
      });

      toast.success('Assignment submitted successfully!');
      setSelectedAsg(null);
      setSubmissionContent('');
      await loadData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading coursework assignments..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coursework Assignments"
        description="Review assigned problem sets, submit deliverables, and view mentor grading and critique."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Assignments' },
        ]}
      />

      <div className="space-y-4">
        {assignments.map((asg) => {
          const sub = getSubmissionForAsg(asg.id);

          return (
            <Card key={asg.id} className="bg-white">
              <CardContent className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-brand-800 uppercase tracking-wider">
                      {asg.courseTitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                      {asg.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md">
                      Max: {asg.totalPoints} pts
                    </span>
                    {sub ? <StatusBadge status={sub.status} /> : <StatusBadge status="PENDING" />}
                  </div>
                </div>

                <div className="bg-neutral-50/80 p-4 rounded-xl border border-neutral-200/80 text-xs text-neutral-600 space-y-2">
                  <p className="font-semibold text-neutral-800">Instructions:</p>
                  <p className="leading-relaxed whitespace-pre-line">{asg.instructions}</p>
                </div>

                {/* Submissions & Grading info */}
                {sub ? (
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Submitted on {formatDate(sub.submittedAt)}
                      </span>
                      {sub.grade !== undefined && (
                        <span className="text-xs font-black text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-300">
                          Grade: {sub.grade} / {asg.totalPoints}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-700 bg-white p-3 rounded-lg border border-neutral-200 leading-relaxed">
                      <strong>Your Solution:</strong> {sub.content}
                    </p>

                    {sub.feedback && (
                      <div className="p-3 bg-white rounded-lg border border-brand-200 text-xs text-neutral-800 space-y-1">
                        <p className="font-bold text-brand-900 flex items-center gap-1">
                          <Award className="w-4 h-4 text-brand-700" />
                          Mentor Feedback:
                        </p>
                        <p className="text-neutral-600 leading-relaxed">{sub.feedback}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Due Date: <strong className="text-neutral-800">{formatDate(asg.dueDate)}</strong>
                    </span>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedAsg(asg)}
                      leftIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Work
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAsg && (
        <Modal
          isOpen={!!selectedAsg}
          onClose={() => setSelectedAsg(null)}
          title={`Submit: ${selectedAsg.title}`}
          description={`Course: ${selectedAsg.courseTitle}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmitWork} className="space-y-4 mt-4">
            <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-600 border border-neutral-200">
              <p>
                <strong>Deadline:</strong> {formatDate(selectedAsg.dueDate)} • <strong>Total Points:</strong>{' '}
                {selectedAsg.totalPoints}
              </p>
            </div>

            <Textarea
              label="Solution, Project Explanation & Repository URL"
              placeholder="Provide a detailed write-up of your solution, architectural decisions, and links to your GitHub repository or hosted deployment..."
              rows={6}
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              required
              helperText="Minimum 20 characters."
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedAsg(null)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={submitting}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Submit Assignment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/learner/LearnerCourseLearnPage.tsx -->
## src/pages/learner/LearnerCourseLearnPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { coursesService } from '../../services/courses.service';
import { enrollmentsService } from '../../services/enrollments.service';
import { Course, CourseModule, Lesson } from '../../types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorState } from '../../components/feedback/ErrorState';
import { toast } from 'sonner';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Video,
  ChevronRight,
  ChevronLeft,
  Download,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react';

export const LearnerCourseLearnPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    let isMounted = true;
    Promise.all([
      coursesService.getCourseById(courseId),
      enrollmentsService.getCourseModules(courseId),
    ])
      .then(([c, mods]) => {
        if (!isMounted) return;
        setCourse(c);
        setModules(mods);

        // Select first incomplete lesson or first lesson
        const allLessons = mods.flatMap((m) => m.lessons);
        const firstIncomplete = allLessons.find((l) => !l.isCompleted) || allLessons[0];
        if (firstIncomplete) {
          setActiveLesson(firstIncomplete);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load course learning content');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  if (loading) {
    return <LoadingSpinner size="lg" label="Opening interactive learning classroom..." />;
  }

  if (error || !course) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <ErrorState
          title="Curriculum Unavailable"
          message={error || 'The requested course materials could not be loaded.'}
          onRetry={() => navigate('/learner/courses')}
        />
      </div>
    );
  }

  const allLessons = modules.flatMap((m) => m.lessons);
  const activeIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);
  const prevLesson = activeIndex > 0 ? allLessons[activeIndex - 1] : null;
  const nextLesson = activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;

  const completedLessons = allLessons.filter((l) => l.isCompleted).length;
  const progressPercent = allLessons.length > 0 ? Math.round((completedLessons / allLessons.length) * 100) : 0;

  const handleToggleComplete = async () => {
    if (!activeLesson || !user || !courseId) return;
    setCompleting(true);
    try {
      const result = await enrollmentsService.markLessonComplete(courseId, activeLesson.id, user.id);
      // Update local state
      setModules((prev) =>
        prev.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) => (l.id === activeLesson.id ? { ...l, isCompleted: true } : l)),
        }))
      );
      setActiveLesson((prev) => (prev ? { ...prev, isCompleted: true } : prev));
      setCourse((prev) => (prev ? { ...prev, progressPercentage: result.progressPercentage } : prev));
      toast.success('Lesson marked as completed! Progress updated.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update lesson completion status');
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Navigation */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/learner/courses"
            className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            title="Back to Enrolled Courses"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="brand">{course.category}</Badge>
              <span className="text-xs text-neutral-500">Instructor: {course.instructorName}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">{course.title}</h1>
          </div>
        </div>

        {/* Global Course Progress Header */}
        <div className="flex items-center gap-4 shrink-0 sm:border-l sm:border-neutral-200 sm:pl-6">
          <div className="w-36 space-y-1">
            <div className="flex justify-between text-xs text-neutral-600 font-semibold">
              <span>Overall Progress</span>
              <span className="text-brand-900 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
              <div
                className="h-full bg-brand-700 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          {progressPercent === 100 && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <Award className="w-4 h-4 text-emerald-600" /> Finished
            </span>
          )}
        </div>
      </div>

      {/* Main Learning Classroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Modules & Lessons Syllabus Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50/75 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                <BookOpen className="w-4 h-4 text-brand-700" />
                <span>Course Modules & Syllabus</span>
              </div>
              <span className="text-xs font-semibold text-neutral-500">
                {completedLessons}/{allLessons.length}
              </span>
            </div>

            <div className="divide-y divide-neutral-100 max-h-[calc(100vh-280px)] overflow-y-auto">
              {modules.map((module) => (
                <div key={module.id} className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900">{module.title}</span>
                  </div>
                  {module.description && (
                    <p className="text-[11px] text-neutral-500 leading-tight">{module.description}</p>
                  )}

                  <div className="space-y-1.5 pt-1">
                    {module.lessons.map((lesson) => {
                      const isActive = activeLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            isActive
                              ? 'bg-brand-900 text-white font-semibold shadow-xs'
                              : 'hover:bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            {lesson.isCompleted ? (
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-600'}`}
                              />
                            ) : (
                              <Circle
                                className={`w-4 h-4 shrink-0 ${isActive ? 'text-neutral-400' : 'text-neutral-300'}`}
                              />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span
                            className={`text-[10px] shrink-0 ${
                              isActive ? 'text-brand-200' : 'text-neutral-400'
                            }`}
                          >
                            {lesson.duration || (lesson.type === 'VIDEO' ? 'Video' : 'Reading')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Lesson Content Viewer */}
        <div className="lg:col-span-8 space-y-6">
          {activeLesson ? (
            <Card className="bg-white shadow-xs">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Active Lesson Header */}
                <div className="border-b border-neutral-200 pb-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="neutral">
                        {activeLesson.type === 'VIDEO' ? (
                          <span className="flex items-center gap-1">
                            <Video className="w-3.5 h-3.5 text-blue-600" /> Video Lecture
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-indigo-600" /> Academic Reading
                          </span>
                        )}
                      </Badge>
                      <span className="text-xs text-neutral-500">Duration: {activeLesson.duration || '20 min'}</span>
                    </div>

                    {activeLesson.isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        isLoading={completing}
                        onClick={handleToggleComplete}
                        leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      >
                        Mark as Complete
                      </Button>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                    {activeLesson.title}
                  </h2>
                </div>

                {/* Media Content Player / Simulator */}
                {activeLesson.type === 'VIDEO' ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-2xl bg-neutral-950 overflow-hidden shadow-inner flex flex-col items-center justify-center text-white">
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                      <div className="relative z-10 flex flex-col items-center gap-3 p-6 text-center">
                        <button
                          type="button"
                          className="w-16 h-16 rounded-full bg-brand-700 hover:bg-brand-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                          aria-label="Play lecture video"
                          onClick={() => toast.info('Playing simulated video lecture')}
                        >
                          <PlayCircle className="w-8 h-8 ml-0.5" />
                        </button>
                        <p className="text-sm font-semibold tracking-wide">University Lecture Stream</p>
                        <p className="text-xs text-neutral-300 max-w-sm">
                          {activeLesson.title} • {course.instructorName}
                        </p>
                      </div>

                      {/* Video Player Controls Bar */}
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-black/90 to-transparent flex items-center justify-between text-xs text-neutral-300">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px]">04:15 / {activeLesson.duration || '28:00'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold bg-white/20 px-1.5 py-0.5 rounded">1080p HD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Document / Reading Preview */
                  <div className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-700" />
                        <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                          Curriculum Reading Material
                        </span>
                      </div>
                      <a
                        href={activeLesson.documentUrl || '#'}
                        onClick={(e) => {
                          e.preventDefault();
                          toast.info('Downloading university syllabus reading packet...');
                        }}
                        className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download PDF
                      </a>
                    </div>
                    <div className="text-sm text-neutral-700 leading-relaxed space-y-3">
                      <p>{activeLesson.content}</p>
                      <p className="text-xs text-neutral-500">
                        Review all code samples and architectural diagrams before proceeding to the next lesson or assignment submission.
                      </p>
                    </div>
                  </div>
                )}

                {/* Lesson Summary Notes */}
                <div className="pt-4 space-y-3 border-t border-neutral-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Lesson Learning Objectives
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-700 shrink-0 mt-0.5" />
                      <span>Comprehend fundamental patterns and decoupled architecture principles.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-700 shrink-0 mt-0.5" />
                      <span>Implement practical hands-on examples with TypeScript and Tailwind CSS.</span>
                    </li>
                  </ul>
                </div>

                {/* Previous & Next Navigation */}
                <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                  {prevLesson ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveLesson(prevLesson)}
                      leftIcon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Previous: {prevLesson.title.slice(0, 24)}...
                    </Button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-2.5">
                    {!activeLesson.isCompleted && (
                      <Button
                        variant="primary"
                        size="sm"
                        isLoading={completing}
                        onClick={handleToggleComplete}
                        leftIcon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Complete Lesson
                      </Button>
                    )}

                    {nextLesson && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setActiveLesson(nextLesson)}
                        rightIcon={<ChevronRight className="w-4 h-4" />}
                      >
                        Next Lesson
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
              Select a lesson from the syllabus sidebar to begin studying.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/learner/LearnerCoursesPage.tsx -->
## src/pages/learner/LearnerCoursesPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesService } from '../../services/courses.service';
import { Course } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { BookOpen, Clock, Users, ArrowRight, PlayCircle } from 'lucide-react';

export const LearnerCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesService.getCourses().then((list) => {
      setCourses(list.filter((c) => c.isEnrolled));
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Enrolled Courses"
        description="Access learning materials, video lectures, and syllabus schedules for your active courses."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'My Courses' },
        ]}
        actions={
          <Link to="/courses">
            <Button size="sm" variant="primary" leftIcon={<BookOpen className="w-4 h-4" />}>
              Explore More Courses
            </Button>
          </Link>
        }
      />

      {loading ? (
        <LoadingSpinner size="lg" label="Loading enrolled courses..." />
      ) : courses.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No Enrolled Courses Yet"
          description="Browse our university-curated catalog to enroll in courses taught by experienced mentors."
          action={
            <Link to="/courses">
              <Button variant="primary" size="sm">
                Browse Course Catalog
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} hoverEffect className="bg-white flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="brand">{course.category}</Badge>
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  <h3 className="font-bold text-base text-neutral-900 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">{course.shortDescription}</p>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Completion</span>
                      <span className="font-semibold text-neutral-800">
                        {course.progressPercentage || 65}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-700 rounded-full"
                        style={{ width: `${course.progressPercentage || 65}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="p-5 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500">{course.durationWeeks} Weeks total</span>
                <Link to={`/learner/courses/${course.id}/learn`}>
                  <Button size="sm" variant="primary" leftIcon={<PlayCircle className="w-4 h-4" />}>
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/learner/LearnerDashboardPage.tsx -->
## src/pages/learner/LearnerDashboardPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { coursesService } from '../../services/courses.service';
import { assignmentsService } from '../../services/assignments.service';
import { applicationsService } from '../../services/applications.service';
import { Course, Assignment, InternshipApplication } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { SearchInput } from '../../components/ui/SearchInput';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { toast } from 'sonner';
import {
  BookOpen,
  ClipboardList,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  Users,
  Compass,
  Search,
  Check,
} from 'lucide-react';

export const LearnerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  // Available Courses Search & Filters
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load all initial data
  const loadData = async () => {
    try {
      const [fetchedCourses, fetchedAssignments, fetchedApplications] = await Promise.all([
        coursesService.getCourses(),
        assignmentsService.getAssignments(),
        applicationsService.getApplications({ applicantId: user?.id }),
      ]);
      setAllCourses(fetchedCourses);
      setAssignments(fetchedAssignments);
      setApplications(fetchedApplications);
    } catch (err: any) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Handle student course enrollment
  const handleEnroll = async (courseId: string, courseTitle: string) => {
    setEnrollingId(courseId);
    try {
      await coursesService.enrollCourse(courseId);
      toast.success(`Successfully enrolled in "${courseTitle}"!`);
      // Update local state
      setAllCourses((prev) =>
        prev.map((c) =>
          c.id === courseId
            ? { ...c, isEnrolled: true, enrolledStudentsCount: c.enrolledStudentsCount + 1, progressPercentage: 10 }
            : c
        )
      );
    } catch (err: any) {
      toast.error(err.message || 'Failed to complete enrollment');
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading student workspace & learning catalog..." />;
  }

  // Filter published courses
  const publishedCourses = allCourses.filter((c) => c.status === 'PUBLISHED');
  const enrolledCourses = publishedCourses.filter((c) => c.isEnrolled);
  const availableToEnroll = publishedCourses.filter((c) => !c.isEnrolled);
  const inProgressCourses = enrolledCourses.filter((c) => (c.progressPercentage || 0) < 100);
  const completedCourses = enrolledCourses.filter((c) => (c.progressPercentage || 0) === 100);

  // Check if a course is genuinely recent (published within the last 30 days)
  const isRecentPublication = (dateStr: string): boolean => {
    const publishedTime = new Date(dateStr).getTime();
    const now = Date.now();
    const referenceDate = new Date('2026-10-20T08:00:00Z').getTime();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const diffNow = now - publishedTime;
    const diffRef = referenceDate - publishedTime;
    return (diffNow >= 0 && diffNow <= thirtyDaysMs) || (diffRef >= 0 && diffRef <= thirtyDaysMs);
  };

  // Sort newest published courses first
  const newlyPublishedCourses = [...publishedCourses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Filter available courses for Explore section
  const categories = ['All', 'Software Engineering', 'Data Science & AI', 'Cloud & DevOps', 'UI/UX Design'];
  const filteredAvailableCourses = publishedCourses.filter((c) => {
    const matchesSearch =
      !courseSearch ||
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(courseSearch.toLowerCase());

    const matchesCat = selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-10">
      <PageHeader
        title={`Welcome back, ${user?.fullName || 'Student'}!`}
        description="Track your enrolled courses, explore newly published academic offerings, and manage internship opportunities."
        breadcrumbs={[{ label: 'Learner', href: '/learner/dashboard' }, { label: 'Dashboard' }]}
        actions={
          <div className="flex flex-wrap gap-2.5">
            <Link to="/learner/internships">
              <Button size="sm" variant="outline" leftIcon={<Briefcase className="w-4 h-4" />}>
                Find Internships
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="sm" variant="primary" leftIcon={<BookOpen className="w-4 h-4" />}>
                Browse All Courses
              </Button>
            </Link>
          </div>
        }
      />

      {/* Section 7.1: Platform Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Enrolled</p>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">{enrolledCourses.length}</p>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">In Progress</p>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">{inProgressCourses.length}</p>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Completed</p>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">{completedCourses.length}</p>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Available</p>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">{availableToEnroll.length}</p>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white col-span-2 lg:col-span-1">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Applications</p>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">{applications.length}</p>
          </div>
        </Card>
      </div>

      {/* Section 7.5: Newly Published Courses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Newly Published Courses</h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
                Latest Additions
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Recent academic curricula designed and verified by partner university faculty.
            </p>
          </div>
          <Link to="/courses" className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1">
            Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newlyPublishedCourses.map((course) => {
            const isRecent = isRecentPublication(course.createdAt);
            return (
              <Card key={`new-${course.id}`} className="bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="h-40 overflow-hidden relative rounded-t-2xl">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Badge variant="brand">{course.category}</Badge>
                      {isRecent && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white rounded-md shadow-xs animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-neutral-900 leading-snug line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{course.shortDescription}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                      <span>Instructor: <strong className="text-neutral-700">{course.instructorName}</strong></span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-500">
                      <span>Published: {formatDate(course.createdAt)}</span>
                      <span>{course.durationWeeks} Weeks</span>
                    </div>
                  </CardContent>
                </div>

                <div className="p-5 pt-0 border-t border-neutral-100 flex items-center justify-between mt-3">
                  <Link to={`/courses/${course.id}`} className="text-xs text-neutral-600 font-medium hover:text-brand-800">
                    Syllabus Details
                  </Link>
                  {course.isEnrolled ? (
                    <Link to={`/learner/courses/${course.id}/learn`}>
                      <Button size="sm" variant="secondary" leftIcon={<PlayCircle className="w-3.5 h-3.5" />}>
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      isLoading={enrollingId === course.id}
                      onClick={() => handleEnroll(course.id, course.title)}
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Section 7.4: Available Courses / Explore Courses */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Explore Available Courses</h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Discover and enroll in university courses to build specialized technical skills.
            </p>
          </div>
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search title, category, or instructor..."
              value={courseSearch}
              onChange={setCourseSearch}
              onClear={() => setCourseSearch('')}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        {filteredAvailableCourses.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
            No courses match your filter criteria. Try adjusting your search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAvailableCourses.map((course) => (
              <Card key={`avail-${course.id}`} hoverEffect className="bg-white flex flex-col justify-between">
                <div>
                  <div className="h-40 overflow-hidden relative rounded-t-2xl">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Badge variant="brand">{course.category}</Badge>
                      <Badge variant="neutral">{course.level}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">{course.shortDescription}</p>

                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                      <span className="truncate">Instructor: {course.instructorName}</span>
                      <span className="shrink-0">{course.durationWeeks} Wks</span>
                    </div>
                  </CardContent>
                </div>

                <div className="p-5 pt-0 border-t border-neutral-100 flex items-center justify-between mt-3">
                  <Link to={`/courses/${course.id}`} className="text-xs text-neutral-600 font-medium hover:text-brand-800">
                    View Details
                  </Link>
                  {course.isEnrolled ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Enrolled</span>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      isLoading={enrollingId === course.id}
                      onClick={() => handleEnroll(course.id, course.title)}
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Section 7.8: My Active Courses & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enrolled Courses */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Active Enrolled Courses</CardTitle>
            <Link to="/learner/courses">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All ({enrolledCourses.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <div className="p-6 text-center text-xs text-neutral-500">
                You have not enrolled in any courses yet.
                <div className="mt-3">
                  <Link to="/courses">
                    <Button size="sm" variant="outline">
                      Explore Course Catalog
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-xl border border-neutral-200/90 hover:border-brand-300 transition-colors bg-neutral-50/50 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="brand">{course.category}</Badge>
                      <h4 className="font-semibold text-neutral-900 text-sm mt-1.5">{course.title}</h4>
                      <p className="text-xs text-neutral-500">Instructor: {course.instructorName}</p>
                    </div>
                    <Link to={`/learner/courses/${course.id}/learn`}>
                      <Button size="sm" variant="primary" leftIcon={<PlayCircle className="w-3.5 h-3.5" />}>
                        Study
                      </Button>
                    </Link>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>Course Progress</span>
                      <span className="font-semibold text-neutral-800">
                        {course.progressPercentage || 10}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-700 rounded-full transition-all duration-500"
                        style={{ width: `${course.progressPercentage || 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Internship Applications</CardTitle>
            <Link to="/learner/applications">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All ({applications.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications.length === 0 ? (
              <div className="p-6 text-center text-xs text-neutral-500">
                No active internship applications submitted yet.
                <div className="mt-3">
                  <Link to="/learner/internships">
                    <Button size="sm" variant="outline">
                      Browse Internships
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
                >
                  <div className="min-w-0">
                    <h4 className="font-semibold text-neutral-900 text-sm truncate">
                      {app.internshipTitle}
                    </h4>
                    <p className="text-xs text-brand-800 font-medium">{app.organizationName}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Applied: {formatDate(app.appliedAt)}</p>
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Course Assignments */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Upcoming Course Assignments</CardTitle>
          <Link to="/learner/assignments">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              All Assignments
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-brand-800 uppercase tracking-wider">
                    {asg.courseTitle}
                  </span>
                  <span className="text-xs font-bold text-neutral-700 bg-white px-2 py-0.5 rounded border border-neutral-200">
                    {asg.totalPoints} pts
                  </span>
                </div>
                <h4 className="font-semibold text-neutral-900 text-sm">{asg.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2">{asg.description}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    Due: {formatDate(asg.dueDate)}
                  </span>
                  <Link to="/learner/assignments">
                    <Button size="sm" variant="outline">
                      Submit Work
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/learner/LearnerProfilePage.tsx -->
## src/pages/learner/LearnerProfilePage.tsx

```tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema, UserProfileFormData } from '../../schemas';
import { useAuth } from '../../contexts/AuthContext';
import { usersService } from '../../services/users.service';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/ui/FileUpload';
import { ProfilePhotoUploader } from '../../components/ui/ProfilePhotoUploader';
import { getInitials } from '../../utils';
import { Save, UserCheck, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const LearnerProfilePage: React.FC = () => {
  const { user, updateCurrentUser } = useAuth();
  const [cvUrl, setCvUrl] = useState(user?.cvUrl || '');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      university: user?.university || '',
      department: user?.department || '',
      studentId: user?.studentId || '',
      cvUrl: user?.cvUrl || '',
    },
  });

  const onSubmit = async (data: UserProfileFormData) => {
    try {
      const updated = await usersService.updateProfile({ ...data, cvUrl });
      updateCurrentUser(updated);
      toast.success('Profile information updated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Student Profile & CV"
        description="Manage your institutional contact information, academic biography, and resume for employers."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Profile' },
        ]}
      />

      {/* Profile Photo Management */}
      <ProfilePhotoUploader
        currentAvatarUrl={user?.avatarUrl}
        userName={user?.fullName || 'Student'}
      />

      <Card className="bg-white">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Legal Name"
                {...register('fullName')}
                error={errors.fullName?.message}
                required
              />
              <Input
                label="Phone Number"
                placeholder="+251 91 123 4567"
                {...register('phone')}
                error={errors.phone?.message}
              />
            </div>

            <Textarea
              label="Bio / Career Summary"
              placeholder="Brief summary of your learning goals, technical interests, and projects..."
              rows={3}
              {...register('bio')}
              error={errors.bio?.message}
            />

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Academic Affiliation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="University"
                  placeholder="e.g. Addis Ababa University"
                  {...register('university')}
                />
                <Input
                  label="Department / Faculty"
                  placeholder="e.g. Computer Science"
                  {...register('department')}
                />
                <Input
                  label="Student ID"
                  placeholder="e.g. AAU/CS/2023/042"
                  {...register('studentId')}
                />
              </div>
            </div>

            {/* CV Upload */}
            <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-200 space-y-3">
              <h3 className="text-xs font-semibold text-brand-900 uppercase tracking-wider">
                Resume / Curriculum Vitae
              </h3>
              <FileUpload
                purpose="CV"
                accept=".pdf,.doc,.docx"
                currentFileName={cvUrl ? 'Abebe_Kebede_Resume_2026.pdf' : undefined}
                onUploadSuccess={(res) => setCvUrl(res.url)}
                helperText="Upload your latest PDF CV. This document will be attached to your internship applications."
              />
            </div>

            <div className="flex justify-end pt-3">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/learner/LearnerProgressPage.tsx -->
## src/pages/learner/LearnerProgressPage.tsx

```tsx
import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Award, BookOpen, CheckCircle2, TrendingUp, Clock, Calendar } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const LearnerProgressPage: React.FC = () => {
  const weeklyActivityData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.0 },
    { day: 'Thu', hours: 5.1 },
    { day: 'Fri', hours: 3.8 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 2.5 },
  ];

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
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Course Completion</span>
            <Badge variant="brand">65%</Badge>
          </div>
          <p className="text-2xl font-black text-neutral-900">7 of 10 Weeks</p>
          <div className="w-full h-2 bg-neutral-200 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-brand-700 rounded-full" style={{ width: '65%' }} />
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Average Grade</span>
            <Badge variant="success">96%</Badge>
          </div>
          <p className="text-2xl font-black text-neutral-900">Grade A</p>
          <p className="text-xs text-neutral-500 mt-2">Verified by university mentor</p>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Study Hours</span>
            <Badge variant="neutral">27.1 hrs</Badge>
          </div>
          <p className="text-2xl font-black text-neutral-900">This Week</p>
          <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +15% vs previous week
          </p>
        </Card>
      </div>

      {/* Charts & Competencies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white p-6">
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

        <Card className="bg-white p-6 space-y-4">
          <CardHeader className="p-0 pb-2">
            <CardTitle>Acquired Technical Competencies</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {[
              { skill: 'React & TypeScript Component Architecture', level: 90 },
              { skill: 'REST API & Express Routing', level: 85 },
              { skill: 'Relational Database Schema Design (MySQL)', level: 80 },
              { skill: 'Responsive Web Design & Tailwind CSS', level: 95 },
              { skill: 'Automated Unit Testing with Vitest', level: 75 },
            ].map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-800">{s.skill}</span>
                  <span className="text-neutral-500">{s.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-800 rounded-full" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/learner/LearnerSavedInternshipsPage.tsx -->
## src/pages/learner/LearnerSavedInternshipsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/feedback/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { Bookmark, Building2, MapPin, Clock, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const LearnerSavedInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = async () => {
    try {
      const all = await internshipsService.getInternships();
      setInternships(all.filter((i) => i.isSaved));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await internshipsService.toggleSave(id);
      setInternships((prev) => prev.filter((i) => i.id !== id));
      toast.success('Removed from saved internships');
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Internships"
        description="Bookmarked opportunities to review and apply before deadlines."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Saved Internships' },
        ]}
        actions={
          <Link to="/learner/internships">
            <Button size="sm" variant="primary">
              Discover More
            </Button>
          </Link>
        }
      />

      {loading ? (
        <LoadingSpinner size="lg" label="Loading saved internships..." />
      ) : internships.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="w-8 h-8" />}
          title="No Saved Internships"
          description="Bookmark internship opportunities while browsing to keep track of upcoming application deadlines."
          action={
            <Link to="/learner/internships">
              <Button size="sm" variant="primary">
                Browse Internships
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <Card key={internship.id} className="bg-white flex flex-col justify-between">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="brand">{internship.category}</Badge>
                  <button
                    onClick={() => handleRemove(internship.id)}
                    className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-bold text-base text-neutral-900 leading-snug line-clamp-2">
                  {internship.title}
                </h3>

                <p className="text-xs font-semibold text-brand-800 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {internship.organizationName}
                </p>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    {internship.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    Due: {formatDate(internship.deadline)}
                  </span>
                </div>
              </CardContent>

              <div className="p-5 pt-0">
                <Link to={`/internships/${internship.id}`} className="block">
                  <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View & Apply
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/mentor/MentorAssignmentsPage.tsx -->
## src/pages/mentor/MentorAssignmentsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignmentSchema, AssignmentFormData } from '../../schemas';
import { assignmentsService } from '../../services/assignments.service';
import { coursesService } from '../../services/courses.service';
import { Assignment, Course } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { PlusCircle, ClipboardList, Clock, FileCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const MentorAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema) as any,
    defaultValues: {
      totalPoints: 100,
    },
  });

  const loadData = async () => {
    try {
      const [asgList, courseList] = await Promise.all([
        assignmentsService.getAssignments(),
        coursesService.getCourses(),
      ]);
      setAssignments(asgList);
      setCourses(courseList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data: AssignmentFormData) => {
    const course = courses.find((c) => c.id === data.courseId);
    try {
      await assignmentsService.createAssignment({
        ...data,
        courseTitle: course?.title || 'Selected Course',
      });
      toast.success('New coursework assignment published!');
      setModalOpen(false);
      reset();
      await loadData();
    } catch {
      toast.error('Failed to create assignment');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading coursework assignments..." />;
  }

  const courseOptions = [
    { value: '', label: 'Select Course Curriculum' },
    ...courses.map((c) => ({ value: c.id, label: c.title })),
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coursework Assignments"
        description="Design technical problem sets, set deadlines, and monitor student submission progress."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'Assignments' },
        ]}
        actions={
          <Button
            size="sm"
            variant="primary"
            onClick={() => setModalOpen(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Create Assignment
          </Button>
        }
      />

      <div className="space-y-4">
        {assignments.map((asg) => (
          <Card key={asg.id} className="bg-white">
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-brand-800 uppercase tracking-wider">
                    {asg.courseTitle}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                    {asg.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md">
                    {asg.totalPoints} points
                  </span>
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {asg.submissionsCount || 0} Submissions
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">{asg.description}</p>

              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs text-neutral-700">
                <p className="font-semibold text-neutral-900 mb-0.5">Instructions:</p>
                <p className="line-clamp-2">{asg.instructions}</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  Due Date: <strong className="text-neutral-800">{formatDate(asg.dueDate)}</strong>
                </span>

                <Link to="/mentor/submissions">
                  <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View Submissions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Assignment Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Coursework Assignment"
        description="Set assignment instructions, point weighting, and due date."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
          <Select
            label="Target Course"
            options={courseOptions}
            {...register('courseId')}
            error={errors.courseId?.message}
            required
          />

          <Input
            label="Assignment Title"
            placeholder="e.g. Lab 3: Implement JWT Authentication & Password Hashing"
            {...register('title')}
            error={errors.title?.message}
            required
          />

          <Input
            label="Short Summary"
            placeholder="Brief overview of the required deliverable..."
            {...register('description')}
            error={errors.description?.message}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              {...register('dueDate')}
              error={errors.dueDate?.message}
              required
            />
            <Input
              label="Total Points (Max 100)"
              type="number"
              min={1}
              max={100}
              {...register('totalPoints')}
              error={errors.totalPoints?.message}
              required
            />
          </div>

          <Textarea
            label="Detailed Assignment Instructions & Rubric"
            placeholder="Specify required tools, repository structures, unit tests, and grading criteria..."
            rows={5}
            {...register('instructions')}
            error={errors.instructions?.message}
            required
          />

          <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Publish Assignment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/mentor/MentorCourseEditorPage.tsx -->
## src/pages/mentor/MentorCourseEditorPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, CourseFormData } from '../../schemas';
import { coursesService } from '../../services/courses.service';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '../../constants';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const MentorCourseEditorPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const isEdit = Boolean(courseId && courseId !== 'new');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: {
      title: '',
      shortDescription: '',
      description: '',
      category: 'Software Engineering',
      level: 'BEGINNER',
      durationWeeks: 8,
      thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      learningObjectives: 'Understand core design concepts\nBuild responsive components\nTest with unit tests',
      status: 'PUBLISHED',
    },
  });

  useEffect(() => {
    if (isEdit && courseId) {
      coursesService
        .getCourseById(courseId)
        .then((course) => {
          reset({
            title: course.title,
            shortDescription: course.shortDescription,
            description: course.description,
            category: course.category,
            level: course.level,
            durationWeeks: course.durationWeeks,
            thumbnailUrl: course.thumbnailUrl,
            learningObjectives: course.learningObjectives?.join('\n') || '',
            status: course.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
          });
          setLoading(false);
        })
        .catch(() => {
          toast.error('Could not load course');
          navigate('/mentor/courses');
        });
    }
  }, [isEdit, courseId, reset, navigate]);

  const onSubmit = async (data: CourseFormData) => {
    const objectivesArray = data.learningObjectives
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      if (isEdit && courseId) {
        await coursesService.updateCourse(courseId, {
          ...data,
          learningObjectives: objectivesArray,
        });
        toast.success('Course updated successfully!');
      } else {
        await coursesService.createCourse({
          ...data,
          learningObjectives: objectivesArray,
          instructorId: user?.id || 'user-mentor-1',
          instructorName: user?.fullName || 'Faculty Instructor',
          instructorTitle: 'Faculty Mentor',
          materials: [],
          status: data.status,
        });
        toast.success('New course authored and published successfully!');
      }
      navigate('/mentor/courses');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save course');
    }
  };

  const categoryOptions = COURSE_CATEGORIES.map((c) => ({ value: c, label: c }));
  const levelOptions = COURSE_LEVELS;
  const statusOptions = [
    { value: 'PUBLISHED', label: 'Published (Visible to students)' },
    { value: 'DRAFT', label: 'Draft (Private work-in-progress)' },
    { value: 'ARCHIVED', label: 'Archived' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/mentor/courses"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-brand-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Course List
      </Link>

      <PageHeader
        title={isEdit ? 'Edit Course Curriculum' : 'Author New Course'}
        description="Define curriculum syllabus, learning objectives, duration, and publication status."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'My Courses', href: '/mentor/courses' },
          { label: isEdit ? 'Edit' : 'New Course' },
        ]}
      />

      <Card className="bg-white">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Course Title"
              placeholder="e.g. Distributed Cloud Systems with Go & Docker"
              {...register('title')}
              error={errors.title?.message}
              required
            />

            <Input
              label="Short Summary"
              placeholder="A brief 1-2 sentence tagline summarizing the course outcomes..."
              {...register('shortDescription')}
              error={errors.shortDescription?.message}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                {...register('category')}
                error={errors.category?.message}
                required
              />
              <Select
                label="Difficulty Level"
                options={levelOptions}
                {...register('level')}
                error={errors.level?.message}
                required
              />
              <Input
                label="Duration (Weeks)"
                type="number"
                min={1}
                max={52}
                {...register('durationWeeks')}
                error={errors.durationWeeks?.message}
                required
              />
            </div>

            <Textarea
              label="Detailed Course Description & Overview"
              placeholder="Explain the background, weekly modular structure, and prerequisites..."
              rows={5}
              {...register('description')}
              error={errors.description?.message}
              required
            />

            <Textarea
              label="Learning Objectives (One per line)"
              placeholder="Architect clean services&#10;Implement relational data models&#10;Write integration test suites"
              rows={4}
              {...register('learningObjectives')}
              error={errors.learningObjectives?.message}
              required
              helperText="Enter each learning outcome on a separate line."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Course Thumbnail Image URL"
                placeholder="https://images.unsplash.com/photo-..."
                {...register('thumbnailUrl')}
                error={errors.thumbnailUrl?.message}
                required
              />
              <Select
                label="Publication Status"
                options={statusOptions}
                {...register('status')}
                error={errors.status?.message}
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/mentor/courses')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                {isEdit ? 'Save Changes' : 'Create & Publish'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/mentor/MentorCoursesPage.tsx -->
## src/pages/mentor/MentorCoursesPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesService } from '../../services/courses.service';
import { Course } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { PlusCircle, Edit, Layers, ExternalLink } from 'lucide-react';

export const MentorCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesService.getCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const columns: Column<Course>[] = [
    {
      key: 'title',
      header: 'Course Title',
      render: (course) => (
        <div className="max-w-md">
          <p className="font-semibold text-neutral-900">{course.title}</p>
          <p className="text-xs text-neutral-500 line-clamp-1">{course.shortDescription}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Level',
      render: (course) => (
        <div className="flex flex-col gap-1">
          <Badge variant="brand">{course.category}</Badge>
          <span className="text-[11px] text-neutral-500 font-medium">{course.level}</span>
        </div>
      ),
    },
    {
      key: 'enrolled',
      header: 'Enrolled Students',
      render: (course) => (
        <span className="font-semibold text-neutral-800">{course.enrolledStudentsCount} learners</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (course) => <StatusBadge status={course.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (course) => (
        <div className="flex items-center justify-end gap-2">
          <Link to={`/mentor/courses/${course.id}/edit`}>
            <Button size="sm" variant="outline" leftIcon={<Edit className="w-3.5 h-3.5" />}>
              Edit
            </Button>
          </Link>
          <Link to={`/courses/${course.id}`} target="_blank">
            <Button size="sm" variant="ghost" title="Preview public course view">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Management"
        description="Create, revise, and publish academic curricula, lecture materials, and syllabi."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'My Courses' },
        ]}
        actions={
          <Link to="/mentor/courses/new">
            <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Create Course
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={courses}
        isLoading={loading}
        rowKey={(c) => c.id}
        emptyTitle="No courses created yet"
        emptyDescription="Start authoring your first university-level curriculum for students."
        emptyAction={
          <Link to="/mentor/courses/new">
            <Button size="sm" variant="primary">
              Create New Course
            </Button>
          </Link>
        }
      />
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/mentor/MentorDashboardPage.tsx -->
## src/pages/mentor/MentorDashboardPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { coursesService } from '../../services/courses.service';
import { assignmentsService } from '../../services/assignments.service';
import { Course, Assignment, AssignmentSubmission } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import {
  BookOpen,
  ClipboardList,
  FileCheck,
  Users,
  PlusCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const MentorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      coursesService.getCourses(),
      assignmentsService.getAssignments(),
      assignmentsService.getSubmissions(),
    ]).then(([allCourses, allAsg, allSubs]) => {
      if (isMounted) {
        setCourses(allCourses);
        setAssignments(allAsg);
        setSubmissions(allSubs);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading instructor dashboard..." />;
  }

  const pendingGradingCount = submissions.filter((s) => s.status === 'SUBMITTED').length;
  const totalStudents = courses.reduce((acc, c) => acc + (c.enrolledStudentsCount || 0), 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Faculty Dashboard: ${user?.fullName || 'Instructor'}`}
        description="Manage your university courses, review submitted code assignments, and provide graded feedback."
        breadcrumbs={[{ label: 'Mentor', href: '/mentor/dashboard' }, { label: 'Dashboard' }]}
        actions={
          <div className="flex gap-2.5">
            <Link to="/mentor/assignments/new">
              <Button size="sm" variant="outline" leftIcon={<ClipboardList className="w-4 h-4" />}>
                Create Assignment
              </Button>
            </Link>
            <Link to="/mentor/courses/new">
              <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
                Author New Course
              </Button>
            </Link>
          </div>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Authored Courses</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{courses.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Enrolled</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{totalStudents}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Pending Review</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{pendingGradingCount}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Assignments</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{assignments.length}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Managed Courses */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Courses</CardTitle>
            <Link to="/mentor/courses">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 text-sm truncate">{course.title}</h4>
                    <StatusBadge status={course.status} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {course.enrolledStudentsCount} students enrolled • {course.materials?.length || 0} materials
                  </p>
                </div>

                <Link to={`/mentor/courses/${course.id}/edit`}>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Submissions awaiting grade */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Learner Submissions</CardTitle>
            <Link to="/mentor/submissions">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Grading Desk
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 text-sm truncate">
                      {sub.assignmentTitle}
                    </h4>
                    <StatusBadge status={sub.status} />
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Student: <strong>{sub.studentName}</strong> ({sub.studentEmail})
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Submitted: {formatDate(sub.submittedAt)}
                  </p>
                </div>

                <Link to="/mentor/submissions">
                  <Button size="sm" variant={sub.status === 'SUBMITTED' ? 'primary' : 'outline'}>
                    {sub.status === 'SUBMITTED' ? 'Grade' : 'Review'}
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/mentor/MentorMaterialsPage.tsx -->
## src/pages/mentor/MentorMaterialsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { coursesService } from '../../services/courses.service';
import { Course, CourseMaterial } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { FileUpload } from '../../components/ui/FileUpload';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { PlusCircle, FileText, Video, Download, Layers } from 'lucide-react';
import { toast } from 'sonner';

export const MentorMaterialsPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState<'PDF' | 'VIDEO' | 'DOCUMENT'>('PDF');
  const [matUrl, setMatUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    coursesService.getCourses().then((list) => {
      setCourses(list);
      if (list.length > 0) setSelectedCourseId(list[0].id);
      setLoading(false);
    });
  }, []);

  const activeCourse = courses.find((c) => c.id === selectedCourseId);

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId || !matTitle.trim()) {
      toast.error('Title is required');
      return;
    }

    setSubmitting(true);
    try {
      const updated = await coursesService.addMaterial(selectedCourseId, {
        title: matTitle,
        type: matType,
        url: matUrl || 'https://example.com/material-link.pdf',
        size: '3.5 MB',
      });

      setCourses((prev) => prev.map((c) => (c.id === selectedCourseId ? updated : c)));
      toast.success('Course material uploaded and added to curriculum!');
      setModalOpen(false);
      setMatTitle('');
      setMatUrl('');
    } catch {
      toast.error('Failed to add material');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading curriculum resources..." />;
  }

  const courseOptions = courses.map((c) => ({ value: c.id, label: c.title }));
  const typeOptions = [
    { value: 'PDF', label: 'PDF Lecture Slides' },
    { value: 'VIDEO', label: 'Recorded Lecture Video' },
    { value: 'DOCUMENT', label: 'Guide / Reading Document' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Educational Materials"
        description="Upload lecture slides, reading syllabi, video links, and practical lab handbooks."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'Course Materials' },
        ]}
        actions={
          <Button
            size="sm"
            variant="primary"
            onClick={() => setModalOpen(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Upload Material
          </Button>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
        <label className="text-xs font-semibold uppercase text-neutral-500 shrink-0">
          Select Course Curriculum:
        </label>
        <div className="w-full sm:w-96">
          <Select
            options={courseOptions}
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          />
        </div>
      </div>

      {activeCourse && (
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{activeCourse.title}</CardTitle>
              <p className="text-xs text-neutral-500 mt-1">
                {activeCourse.materials?.length || 0} attached educational resources
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {activeCourse.materials && activeCourse.materials.length > 0 ? (
              <div className="space-y-3">
                {activeCourse.materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-4 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center">
                        {mat.type === 'VIDEO' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 text-sm">{mat.title}</h4>
                        <p className="text-xs text-neutral-500">
                          {mat.type} • {mat.size || mat.duration || 'Resource'} • Uploaded:{' '}
                          {formatDate(mat.uploadedAt)}
                        </p>
                      </div>
                    </div>

                    <a
                      href={mat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-neutral-500">
                No materials uploaded yet for this course. Click "Upload Material" to attach slides or lab files.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upload Material Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload Educational Material"
        description={`Target Course: ${activeCourse?.title || ''}`}
      >
        <form onSubmit={handleAddMaterial} className="space-y-4 mt-3">
          <Input
            label="Resource Title"
            placeholder="e.g. Week 4: Relational Normalization & SQL Queries"
            value={matTitle}
            onChange={(e) => setMatTitle(e.target.value)}
            required
          />

          <Select
            label="Resource Type"
            options={typeOptions}
            value={matType}
            onChange={(e) => setMatType(e.target.value as any)}
          />

          <FileUpload
            label="Document / Slide File (PDF, DOCX)"
            purpose="COURSE_MATERIAL"
            onUploadSuccess={(res) => setMatUrl(res.url)}
            helperText="Upload lecture slides or guides for student download."
          />

          <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Add to Course
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/mentor/MentorStudentsPage.tsx -->
## src/pages/mentor/MentorStudentsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { enrollmentsService } from '../../services/enrollments.service';
import { coursesService } from '../../services/courses.service';
import { Enrollment, Course } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { ErrorState } from '../../components/feedback/ErrorState';
import { getInitials, formatDate } from '../../utils';
import { toast } from 'sonner';
import {
  Users,
  Search,
  BookOpen,
  GraduationCap,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

export const MentorStudentsPage: React.FC = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Detail Modal
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const instructorId = user?.id || 'user-mentor-1';

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [allCourses, allEnrollments] = await Promise.all([
        coursesService.getCourses(),
        enrollmentsService.getInstructorStudents(instructorId),
      ]);

      // Filter courses strictly taught by this instructor
      const instructorCourses = allCourses.filter((c) => c.instructorId === instructorId);
      setCourses(instructorCourses);
      setEnrollments(allEnrollments);
    } catch (err: any) {
      setError(err.message || 'Failed to load enrolled students list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [instructorId]);

  // Client-side filtering
  const filteredEnrollments = enrollments.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.studentDepartment && item.studentDepartment.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCourse = selectedCourseId === 'ALL' || item.courseId === selectedCourseId;
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleUpdateStatus = async (newStatus: 'ACTIVE' | 'COMPLETED' | 'DROPPED') => {
    if (!selectedEnrollment) return;
    setUpdatingStatus(true);
    try {
      const updated = await enrollmentsService.updateEnrollmentStatus(selectedEnrollment.id, newStatus);
      setEnrollments((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      setSelectedEnrollment(updated);
      toast.success(`Enrollment marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update enrollment status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Metrics
  const totalEnrolled = enrollments.length;
  const activeCount = enrollments.filter((e) => e.status === 'ACTIVE').length;
  const completedCount = enrollments.filter((e) => e.status === 'COMPLETED').length;
  const avgProgress =
    totalEnrolled > 0
      ? Math.round(enrollments.reduce((acc, curr) => acc + curr.progressPercentage, 0) / totalEnrolled)
      : 0;

  if (loading) {
    return <LoadingSpinner size="lg" label="Retrieving enrolled students roster..." />;
  }

  if (error) {
    return <ErrorState title="Unable to Load Students" message={error} onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enrolled Students Roster"
        description="Monitor student progress, review course engagement, and track learning milestones across your assigned courses."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'Students' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex border border-neutral-200 rounded-lg p-0.5 bg-neutral-100">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'table' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Table view"
                aria-label="Table view"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Enrolled</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{totalEnrolled}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Active Students</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{activeCount}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Completions</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{completedCount}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Avg. Progress</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{avgProgress}%</p>
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="bg-white">
        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-5">
              <SearchInput
                placeholder="Search by student name, email, or department..."
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </div>

            <div className="sm:col-span-4">
              <Select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                options={[
                  { value: 'ALL', label: 'All Instructor Courses' },
                  ...courses.map((c) => ({ value: c.id, label: c.title })),
                ]}
              />
            </div>

            <div className="sm:col-span-3">
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                options={[
                  { value: 'ALL', label: 'All Statuses' },
                  { value: 'ACTIVE', label: 'Active Learners' },
                  { value: 'COMPLETED', label: 'Completed Course' },
                  { value: 'DROPPED', label: 'Dropped' },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roster Display */}
      {filteredEnrollments.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="No Students Found"
          description={
            searchQuery || selectedCourseId !== 'ALL' || selectedStatus !== 'ALL'
              ? 'No enrolled student records match your selected criteria. Try adjusting your search query or filters.'
              : 'There are currently no students enrolled in your courses.'
          }
          action={
            (searchQuery || selectedCourseId !== 'ALL' || selectedStatus !== 'ALL') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCourseId('ALL');
                  setSelectedStatus('ALL');
                }}
              >
                Reset Filters
              </Button>
            )
          }
        />
      ) : viewMode === 'table' ? (
        /* Table View */
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/75 text-neutral-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 sm:px-6">Student</th>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Enrollment Date</th>
                  <th className="py-3.5 px-4">Learning Progress</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredEnrollments.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/60 transition-colors">
                    {/* Student Info */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        {item.studentAvatarUrl ? (
                          <img
                            src={item.studentAvatarUrl}
                            alt={item.studentName}
                            className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {getInitials(item.studentName)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-neutral-900 text-xs sm:text-sm truncate">
                            {item.studentName}
                          </p>
                          <p className="text-neutral-500 text-[11px] truncate">{item.studentEmail}</p>
                          {item.studentUniversity && (
                            <p className="text-[10px] text-neutral-400 truncate">
                              {item.studentUniversity} • {item.studentDepartment}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-neutral-800 line-clamp-1 max-w-xs">
                        {item.courseTitle}
                      </p>
                    </td>

                    {/* Enrollment Date */}
                    <td className="py-3.5 px-4 text-neutral-600 whitespace-nowrap">
                      {formatDate(item.enrollmentDate)}
                    </td>

                    {/* Progress Bar */}
                    <td className="py-3.5 px-4">
                      <div className="w-36 space-y-1">
                        <div className="flex justify-between text-[11px] text-neutral-500">
                          <span>{item.completedLessonsCount}/{item.totalLessonsCount} lessons</span>
                          <span className="font-bold text-neutral-800">{item.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              item.progressPercentage === 100
                                ? 'bg-emerald-600'
                                : item.progressPercentage >= 50
                                ? 'bg-brand-700'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${item.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          item.status === 'COMPLETED'
                            ? 'success'
                            : item.status === 'ACTIVE'
                            ? 'brand'
                            : 'neutral'
                        }
                      >
                        {item.status === 'COMPLETED'
                          ? 'Completed'
                          : item.status === 'ACTIVE'
                          ? 'Active'
                          : 'Dropped'}
                      </Badge>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedEnrollment(item)}
                        rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrollments.map((item) => (
            <Card key={item.id} className="bg-white p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {item.studentAvatarUrl ? (
                      <img
                        src={item.studentAvatarUrl}
                        alt={item.studentName}
                        className="w-12 h-12 rounded-full object-cover border border-neutral-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {getInitials(item.studentName)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm">{item.studentName}</h4>
                      <p className="text-xs text-neutral-500">{item.studentEmail}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.status === 'COMPLETED'
                        ? 'success'
                        : item.status === 'ACTIVE'
                        ? 'brand'
                        : 'neutral'
                    }
                  >
                    {item.status}
                  </Badge>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1">
                  <p className="text-xs font-semibold text-neutral-800 line-clamp-1">
                    {item.courseTitle}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Enrolled: {formatDate(item.enrollmentDate)}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Course Progress</span>
                    <span className="font-bold text-neutral-800">{item.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-700 rounded-full"
                      style={{ width: `${item.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <a
                  href={`mailto:${item.studentEmail}`}
                  className="text-xs text-brand-800 font-semibold hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact
                </a>
                <Button size="sm" variant="outline" onClick={() => setSelectedEnrollment(item)}>
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Student Details Modal */}
      {selectedEnrollment && (
        <Modal
          isOpen={Boolean(selectedEnrollment)}
          onClose={() => setSelectedEnrollment(null)}
          title="Student Enrollment Record"
          size="md"
        >
          <div className="space-y-5">
            {/* Header info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              {selectedEnrollment.studentAvatarUrl ? (
                <img
                  src={selectedEnrollment.studentAvatarUrl}
                  alt={selectedEnrollment.studentName}
                  className="w-14 h-14 rounded-full object-cover border border-neutral-300"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-base">
                  {getInitials(selectedEnrollment.studentName)}
                </div>
              )}
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  {selectedEnrollment.studentName}
                </h3>
                <p className="text-xs text-neutral-500">{selectedEnrollment.studentEmail}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={selectedEnrollment.status === 'COMPLETED' ? 'success' : 'brand'}>
                    {selectedEnrollment.status}
                  </Badge>
                  <span className="text-[11px] text-neutral-400">
                    Enrolled: {formatDate(selectedEnrollment.enrollmentDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                  University
                </span>
                <span className="font-medium text-neutral-800">
                  {selectedEnrollment.studentUniversity || 'Addis Ababa University'}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                  Department
                </span>
                <span className="font-medium text-neutral-800">
                  {selectedEnrollment.studentDepartment || 'Computer Science'}
                </span>
              </div>
            </div>

            {/* Course & Progress Details */}
            <div className="space-y-3 p-4 rounded-xl border border-neutral-200 bg-white">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Course Enrollment
              </h4>
              <p className="text-sm font-semibold text-neutral-900">
                {selectedEnrollment.courseTitle}
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>
                    Lessons Completed: {selectedEnrollment.completedLessonsCount} /{' '}
                    {selectedEnrollment.totalLessonsCount}
                  </span>
                  <span className="font-bold text-neutral-900">
                    {selectedEnrollment.progressPercentage}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-700 rounded-full transition-all duration-300"
                    style={{ width: `${selectedEnrollment.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Status Change Controls for Instructor */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <label className="text-xs font-bold text-neutral-700 block">
                Update Student Enrollment Status
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedEnrollment.status === 'ACTIVE' ? 'primary' : 'outline'}
                  disabled={updatingStatus || selectedEnrollment.status === 'ACTIVE'}
                  onClick={() => handleUpdateStatus('ACTIVE')}
                >
                  Set Active
                </Button>
                <Button
                  size="sm"
                  variant={selectedEnrollment.status === 'COMPLETED' ? 'primary' : 'outline'}
                  disabled={updatingStatus || selectedEnrollment.status === 'COMPLETED'}
                  onClick={() => handleUpdateStatus('COMPLETED')}
                >
                  Mark Completed
                </Button>
                <Button
                  size="sm"
                  variant={selectedEnrollment.status === 'DROPPED' ? 'danger' : 'ghost'}
                  disabled={updatingStatus || selectedEnrollment.status === 'DROPPED'}
                  onClick={() => handleUpdateStatus('DROPPED')}
                >
                  Drop Student
                </Button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
              <a
                href={`mailto:${selectedEnrollment.studentEmail}`}
                className="text-xs text-brand-800 font-semibold hover:underline flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                Send Email to Student
              </a>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEnrollment(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/mentor/MentorSubmissionsPage.tsx -->
## src/pages/mentor/MentorSubmissionsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { assignmentsService } from '../../services/assignments.service';
import { AssignmentSubmission } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { formatDate } from '../../utils';
import { Award, FileCheck, CheckCircle2, User, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const MentorSubmissionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [gradingSub, setGradingSub] = useState<AssignmentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(95);
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [savingGrade, setSavingGrade] = useState(false);

  const loadSubmissions = async () => {
    try {
      const list = await assignmentsService.getSubmissions();
      setSubmissions(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleOpenGrading = (sub: AssignmentSubmission) => {
    setGradingSub(sub);
    setGradeInput(sub.grade !== undefined ? sub.grade : 95);
    setFeedbackInput(sub.feedback || 'Great solution. Clear structure and adherence to guidelines.');
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSub) return;

    if (gradeInput < 0 || gradeInput > 100) {
      toast.error('Grade must be between 0 and 100');
      return;
    }

    setSavingGrade(true);
    try {
      await assignmentsService.gradeSubmission(gradingSub.id, gradeInput, feedbackInput);
      toast.success(`Grade saved for ${gradingSub.studentName}!`);
      setGradingSub(null);
      await loadSubmissions();
    } catch {
      toast.error('Failed to save grade');
    } finally {
      setSavingGrade(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading student submissions..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Submissions & Grading Desk"
        description="Review submitted code solutions, test suites, and provide constructive academic feedback."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'Submissions' },
        ]}
      />

      {submissions.length === 0 ? (
        <EmptyState
          icon={<FileCheck className="w-8 h-8" />}
          title="No Student Submissions Yet"
          description="Submissions will appear here once students submit their completed coursework assignments."
        />
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <Card key={sub.id} className="bg-white hover:border-brand-300 transition-colors">
              <CardContent className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-brand-800 uppercase tracking-wider">
                      {sub.courseTitle}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 mt-1">
                      {sub.assignmentTitle}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {sub.grade !== undefined && (
                      <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        Score: {sub.grade}/100
                      </span>
                    )}
                    <StatusBadge status={sub.status} />
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                  <span className="flex items-center gap-1 font-semibold text-neutral-900">
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    {sub.studentName}
                  </span>
                  <span>({sub.studentEmail})</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    Submitted: {formatDate(sub.submittedAt)}
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-800 space-y-1.5">
                  <p className="font-bold text-neutral-900">Student Solution & Notes:</p>
                  <p className="leading-relaxed whitespace-pre-line">{sub.content}</p>
                </div>

                {sub.feedback && (
                  <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-200 text-xs text-brand-900">
                    <p className="font-bold flex items-center gap-1 mb-0.5">
                      <Award className="w-3.5 h-3.5 text-brand-700" /> Graded Feedback:
                    </p>
                    <p className="text-neutral-700">{sub.feedback}</p>
                  </div>
                )}

                <div className="flex justify-end pt-2 border-t border-neutral-100">
                  <Button
                    size="sm"
                    variant={sub.status === 'SUBMITTED' ? 'primary' : 'outline'}
                    onClick={() => handleOpenGrading(sub)}
                    leftIcon={<Award className="w-4 h-4" />}
                  >
                    {sub.status === 'SUBMITTED' ? 'Grade Submission' : 'Update Grade & Feedback'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Grading Modal */}
      {gradingSub && (
        <Modal
          isOpen={!!gradingSub}
          onClose={() => setGradingSub(null)}
          title={`Grade: ${gradingSub.studentName}`}
          description={`Assignment: ${gradingSub.assignmentTitle}`}
          maxWidth="md"
        >
          <form onSubmit={handleSaveGrade} className="space-y-4 mt-3">
            <Input
              label="Assigned Score (0 - 100)"
              type="number"
              min={0}
              max={100}
              value={gradeInput}
              onChange={(e) => setGradeInput(Number(e.target.value))}
              required
            />

            <Textarea
              label="Constructive Feedback & Notes for Student"
              placeholder="Highlight strengths, architecture advice, and areas for improvement..."
              rows={5}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              required
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setGradingSub(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={savingGrade}>
                Submit Evaluation
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/AboutPage.tsx -->
## src/pages/public/AboutPage.tsx

```tsx
import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { GraduationCap, Briefcase, Award, ShieldCheck, Heart, Sparkles, Building2, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <PageHeader
        title="About AddisBuilder’s"
        description="A specialized university learning and internship linkage platform connecting higher education with the technology industry."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-brand-900 to-forest p-8 text-white">
          <Badge className="bg-brand-700/60 text-brand-100 border-brand-600 mb-4">Our Mission</Badge>
          <h2 className="text-2xl font-bold mb-3">Empowering The Next Generation of Tech Leaders</h2>
          <p className="text-neutral-200 text-sm leading-relaxed">
            AddisBuilder’s was engineered to eliminate the gap between university theoretical curricula and practical workplace requirements. By providing verified faculty-guided courses and vetted industry internships, we enable Ethiopian students to build demonstrated, project-based capability.
          </p>
        </Card>

        <Card className="bg-white p-8 border border-neutral-200">
          <Badge variant="brand" className="mb-4">Challenge Identity</Badge>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">Brolf Tech Remote Internship Challenge 2026</h2>
          <p className="text-neutral-600 text-sm leading-relaxed">
            AddisBuilder’s represents the official frontend engineering deliverable for Team AddisBuilder’s in the Brolf Tech Remote Internship Challenge 2026. The solution incorporates enterprise-grade architectural standards: multi-role role-based access control, TypeScript type safety, and responsive design systems.
          </p>
        </Card>
      </div>

      {/* Core Values */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-6 text-center">Core Pillars of AddisBuilder’s</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-base">Academic Integrity</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Curricula aligned with university standards and led by verified faculty mentors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-base">Vetted Employers</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every employer submits official business licenses and TIN verification before publishing listings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-base">Institutional Linkage</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              University internship coordinators validate academic compliance and track student placement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-base">Demonstrated Skills</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Evaluations based on real submitted code assignments, review feedback, and tangible deliverables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/AccessDeniedPage.tsx -->
## src/pages/public/AccessDeniedPage.tsx

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, ArrowLeft, LayoutDashboard, LogOut } from 'lucide-react';
import { USER_ROLES } from '../../constants';

export const AccessDeniedPage: React.FC = () => {
  const { user, role, logout } = useAuth();

  const userDashboard = role ? USER_ROLES[role]?.defaultPath : '/login';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-neutral-200/90 shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Access Restricted</h1>
        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          You do not have administrative authorization to view this protected section.
        </p>

        {user && (
          <div className="mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
            <p>
              Signed in as: <strong className="text-neutral-900">{user.fullName}</strong>
            </p>
            <p className="mt-0.5">
              Assigned Role: <span className="font-semibold text-brand-800">{USER_ROLES[user.role]?.label}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5 mt-6 justify-center">
          <Link to={userDashboard}>
            <Button variant="primary" size="sm" className="w-full" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
              Go to My Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            leftIcon={<LogOut className="w-4 h-4 text-neutral-500" />}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/ContactPage.tsx -->
## src/pages/public/ContactPage.tsx

```tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '../../schemas';
import { PageHeader } from '../../components/common/PageHeader';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate contact form submission
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitted(true);
    toast.success('Your message has been received! Our support team will respond shortly.');
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader
        title="Contact AddisBuilder’s Support"
        description="Have questions regarding university linkage, employer verification, or course participation? We are here to help."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900">Get in Touch</h2>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Reach our academic relations and technical support desk during university business hours.
            </p>

            <div className="space-y-3 pt-2 text-xs text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                <span>Addis Ababa, Bole Sub-City, Ethiopia</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-800 shrink-0" />
                <span>support@addisbuilder.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-800 shrink-0" />
                <span>+251 11 661 2345</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-50/70 p-6 rounded-2xl border border-brand-200 text-xs text-brand-900 space-y-2">
            <h3 className="font-bold text-sm">Institutional Coordination</h3>
            <p className="leading-relaxed">
              For university departments wishing to establish official internship linkage programs, please select "Internship Coordinator" during registration.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Message Delivered</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Thank you for reaching out. A platform coordinator will review your inquiry and follow up within one business day.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    placeholder="e.g. Abebe Kebede"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. abebe@aau.edu"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="Inquiry regarding course enrollment / internship listing"
                  {...register('subject')}
                  error={errors.subject?.message}
                  required
                />

                <Textarea
                  label="Message"
                  placeholder="Please describe your question or request in detail..."
                  rows={5}
                  {...register('message')}
                  error={errors.message?.message}
                  required
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-4 h-4" />}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/CoordinatorPendingPage.tsx -->
## src/pages/public/CoordinatorPendingPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { coordinatorsService } from '../../services/coordinators.service';
import { ApprovalStatus } from '../../types';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Clock, AlertTriangle, ShieldCheck, RefreshCw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CoordinatorPendingPage: React.FC = () => {
  const { user, logout, updateCurrentUser } = useAuth();
  const [status, setStatus] = useState<ApprovalStatus>(user?.coordinatorStatus || 'PENDING');
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  const checkStatus = async () => {
    setChecking(true);
    try {
      const res = await coordinatorsService.getMyStatus();
      setStatus(res.status);
      updateCurrentUser({ coordinatorStatus: res.status });
      if (res.status === 'APPROVED') {
        toast.success('Congratulations! Your coordinator authorization has been approved.');
        navigate('/internship-manager/dashboard');
      } else {
        toast.info(`Current status: ${res.status}`);
      }
    } catch {
      toast.error('Failed to check approval status');
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl border border-neutral-200/90 shadow-sm text-center">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            status === 'PENDING'
              ? 'bg-amber-100 text-amber-700'
              : status === 'REJECTED'
              ? 'bg-red-100 text-red-600'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {status === 'PENDING' ? (
            <Clock className="w-8 h-8 animate-pulse" />
          ) : status === 'REJECTED' ? (
            <AlertTriangle className="w-8 h-8" />
          ) : (
            <ShieldCheck className="w-8 h-8" />
          )}
        </div>

        <div className="mb-2">
          <StatusBadge status={status} />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-3">
          Coordinator Verification In Progress
        </h1>

        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          {status === 'PENDING' &&
            'Your institutional internship coordinator credentials are currently awaiting review by the Super Administrator. Once verified against your university records, listing management features will be unlocked automatically.'}
          {status === 'REJECTED' &&
            'Your coordinator authorization request could not be approved. Please verify your employee ID and institutional documentation with support.'}
          {status === 'SUSPENDED' &&
            'Your coordinator account permissions have been temporarily suspended. Please contact the platform administration.'}
          {status === 'APPROVED' &&
            'Your authorization has been granted! You may now access the Internship Coordinator management dashboard.'}
        </p>

        <div className="mt-5 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left text-xs text-neutral-600 space-y-1.5">
          <p>
            <strong className="text-neutral-900">Coordinator:</strong> {user?.fullName}
          </p>
          <p>
            <strong className="text-neutral-900">University:</strong> {user?.university || 'University Office'}
          </p>
          <p>
            <strong className="text-neutral-900">Department:</strong> {user?.department || 'Career Linkage'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <Button
            variant="primary"
            size="sm"
            onClick={checkStatus}
            isLoading={checking}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Check Status Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/CourseDetailPage.tsx -->
## src/pages/public/CourseDetailPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { coursesService } from '../../services/courses.service';
import { Course } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorState } from '../../components/feedback/ErrorState';
import {
  Clock,
  Users,
  CheckCircle2,
  FileText,
  Video,
  Download,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseId) return;
    coursesService
      .getCourseById(courseId)
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [courseId]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.info('Please sign in as a student to enroll in this course');
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }

    if (user?.role !== 'LEARNER') {
      toast.error('Only Student / Learner accounts can enroll in courses.');
      return;
    }

    if (!course) return;

    setEnrolling(true);
    try {
      await coursesService.enrollCourse(course.id);
      toast.success(`Successfully enrolled in "${course.title}"!`);
      navigate('/learner/courses');
    } catch (err: any) {
      toast.error(err.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <LoadingSpinner size="lg" label="Loading course curriculum details..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ErrorState
          title="Course Not Found"
          message="The requested course could not be located. It may have been unpublished or removed."
          onRetry={() => navigate('/courses')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        to="/courses"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-brand-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="brand">{course.category}</Badge>
              <Badge variant="neutral">{course.level}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-base text-neutral-600 mt-3 leading-relaxed">
              {course.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 mt-4 pt-4 border-t border-neutral-200">
              <span className="flex items-center gap-1.5 font-medium text-neutral-700">
                <Clock className="w-4 h-4 text-brand-700" />
                Duration: {course.durationWeeks} Weeks
              </span>
              <span className="flex items-center gap-1.5 font-medium text-neutral-700">
                <Users className="w-4 h-4 text-brand-700" />
                {course.enrolledStudentsCount} Students Enrolled
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900">About This Course</h2>
            <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
              {course.description}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900">What You Will Master</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Materials Preview */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900">Course Materials & Modules</h2>
              <span className="text-xs text-neutral-500 font-medium">
                {course.materials?.length || 0} Resources Available
              </span>
            </div>

            {course.materials && course.materials.length > 0 ? (
              <div className="space-y-2.5">
                {course.materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-3.5 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/60 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center">
                        {mat.type === 'VIDEO' ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-neutral-900">{mat.title}</p>
                        <p className="text-[11px] text-neutral-500">
                          {mat.type} • {mat.size || mat.duration || 'Resource'}
                        </p>
                      </div>
                    </div>

                    <a
                      href={mat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Access
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 italic">
                Modules are released progressively throughout the academic semester.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Card */}
        <div className="space-y-6">
          <Card className="shadow-md border-brand-200 bg-white sticky top-24">
            <div className="h-44 overflow-hidden relative">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6 space-y-5">
              <div className="text-center">
                <span className="text-2xl font-black text-brand-900">Free University Access</span>
                <p className="text-xs text-neutral-500 mt-1">Accredited by partnering universities</p>
              </div>

              {course.isEnrolled ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <p className="text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    You are enrolled in this course
                  </p>
                  <Link to="/learner/courses" className="mt-2 block">
                    <Button variant="primary" size="sm" className="w-full">
                      Open in Student Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleEnroll}
                  isLoading={enrolling}
                >
                  Enroll Now
                </Button>
              )}

              {/* Instructor info card */}
              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
                {course.instructorAvatar ? (
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructorName}
                    className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold">
                    {course.instructorName[0]}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Instructor</p>
                  <p className="text-sm font-bold text-neutral-900 truncate">{course.instructorName}</p>
                  <p className="text-xs text-neutral-500 truncate">{course.instructorTitle || 'University Lecturer'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/CoursesPage.tsx -->
## src/pages/public/CoursesPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesService } from '../../services/courses.service';
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
import { BookOpen, Users, Clock, Award } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [loading, setLoading] = useState(true);

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
    { value: 'All', label: 'All Categories' },
    ...COURSE_CATEGORIES.map((c) => ({ value: c, label: c })),
  ];

  const levelOptions = [
    { value: 'All', label: 'All Levels' },
    ...COURSE_LEVELS,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader
        title="Explore University Courses"
        description="Comprehensive technical and engineering curricula designed by university faculty and industry practitioners."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Courses' }]}
      />

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search courses by title, topic, or keyword..."
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
            <Card key={course.id} hoverEffect className="flex flex-col h-full bg-white">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="brand">{course.category}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-semibold bg-neutral-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {course.level}
                  </span>
                </div>
              </div>

              <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {course.durationWeeks} Weeks
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      {course.enrolledStudentsCount} Enrolled
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {course.instructorAvatar ? (
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructorName}
                        className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-brand-800 text-white flex items-center justify-center text-xs font-bold">
                        {course.instructorName[0]}
                      </div>
                    )}
                    <span className="text-xs font-medium text-neutral-700 truncate max-w-[120px]">
                      {course.instructorName}
                    </span>
                  </div>

                  <Link to={`/courses/${course.id}`}>
                    <Button size="sm" variant="primary">
                      View Details
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

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/HomePage.tsx -->
## src/pages/public/HomePage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { coursesService } from '../../services/courses.service';
import { internshipsService } from '../../services/internships.service';
import { Course, Internship } from '../../types';
import {
  GraduationCap,
  Briefcase,
  Users,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Building2,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { formatDate } from '../../utils';

export const HomePage: React.FC = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [featuredInternships, setFeaturedInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([coursesService.getCourses(), internshipsService.getInternships()]).then(
      ([courses, internships]) => {
        if (isMounted) {
          setFeaturedCourses(courses.slice(0, 3));
          setFeaturedInternships(internships.slice(0, 3));
          setLoading(false);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-neutral-50 pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-900 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Brolf Tech Remote Internship Challenge 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
            Bridging Ethiopian Academic Excellence With{' '}
            <span className="text-brand-800 underline decoration-brand-300 decoration-wavy underline-offset-8">
              Industry Careers
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
            AddisBuilder’s unites students, faculty mentors, university internship coordinators, and verified employers into one cohesive, production-grade learning and career ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/courses" className="w-full sm:w-auto">
              <Button size="lg" className="w-full" leftIcon={<BookOpen className="w-4 h-4" />}>
                Explore Courses
              </Button>
            </Link>
            <Link to="/internships" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full" leftIcon={<Briefcase className="w-4 h-4" />}>
                Browse Internships
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="w-full">
                Platform Services
              </Button>
            </Link>
          </div>

          {/* Key Stat Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-neutral-200/80 max-w-4xl mx-auto">
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-900">100%</p>
              <p className="text-xs text-neutral-500 font-medium mt-1">Verified Organizations</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-900">5 Roles</p>
              <p className="text-xs text-neutral-500 font-medium mt-1">Unified Multi-Dashboard</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-900">Practical</p>
              <p className="text-xs text-neutral-500 font-medium mt-1">Coursework & Assignments</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-900">Audited</p>
              <p className="text-xs text-neutral-500 font-medium mt-1">Institutional Governance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Ecosystem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="brand">Ecosystem Architecture</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-3">
            Built for Every Stakeholder in Higher Education
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            AddisBuilder’s provides dedicated workflows tailored to university students, faculty, industry coordinators, employers, and system administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs hover:border-brand-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-sm">Learners</h3>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              Enroll in faculty-led courses, submit assignments, track grading, and apply for verified internships.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs hover:border-brand-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-sm">Mentors</h3>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              Create courses, distribute learning materials, author assignments, and grade student submissions with feedback.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs hover:border-brand-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-sm">Coordinators</h3>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              University linkage officers oversee approved industry listings, track university applicants, and monitor timelines.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs hover:border-brand-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-sm">Employers</h3>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              Submit organizational credentials, post competitive internships, review CVs, and track candidate pipelines.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs hover:border-brand-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 text-sm">Super Admins</h3>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              Verify organizations, approve institutional coordinators, audit platform operations, and govern content.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="brand">Academic Learning</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-2">
              Featured Industry Courses
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Curated coursework developed by experienced academic faculty and engineering practitioners.
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={`course-skel-${i}`} className="p-5 space-y-4">
                <Skeleton className="h-44 w-full rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </Card>
            ))
          ) : (
            featuredCourses.map((course) => (
              <Card key={course.id} hoverEffect className="flex flex-col h-full">
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="brand">{course.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                    <span className="font-semibold text-neutral-700">{course.level}</span>
                    <span>•</span>
                    <span>{course.durationWeeks} Weeks</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {course.instructorAvatar && (
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span className="text-xs font-medium text-neutral-700">{course.instructorName}</span>
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <Button size="sm" variant="secondary">
                      Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )))}
        </div>
      </section>

      {/* Featured Internships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="brand">Career Acceleration</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-2">
              Featured University Internships
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Verified opportunities from leading technology organizations and accredited institutional partners.
            </p>
          </div>
          <Link to="/internships">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Opportunities
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={`intern-skel-${i}`} className="p-5 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-8 w-full rounded-lg mt-4" />
              </Card>
            ))
          ) : (
            featuredInternships.map((internship) => (
              <Card key={internship.id} hoverEffect className="flex flex-col h-full">
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Badge variant="brand">{internship.category}</Badge>
                    <Badge variant="neutral">{internship.workMode}</Badge>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 leading-snug line-clamp-2">
                    {internship.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-800 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {internship.organizationName}
                  </p>

                  <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                    {internship.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {internship.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Deadline: {formatDate(internship.deadline)}
                    </span>
                  </div>

                  <Link to={`/internships/${internship.id}`} className="block">
                    <Button variant="primary" size="sm" className="w-full">
                      View Opportunity
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-neutral-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs uppercase font-semibold text-brand-400 tracking-wider">
            Operational Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2 text-white">
            How AddisBuilder’s Connects Academic Learning to Employment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-neutral-800/60 rounded-2xl border border-neutral-700/60">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-base mb-2">Build Verified Competencies</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Students complete faculty-guided courses, submit verified code assignments, and receive structured grading.
            </p>
          </div>

          <div className="text-center p-6 bg-neutral-800/60 rounded-2xl border border-neutral-700/60">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-base mb-2">Discover Verified Internships</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Apply to opportunities vetted by university internship coordinators and verified corporate partners.
            </p>
          </div>

          <div className="text-center p-6 bg-neutral-800/60 rounded-2xl border border-neutral-700/60">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-base mb-2">Launch Professional Career</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Track recruitment reviews, receive transparent status updates, and secure accredited practical industry experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/InternshipDetailPage.tsx -->
## src/pages/public/InternshipDetailPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { applicationsService } from '../../services/applications.service';
import { Internship } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { FileUpload } from '../../components/ui/FileUpload';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorState } from '../../components/feedback/ErrorState';
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { formatDate } from '../../utils';
import { toast } from 'sonner';

export const InternshipDetailPage: React.FC = () => {
  const { internshipId } = useParams<{ internshipId: string }>();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!internshipId) return;
    internshipsService
      .getInternshipById(internshipId)
      .then((data) => {
        setInternship(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [internshipId]);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to save this internship');
      return;
    }
    if (!internship) return;
    try {
      const res = await internshipsService.toggleSave(internship.id);
      setInternship((prev) => (prev ? { ...prev, isSaved: res.isSaved } : null));
      toast.success(res.isSaved ? 'Saved to your dashboard' : 'Removed from saved internships');
    } catch {
      toast.error('Failed to update saved status');
    }
  };

  const handleOpenApplyModal = () => {
    if (!isAuthenticated) {
      toast.info('Please sign in as a student to apply for internships.');
      navigate('/login', { state: { from: `/internships/${internshipId}` } });
      return;
    }

    if (user?.role !== 'LEARNER') {
      toast.error('Only registered Students / Learners can submit internship applications.');
      return;
    }

    setApplyModalOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internship) return;

    if (!coverLetter.trim() || coverLetter.length < 30) {
      setValidationError('Please provide a cover letter of at least 30 characters highlighting your skills.');
      return;
    }

    setValidationError('');
    setSubmitting(true);

    try {
      await applicationsService.apply({
        internshipId: internship.id,
        internshipTitle: internship.title,
        organizationName: internship.organizationName,
        coverLetter,
        cvUrl: cvUrl || user?.cvUrl,
      });

      setInternship((prev) => (prev ? { ...prev, hasApplied: true, applicantsCount: prev.applicantsCount + 1 } : null));
      setApplyModalOpen(false);
      toast.success('Your application has been submitted successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <LoadingSpinner size="lg" label="Loading internship specifications..." />
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ErrorState
          title="Internship Not Found"
          message="The requested listing does not exist or may have reached its application deadline."
          onRetry={() => navigate('/internships')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        to="/internships"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-brand-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Internships
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="brand">{internship.category}</Badge>
                <Badge variant="neutral">{internship.workMode}</Badge>
              </div>

              <button
                onClick={handleToggleSave}
                className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-brand-800 p-2 rounded-lg hover:bg-neutral-50 border border-neutral-200 transition-colors"
              >
                {internship.isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-brand-800 fill-brand-100" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {internship.title}
            </h1>

            <div className="flex items-center gap-2 text-sm font-semibold text-brand-900">
              <Building2 className="w-4 h-4" />
              <span>{internship.organizationName}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <span>{internship.durationMonths} Months Duration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>Deadline: {formatDate(internship.deadline)}</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900">Opportunity Overview</h2>
            <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
              {internship.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900">Key Responsibilities</h2>
            <ul className="space-y-2.5">
              {internship.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-700 shrink-0 mt-2" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements & Qualifications */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900">Candidate Requirements</h2>
            <ul className="space-y-2.5">
              {internship.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="bg-brand-50/50 p-6 rounded-2xl border border-brand-200/80 space-y-2">
            <h3 className="text-sm font-bold text-brand-900">University Eligibility Criteria</h3>
            <p className="text-xs text-neutral-700 leading-relaxed">{internship.eligibility}</p>
          </div>
        </div>

        {/* Sidebar Call To Action */}
        <div className="space-y-6">
          <Card className="shadow-md border-brand-200 bg-white sticky top-24">
            <CardContent className="p-6 space-y-5">
              {internship.stipend && (
                <div className="text-center p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Compensation</p>
                  <p className="text-lg font-bold text-emerald-800 mt-0.5">{internship.stipend}</p>
                </div>
              )}

              <div className="space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Application Deadline:</span>
                  <span className="font-semibold text-neutral-900">{formatDate(internship.deadline)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Work Arrangement:</span>
                  <span className="font-semibold text-neutral-900">{internship.workMode}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Total Applicants:</span>
                  <span className="font-semibold text-neutral-900">{internship.applicantsCount}</span>
                </div>
              </div>

              {internship.hasApplied ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <p className="text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Application Submitted
                  </p>
                  <Link to="/learner/applications" className="mt-2 block">
                    <Button variant="primary" size="sm" className="w-full">
                      Track Application Status
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleOpenApplyModal}
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Apply for Internship
                </Button>
              )}

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-500 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Employer Opportunity</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply to ${internship.title}`}
        description={`Organization: ${internship.organizationName}`}
        maxWidth="lg"
      >
        <form onSubmit={handleApplySubmit} className="space-y-5 mt-4">
          <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs text-neutral-600 space-y-1">
            <p>
              <strong className="text-neutral-900">Applicant:</strong> {user?.fullName} ({user?.email})
            </p>
            {user?.university && (
              <p>
                <strong className="text-neutral-900">Institution:</strong> {user.university} - {user.department}
              </p>
            )}
          </div>

          <Textarea
            label="Cover Letter / Statement of Interest"
            placeholder="Explain why you are an ideal fit for this internship, your technical coursework, and what you aim to achieve..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={5}
            required
            helperText="Minimum 30 characters."
            error={validationError}
          />

          <FileUpload
            label="Resume / Curriculum Vitae (PDF)"
            purpose="CV"
            accept=".pdf,.doc,.docx"
            onUploadSuccess={(res) => setCvUrl(res.url)}
            currentFileName={user?.cvUrl ? 'Default Profile CV' : undefined}
            helperText="Upload an updated resume or use your profile CV."
          />

          <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setApplyModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={submitting}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/InternshipsPage.tsx -->
## src/pages/public/InternshipsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/feedback/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { INTERNSHIP_CATEGORIES, WORK_MODES } from '../../constants';
import { formatDate } from '../../utils';
import { Briefcase, Building2, MapPin, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export const InternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [workMode, setWorkMode] = useState('All');
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    internshipsService
      .getInternships({
        search: search || undefined,
        category: category !== 'All' ? category : undefined,
        workMode: workMode !== 'All' ? workMode : undefined,
      })
      .then((data) => {
        if (isMounted) {
          setInternships(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [search, category, workMode]);

  const handleToggleSave = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info('Sign in as a student to save internships to your dashboard.');
      return;
    }
    try {
      const res = await internshipsService.toggleSave(id);
      setInternships((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isSaved: res.isSaved } : i))
      );
      toast.success(res.isSaved ? 'Internship saved to your list' : 'Internship removed from saved list');
    } catch {
      toast.error('Failed to update saved status');
    }
  };

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    ...INTERNSHIP_CATEGORIES.map((c) => ({ value: c, label: c })),
  ];

  const workModeOptions = [
    { value: 'All', label: 'All Work Modes' },
    ...WORK_MODES,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader
        title="Find University Internships"
        description="Verified practical internship opportunities from industry employers and university industry linkage programs."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Internships' }]}
      />

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by role, company, skills, or city..."
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
              options={workModeOptions}
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Internships List */}
      {loading ? (
        <LoadingSpinner size="lg" label="Searching verified internship listings..." />
      ) : internships.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-8 h-8" />}
          title="No internships found"
          description="We couldn't find any listings matching your search criteria. Try modifying your filters."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('');
                setCategory('All');
                setWorkMode('All');
              }}
            >
              Clear Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <Card key={internship.id} hoverEffect className="flex flex-col h-full bg-white">
              <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="brand">{internship.category}</Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                        {internship.workMode}
                      </span>
                      <button
                        onClick={(e) => handleToggleSave(internship.id, e)}
                        className="text-neutral-400 hover:text-brand-800 transition-colors p-1"
                        title={internship.isSaved ? 'Remove from saved' : 'Save internship'}
                      >
                        {internship.isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-brand-800 fill-brand-100" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 leading-snug line-clamp-2">
                    {internship.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-800 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {internship.organizationName}
                  </p>

                  <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                    {internship.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1 truncate max-w-[140px]">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      {internship.location}
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Deadline: {formatDate(internship.deadline)}
                    </span>
                  </div>

                  {internship.stipend && (
                    <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {internship.stipend}
                    </p>
                  )}

                  <Link to={`/internships/${internship.id}`} className="block">
                    <Button variant="primary" size="sm" className="w-full">
                      View & Apply
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

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/NotFoundPage.tsx -->
## src/pages/public/NotFoundPage.tsx

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-neutral-200/90 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-4xl font-extrabold text-neutral-900 tracking-tight">404</span>
        <h1 className="text-xl font-bold text-neutral-900 tracking-tight mt-1">Page Not Found</h1>
        <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
          The requested address does not exist or has been relocated within the AddisBuilder’s platform.
        </p>

        <div className="flex gap-2.5 mt-6 justify-center">
          <Link to="/">
            <Button variant="primary" size="sm" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => window.history.back()} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/public/ServicesPage.tsx -->
## src/pages/public/ServicesPage.tsx

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  TrendingUp,
  FileCheck,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const coreServices = [
    {
      id: 'courses',
      icon: <BookOpen className="w-7 h-7 text-brand-700" />,
      badge: 'Core Learning',
      title: 'Online Courses & Academic Modules',
      description:
        'Access modular university-level curricula prepared by certified instructors, including lecture videos, downloadable reading resources, and structured syllabi.',
      features: [
        'Curated academic modules with clear learning objectives',
        'Downloadable reading packets, slides, and reference links',
        'Video lectures accessible on desktop and mobile',
        'Continuous content updates tailored to industry demands',
      ],
      actionLabel: 'Browse Course Catalog',
      actionHref: '/courses',
    },
    {
      id: 'mentorship',
      icon: <GraduationCap className="w-7 h-7 text-indigo-700" />,
      badge: 'Faculty Driven',
      title: 'Instructor-Led Instruction & Mentorship',
      description:
        'Direct guidance from university faculty and verified domain mentors who oversee course progression, create assignments, and review submissions with personalized feedback.',
      features: [
        'Dedicated instructor dashboards with student rosters',
        'Assignment distribution with rubric-based grading',
        'Timely constructive feedback on submitted code and projects',
        'Direct announcements and academic milestone notifications',
      ],
      actionLabel: 'Meet Our Faculty',
      actionHref: '/about',
    },
    {
      id: 'progress',
      icon: <TrendingUp className="w-7 h-7 text-emerald-700" />,
      badge: 'Student Analytics',
      title: 'Student Learning-Progress Tracking',
      description:
        'Transparent, real-time analytics monitoring lesson completions, assignment submissions, grading progress, and cumulative course accomplishments.',
      features: [
        'Visual progress indicators across all active enrollments',
        'Assignment submission deadlines and points breakdown',
        'Historical grade logs with instructor feedback',
        'Consolidated performance summaries for university reporting',
      ],
      actionLabel: 'View Student Portal',
      actionHref: '/learner/dashboard',
    },
    {
      id: 'internships',
      icon: <Briefcase className="w-7 h-7 text-purple-700" />,
      badge: 'Career Discovery',
      title: 'Internship Discovery & Applications',
      description:
        'A vetted repository of remote, hybrid, and on-site internship opportunities posted by accredited organizations and university coordinators.',
      features: [
        'Multi-attribute filters by work mode, category, and stipend',
        'Single-click student CV and cover letter application pipeline',
        'Real-time application status tracking (Shortlisted, Accepted)',
        'Direct organizational applicant review workflows',
      ],
      actionLabel: 'Explore Internships',
      actionHref: '/internships',
    },
    {
      id: 'coordination',
      icon: <ShieldCheck className="w-7 h-7 text-amber-700" />,
      badge: 'Institutional Governance',
      title: 'University-Industry Coordination',
      description:
        'Specialized workflows for university internship coordinators and company employers to publish, moderate, and track student placement compliance.',
      features: [
        'Coordinator approval safeguards and institutional verification',
        'Official university compliance and credit verification',
        'Audit-logged status updates and applicant filtering',
        'Direct messaging and verified placement confirmation',
      ],
      actionLabel: 'Join as Employer',
      actionHref: '/register',
    },
    {
      id: 'career',
      icon: <Compass className="w-7 h-7 text-sky-700" />,
      badge: 'Professional Development',
      title: 'Career Readiness & Profile Showcase',
      description:
        'Comprehensive student digital profiles highlighting technical skills, institutional credentials, project portfolios, and uploaded CVs for hiring teams.',
      features: [
        'Personalized profile photo management and institutional bio',
        'Curriculum vitae (CV) document management with preview',
        'Saved internship bookmarking for strategic application cycles',
        'Employer-accessible candidate review directories',
      ],
      actionLabel: 'Build Your Profile',
      actionHref: '/register',
    },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-linear-to-b from-brand-900 via-brand-800 to-brand-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="brand" className="bg-white/10 text-brand-100 border-white/20 mb-4 px-3 py-1">
            Integrated University Solutions
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Academic Excellence Connected to Real-World Internships
          </h1>
          <p className="text-base sm:text-lg text-brand-100/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            AddisBuilder’s delivers end-to-end digital infrastructure uniting students, instructors, internship coordinators, and employer organizations in one reliable ecosystem.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/courses">
              <Button size="lg" variant="primary" className="bg-white text-brand-950 hover:bg-brand-50 font-bold">
                Explore Courses
              </Button>
            </Link>
            <Link to="/internships">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Discover Internships
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-800">Operational Offerings</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Purpose-Built Services For Every Role
          </p>
          <p className="text-sm text-neutral-600 mt-2">
            Every service is backed by active platform modules, robust role-based access, and transparent verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-neutral-200/90 p-7 shadow-xs hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <Badge variant="neutral">{service.badge}</Badge>
                </div>

                <h3 className="text-lg font-bold text-neutral-900">{service.title}</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{service.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100">
                <Link to={service.actionHref} className="block">
                  <Button variant="outline" size="sm" className="w-full justify-center" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {service.actionLabel}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholder Value Section */}
      <section className="bg-white border-y border-neutral-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">For University Students</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Enroll in verified coursework, master practical skills, upload resumes, and connect directly with hiring organizations offering verified internships.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">For Instructors & Mentors</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Manage syllabi, assign real-world projects, track enrolled student progress across classes, and foster career readiness with structured guidance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">For Employers & Coordinators</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Publish vetted internship opportunities, screen candidate resumes with institutional verification, and coordinate seamlessly with academic departments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <div className="bg-brand-900 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Accelerate Your Academic & Career Journey?
            </h3>
            <p className="text-xs sm:text-sm text-brand-100/90 leading-relaxed">
              Join students, faculty, and industry leaders already collaborating on the AddisBuilder’s University Learning & Internship Platform.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link to="/register">
                <Button size="lg" variant="primary" className="bg-white text-brand-950 hover:bg-neutral-100 font-bold">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminAuditLogsPage.tsx -->
## src/pages/super-admin/AdminAuditLogsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { reportsService } from '../../services/reports.service';
import { AuditLog } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { formatDateTime } from '../../utils';
import { ShieldAlert, FileCheck, Terminal } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportsService.getAuditLogs().then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  const columns: Column<AuditLog>[] = [
    {
      key: 'actor',
      header: 'Actor & Role',
      render: (log) => (
        <div>
          <p className="font-semibold text-neutral-900">{log.actorName}</p>
          <Badge variant="neutral" className="mt-0.5 text-[10px]">
            {log.actorRole}
          </Badge>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (log) => (
        <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-1 rounded">
          {log.action}
        </span>
      ),
    },
    {
      key: 'details',
      header: 'Audit Description & Target',
      render: (log) => (
        <div className="max-w-md">
          <p className="text-xs text-neutral-800">{log.details}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">
            {log.targetType} ({log.targetId})
          </p>
        </div>
      ),
    },
    {
      key: 'timestamp',
      header: 'Timestamp (UTC)',
      render: (log) => <span className="text-xs text-neutral-500">{formatDateTime(log.timestamp)}</span>,
    },
    {
      key: 'ip',
      header: 'IP Address',
      render: (log) => (
        <span className="font-mono text-xs text-neutral-500">{log.ipAddress || '197.156.104.22'}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & System Audit Logs"
        description="Immutable chronological audit trail recording sensitive administrative decisions, approvals, and actions."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Audit Logs' },
        ]}
      />

      <DataTable
        columns={columns}
        data={logs}
        isLoading={loading}
        rowKey={(l) => l.id}
        emptyTitle="No audit events found"
        emptyDescription="Platform events and state changes will appear in this audit log."
      />
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminCoordinatorApprovalsPage.tsx -->
## src/pages/super-admin/AdminCoordinatorApprovalsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { coordinatorsService } from '../../services/coordinators.service';
import { CoordinatorRequest, ApprovalStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { formatDate } from '../../utils';
import { GraduationCap, CheckCircle2, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const AdminCoordinatorApprovalsPage: React.FC = () => {
  const [requests, setRequests] = useState<CoordinatorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeReq, setActiveReq] = useState<CoordinatorRequest | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadRequests = async () => {
    try {
      const data = await coordinatorsService.getAdminRequests();
      setRequests(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleDecision = async (decision: ApprovalStatus) => {
    if (!activeReq) return;
    setSubmitting(true);
    try {
      await coordinatorsService.decideRequest(activeReq.id, decision, decisionNotes);
      toast.success(
        `Coordinator request for ${activeReq.fullName} was marked as ${decision}.`
      );
      setActiveReq(null);
      setDecisionNotes('');
      await loadRequests();
    } catch {
      toast.error('Failed to submit decision');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<CoordinatorRequest>[] = [
    {
      key: 'name',
      header: 'Coordinator & University',
      render: (r) => (
        <div>
          <p className="font-semibold text-neutral-900">{r.fullName}</p>
          <p className="text-xs text-brand-800 font-medium">{r.university} - {r.department}</p>
          <p className="text-[11px] text-neutral-400">Employee ID: {r.employeeId}</p>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Institutional Email',
      render: (r) => <span className="text-xs text-neutral-700">{r.email}</span>,
    },
    {
      key: 'requestDate',
      header: 'Request Date',
      render: (r) => <span className="text-xs text-neutral-600">{formatDate(r.requestDate)}</span>,
    },
    {
      key: 'status',
      header: 'Review Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (r) => (
        <Button size="sm" variant="outline" onClick={() => setActiveReq(r)}>
          {r.status === 'PENDING' ? 'Review & Decide' : 'Update Status'}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Coordinator Verifications"
        description="Verify academic employment credentials and authorize university career linkage representatives."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Coordinator Approvals' },
        ]}
      />

      <DataTable
        columns={columns}
        data={requests}
        isLoading={loading}
        rowKey={(r) => r.id}
        emptyTitle="No coordinator requests found"
        emptyDescription="Submitted coordinator requests will appear here for administrative adjudication."
      />

      {/* Decision Modal */}
      {activeReq && (
        <Modal
          isOpen={!!activeReq}
          onClose={() => setActiveReq(null)}
          title={`Adjudicate Coordinator: ${activeReq.fullName}`}
          description={`Institution: ${activeReq.university}`}
          maxWidth="md"
        >
          <div className="space-y-4 mt-3">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-1">
              <p><strong>Department:</strong> {activeReq.department}</p>
              <p><strong>Employee / Staff ID:</strong> {activeReq.employeeId}</p>
              <p><strong>Email Address:</strong> {activeReq.email}</p>
              <p><strong>Application Date:</strong> {formatDate(activeReq.requestDate)}</p>
            </div>

            <Textarea
              label="Administrative Decision Notes"
              placeholder="State verification audit notes, staff badge confirmation, or reason for rejection..."
              rows={3}
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-neutral-100 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveReq(null)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDecision('REJECTED')}
                disabled={submitting}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Reject Request
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDecision('APPROVED')}
                disabled={submitting}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Approve Coordinator
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminCoursesPage.tsx -->
## src/pages/super-admin/AdminCoursesPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { coursesService } from '../../services/courses.service';
import { Course } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ExternalLink, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const AdminCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      const list = await coursesService.getCourses();
      setCourses(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleToggleArchive = async (course: Course) => {
    const newStatus = course.status === 'ARCHIVED' ? 'PUBLISHED' : 'ARCHIVED';
    try {
      await coursesService.updateCourse(course.id, { status: newStatus as any });
      toast.success(`Course "${course.title}" status updated to ${newStatus}.`);
      await loadCourses();
    } catch {
      toast.error('Failed to update course status');
    }
  };

  const columns: Column<Course>[] = [
    {
      key: 'title',
      header: 'Course Title',
      render: (c) => (
        <div>
          <p className="font-semibold text-neutral-900">{c.title}</p>
          <p className="text-xs text-neutral-500">{c.instructorName}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Level',
      render: (c) => (
        <div className="flex flex-col gap-1">
          <Badge variant="brand">{c.category}</Badge>
          <span className="text-[11px] text-neutral-500 font-medium">{c.level}</span>
        </div>
      ),
    },
    {
      key: 'enrolled',
      header: 'Enrolled Learners',
      render: (c) => <span className="font-bold text-neutral-800">{c.enrolledStudentsCount} learners</span>,
    },
    {
      key: 'status',
      header: 'Curriculum Status',
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (c) => (
        <div className="flex items-center justify-end gap-2">
          <Link to={`/courses/${c.id}`} target="_blank">
            <Button size="sm" variant="ghost" title="View Public Course Details">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleToggleArchive(c)}
            leftIcon={<Archive className="w-3.5 h-3.5" />}
          >
            {c.status === 'ARCHIVED' ? 'Unarchive' : 'Archive'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Curriculum & Course Management"
        description="Inspect course content across academic departments, verify syllabus standards, and archive retired curricula."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Courses' },
        ]}
      />

      <DataTable
        columns={columns}
        data={courses}
        isLoading={loading}
        rowKey={(c) => c.id}
        emptyTitle="No courses created yet"
        emptyDescription="Courses created by instructors will appear here."
      />
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminDashboardPage.tsx -->
## src/pages/super-admin/AdminDashboardPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportsService } from '../../services/reports.service';
import { coordinatorsService } from '../../services/coordinators.service';
import { usersService } from '../../services/users.service';
import { DashboardStats, CoordinatorRequest, User } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import {
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  FolderKanban,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pendingRequests, setPendingRequests] = useState<CoordinatorRequest[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      reportsService.getOverviewStats(),
      coordinatorsService.getAdminRequests(),
      usersService.getAllUsers(),
    ]).then(([statsData, coordReqs, usersList]) => {
      if (isMounted) {
        setStats(statsData);
        setPendingRequests(coordReqs.filter((r) => r.status === 'PENDING'));
        setRecentUsers(usersList.slice(0, 5));
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading platform oversight console..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Super Admin Platform Oversight"
        description="Unified institutional governance, coordinator accreditations, corporate verifications, and system auditing."
        breadcrumbs={[{ label: 'Admin', href: '/super-admin/dashboard' }, { label: 'Dashboard' }]}
        badge={
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            Super Administrator Console
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Learners</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{stats?.totalLearners || 0}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Coordinator Requests</p>
            <p className="text-2xl font-bold text-amber-900 mt-0.5">{pendingRequests.length} Pending</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Published Courses</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{stats?.totalCourses || 0}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Internship Listings</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{stats?.totalInternships || 0}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Coordinator Requests */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Pending Coordinator Approvals</CardTitle>
              {pendingRequests.length > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
            <Link to="/super-admin/coordinator-approvals">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Review All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="p-6 text-center text-xs text-neutral-500">
                All coordinator requests have been reviewed and decided.
              </div>
            ) : (
              pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-neutral-900 text-sm">{req.fullName}</p>
                    <p className="text-xs text-neutral-600">{req.university} - {req.department}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Requested: {formatDate(req.requestDate)}</p>
                  </div>
                  <Link to="/super-admin/coordinator-approvals">
                    <Button size="sm" variant="primary">
                      Decide
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Registered Users */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Registered Accounts</CardTitle>
            <Link to="/super-admin/users">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                User Management
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="p-3 rounded-xl border border-neutral-200/90 flex items-center justify-between bg-neutral-50/50"
              >
                <div className="min-w-0 pr-3">
                  <p className="font-semibold text-neutral-900 text-xs sm:text-sm">{u.fullName}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="neutral">{u.role}</Badge>
                  <StatusBadge status={u.isActive ? 'ACTIVE' : 'INACTIVE'} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminModerationPage.tsx -->
## src/pages/super-admin/AdminModerationPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { formatDate } from '../../utils';
import { ShieldCheck, AlertTriangle, Eye, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export const AdminModerationPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemToClose, setItemToClose] = useState<Internship | null>(null);

  const loadData = async () => {
    try {
      const list = await internshipsService.getInternships();
      setInternships(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCloseListing = async () => {
    if (!itemToClose) return;
    try {
      await internshipsService.updateInternship(itemToClose.id, { status: 'CLOSED' });
      toast.success(`Internship "${itemToClose.title}" has been closed.`);
      setItemToClose(null);
      await loadData();
    } catch {
      toast.error('Failed to close internship');
    }
  };

  const columns: Column<Internship>[] = [
    {
      key: 'title',
      header: 'Listing & Poster',
      render: (i) => (
        <div>
          <p className="font-semibold text-neutral-900">{i.title}</p>
          <p className="text-xs text-brand-800 font-medium">Org: {i.organizationName}</p>
          <p className="text-[11px] text-neutral-400">Posted By Role: {i.postedByRole}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Mode',
      render: (i) => (
        <div className="flex flex-col gap-1">
          <Badge variant="brand">{i.category}</Badge>
          <span className="text-[11px] text-neutral-500">{i.workMode}</span>
        </div>
      ),
    },
    {
      key: 'applicants',
      header: 'Applicants',
      render: (i) => <span className="font-bold text-neutral-800">{i.applicantsCount} candidates</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (i) => (
        <div className="flex items-center justify-end gap-2">
          {i.status !== 'CLOSED' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setItemToClose(i)}
              leftIcon={<XCircle className="w-3.5 h-3.5 text-red-500" />}
            >
              Close Listing
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Listing Moderation"
        description="Audit, oversee, and moderate public internship opportunities to maintain academic safety and compliance."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Moderation' },
        ]}
      />

      <DataTable
        columns={columns}
        data={internships}
        isLoading={loading}
        rowKey={(i) => i.id}
        emptyTitle="No listings found"
        emptyDescription="Internship postings will appear here for moderation."
      />

      {itemToClose && (
        <ConfirmDialog
          isOpen={!!itemToClose}
          onClose={() => setItemToClose(null)}
          onConfirm={handleCloseListing}
          title="Close Internship Opportunity"
          message={`Are you sure you want to close "${itemToClose.title}"? Students will no longer be able to submit applications.`}
          variant="danger"
          confirmLabel="Close Listing"
        />
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminOrganizationsPage.tsx -->
## src/pages/super-admin/AdminOrganizationsPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { organizationsService } from '../../services/organizations.service';
import { Organization, VerificationStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { formatDate } from '../../utils';
import { Building2, CheckCircle2, XCircle, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

export const AdminOrganizationsPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const list = await organizationsService.getAllOrganizationsAdmin();
      setOrganizations(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDecision = async (status: VerificationStatus) => {
    if (!selectedOrg) return;
    setSubmitting(true);
    try {
      await organizationsService.decideVerificationAdmin(status, notes);
      toast.success(`Organization ${selectedOrg.name} marked as ${status}!`);
      setSelectedOrg(null);
      setNotes('');
      await loadData();
    } catch {
      toast.error('Failed to submit decision');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Organization>[] = [
    {
      key: 'name',
      header: 'Organization Name & Industry',
      render: (o) => (
        <div>
          <p className="font-semibold text-neutral-900">{o.name}</p>
          <p className="text-xs text-neutral-500">{o.industry}</p>
        </div>
      ),
    },
    {
      key: 'registration',
      header: 'License / TIN',
      render: (o) => (
        <div className="text-xs text-neutral-700">
          <p>Lic: <span className="font-mono">{o.registrationNumber || 'Pending'}</span></p>
          <p>TIN: <span className="font-mono">{o.taxId || 'Pending'}</span></p>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location & Website',
      render: (o) => (
        <div className="text-xs text-neutral-700">
          <p>{o.location}</p>
          <a
            href={o.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-800 underline truncate max-w-[150px] block"
          >
            {o.website}
          </a>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Verification Status',
      render: (o) => <StatusBadge status={o.verificationStatus} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (o) => (
        <Button size="sm" variant="outline" onClick={() => setSelectedOrg(o)}>
          Inspect & Verify
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employer Verification & Compliance"
        description="Audit corporate registration documents, tax certificates, and grant authorized employer badges."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Organizations' },
        ]}
      />

      <DataTable
        columns={columns}
        data={organizations}
        isLoading={loading}
        rowKey={(o) => o.id}
        emptyTitle="No organizations registered"
        emptyDescription="Registered employers will appear here for verification auditing."
      />

      {/* Review Modal */}
      {selectedOrg && (
        <Modal
          isOpen={!!selectedOrg}
          onClose={() => setSelectedOrg(null)}
          title={`Verify: ${selectedOrg.name}`}
          description={`Industry: ${selectedOrg.industry}`}
          maxWidth="lg"
        >
          <div className="space-y-4 mt-3">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 grid grid-cols-2 gap-2">
              <p><strong>License:</strong> {selectedOrg.registrationNumber || 'N/A'}</p>
              <p><strong>TIN:</strong> {selectedOrg.taxId || 'N/A'}</p>
              <p><strong>Contact Email:</strong> {selectedOrg.contactEmail}</p>
              <p><strong>Phone:</strong> {selectedOrg.contactPhone}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Attached Compliance Documents
              </p>
              <div className="space-y-2">
                {selectedOrg.documents?.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 bg-white rounded-lg border border-neutral-200 flex items-center justify-between text-xs text-neutral-800"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-700" />
                      <span>{d.name}</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Verified Proof</span>
                  </div>
                ))}
              </div>
            </div>

            <Textarea
              label="Administrative Decision Notes"
              placeholder="Record verification review results..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-neutral-100 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrg(null)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDecision('REJECTED')}
                disabled={submitting}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Reject Verification
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDecision('VERIFIED')}
                disabled={submitting}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Approve & Grant Verified Status
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminReportsPage.tsx -->
## src/pages/super-admin/AdminReportsPage.tsx

```tsx
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
        <Card className="p-5 bg-white">
          <p className="text-xs font-semibold uppercase text-neutral-400">Total Enrolled Learners</p>
          <p className="text-2xl font-black text-neutral-900 mt-1">414</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">+34% this month</p>
        </Card>

        <Card className="p-5 bg-white">
          <p className="text-xs font-semibold uppercase text-neutral-400">Assignment Completion</p>
          <p className="text-2xl font-black text-brand-900 mt-1">88.4%</p>
          <p className="text-xs text-neutral-500 mt-1">High academic compliance</p>
        </Card>

        <Card className="p-5 bg-white">
          <p className="text-xs font-semibold uppercase text-neutral-400">Internship Placements</p>
          <p className="text-2xl font-black text-purple-900 mt-1">54</p>
          <p className="text-xs text-neutral-500 mt-1">Accredited students</p>
        </Card>

        <Card className="p-5 bg-white">
          <p className="text-xs font-semibold uppercase text-neutral-400">Verified Organizations</p>
          <p className="text-2xl font-black text-neutral-900 mt-1">18</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">100% license checked</p>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="bg-white p-6">
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

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminSettingsPage.tsx -->
## src/pages/super-admin/AdminSettingsPage.tsx

```tsx
import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Settings, Save, ShieldCheck, Database, Bell } from 'lucide-react';
import { toast } from 'sonner';

export const AdminSettingsPage: React.FC = () => {
  const [platformName, setPlatformName] = useState("AddisBuilder's");
  const [supportEmail, setSupportEmail] = useState('support@addisbuilder.edu');
  const [maxUploadMb, setMaxUploadMb] = useState(10);
  const [requireCoordApproval, setRequireCoordApproval] = useState(true);
  const [requireOrgVerification, setRequireOrgVerification] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    setSaving(false);
    toast.success('Platform governance settings updated.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Platform Configuration & Governance"
        description="Global system parameters, compliance policies, file constraints, and institutional requirements."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Settings' },
        ]}
      />

      <Card className="bg-white">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                General Platform Identity
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Platform Name"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  required
                />
                <Input
                  label="Institutional Support Email"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                Compliance & Verification Governance
              </h3>

              <div className="space-y-3 text-xs text-neutral-700">
                <label className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireCoordApproval}
                    onChange={(e) => setRequireCoordApproval(e.target.checked)}
                    className="w-4 h-4 text-brand-700 rounded border-neutral-300 focus:ring-brand-700"
                  />
                  <div>
                    <p className="font-bold text-neutral-900">Enforce Coordinator Super Admin Verification</p>
                    <p className="text-neutral-500">
                      Coordinators must be approved by Super Admin before posting internship opportunities.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireOrgVerification}
                    onChange={(e) => setRequireOrgVerification(e.target.checked)}
                    className="w-4 h-4 text-brand-700 rounded border-neutral-300 focus:ring-brand-700"
                  />
                  <div>
                    <p className="font-bold text-neutral-900">Enforce Corporate Trade License & TIN Check</p>
                    <p className="text-neutral-500">
                      Organizations must have verified documentation before receiving published trust badges.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                Storage & Upload Limits
              </h3>
              <div className="w-full sm:w-60">
                <Input
                  label="Max Upload Size (MB)"
                  type="number"
                  min={1}
                  max={50}
                  value={maxUploadMb}
                  onChange={(e) => setMaxUploadMb(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-neutral-100">
              <Button
                type="submit"
                variant="primary"
                isLoading={saving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/pages/super-admin/AdminUsersPage.tsx -->
## src/pages/super-admin/AdminUsersPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { usersService } from '../../services/users.service';
import { User, UserRole } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Modal } from '../../components/ui/Modal';
import { formatDate } from '../../utils';
import { USER_ROLES } from '../../constants';
import { UserX, UserCheck, ShieldAlert, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);
  const [userToView, setUserToView] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await usersService.getAllUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleConfirmToggle = async () => {
    if (!userToToggle) return;
    setIsUpdating(true);
    try {
      await usersService.toggleUserActive(userToToggle.id);
      toast.success(
        `Account for ${userToToggle.fullName} is now ${userToToggle.isActive ? 'deactivated' : 'activated'}.`
      );
      setUserToToggle(null);
      await loadUsers();
    } catch {
      toast.error('Failed to change user status');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !search ||
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const columns: Column<User>[] = [
    {
      key: 'user',
      header: 'Full Name & Email',
      render: (u) => (
        <div>
          <p className="font-semibold text-neutral-900">{u.fullName}</p>
          <p className="text-xs text-neutral-500">{u.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Assigned Role',
      render: (u) => <Badge variant="neutral">{USER_ROLES[u.role]?.label || u.role}</Badge>,
    },
    {
      key: 'affiliation',
      header: 'Institution / Entity',
      render: (u) => (
        <span className="text-xs text-neutral-700">
          {u.university || (u.role === 'EMPLOYER' ? 'Partner Organization' : 'General Platform')}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Registered',
      render: (u) => <span className="text-xs text-neutral-500">{formatDate(u.createdAt)}</span>,
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (u) => <StatusBadge status={u.isActive ? 'ACTIVE' : 'INACTIVE'} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (u) => (
        <div className="flex items-center justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => setUserToView(u)} title="View profile details">
            <Eye className="w-4 h-4 text-neutral-500" />
          </Button>
          <Button
            size="sm"
            variant={u.isActive ? 'outline' : 'primary'}
            onClick={() => setUserToToggle(u)}
            leftIcon={u.isActive ? <UserX className="w-3.5 h-3.5 text-red-500" /> : <UserCheck className="w-3.5 h-3.5" />}
          >
            {u.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ];

  const roleOptions = [
    { value: 'All', label: 'All Roles' },
    { value: 'LEARNER', label: 'Learners' },
    { value: 'MENTOR', label: 'Mentors' },
    { value: 'INTERNSHIP_COORDINATOR', label: 'Coordinators' },
    { value: 'EMPLOYER', label: 'Employers' },
    { value: 'SUPER_ADMIN', label: 'Super Admins' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Account Management"
        description="Inspect registered learners, instructors, coordinators, and corporate accounts."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Users' },
        ]}
      />

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by user name or email..."
          className="max-w-md w-full"
        />

        <div className="w-full sm:w-56">
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        isLoading={loading}
        rowKey={(u) => u.id}
        emptyTitle="No matching users found"
        emptyDescription="Try clearing your search query or role filter."
      />

      {/* Confirmation Dialog for Sensitive Administrative Action */}
      {userToToggle && (
        <ConfirmDialog
          isOpen={!!userToToggle}
          onClose={() => setUserToToggle(null)}
          onConfirm={handleConfirmToggle}
          title={userToToggle.isActive ? 'Deactivate Account' : 'Activate Account'}
          message={`Are you sure you want to ${
            userToToggle.isActive ? 'suspend access for' : 're-activate'
          } ${userToToggle.fullName} (${userToToggle.email})?`}
          variant={userToToggle.isActive ? 'danger' : 'primary'}
          confirmLabel={userToToggle.isActive ? 'Yes, Deactivate' : 'Yes, Activate'}
          isLoading={isUpdating}
        />
      )}

      {/* User Details View Modal */}
      {userToView && (
        <Modal
          isOpen={!!userToView}
          onClose={() => setUserToView(null)}
          title={`User Dossier: ${userToView.fullName}`}
          description={`ID: ${userToView.id}`}
        >
          <div className="space-y-3 mt-3 text-xs text-neutral-700">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <p><strong>Email:</strong> {userToView.email}</p>
              <p><strong>Phone:</strong> {userToView.phone || 'N/A'}</p>
              <p><strong>Role:</strong> {USER_ROLES[userToView.role]?.label}</p>
              <p><strong>Account Status:</strong> {userToView.isActive ? 'Active' : 'Deactivated'}</p>
              <p><strong>Registered Date:</strong> {formatDate(userToView.createdAt)}</p>
            </div>

            {userToView.university && (
              <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-200 space-y-1">
                <p><strong>University:</strong> {userToView.university}</p>
                <p><strong>Department:</strong> {userToView.department || 'N/A'}</p>
                {userToView.studentId && <p><strong>Student ID:</strong> {userToView.studentId}</p>}
                {userToView.coordinatorStatus && (
                  <p><strong>Coordinator Approval:</strong> {userToView.coordinatorStatus}</p>
                )}
              </div>
            )}

            {userToView.bio && (
              <div>
                <p className="font-semibold text-neutral-900 mb-1">Biography:</p>
                <p className="p-3 bg-white border border-neutral-200 rounded-lg">{userToView.bio}</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setUserToView(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/routes/index.tsx -->
## src/routes/index.tsx

```tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, RoleGuard, CoordinatorApprovalGuard } from './RouteGuards';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { ServicesPage } from '../pages/public/ServicesPage';
import { CoursesPage } from '../pages/public/CoursesPage';
import { CourseDetailPage } from '../pages/public/CourseDetailPage';
import { InternshipsPage } from '../pages/public/InternshipsPage';
import { InternshipDetailPage } from '../pages/public/InternshipDetailPage';
import { ContactPage } from '../pages/public/ContactPage';
import { AccessDeniedPage } from '../pages/public/AccessDeniedPage';
import { CoordinatorPendingPage } from '../pages/public/CoordinatorPendingPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';

// Learner Pages
import { LearnerDashboardPage } from '../pages/learner/LearnerDashboardPage';
import { LearnerCoursesPage } from '../pages/learner/LearnerCoursesPage';
import { LearnerCourseLearnPage } from '../pages/learner/LearnerCourseLearnPage';
import { LearnerAssignmentsPage } from '../pages/learner/LearnerAssignmentsPage';
import { LearnerSavedInternshipsPage } from '../pages/learner/LearnerSavedInternshipsPage';
import { LearnerApplicationsPage } from '../pages/learner/LearnerApplicationsPage';
import { LearnerProgressPage } from '../pages/learner/LearnerProgressPage';
import { LearnerProfilePage } from '../pages/learner/LearnerProfilePage';

// Mentor Pages
import { MentorDashboardPage } from '../pages/mentor/MentorDashboardPage';
import { MentorCoursesPage } from '../pages/mentor/MentorCoursesPage';
import { MentorCourseEditorPage } from '../pages/mentor/MentorCourseEditorPage';
import { MentorMaterialsPage } from '../pages/mentor/MentorMaterialsPage';
import { MentorAssignmentsPage } from '../pages/mentor/MentorAssignmentsPage';
import { MentorSubmissionsPage } from '../pages/mentor/MentorSubmissionsPage';
import { MentorStudentsPage } from '../pages/mentor/MentorStudentsPage';

// Coordinator Pages
import { CoordinatorDashboardPage } from '../pages/internship-manager/CoordinatorDashboardPage';
import { CoordinatorInternshipsPage } from '../pages/internship-manager/CoordinatorInternshipsPage';
import { CoordinatorInternshipEditorPage } from '../pages/internship-manager/CoordinatorInternshipEditorPage';
import { CoordinatorApplicationsPage } from '../pages/internship-manager/CoordinatorApplicationsPage';

// Employer Pages
import { EmployerDashboardPage } from '../pages/employer/EmployerDashboardPage';
import { EmployerProfilePage } from '../pages/employer/EmployerProfilePage';
import { EmployerVerificationPage } from '../pages/employer/EmployerVerificationPage';
import { EmployerInternshipsPage } from '../pages/employer/EmployerInternshipsPage';
import { EmployerInternshipEditorPage } from '../pages/employer/EmployerInternshipEditorPage';
import { EmployerApplicantsPage } from '../pages/employer/EmployerApplicantsPage';
import { EmployerAnalyticsPage } from '../pages/employer/EmployerAnalyticsPage';

// Super Admin Pages
import { AdminDashboardPage } from '../pages/super-admin/AdminDashboardPage';
import { AdminUsersPage } from '../pages/super-admin/AdminUsersPage';
import { AdminCoordinatorApprovalsPage } from '../pages/super-admin/AdminCoordinatorApprovalsPage';
import { AdminOrganizationsPage } from '../pages/super-admin/AdminOrganizationsPage';
import { AdminModerationPage } from '../pages/super-admin/AdminModerationPage';
import { AdminCoursesPage } from '../pages/super-admin/AdminCoursesPage';
import { AdminReportsPage } from '../pages/super-admin/AdminReportsPage';
import { AdminAuditLogsPage } from '../pages/super-admin/AdminAuditLogsPage';
import { AdminSettingsPage } from '../pages/super-admin/AdminSettingsPage';

// Shared Notification Page
import { NotificationsPage } from '../pages/common/NotificationsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/internships/:internshipId" element={<InternshipDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="/unauthorized" element={<AccessDeniedPage />} />
        <Route path="/coordinator-pending" element={<CoordinatorPendingPage />} />
        <Route path="/pending-approval" element={<CoordinatorPendingPage />} />
      </Route>

      {/* Authentication Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* 4.1 Learner Protected Routes */}
      <Route
        path="/learner"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['LEARNER']}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/learner/dashboard" replace />} />
        <Route path="dashboard" element={<LearnerDashboardPage />} />
        <Route path="courses" element={<LearnerCoursesPage />} />
        <Route path="courses/:courseId" element={<CourseDetailPage />} />
        <Route path="courses/:courseId/learn" element={<LearnerCourseLearnPage />} />
        <Route path="assignments" element={<LearnerAssignmentsPage />} />
        <Route path="assignments/:assignmentId" element={<LearnerAssignmentsPage />} />
        <Route path="internships" element={<InternshipsPage />} />
        <Route path="saved-internships" element={<LearnerSavedInternshipsPage />} />
        <Route path="applications" element={<LearnerApplicationsPage />} />
        <Route path="progress" element={<LearnerProgressPage />} />
        <Route path="profile" element={<LearnerProfilePage />} />
        <Route
          path="notifications"
          element={<NotificationsPage rolePrefix="learner" roleLabel="Learner" />}
        />
      </Route>

      {/* 4.2 Mentor Protected Routes */}
      <Route
        path="/mentor"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['MENTOR']}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/mentor/dashboard" replace />} />
        <Route path="dashboard" element={<MentorDashboardPage />} />
        <Route path="courses" element={<MentorCoursesPage />} />
        <Route path="courses/new" element={<MentorCourseEditorPage />} />
        <Route path="courses/:courseId/edit" element={<MentorCourseEditorPage />} />
        <Route path="students" element={<MentorStudentsPage />} />
        <Route path="students/:studentId" element={<MentorStudentsPage />} />
        <Route path="materials" element={<MentorMaterialsPage />} />
        <Route path="courses/:courseId/materials" element={<MentorMaterialsPage />} />
        <Route path="assignments" element={<MentorAssignmentsPage />} />
        <Route path="assignments/new" element={<MentorAssignmentsPage />} />
        <Route path="submissions" element={<MentorSubmissionsPage />} />
        <Route path="progress" element={<LearnerProgressPage />} />
        <Route path="profile" element={<LearnerProfilePage />} />
        <Route
          path="notifications"
          element={<NotificationsPage rolePrefix="mentor" roleLabel="Mentor" />}
        />
      </Route>

      {/* 4.3 Internship Coordinator Protected Routes */}
      <Route
        path="/internship-manager"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['INTERNSHIP_COORDINATOR']}>
              <CoordinatorApprovalGuard>
                <DashboardLayout />
              </CoordinatorApprovalGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/internship-manager/dashboard" replace />} />
        <Route path="dashboard" element={<CoordinatorDashboardPage />} />
        <Route path="internships" element={<CoordinatorInternshipsPage />} />
        <Route path="internships/new" element={<CoordinatorInternshipEditorPage />} />
        <Route path="internships/:internshipId/edit" element={<CoordinatorInternshipEditorPage />} />
        <Route path="applications" element={<CoordinatorApplicationsPage />} />
        <Route path="profile" element={<LearnerProfilePage />} />
        <Route
          path="notifications"
          element={
            <NotificationsPage rolePrefix="internship-manager" roleLabel="Coordinator" />
          }
        />
      </Route>

      {/* 4.4 Employer / Organization Protected Routes */}
      <Route
        path="/employer"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['EMPLOYER']}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/employer/dashboard" replace />} />
        <Route path="dashboard" element={<EmployerDashboardPage />} />
        <Route path="organization" element={<EmployerProfilePage />} />
        <Route path="verification" element={<EmployerVerificationPage />} />
        <Route path="internships" element={<EmployerInternshipsPage />} />
        <Route path="internships/new" element={<EmployerInternshipEditorPage />} />
        <Route path="internships/:internshipId/edit" element={<EmployerInternshipEditorPage />} />
        <Route path="applicants" element={<EmployerApplicantsPage />} />
        <Route path="analytics" element={<EmployerAnalyticsPage />} />
        <Route
          path="notifications"
          element={<NotificationsPage rolePrefix="employer" roleLabel="Employer" />}
        />
      </Route>

      {/* 4.5 Super Admin Protected Routes */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="coordinator-approvals" element={<AdminCoordinatorApprovalsPage />} />
        <Route path="organizations" element={<AdminOrganizationsPage />} />
        <Route path="moderation" element={<AdminModerationPage />} />
        <Route path="courses" element={<AdminCoursesPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Catch-all Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

```
<!-- END_FILE -->

---
<!-- FILE: src/routes/RouteGuards.tsx -->
## src/routes/RouteGuards.tsx

```tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { USER_ROLES } from '../constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoadingSpinner size="lg" label="Verifying authentication session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoadingSpinner size="lg" label="Verifying access permissions..." />
      </div>
    );
  }

  if (!user || !role || !allowedRoles.includes(role)) {
    // If authenticated but wrong role, redirect to their role's appropriate home or access-denied
    if (role && USER_ROLES[role]) {
      return <Navigate to="/access-denied" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

interface CoordinatorApprovalGuardProps {
  children: React.ReactNode;
}

export const CoordinatorApprovalGuard: React.FC<CoordinatorApprovalGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoadingSpinner size="lg" label="Checking coordinator credentials..." />
      </div>
    );
  }

  if (user?.role === 'INTERNSHIP_COORDINATOR') {
    const status = user.coordinatorStatus || 'PENDING';
    if (status !== 'APPROVED') {
      return <Navigate to="/coordinator-pending" replace />;
    }
  }

  return <>{children}</>;
};

```
<!-- END_FILE -->

---
<!-- FILE: src/schemas/index.ts -->
## src/schemas/index.ts

```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
    role: z.enum([
      'LEARNER',
      'MENTOR',
      'INTERNSHIP_COORDINATOR',
      'EMPLOYER',
    ] as const),
    // Optional role-specific fields
    university: z.string().optional(),
    department: z.string().optional(),
    studentId: z.string().optional(),
    employeeId: z.string().optional(),
    organizationName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const userProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().optional(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
  university: z.string().optional(),
  department: z.string().optional(),
  studentId: z.string().optional(),
  cvUrl: z.string().optional(),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;

export const courseSchema = z.object({
  title: z.string().min(5, 'Course title must be at least 5 characters'),
  shortDescription: z
    .string()
    .min(10, 'Short description must be at least 10 characters')
    .max(200, 'Short description cannot exceed 200 characters'),
  description: z.string().min(30, 'Detailed description must be at least 30 characters'),
  category: z.string().min(1, 'Please select a category'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  durationWeeks: z.coerce.number().min(1, 'Duration must be at least 1 week').max(52),
  thumbnailUrl: z.string().url('Must be a valid URL').or(z.string().min(1)),
  learningObjectives: z.string().min(10, 'List at least one learning objective (one per line)'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

export type CourseFormData = z.infer<typeof courseSchema>;

export const assignmentSchema = z.object({
  courseId: z.string().min(1, 'Please select a course'),
  title: z.string().min(3, 'Assignment title is required'),
  description: z.string().min(10, 'Provide a brief summary'),
  instructions: z.string().min(20, 'Detailed instructions are required'),
  dueDate: z.string().min(1, 'Due date is required'),
  totalPoints: z.coerce.number().min(1, 'Total points must be at least 1').max(100),
});

export type AssignmentFormData = z.infer<typeof assignmentSchema>;

export const submissionSchema = z.object({
  content: z.string().min(20, 'Submission solution or explanation must be at least 20 characters'),
  attachmentUrl: z.string().optional(),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;

export const gradeSubmissionSchema = z.object({
  grade: z.coerce.number().min(0, 'Grade cannot be negative').max(100, 'Grade cannot exceed 100'),
  feedback: z.string().min(5, 'Feedback must be at least 5 characters'),
});

export type GradeSubmissionFormData = z.infer<typeof gradeSubmissionSchema>;

export const internshipSchema = z.object({
  title: z.string().min(5, 'Internship title must be at least 5 characters'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(2, 'Location is required (e.g. Addis Ababa or Remote)'),
  workMode: z.enum(['REMOTE', 'HYBRID', 'ONSITE']),
  stipend: z.string().optional(),
  durationMonths: z.coerce.number().min(1, 'Duration must be at least 1 month').max(24),
  deadline: z.string().min(1, 'Application deadline is required'),
  description: z.string().min(30, 'Full job description is required'),
  responsibilities: z.string().min(10, 'List responsibilities (one per line)'),
  requirements: z.string().min(10, 'List requirements (one per line)'),
  eligibility: z.string().min(5, 'Eligibility criteria is required'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']),
});

export type InternshipFormData = z.infer<typeof internshipSchema>;

export const internshipApplicationSchema = z.object({
  coverLetter: z.string().min(50, 'Cover letter should be at least 50 characters to highlight your qualifications'),
  cvUrl: z.string().optional(),
});

export type InternshipApplicationFormData = z.infer<typeof internshipApplicationSchema>;

export const organizationProfileSchema = z.object({
  name: z.string().min(2, 'Organization name is required'),
  industry: z.string().min(2, 'Industry is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  website: z.string().url('Must be a valid website URL'),
  location: z.string().min(2, 'Location is required'),
  contactEmail: z.string().email('Valid contact email is required'),
  contactPhone: z.string().min(7, 'Valid contact phone is required'),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
});

export type OrganizationProfileFormData = z.infer<typeof organizationProfileSchema>;

export const organizationVerificationSchema = z.object({
  registrationNumber: z.string().min(3, 'Official registration/license number is required'),
  taxId: z.string().min(3, 'Tax identification number (TIN) is required'),
  documentName: z.string().min(2, 'Document name or title is required'),
  documentUrl: z.string().min(1, 'Verification document link or file is required'),
  notes: z.string().optional(),
});

export type OrganizationVerificationFormData = z.infer<typeof organizationVerificationSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(4, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

```
<!-- END_FILE -->

---
<!-- FILE: src/services/api.ts -->
## src/services/api.ts

```ts
import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('addis_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 Unauthorized
      localStorage.removeItem('addis_auth_token');
      localStorage.removeItem('addis_auth_user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?session_expired=true';
      }
    }
    return Promise.reject(error);
  }
);

```
<!-- END_FILE -->

---
<!-- FILE: src/services/applications.service.ts -->
## src/services/applications.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { InternshipApplication, ApplicationStatus } from '../types';

export const applicationsService = {
  async getApplications(params?: { internshipId?: string; applicantId?: string }): Promise<InternshipApplication[]> {
    if (USE_MOCK) {
      return mockStorage.getApplications(params?.internshipId, params?.applicantId);
    }
    const response = await apiClient.get<InternshipApplication[]>('/applications', { params });
    return response.data;
  },

  async apply(data: {
    internshipId: string;
    internshipTitle: string;
    organizationName: string;
    coverLetter: string;
    cvUrl?: string;
  }): Promise<InternshipApplication> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : {
        id: 'user-learner-1',
        fullName: 'Abebe Kebede',
        email: 'learner@addisbuilder.edu',
        phone: '+251 91 123 4567',
        university: 'Addis Ababa University',
        department: 'Computer Science',
      };

      return mockStorage.createApplication({
        ...data,
        applicantId: user.id,
        applicantName: user.fullName,
        applicantEmail: user.email,
        applicantPhone: user.phone,
        university: user.university,
        department: user.department,
        cvFileName: data.cvUrl ? 'Resume_Uploaded.pdf' : 'Default_Profile_CV.pdf',
      });
    }
    const response = await apiClient.post<InternshipApplication>(`/internships/${data.internshipId}/applications`, data);
    return response.data;
  },

  async updateStatus(id: string, status: ApplicationStatus, notes?: string): Promise<InternshipApplication> {
    if (USE_MOCK) {
      return mockStorage.updateApplicationStatus(id, status, notes);
    }
    const response = await apiClient.patch<InternshipApplication>(`/applications/${id}/status`, { status, notes });
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/assignments.service.ts -->
## src/services/assignments.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Assignment, AssignmentSubmission } from '../types';

export const assignmentsService = {
  async getAssignments(courseId?: string): Promise<Assignment[]> {
    if (USE_MOCK) {
      return mockStorage.getAssignments(courseId);
    }
    const response = await apiClient.get<Assignment[]>('/assignments', { params: { courseId } });
    return response.data;
  },

  async createAssignment(data: Omit<Assignment, 'id' | 'createdAt' | 'submissionsCount'>): Promise<Assignment> {
    if (USE_MOCK) {
      return mockStorage.createAssignment(data);
    }
    const response = await apiClient.post<Assignment>('/assignments', data);
    return response.data;
  },

  async getSubmissions(assignmentId?: string, studentId?: string): Promise<AssignmentSubmission[]> {
    if (USE_MOCK) {
      return mockStorage.getSubmissions(assignmentId, studentId);
    }
    const response = await apiClient.get<AssignmentSubmission[]>('/assignments/submissions', {
      params: { assignmentId, studentId },
    });
    return response.data;
  },

  async submitAssignment(data: {
    assignmentId: string;
    assignmentTitle: string;
    courseId: string;
    courseTitle: string;
    content: string;
    attachmentUrl?: string;
    attachmentName?: string;
  }): Promise<AssignmentSubmission> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : { id: 'user-learner-1', fullName: 'Abebe Kebede', email: 'learner@addisbuilder.edu' };
      return mockStorage.createSubmission({
        ...data,
        studentId: user.id,
        studentName: user.fullName,
        studentEmail: user.email,
      });
    }
    const response = await apiClient.post<AssignmentSubmission>(`/assignments/${data.assignmentId}/submissions`, data);
    return response.data;
  },

  async gradeSubmission(submissionId: string, grade: number, feedback: string): Promise<AssignmentSubmission> {
    if (USE_MOCK) {
      return mockStorage.gradeSubmission(submissionId, grade, feedback);
    }
    const response = await apiClient.post<AssignmentSubmission>(`/submissions/${submissionId}/review`, {
      grade,
      feedback,
    });
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/auth.service.ts -->
## src/services/auth.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { User, AuthResponse } from '../types';
import { LoginFormData, RegisterFormData } from '../schemas';

const TOKEN_KEY = 'addis_auth_token';
const USER_KEY = 'addis_auth_user';

export const authService = {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    if (USE_MOCK) {
      const users = await mockStorage.getUsers();
      const user = users.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
      if (!user) {
        throw new Error('Invalid email or password. Try a demo account from the login page.');
      }
      if (!user.isActive) {
        throw new Error('This account has been deactivated. Please contact support.');
      }
      const token = `***REDACTED***`;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { token, user };
    }

    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    if (USE_MOCK) {
      const users = await mockStorage.getUsers();
      if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
        throw new Error('An account with this email already exists.');
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        university: data.university,
        department: data.department,
        studentId: data.studentId,
        coordinatorStatus: data.role === 'INTERNSHIP_COORDINATOR' ? 'PENDING' : undefined,
        organizationId: data.role === 'EMPLOYER' ? 'org-brolf-1' : undefined,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      users.push(newUser);
      localStorage.setItem('addis_mock_users', JSON.stringify(users));

      // If coordinator, also add to coordinator requests
      if (data.role === 'INTERNSHIP_COORDINATOR') {
        const reqs = await mockStorage.getCoordinatorRequests();
        reqs.push({
          id: `req-${Date.now()}`,
          userId: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          university: newUser.university || 'University',
          department: newUser.department || 'Academic Department',
          employeeId: data.employeeId || 'STAFF-PENDING',
          status: 'PENDING',
          requestDate: new Date().toISOString(),
        });
        localStorage.setItem('addis_mock_coord_requests', JSON.stringify(reqs));
      }

      const token = `***REDACTED***`;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      return { token, user: newUser };
    }

    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      if (!USE_MOCK) {
        await apiClient.post('/auth/logout');
      }
    } catch {
      // ignore logout network errors
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      return { message: `Password reset link sent to ${email} (mock verification link).` };
    }
    const res = await apiClient.post('/auth/forgot-password', { email });
    return res.data;
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      return { message: 'Password has been reset successfully. You may now log in.' };
    }
    const res = await apiClient.post('/auth/reset-password', { token, password });
    return res.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/coordinators.service.ts -->
## src/services/coordinators.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { CoordinatorRequest, ApprovalStatus } from '../types';

export const coordinatorsService = {
  async getMyStatus(): Promise<{ status: ApprovalStatus; notes?: string }> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (!user) return { status: 'PENDING' };
      const live = await mockStorage.getUserById(user.id);
      return {
        status: live?.coordinatorStatus || user.coordinatorStatus || 'PENDING',
      };
    }
    const response = await apiClient.get<{ status: ApprovalStatus; notes?: string }>('/coordinators/me/status');
    return response.data;
  },

  async getAdminRequests(): Promise<CoordinatorRequest[]> {
    if (USE_MOCK) {
      return mockStorage.getCoordinatorRequests();
    }
    const response = await apiClient.get<CoordinatorRequest[]>('/admin/coordinator-requests');
    return response.data;
  },

  async decideRequest(id: string, decision: ApprovalStatus, notes?: string): Promise<CoordinatorRequest> {
    if (USE_MOCK) {
      return mockStorage.decideCoordinatorRequest(id, decision, notes);
    }
    const response = await apiClient.post<CoordinatorRequest>(`/admin/coordinator-requests/${id}/decision`, {
      status: decision,
      notes,
    });
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/courses.service.ts -->
## src/services/courses.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Course, CourseMaterial } from '../types';

export const coursesService = {
  async getCourses(filters?: { category?: string; level?: string; search?: string }): Promise<Course[]> {
    if (USE_MOCK) {
      let list = await mockStorage.getCourses();
      if (filters?.category && filters.category !== 'All') {
        list = list.filter((c) => c.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters?.level && filters.level !== 'All') {
        list = list.filter((c) => c.level === filters.level);
      }
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        list = list.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.description.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query)
        );
      }
      return list;
    }
    const response = await apiClient.get<Course[]>('/courses', { params: filters });
    return response.data;
  },

  async getCourseById(id: string): Promise<Course> {
    if (USE_MOCK) {
      const course = await mockStorage.getCourseById(id);
      if (!course) throw new Error('Course not found');
      return course;
    }
    const response = await apiClient.get<Course>(`/courses/${id}`);
    return response.data;
  },

  async createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledStudentsCount'>): Promise<Course> {
    if (USE_MOCK) {
      return mockStorage.createCourse(data);
    }
    const response = await apiClient.post<Course>('/courses', data);
    return response.data;
  },

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    if (USE_MOCK) {
      return mockStorage.updateCourse(id, updates);
    }
    const response = await apiClient.patch<Course>(`/courses/${id}`, updates);
    return response.data;
  },

  async enrollCourse(courseId: string): Promise<Course> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const userId = stored ? JSON.parse(stored).id : 'user-learner-1';
      return mockStorage.enrollCourse(courseId, userId);
    }
    const response = await apiClient.post<Course>(`/courses/${courseId}/enroll`);
    return response.data;
  },

  async addMaterial(courseId: string, material: Omit<CourseMaterial, 'id' | 'uploadedAt'>): Promise<Course> {
    if (USE_MOCK) {
      const course = await mockStorage.getCourseById(courseId);
      if (!course) throw new Error('Course not found');
      const newMat: CourseMaterial = {
        ...material,
        id: `mat-${Date.now()}`,
        uploadedAt: new Date().toISOString(),
      };
      const updatedMaterials = [...(course.materials || []), newMat];
      return mockStorage.updateCourse(courseId, { materials: updatedMaterials });
    }
    const response = await apiClient.post<Course>(`/courses/${courseId}/materials`, material);
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/enrollments.service.ts -->
## src/services/enrollments.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Enrollment, CourseModule } from '../types';

export interface EnrollmentFilters {
  instructorId?: string;
  courseId?: string;
  studentId?: string;
  status?: string;
  search?: string;
}

export const enrollmentsService = {
  /**
   * Retrieves student records enrolled in an instructor's courses.
   * Enforces role authorization and filtering by course and status.
   */
  async getInstructorStudents(instructorId: string, filters?: EnrollmentFilters): Promise<Enrollment[]> {
    if (USE_MOCK) {
      let list = await mockStorage.getEnrollments({
        instructorId,
        courseId: filters?.courseId,
        status: filters?.status,
      });

      if (filters?.search) {
        const query = filters.search.toLowerCase().trim();
        list = list.filter(
          (e) =>
            e.studentName.toLowerCase().includes(query) ||
            e.studentEmail.toLowerCase().includes(query) ||
            e.courseTitle.toLowerCase().includes(query) ||
            e.studentDepartment?.toLowerCase().includes(query)
        );
      }
      return list;
    }

    const response = await apiClient.get<Enrollment[]>('/instructor/students', {
      params: { ...filters, instructorId },
    });
    return response.data;
  },

  /**
   * Retrieves all enrollments for a given student.
   */
  async getStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    if (USE_MOCK) {
      return mockStorage.getEnrollments({ studentId });
    }
    const response = await apiClient.get<Enrollment[]>('/users/me/enrollments');
    return response.data;
  },

  /**
   * Retrieves single enrollment details.
   */
  async getEnrollmentById(id: string): Promise<Enrollment> {
    if (USE_MOCK) {
      const record = await mockStorage.getEnrollmentById(id);
      if (!record) throw new Error('Enrollment record not found');
      return record;
    }
    const response = await apiClient.get<Enrollment>(`/enrollments/${id}`);
    return response.data;
  },

  /**
   * Allows instructors to update an enrollment status (e.g. mark Completed or Dropped).
   */
  async updateEnrollmentStatus(id: string, status: 'ACTIVE' | 'COMPLETED' | 'DROPPED'): Promise<Enrollment> {
    if (USE_MOCK) {
      return mockStorage.updateEnrollmentStatus(id, status);
    }
    const response = await apiClient.patch<Enrollment>(`/enrollments/${id}/status`, { status });
    return response.data;
  },

  /**
   * Retrieves course curriculum modules with lessons.
   */
  async getCourseModules(courseId: string): Promise<CourseModule[]> {
    if (USE_MOCK) {
      return mockStorage.getCourseModules(courseId);
    }
    const response = await apiClient.get<CourseModule[]>(`/courses/${courseId}/modules`);
    return response.data;
  },

  /**
   * Marks a specific lesson as complete for the student.
   */
  async markLessonComplete(courseId: string, lessonId: string, studentId: string): Promise<{ progressPercentage: number; completedCount: number }> {
    if (USE_MOCK) {
      return mockStorage.markLessonComplete(courseId, lessonId, studentId);
    }
    const response = await apiClient.post<{ progressPercentage: number; completedCount: number }>(
      `/courses/${courseId}/lessons/${lessonId}/complete`
    );
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/internships.service.ts -->
## src/services/internships.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Internship } from '../types';

export const internshipsService = {
  async getInternships(filters?: {
    category?: string;
    workMode?: string;
    search?: string;
    postedById?: string;
    status?: string;
  }): Promise<Internship[]> {
    if (USE_MOCK) {
      let list = await mockStorage.getInternships();
      if (filters?.category && filters.category !== 'All') {
        list = list.filter((i) => i.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters?.workMode && filters.workMode !== 'All') {
        list = list.filter((i) => i.workMode === filters.workMode);
      }
      if (filters?.status && filters.status !== 'All') {
        list = list.filter((i) => i.status === filters.status);
      }
      if (filters?.postedById) {
        list = list.filter((i) => i.postedById === filters.postedById);
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (i) =>
            i.title.toLowerCase().includes(q) ||
            i.organizationName.toLowerCase().includes(q) ||
            i.location.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q)
        );
      }
      return list;
    }
    const response = await apiClient.get<Internship[]>('/internships', { params: filters });
    return response.data;
  },

  async getInternshipById(id: string): Promise<Internship> {
    if (USE_MOCK) {
      const internship = await mockStorage.getInternshipById(id);
      if (!internship) throw new Error('Internship not found');
      return internship;
    }
    const response = await apiClient.get<Internship>(`/internships/${id}`);
    return response.data;
  },

  async createInternship(data: Omit<Internship, 'id' | 'createdAt' | 'applicantsCount'>): Promise<Internship> {
    if (USE_MOCK) {
      return mockStorage.createInternship(data);
    }
    const response = await apiClient.post<Internship>('/internships', data);
    return response.data;
  },

  async updateInternship(id: string, updates: Partial<Internship>): Promise<Internship> {
    if (USE_MOCK) {
      return mockStorage.updateInternship(id, updates);
    }
    const response = await apiClient.patch<Internship>(`/internships/${id}`, updates);
    return response.data;
  },

  async toggleSave(id: string): Promise<{ isSaved: boolean }> {
    if (USE_MOCK) {
      return mockStorage.toggleSaveInternship(id);
    }
    const response = await apiClient.post<{ isSaved: boolean }>(`/internships/${id}/save`);
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/mockData.ts -->
## src/services/mockData.ts

```ts
import {
  User,
  Course,
  Assignment,
  AssignmentSubmission,
  Internship,
  InternshipApplication,
  Organization,
  CoordinatorRequest,
  Notification,
  AuditLog,
  Enrollment,
  CourseModule,
  Lesson,
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-learner-1',
    email: 'learner@addisbuilder.edu',
    fullName: 'Abebe Kebede',
    role: 'LEARNER',
    university: 'Addis Ababa University',
    department: 'Computer Science',
    studentId: 'AAU/CS/2023/042',
    bio: 'Passionate 3rd-year CS student focusing on full-stack web development and distributed systems.',
    phone: '+251 91 123 4567',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    cvUrl: 'https://example.com/resumes/abebe-kebede-cv.pdf',
    createdAt: '2025-09-01T10:00:00Z',
    isActive: true,
  },
  {
    id: 'user-learner-2',
    email: 'dawit.m@addisbuilder.edu',
    fullName: 'Dawit Mengistu',
    role: 'LEARNER',
    university: 'Addis Ababa Institute of Technology',
    department: 'Software Engineering',
    studentId: 'AAiT/SE/2023/118',
    bio: 'Specializing in cloud engineering, container orchestration, and automated test pipelines.',
    phone: '+251 91 234 5678',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    createdAt: '2025-09-02T11:00:00Z',
    isActive: true,
  },
  {
    id: 'user-learner-3',
    email: 'sara.t@addisbuilder.edu',
    fullName: 'Sara Tadesse',
    role: 'LEARNER',
    university: 'Addis Ababa University',
    department: 'Information Systems',
    studentId: 'AAU/IS/2023/074',
    bio: 'Focusing on UI/UX product design, accessible design systems, and frontend data visualization.',
    phone: '+251 91 345 6789',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    createdAt: '2025-09-03T09:30:00Z',
    isActive: true,
  },
  {
    id: 'user-learner-4',
    email: 'betelhem.a@addisbuilder.edu',
    fullName: 'Betelhem Assefa',
    role: 'LEARNER',
    university: 'Adama Science and Technology University',
    department: 'Computer Science',
    studentId: 'ASTU/CS/2023/205',
    bio: 'Junior software engineer passionate about modern JavaScript, relational databases, and microservices.',
    phone: '+251 91 456 7890',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    createdAt: '2025-09-04T14:15:00Z',
    isActive: true,
  },
  {
    id: 'user-learner-5',
    email: 'michael.h@addisbuilder.edu',
    fullName: 'Michael Haile',
    role: 'LEARNER',
    university: 'Hawassa University',
    department: 'Software Engineering',
    studentId: 'HU/SE/2023/089',
    bio: 'Machine learning practitioner studying statistical data analysis and deep neural architectures.',
    phone: '+251 91 567 8901',
    createdAt: '2025-09-05T16:00:00Z',
    isActive: true,
  },
  {
    id: 'user-mentor-1',
    email: 'mentor@addisbuilder.edu',
    fullName: 'Dr. Hanna Tesfaye',
    role: 'MENTOR',
    university: 'Addis Ababa Institute of Technology',
    department: 'Software Engineering',
    bio: 'Assistant Professor and Lead Architect with 12+ years building enterprise web services.',
    phone: '+251 92 234 5678',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    createdAt: '2025-08-15T09:00:00Z',
    isActive: true,
  },
  {
    id: 'user-coord-1',
    email: 'coordinator@addisbuilder.edu',
    fullName: 'Yonas Alemu',
    role: 'INTERNSHIP_COORDINATOR',
    university: 'Addis Ababa University',
    department: 'Career & Industry Linkage Office',
    phone: '+251 93 345 6789',
    coordinatorStatus: 'APPROVED',
    createdAt: '2025-08-20T11:00:00Z',
    isActive: true,
  },
  {
    id: 'user-coord-pending',
    email: 'pending.coordinator@addisbuilder.edu',
    fullName: 'Marta Bekele',
    role: 'INTERNSHIP_COORDINATOR',
    university: 'Adama Science and Technology University',
    department: 'Faculty of Computing',
    phone: '+251 94 456 7890',
    coordinatorStatus: 'PENDING',
    createdAt: '2026-01-10T14:30:00Z',
    isActive: true,
  },
  {
    id: 'user-employer-1',
    email: 'employer@addisbuilder.edu',
    fullName: 'Samuel Girma',
    role: 'EMPLOYER',
    organizationId: 'org-brolf-1',
    phone: '+251 95 567 8901',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    createdAt: '2025-09-05T08:00:00Z',
    isActive: true,
  },
  {
    id: 'user-admin-1',
    email: 'admin@addisbuilder.edu',
    fullName: 'Super Administrator',
    role: 'SUPER_ADMIN',
    phone: '+251 91 999 8888',
    createdAt: '2025-01-01T00:00:00Z',
    isActive: true,
  },
];

export const INITIAL_ORGANIZATION: Organization = {
  id: 'org-brolf-1',
  name: 'Brolf Technologies',
  industry: 'Software & Cloud Engineering',
  description: 'Leading technology consulting and product development firm delivering innovative cloud, AI, and fintech solutions across East Africa.',
  website: 'https://brolftech.example.com',
  location: 'Addis Ababa, Bole Sub-City, Ethiopia',
  contactEmail: 'careers@brolftech.example.com',
  contactPhone: '+251 11 661 2345',
  verificationStatus: 'VERIFIED',
  registrationNumber: 'ETH-MINT-2023-8849',
  taxId: 'TIN-0092837411',
  documents: [
    {
      id: 'doc-1',
      name: 'Trade_License_Certificate_2025.pdf',
      type: 'LICENSE',
      url: 'https://example.com/docs/license.pdf',
      uploadedAt: '2025-09-06T10:00:00Z',
    },
    {
      id: 'doc-2',
      name: 'Tax_Clearance_Certificate.pdf',
      type: 'TAX_CERTIFICATE',
      url: 'https://example.com/docs/tax.pdf',
      uploadedAt: '2025-09-06T10:05:00Z',
    },
  ],
  createdAt: '2025-09-05T08:00:00Z',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Full-Stack Modern Web Engineering (React & Node.js)',
    shortDescription: 'Master production-grade React, TypeScript, Express, and MySQL architecture from ground up.',
    description: 'An intensive hands-on curriculum built for university students seeking industry-ready full stack mastery. Learn component-driven design, TypeScript type safety, REST API architecture, JWT authentication, and relational database modeling.',
    category: 'Software Engineering',
    level: 'INTERMEDIATE',
    durationWeeks: 10,
    instructorId: 'user-mentor-1',
    instructorName: 'Dr. Hanna Tesfaye',
    instructorTitle: 'Lead Software Architect & Lecturer',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    learningObjectives: [
      'Architect robust React frontends with TypeScript and Tailwind CSS',
      'Design RESTful web services with Express and Node.js',
      'Model relational database schemas with MySQL and migrations',
      'Implement role-based access control and token authentication',
      'Prepare automated unit and integration tests',
    ],
    materials: [
      {
        id: 'mat-1',
        title: 'Week 1: Modern JavaScript & TypeScript Foundations',
        type: 'PDF',
        url: 'https://example.com/slides/w1.pdf',
        size: '4.2 MB',
        uploadedAt: '2025-10-01T08:00:00Z',
      },
      {
        id: 'mat-2',
        title: 'Week 2: Advanced React Architecture & State Management',
        type: 'VIDEO',
        url: 'https://example.com/lectures/w2.mp4',
        duration: '1 hr 45 min',
        uploadedAt: '2025-10-08T08:00:00Z',
      },
      {
        id: 'mat-3',
        title: 'Week 3: REST API Design & Express Best Practices',
        type: 'DOCUMENT',
        url: 'https://example.com/docs/w3-guide.pdf',
        size: '2.8 MB',
        uploadedAt: '2025-10-15T08:00:00Z',
      },
    ],
    status: 'PUBLISHED',
    enrolledStudentsCount: 142,
    isEnrolled: true,
    progressPercentage: 65,
    createdAt: '2026-08-20T08:00:00Z',
    updatedAt: '2026-09-15T08:00:00Z',
  },
  {
    id: 'course-2',
    title: 'Python for Data Science, Statistics & Machine Learning',
    shortDescription: 'Explore data wrangling, exploratory data analysis, and predictive modeling with Python and Pandas.',
    description: 'Learn data analysis with Python, NumPy, Pandas, Matplotlib, and Scikit-learn. Work on real-world datasets and build data-driven decision engines.',
    category: 'Data Science & AI',
    level: 'BEGINNER',
    durationWeeks: 8,
    instructorId: 'user-mentor-1',
    instructorName: 'Dr. Hanna Tesfaye',
    instructorTitle: 'Lead Software Architect & Lecturer',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    learningObjectives: [
      'Master data structures and numerical computing in Python',
      'Clean and transform complex multi-table datasets with Pandas',
      'Visualize trends and distribution charts effectively',
      'Train supervised learning models using Scikit-learn',
    ],
    materials: [
      {
        id: 'mat-4',
        title: 'Module 1: Python NumPy and Array Operations',
        type: 'PDF',
        url: 'https://example.com/slides/numpy.pdf',
        size: '3.1 MB',
        uploadedAt: '2026-08-25T08:00:00Z',
      },
    ],
    status: 'PUBLISHED',
    enrolledStudentsCount: 98,
    isEnrolled: false,
    progressPercentage: 0,
    createdAt: '2026-08-22T08:00:00Z',
    updatedAt: '2026-09-10T08:00:00Z',
  },
  {
    id: 'course-3',
    title: 'Cloud DevOps Engineering with Docker & Kubernetes',
    shortDescription: 'Containerize applications, automate CI/CD pipelines, and deploy resilient microservices.',
    description: 'A comprehensive curriculum covering container technologies, continuous integration, infrastructure automation, and cloud monitoring.',
    category: 'Cloud & DevOps',
    level: 'ADVANCED',
    durationWeeks: 12,
    instructorId: 'user-mentor-1',
    instructorName: 'Dr. Hanna Tesfaye',
    instructorTitle: 'Lead Software Architect & Lecturer',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80',
    learningObjectives: [
      'Build minimal, secure Docker images',
      'Configure Kubernetes deployments, services, and ingresses',
      'Automate testing and release pipelines with GitHub Actions',
      'Monitor container health and cluster logs',
    ],
    materials: [],
    status: 'PUBLISHED',
    enrolledStudentsCount: 64,
    isEnrolled: false,
    progressPercentage: 0,
    createdAt: '2026-10-05T08:00:00Z',
    updatedAt: '2026-10-18T08:00:00Z',
  },
  {
    id: 'course-4',
    title: 'UI/UX Product Design with Figma & Design Systems',
    shortDescription: 'Design intuitive interfaces, interactive design systems, and delightful digital user experiences.',
    description: 'From wireframing and user research to interactive Figma prototyping, typography, and accessibility best practices.',
    category: 'UI/UX Design',
    level: 'BEGINNER',
    durationWeeks: 6,
    instructorId: 'user-mentor-1',
    instructorName: 'Dr. Hanna Tesfaye',
    instructorTitle: 'Lead Software Architect & Lecturer',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
    learningObjectives: [
      'Conduct user interviews and synthesize journey maps',
      'Build reusable component libraries and autolayouts in Figma',
      'Validate accessibility and color contrast compliance',
      'Create high-fidelity interactive prototypes',
    ],
    materials: [],
    status: 'PUBLISHED',
    enrolledStudentsCount: 110,
    isEnrolled: false,
    progressPercentage: 0,
    createdAt: '2026-10-12T08:00:00Z',
    updatedAt: '2026-10-18T08:00:00Z',
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Modern Web Engineering (React & Node.js)',
    title: 'Assignment 1: Responsive Dashboard UI with React & Tailwind',
    description: 'Implement a multi-role responsive dashboard layout with mobile sidebar drawer.',
    instructions: 'Build a reusable DashboardLayout component with top navigation, collapsible sidebar, and responsive mobile overlay. Use Tailwind CSS and ensure keyboard accessibility.',
    dueDate: '2026-11-15T23:59:59Z',
    totalPoints: 100,
    submissionsCount: 28,
    createdAt: '2026-10-01T10:00:00Z',
  },
  {
    id: 'asg-2',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Modern Web Engineering (React & Node.js)',
    title: 'Assignment 2: RESTful Authentication API with Express & MySQL',
    description: 'Create secure registration and login endpoints with password hashing and JWT issuance.',
    instructions: 'Implement POST /auth/register and POST /auth/login with bcrypt, jsonwebtoken, and input validation using Zod. Write integration tests verifying 400 and 401 cases.',
    dueDate: '2026-11-30T23:59:59Z',
    totalPoints: 100,
    submissionsCount: 19,
    createdAt: '2026-10-10T10:00:00Z',
  },
];

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub-1',
    assignmentId: 'asg-1',
    assignmentTitle: 'Assignment 1: Responsive Dashboard UI with React & Tailwind',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Modern Web Engineering (React & Node.js)',
    studentId: 'user-learner-1',
    studentName: 'Abebe Kebede',
    studentEmail: 'learner@addisbuilder.edu',
    submittedAt: '2026-10-12T16:45:00Z',
    content: 'Completed the responsive dashboard implementation. Included collapsible desktop sidebar, slide-over mobile drawer, accessibility ARIA labels, and keyboard Esc close support. GitHub Repository: https://github.com/example/student-dashboard-demo',
    attachmentUrl: 'https://example.com/submissions/dashboard-ui.zip',
    attachmentName: 'dashboard-ui-submission.zip',
    grade: 96,
    feedback: 'Outstanding work Abebe! The responsive transitions are smooth and the ARIA accessibility attributes are properly configured.',
    status: 'GRADED',
  },
];

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    title: 'Junior Frontend Developer Intern',
    organizationId: 'org-brolf-1',
    organizationName: 'Brolf Technologies',
    organizationLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=120&q=80',
    location: 'Addis Ababa (Bole Medhanealem)',
    workMode: 'HYBRID',
    category: 'Frontend Engineering',
    description: 'Join our product engineering squad building scalable web portals and enterprise SaaS applications. You will collaborate directly with senior frontend architects and UX designers.',
    responsibilities: [
      'Develop modern, responsive web components in React and TypeScript',
      'Integrate RESTful and GraphQL APIs with optimistic UI updates',
      'Participate in daily agile standups and sprint planning',
      'Write unit tests using Vitest and React Testing Library',
    ],
    requirements: [
      'Strong grasp of HTML5, CSS3, modern JavaScript, and React fundamentals',
      'Familiarity with Git version control and team workflows',
      'Enrolled in University Computer Science, Software Engineering, or related field',
      'Eagerness to learn and take constructive feedback',
    ],
    eligibility: '3rd or 4th-year university undergraduate students with GPA 3.0 or higher.',
    stipend: 'ETB 10,000 / month + Transport Allowance',
    durationMonths: 6,
    deadline: '2026-11-20',
    status: 'PUBLISHED',
    postedById: 'user-employer-1',
    postedByRole: 'EMPLOYER',
    applicantsCount: 14,
    isSaved: true,
    hasApplied: true,
    createdAt: '2026-10-01T09:00:00Z',
  },
  {
    id: 'intern-2',
    title: 'Backend Cloud Services Intern',
    organizationId: 'org-brolf-1',
    organizationName: 'Brolf Technologies',
    organizationLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=120&q=80',
    location: 'Remote (Ethiopia)',
    workMode: 'REMOTE',
    category: 'Backend Engineering',
    description: 'Work on high-throughput microservices, database optimizations, and asynchronous message queue architectures.',
    responsibilities: [
      'Design clean REST API contracts and data models',
      'Optimize SQL queries and connection pools in MySQL',
      'Help maintain CI/CD pipelines and Docker containers',
    ],
    requirements: [
      'Understanding of Node.js, Express, and relational databases',
      'Knowledge of HTTP protocols, REST conventions, and JSON schemas',
      'Good analytical and problem-solving skills',
    ],
    eligibility: 'Final-year students or recent graduates in IT/Software disciplines.',
    stipend: 'ETB 12,000 / month',
    durationMonths: 4,
    deadline: '2026-12-01',
    status: 'PUBLISHED',
    postedById: 'user-employer-1',
    postedByRole: 'EMPLOYER',
    applicantsCount: 9,
    isSaved: false,
    hasApplied: false,
    createdAt: '2026-10-05T11:00:00Z',
  },
  {
    id: 'intern-3',
    title: 'University Co-Op Internship: Data Analyst Intern',
    organizationId: 'org-brolf-1',
    organizationName: 'Addis Linkage Academic Partners',
    organizationLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    location: 'Addis Ababa (Kazanchis)',
    workMode: 'ONSITE',
    category: 'Data Analysis',
    description: 'Collaborative university industry internship managed via the University Career & Industry Linkage Office.',
    responsibilities: [
      'Assist in compiling academic analytics and student placement metrics',
      'Build automated reporting dashboards using Python and SQL',
      'Prepare summary presentation decks for faculty leadership',
    ],
    requirements: [
      'Proficiency with Excel, SQL, and Python basics',
      'Good communication and presentation skills',
    ],
    eligibility: 'Open to enrolled students from partnering universities.',
    stipend: 'ETB 8,500 / month',
    durationMonths: 3,
    deadline: '2026-11-28',
    status: 'PUBLISHED',
    postedById: 'user-coord-1',
    postedByRole: 'INTERNSHIP_COORDINATOR',
    applicantsCount: 6,
    isSaved: true,
    hasApplied: false,
    createdAt: '2026-10-08T14:00:00Z',
  },
  {
    id: 'intern-4',
    title: 'Mobile App Developer Intern (Flutter / React Native)',
    organizationId: 'org-brolf-1',
    organizationName: 'Brolf Technologies',
    organizationLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=120&q=80',
    location: 'Addis Ababa, Bole',
    workMode: 'HYBRID',
    category: 'Mobile App Development',
    description: 'Help build cross-platform mobile experiences for Android and iOS devices.',
    responsibilities: [
      'Build responsive, native-feeling mobile UI screens',
      'Test apps across various Android screen sizes',
      'Connect mobile views with backend REST endpoints',
    ],
    requirements: [
      'Experience with Flutter or React Native',
      'Familiarity with mobile state management',
    ],
    eligibility: 'Computer Science or Software Engineering undergraduate.',
    stipend: 'ETB 11,000 / month',
    durationMonths: 6,
    deadline: '2026-11-25',
    status: 'PUBLISHED',
    postedById: 'user-employer-1',
    postedByRole: 'EMPLOYER',
    applicantsCount: 11,
    isSaved: false,
    hasApplied: false,
    createdAt: '2026-10-10T10:00:00Z',
  },
];

export const INITIAL_APPLICATIONS: InternshipApplication[] = [
  {
    id: 'app-1',
    internshipId: 'intern-1',
    internshipTitle: 'Junior Frontend Developer Intern',
    organizationName: 'Brolf Technologies',
    applicantId: 'user-learner-1',
    applicantName: 'Abebe Kebede',
    applicantEmail: 'learner@addisbuilder.edu',
    applicantPhone: '+251 91 123 4567',
    university: 'Addis Ababa University',
    department: 'Computer Science',
    coverLetter: 'I am excited to apply for the Junior Frontend Developer Internship at Brolf Technologies. Through my coursework at AAU and personal projects, I have developed strong skills in React, TypeScript, and modern CSS. I am eager to contribute to your engineering squad and learn from your senior developers.',
    cvUrl: 'https://example.com/resumes/abebe-kebede-cv.pdf',
    cvFileName: 'Abebe_Kebede_Resume_2026.pdf',
    status: 'SHORTLISTED',
    appliedAt: '2026-10-06T14:20:00Z',
    notes: 'Strong technical coursework and great GitHub demo.',
  },
  {
    id: 'app-2',
    internshipId: 'intern-1',
    internshipTitle: 'Junior Frontend Developer Intern',
    organizationName: 'Brolf Technologies',
    applicantId: 'user-learner-2',
    applicantName: 'Sara Mengistu',
    applicantEmail: 'sara.m@aau.edu',
    applicantPhone: '+251 92 888 7766',
    university: 'Addis Ababa University',
    department: 'Software Engineering',
    coverLetter: 'Passionate about accessible web interfaces and design systems. Looking forward to applying my React expertise.',
    cvUrl: 'https://example.com/resumes/sara-cv.pdf',
    cvFileName: 'Sara_Mengistu_CV.pdf',
    status: 'PENDING',
    appliedAt: '2026-10-09T09:15:00Z',
  },
];

export const INITIAL_COORDINATOR_REQUESTS: CoordinatorRequest[] = [
  {
    id: 'req-1',
    userId: 'user-coord-pending',
    fullName: 'Marta Bekele',
    email: 'pending.coordinator@addisbuilder.edu',
    university: 'Adama Science and Technology University',
    department: 'Faculty of Computing',
    employeeId: 'ASTU/EMP/2021/89',
    proofDocumentUrl: 'https://example.com/proofs/astu-employment-letter.pdf',
    status: 'PENDING',
    requestDate: '2026-01-10T14:30:00Z',
  },
  {
    id: 'req-2',
    userId: 'user-coord-1',
    fullName: 'Yonas Alemu',
    email: 'coordinator@addisbuilder.edu',
    university: 'Addis Ababa University',
    department: 'Career & Industry Linkage Office',
    employeeId: 'AAU/STAFF/771',
    proofDocumentUrl: 'https://example.com/proofs/aau-linkage-letter.pdf',
    status: 'APPROVED',
    requestDate: '2025-08-20T11:00:00Z',
    decisionDate: '2025-08-21T15:00:00Z',
    decisionNotes: 'Credentials and university staff badge verified.',
  },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-learner-1',
    title: 'Application Shortlisted!',
    message: 'Your application for Junior Frontend Developer Intern at Brolf Technologies was moved to Shortlisted.',
    type: 'SUCCESS',
    link: '/learner/applications',
    isRead: false,
    createdAt: '2026-10-15T11:00:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-learner-1',
    title: 'Assignment Graded',
    message: 'Dr. Hanna Tesfaye graded your Assignment 1: Responsive Dashboard UI (Score: 96/100).',
    type: 'INFO',
    link: '/learner/assignments',
    isRead: false,
    createdAt: '2026-10-14T09:30:00Z',
  },
  {
    id: 'notif-3',
    userId: 'user-mentor-1',
    title: 'New Student Submission',
    message: 'Abebe Kebede submitted Assignment 1 in Full-Stack Modern Web Engineering.',
    type: 'INFO',
    link: '/mentor/submissions',
    isRead: false,
    createdAt: '2026-10-12T16:45:00Z',
  },
  {
    id: 'notif-4',
    userId: 'user-employer-1',
    title: 'New Applicant Received',
    message: 'Sara Mengistu applied for Junior Frontend Developer Intern.',
    type: 'INFO',
    link: '/employer/applicants',
    isRead: false,
    createdAt: '2026-10-09T09:15:00Z',
  },
  {
    id: 'notif-5',
    userId: 'user-admin-1',
    title: 'Pending Coordinator Request',
    message: 'Marta Bekele from Adama Science and Technology University submitted coordinator verification request.',
    type: 'WARNING',
    link: '/super-admin/coordinator-approvals',
    isRead: false,
    createdAt: '2026-01-10T14:30:00Z',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    actorId: 'user-admin-1',
    actorName: 'Super Administrator',
    actorRole: 'SUPER_ADMIN',
    action: 'COORDINATOR_APPROVAL',
    targetType: 'COORDINATOR_REQUEST',
    targetId: 'req-2',
    details: 'Approved coordinator request for Yonas Alemu (Addis Ababa University).',
    timestamp: '2025-08-21T15:00:00Z',
    ipAddress: '197.156.104.22',
  },
  {
    id: 'log-2',
    actorId: 'user-admin-1',
    actorName: 'Super Administrator',
    actorRole: 'SUPER_ADMIN',
    action: 'ORGANIZATION_VERIFICATION',
    targetType: 'ORGANIZATION',
    targetId: 'org-brolf-1',
    details: 'Approved verified organization status for Brolf Technologies.',
    timestamp: '2025-09-08T10:15:00Z',
    ipAddress: '197.156.104.22',
  },
  {
    id: 'log-3',
    actorId: 'user-mentor-1',
    actorName: 'Dr. Hanna Tesfaye',
    actorRole: 'MENTOR',
    action: 'PUBLISH_COURSE',
    targetType: 'COURSE',
    targetId: 'course-1',
    details: 'Published new course "Full-Stack Modern Web Engineering (React & Node.js)".',
    timestamp: '2025-09-20T08:00:00Z',
    ipAddress: '197.156.102.85',
  },
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-1',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Modern Web Engineering (React & Node.js)',
    studentId: 'user-learner-1',
    studentName: 'Abebe Kebede',
    studentEmail: 'learner@addisbuilder.edu',
    studentAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    studentUniversity: 'Addis Ababa University',
    studentDepartment: 'Computer Science',
    enrollmentDate: '2025-09-21T10:00:00Z',
    status: 'ACTIVE',
    progressPercentage: 65,
    completedLessonsCount: 4,
    totalLessonsCount: 6,
    instructorId: 'user-mentor-1',
  },
  {
    id: 'enr-2',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Modern Web Engineering (React & Node.js)',
    studentId: 'user-learner-2',
    studentName: 'Dawit Mengistu',
    studentEmail: 'dawit.m@addisbuilder.edu',
    studentAvatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    studentUniversity: 'Addis Ababa Institute of Technology',
    studentDepartment: 'Software Engineering',
    enrollmentDate: '2025-09-22T14:30:00Z',
    status: 'ACTIVE',
    progressPercentage: 83,
    completedLessonsCount: 5,
    totalLessonsCount: 6,
    instructorId: 'user-mentor-1',
  },
  {
    id: 'enr-3',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Modern Web Engineering (React & Node.js)',
    studentId: 'user-learner-3',
    studentName: 'Sara Tadesse',
    studentEmail: 'sara.t@addisbuilder.edu',
    studentAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    studentUniversity: 'Addis Ababa University',
    studentDepartment: 'Information Systems',
    enrollmentDate: '2025-09-23T09:15:00Z',
    status: 'COMPLETED',
    progressPercentage: 100,
    completedLessonsCount: 6,
    totalLessonsCount: 6,
    instructorId: 'user-mentor-1',
  },
  {
    id: 'enr-4',
    courseId: 'course-1',
    courseTitle: 'Full-Stack Modern Web Engineering (React & Node.js)',
    studentId: 'user-learner-4',
    studentName: 'Betelhem Assefa',
    studentEmail: 'betelhem.a@addisbuilder.edu',
    studentAvatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    studentUniversity: 'Adama Science and Technology University',
    studentDepartment: 'Computer Science',
    enrollmentDate: '2025-09-24T16:00:00Z',
    status: 'ACTIVE',
    progressPercentage: 33,
    completedLessonsCount: 2,
    totalLessonsCount: 6,
    instructorId: 'user-mentor-1',
  },
  {
    id: 'enr-5',
    courseId: 'course-2',
    courseTitle: 'Python for Data Science, Statistics & Machine Learning',
    studentId: 'user-learner-5',
    studentName: 'Michael Haile',
    studentEmail: 'michael.h@addisbuilder.edu',
    studentUniversity: 'Hawassa University',
    studentDepartment: 'Software Engineering',
    enrollmentDate: '2025-09-25T11:45:00Z',
    status: 'ACTIVE',
    progressPercentage: 50,
    completedLessonsCount: 2,
    totalLessonsCount: 4,
    instructorId: 'user-mentor-1',
  },
  {
    id: 'enr-6',
    courseId: 'course-2',
    courseTitle: 'Python for Data Science, Statistics & Machine Learning',
    studentId: 'user-learner-6',
    studentName: 'Yared Alemu',
    studentEmail: 'yared.a@addisbuilder.edu',
    studentAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    studentUniversity: 'Addis Ababa Institute of Technology',
    studentDepartment: 'Software Engineering',
    enrollmentDate: '2025-09-26T13:20:00Z',
    status: 'ACTIVE',
    progressPercentage: 75,
    completedLessonsCount: 3,
    totalLessonsCount: 4,
    instructorId: 'user-mentor-1',
  },
];

export const INITIAL_COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    courseId: 'course-1',
    title: 'Module 1: Foundations of Modern Web Architecture',
    description: 'Master the principles of decoupled client-server architecture, modern ESNext, and TypeScript.',
    order: 1,
    lessons: [
      {
        id: 'les-1',
        moduleId: 'mod-1',
        title: '1.1 System Architecture & Development Environment Setup',
        type: 'VIDEO',
        duration: '28 min',
        content: 'This introductory lesson details project bootstrapping with Vite, configuring TypeScript strict mode, setting up ESLint, and organizing scalable directory structures.',
        videoUrl: 'https://example.com/videos/les-1.mp4',
        isCompleted: true,
      },
      {
        id: 'les-2',
        moduleId: 'mod-1',
        title: '1.2 Advanced TypeScript Types, Interfaces, & Generics',
        type: 'READING',
        duration: '20 min',
        content: 'Deep dive into TypeScript discriminated unions, generic constraints, and runtime validation patterns using Zod schemas for incoming client payloads.',
        documentUrl: 'https://example.com/docs/ts-architecture.pdf',
        isCompleted: true,
      },
    ],
  },
  {
    id: 'mod-2',
    courseId: 'course-1',
    title: 'Module 2: Component Engineering & State Management',
    description: 'Build performant, accessible UI design systems using React, Tailwind CSS, and headless components.',
    order: 2,
    lessons: [
      {
        id: 'les-3',
        moduleId: 'mod-2',
        title: '2.1 Design Tokens, Color Palettes, & Responsive Grids',
        type: 'VIDEO',
        duration: '35 min',
        content: 'Learn how to construct cohesive design systems adhering to WCAG 2.1 AA accessibility standards, responsive sidebar drawers, and fluid typography.',
        videoUrl: 'https://example.com/videos/les-3.mp4',
        isCompleted: true,
      },
      {
        id: 'les-4',
        moduleId: 'mod-2',
        title: '2.2 Asynchronous Data Fetching, Interceptors & Error Boundaries',
        type: 'READING',
        duration: '25 min',
        content: 'Explore centralized Axios clients, automatic token attachment in request interceptors, exponential backoff, and graceful UI error boundaries.',
        documentUrl: 'https://example.com/docs/network-architecture.pdf',
        isCompleted: true,
      },
    ],
  },
  {
    id: 'mod-3',
    courseId: 'course-1',
    title: 'Module 3: Relational Backend Integration & Security',
    description: 'Construct secure REST APIs with Node.js, Express, password hashing, and MySQL schemas.',
    order: 3,
    lessons: [
      {
        id: 'les-5',
        moduleId: 'mod-3',
        title: '3.1 JWT Authentication, Role Guards, & Session Security',
        type: 'VIDEO',
        duration: '42 min',
        content: 'Comprehensive review of authentication mechanisms, preventing CSRF and XSS attacks, rotating refresh tokens, and implementing role-based route guards.',
        videoUrl: 'https://example.com/videos/les-5.mp4',
        isCompleted: false,
      },
      {
        id: 'les-6',
        moduleId: 'mod-3',
        title: '3.2 Production Deployment, Docker, and CI/CD Automation',
        type: 'READING',
        duration: '30 min',
        content: 'Step-by-step guide to writing multi-stage Dockerfiles, setting up GitHub Actions workflows, running Vitest suites, and deploying production bundles.',
        documentUrl: 'https://example.com/docs/deployment-guide.pdf',
        isCompleted: false,
      },
    ],
  },
];

```
<!-- END_FILE -->

---
<!-- FILE: src/services/mockStorage.ts -->
## src/services/mockStorage.ts

```ts
import {
  User,
  Course,
  Assignment,
  AssignmentSubmission,
  Internship,
  InternshipApplication,
  Organization,
  CoordinatorRequest,
  Notification,
  AuditLog,
  ApprovalStatus,
  ApplicationStatus,
  VerificationStatus,
  Enrollment,
  CourseModule,
  Lesson,
} from '../types';

import {
  INITIAL_USERS,
  INITIAL_ORGANIZATION,
  INITIAL_COURSES,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_INTERNSHIPS,
  INITIAL_APPLICATIONS,
  INITIAL_COORDINATOR_REQUESTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ENROLLMENTS,
  INITIAL_COURSE_MODULES,
} from './mockData';

// Delay helper for realistic async experience
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

class MockStorage {
  private getStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`addis_mock_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`addis_mock_${key}`, JSON.stringify(value));
    } catch {
      // Ignore quota errors in fallback
    }
  }

  // --- USERS ---
  async getUsers(): Promise<User[]> {
    await delay();
    return this.getStorage<User[]>('users', INITIAL_USERS);
  }

  async getUserById(id: string): Promise<User | null> {
    const users = await this.getUsers();
    return users.find((u) => u.id === id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    await delay();
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');
    const updated = { ...users[index], ...updates };
    users[index] = updated;
    this.setStorage('users', users);
    return updated;
  }

  async toggleUserActive(id: string): Promise<User> {
    await delay();
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');
    users[index].isActive = !users[index].isActive;
    this.setStorage('users', users);
    return users[index];
  }

  // --- COURSES ---
  async getCourses(): Promise<Course[]> {
    await delay();
    return this.getStorage<Course[]>('courses', INITIAL_COURSES);
  }

  async getCourseById(id: string): Promise<Course | null> {
    const courses = await this.getCourses();
    return courses.find((c) => c.id === id) || null;
  }

  async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledStudentsCount'>): Promise<Course> {
    await delay();
    const courses = await this.getCourses();
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      enrolledStudentsCount: 0,
      materials: courseData.materials || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    courses.unshift(newCourse);
    this.setStorage('courses', courses);
    return newCourse;
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    await delay();
    const courses = await this.getCourses();
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Course not found');
    const updated = { ...courses[index], ...updates, updatedAt: new Date().toISOString() };
    courses[index] = updated;
    this.setStorage('courses', courses);
    return updated;
  }

  async enrollCourse(courseId: string, userId: string): Promise<Course> {
    await delay();
    const courses = await this.getCourses();
    const index = courses.findIndex((c) => c.id === courseId);
    if (index === -1) throw new Error('Course not found');
    courses[index].isEnrolled = true;
    courses[index].enrolledStudentsCount += 1;
    courses[index].progressPercentage = courses[index].progressPercentage || 10;
    this.setStorage('courses', courses);

    // Sync to enrollments
    const enrollments = this.getStorage<Enrollment[]>('enrollments', INITIAL_ENROLLMENTS);
    const existing = enrollments.find((e) => e.courseId === courseId && e.studentId === userId);
    if (!existing) {
      const users = await this.getUsers();
      const currentUser = users.find((u) => u.id === userId);
      const newEnrollment: Enrollment = {
        id: `enr-${Date.now()}`,
        courseId,
        courseTitle: courses[index].title,
        studentId: userId,
        studentName: currentUser?.fullName || 'Enrolled Student',
        studentEmail: currentUser?.email || 'student@university.edu',
        studentAvatarUrl: currentUser?.avatarUrl,
        studentUniversity: currentUser?.university || 'Addis Ababa University',
        studentDepartment: currentUser?.department || 'Computer Science',
        enrollmentDate: new Date().toISOString(),
        status: 'ACTIVE',
        progressPercentage: 10,
        completedLessonsCount: 1,
        totalLessonsCount: 6,
        instructorId: courses[index].instructorId,
      };
      enrollments.unshift(newEnrollment);
      this.setStorage('enrollments', enrollments);
    }

    return courses[index];
  }

  // --- ENROLLMENTS & MODULES ---
  async getEnrollments(filters?: { instructorId?: string; courseId?: string; studentId?: string; status?: string }): Promise<Enrollment[]> {
    await delay();
    let enrollments = this.getStorage<Enrollment[]>('enrollments', INITIAL_ENROLLMENTS);
    if (filters?.instructorId) {
      enrollments = enrollments.filter((e) => e.instructorId === filters.instructorId);
    }
    if (filters?.courseId && filters.courseId !== 'ALL') {
      enrollments = enrollments.filter((e) => e.courseId === filters.courseId);
    }
    if (filters?.studentId) {
      enrollments = enrollments.filter((e) => e.studentId === filters.studentId);
    }
    if (filters?.status && filters.status !== 'ALL') {
      enrollments = enrollments.filter((e) => e.status === filters.status);
    }
    return enrollments;
  }

  async getEnrollmentById(id: string): Promise<Enrollment | null> {
    const list = await this.getEnrollments();
    return list.find((e) => e.id === id) || null;
  }

  async updateEnrollmentStatus(id: string, status: 'ACTIVE' | 'COMPLETED' | 'DROPPED'): Promise<Enrollment> {
    await delay();
    const enrollments = this.getStorage<Enrollment[]>('enrollments', INITIAL_ENROLLMENTS);
    const index = enrollments.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Enrollment record not found');
    enrollments[index].status = status;
    if (status === 'COMPLETED') {
      enrollments[index].progressPercentage = 100;
    }
    this.setStorage('enrollments', enrollments);
    return enrollments[index];
  }

  async getCourseModules(courseId: string): Promise<CourseModule[]> {
    await delay();
    const allModules = this.getStorage<CourseModule[]>('course_modules', INITIAL_COURSE_MODULES);
    const courseMods = allModules.filter((m) => m.courseId === courseId);
    if (courseMods.length > 0) return courseMods;

    // Return default modules for course
    return [
      {
        id: `mod-${courseId}-1`,
        courseId,
        title: 'Module 1: Orientation & Foundations',
        description: 'Comprehensive introduction to core concepts and syllabus objectives.',
        order: 1,
        lessons: [
          {
            id: `les-${courseId}-1`,
            moduleId: `mod-${courseId}-1`,
            title: '1.1 Introduction to Curriculum & Setup',
            type: 'VIDEO',
            duration: '25 min',
            content: 'Overview of foundational tools, course structure, and learning milestones.',
            isCompleted: true,
          },
          {
            id: `les-${courseId}-2`,
            moduleId: `mod-${courseId}-1`,
            title: '1.2 Core Theory & Principles',
            type: 'READING',
            duration: '15 min',
            content: 'Core reading on design patterns, software architecture, and standards.',
            isCompleted: false,
          },
        ],
      },
      {
        id: `mod-${courseId}-2`,
        courseId,
        title: 'Module 2: Practical Implementation & Lab Work',
        description: 'Hands-on practical implementation exercises and assignment milestones.',
        order: 2,
        lessons: [
          {
            id: `les-${courseId}-3`,
            moduleId: `mod-${courseId}-2`,
            title: '2.1 Implementation Deep Dive',
            type: 'VIDEO',
            duration: '40 min',
            content: 'Step-by-step coding walkthrough building robust and tested components.',
            isCompleted: false,
          },
        ],
      },
    ];
  }

  async markLessonComplete(courseId: string, lessonId: string, studentId: string): Promise<{ progressPercentage: number; completedCount: number }> {
    await delay();
    const allModules = this.getStorage<CourseModule[]>('course_modules', INITIAL_COURSE_MODULES);
    let totalLessons = 0;
    let completedLessons = 0;

    allModules.forEach((m) => {
      if (m.courseId === courseId) {
        m.lessons.forEach((l) => {
          totalLessons += 1;
          if (l.id === lessonId) {
            l.isCompleted = true;
          }
          if (l.isCompleted) {
            completedLessons += 1;
          }
        });
      }
    });
    this.setStorage('course_modules', allModules);

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 100;

    const courses = await this.getCourses();
    const cIndex = courses.findIndex((c) => c.id === courseId);
    if (cIndex !== -1) {
      courses[cIndex].progressPercentage = progressPercentage;
      this.setStorage('courses', courses);
    }

    const enrollments = this.getStorage<Enrollment[]>('enrollments', INITIAL_ENROLLMENTS);
    const eIndex = enrollments.findIndex((e) => e.courseId === courseId && e.studentId === studentId);
    if (eIndex !== -1) {
      enrollments[eIndex].progressPercentage = progressPercentage;
      enrollments[eIndex].completedLessonsCount = completedLessons;
      enrollments[eIndex].totalLessonsCount = totalLessons;
      if (progressPercentage === 100) {
        enrollments[eIndex].status = 'COMPLETED';
      }
      this.setStorage('enrollments', enrollments);
    }

    return { progressPercentage, completedCount: completedLessons };
  }

  // --- ASSIGNMENTS ---
  async getAssignments(courseId?: string): Promise<Assignment[]> {
    await delay();
    const assignments = this.getStorage<Assignment[]>('assignments', INITIAL_ASSIGNMENTS);
    if (courseId) {
      return assignments.filter((a) => a.courseId === courseId);
    }
    return assignments;
  }

  async createAssignment(data: Omit<Assignment, 'id' | 'createdAt' | 'submissionsCount'>): Promise<Assignment> {
    await delay();
    const assignments = await this.getAssignments();
    const newAssignment: Assignment = {
      ...data,
      id: `asg-${Date.now()}`,
      submissionsCount: 0,
      createdAt: new Date().toISOString(),
    };
    assignments.unshift(newAssignment);
    this.setStorage('assignments', assignments);
    return newAssignment;
  }

  // --- SUBMISSIONS ---
  async getSubmissions(assignmentId?: string, studentId?: string): Promise<AssignmentSubmission[]> {
    await delay();
    let submissions = this.getStorage<AssignmentSubmission[]>('submissions', INITIAL_SUBMISSIONS);
    if (assignmentId) submissions = submissions.filter((s) => s.assignmentId === assignmentId);
    if (studentId) submissions = submissions.filter((s) => s.studentId === studentId);
    return submissions;
  }

  async createSubmission(data: Omit<AssignmentSubmission, 'id' | 'submittedAt' | 'status'>): Promise<AssignmentSubmission> {
    await delay();
    const submissions = this.getStorage<AssignmentSubmission[]>('submissions', INITIAL_SUBMISSIONS);
    const newSub: AssignmentSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'SUBMITTED',
    };
    submissions.unshift(newSub);
    this.setStorage('submissions', submissions);

    // Update assignment submission count
    const assignments = await this.getAssignments();
    const asgIndex = assignments.findIndex((a) => a.id === data.assignmentId);
    if (asgIndex !== -1) {
      assignments[asgIndex].submissionsCount = (assignments[asgIndex].submissionsCount || 0) + 1;
      this.setStorage('assignments', assignments);
    }
    return newSub;
  }

  async gradeSubmission(id: string, grade: number, feedback: string): Promise<AssignmentSubmission> {
    await delay();
    const submissions = this.getStorage<AssignmentSubmission[]>('submissions', INITIAL_SUBMISSIONS);
    const index = submissions.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Submission not found');
    submissions[index].grade = grade;
    submissions[index].feedback = feedback;
    submissions[index].status = 'GRADED';
    this.setStorage('submissions', submissions);
    return submissions[index];
  }

  // --- INTERNSHIPS ---
  async getInternships(): Promise<Internship[]> {
    await delay();
    return this.getStorage<Internship[]>('internships', INITIAL_INTERNSHIPS);
  }

  async getInternshipById(id: string): Promise<Internship | null> {
    const internships = await this.getInternships();
    return internships.find((i) => i.id === id) || null;
  }

  async createInternship(data: Omit<Internship, 'id' | 'createdAt' | 'applicantsCount'>): Promise<Internship> {
    await delay();
    const internships = await this.getInternships();
    const newInternship: Internship = {
      ...data,
      id: `intern-${Date.now()}`,
      applicantsCount: 0,
      createdAt: new Date().toISOString(),
    };
    internships.unshift(newInternship);
    this.setStorage('internships', internships);
    return newInternship;
  }

  async updateInternship(id: string, updates: Partial<Internship>): Promise<Internship> {
    await delay();
    const internships = await this.getInternships();
    const index = internships.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Internship not found');
    const updated = { ...internships[index], ...updates };
    internships[index] = updated;
    this.setStorage('internships', internships);
    return updated;
  }

  async toggleSaveInternship(id: string): Promise<{ isSaved: boolean }> {
    await delay();
    const internships = await this.getInternships();
    const index = internships.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Internship not found');
    internships[index].isSaved = !internships[index].isSaved;
    this.setStorage('internships', internships);
    return { isSaved: !!internships[index].isSaved };
  }

  // --- APPLICATIONS ---
  async getApplications(internshipId?: string, applicantId?: string): Promise<InternshipApplication[]> {
    await delay();
    let apps = this.getStorage<InternshipApplication[]>('applications', INITIAL_APPLICATIONS);
    if (internshipId) apps = apps.filter((a) => a.internshipId === internshipId);
    if (applicantId) apps = apps.filter((a) => a.applicantId === applicantId);
    return apps;
  }

  async createApplication(data: Omit<InternshipApplication, 'id' | 'appliedAt' | 'status'>): Promise<InternshipApplication> {
    await delay();
    const apps = this.getStorage<InternshipApplication[]>('applications', INITIAL_APPLICATIONS);
    const newApp: InternshipApplication = {
      ...data,
      id: `app-${Date.now()}`,
      appliedAt: new Date().toISOString(),
      status: 'PENDING',
    };
    apps.unshift(newApp);
    this.setStorage('applications', apps);

    // Update internship applicant count and user hasApplied flag
    const internships = await this.getInternships();
    const internIndex = internships.findIndex((i) => i.id === data.internshipId);
    if (internIndex !== -1) {
      internships[internIndex].applicantsCount += 1;
      internships[internIndex].hasApplied = true;
      this.setStorage('internships', internships);
    }
    return newApp;
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Promise<InternshipApplication> {
    await delay();
    const apps = this.getStorage<InternshipApplication[]>('applications', INITIAL_APPLICATIONS);
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Application not found');
    apps[index].status = status;
    if (notes) apps[index].notes = notes;
    this.setStorage('applications', apps);
    return apps[index];
  }

  // --- ORGANIZATION ---
  async getOrganization(): Promise<Organization> {
    await delay();
    return this.getStorage<Organization>('organization', INITIAL_ORGANIZATION);
  }

  async updateOrganization(updates: Partial<Organization>): Promise<Organization> {
    await delay();
    const org = await this.getOrganization();
    const updated = { ...org, ...updates };
    this.setStorage('organization', updated);
    return updated;
  }

  async submitOrganizationVerification(data: {
    registrationNumber: string;
    taxId: string;
    documentName: string;
    documentUrl: string;
  }): Promise<Organization> {
    await delay();
    const org = await this.getOrganization();
    org.registrationNumber = data.registrationNumber;
    org.taxId = data.taxId;
    org.verificationStatus = 'PENDING';
    org.documents.push({
      id: `doc-${Date.now()}`,
      name: data.documentName,
      type: 'VERIFICATION_PROOF',
      url: data.documentUrl,
      uploadedAt: new Date().toISOString(),
    });
    this.setStorage('organization', org);
    return org;
  }

  async setOrganizationVerificationStatus(status: VerificationStatus, notes?: string): Promise<Organization> {
    await delay();
    const org = await this.getOrganization();
    org.verificationStatus = status;
    if (notes) org.verificationNotes = notes;
    this.setStorage('organization', org);
    return org;
  }

  // --- COORDINATOR REQUESTS ---
  async getCoordinatorRequests(): Promise<CoordinatorRequest[]> {
    await delay();
    return this.getStorage<CoordinatorRequest[]>('coord_requests', INITIAL_COORDINATOR_REQUESTS);
  }

  async decideCoordinatorRequest(id: string, status: ApprovalStatus, notes?: string): Promise<CoordinatorRequest> {
    await delay();
    const reqs = await this.getCoordinatorRequests();
    const index = reqs.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Request not found');
    reqs[index].status = status;
    reqs[index].decisionDate = new Date().toISOString();
    if (notes) reqs[index].decisionNotes = notes;
    this.setStorage('coord_requests', reqs);

    // Also update corresponding user
    const users = await this.getUsers();
    const userIndex = users.findIndex((u) => u.id === reqs[index].userId);
    if (userIndex !== -1) {
      users[userIndex].coordinatorStatus = status;
      this.setStorage('users', users);
    }
    return reqs[index];
  }

  // --- NOTIFICATIONS ---
  async getNotifications(userId: string): Promise<Notification[]> {
    await delay();
    const notifs = this.getStorage<Notification[]>('notifications', INITIAL_NOTIFICATIONS);
    return notifs.filter((n) => n.userId === userId || n.userId === 'all');
  }

  async markNotificationRead(id: string): Promise<void> {
    const notifs = this.getStorage<Notification[]>('notifications', INITIAL_NOTIFICATIONS);
    const index = notifs.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifs[index].isRead = true;
      this.setStorage('notifications', notifs);
    }
  }

  async markAllNotificationsRead(userId: string): Promise<void> {
    const notifs = this.getStorage<Notification[]>('notifications', INITIAL_NOTIFICATIONS);
    notifs.forEach((n) => {
      if (n.userId === userId) n.isRead = true;
    });
    this.setStorage('notifications', notifs);
  }

  // --- AUDIT LOGS ---
  async getAuditLogs(): Promise<AuditLog[]> {
    await delay();
    return this.getStorage<AuditLog[]>('audit_logs', INITIAL_AUDIT_LOGS);
  }
}

export const mockStorage = new MockStorage();

```
<!-- END_FILE -->

---
<!-- FILE: src/services/notifications.service.ts -->
## src/services/notifications.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Notification } from '../types';

export const notificationsService = {
  async getNotifications(): Promise<Notification[]> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (!user) return [];
      return mockStorage.getNotifications(user.id);
    }
    const response = await apiClient.get<Notification[]>('/notifications');
    return response.data;
  },

  async markAsRead(id: string): Promise<void> {
    if (USE_MOCK) {
      return mockStorage.markNotificationRead(id);
    }
    await apiClient.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (user) await mockStorage.markAllNotificationsRead(user.id);
      return;
    }
    await apiClient.post('/notifications/read-all');
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/organizations.service.ts -->
## src/services/organizations.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Organization, VerificationStatus } from '../types';

export const organizationsService = {
  async getMyOrganization(): Promise<Organization> {
    if (USE_MOCK) {
      return mockStorage.getOrganization();
    }
    const response = await apiClient.get<Organization>('/organizations/me');
    return response.data;
  },

  async updateMyOrganization(updates: Partial<Organization>): Promise<Organization> {
    if (USE_MOCK) {
      return mockStorage.updateOrganization(updates);
    }
    const response = await apiClient.patch<Organization>('/organizations/me', updates);
    return response.data;
  },

  async submitVerification(data: {
    registrationNumber: string;
    taxId: string;
    documentName: string;
    documentUrl: string;
  }): Promise<Organization> {
    if (USE_MOCK) {
      return mockStorage.submitOrganizationVerification(data);
    }
    const response = await apiClient.post<Organization>('/organizations/me/verification', data);
    return response.data;
  },

  async getAllOrganizationsAdmin(): Promise<Organization[]> {
    if (USE_MOCK) {
      const org = await mockStorage.getOrganization();
      return [org];
    }
    const response = await apiClient.get<Organization[]>('/admin/organizations');
    return response.data;
  },

  async decideVerificationAdmin(status: VerificationStatus, notes?: string): Promise<Organization> {
    if (USE_MOCK) {
      return mockStorage.setOrganizationVerificationStatus(status, notes);
    }
    const response = await apiClient.post<Organization>('/admin/organizations/org-brolf-1/verification-decision', {
      status,
      notes,
    });
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/reports.service.ts -->
## src/services/reports.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { DashboardStats, AuditLog } from '../types';

export const reportsService = {
  async getOverviewStats(): Promise<DashboardStats> {
    if (USE_MOCK) {
      const [users, courses, internships, applications, coordRequests, submissions] = await Promise.all([
        mockStorage.getUsers(),
        mockStorage.getCourses(),
        mockStorage.getInternships(),
        mockStorage.getApplications(),
        mockStorage.getCoordinatorRequests(),
        mockStorage.getSubmissions(),
      ]);

      const learners = users.filter((u) => u.role === 'LEARNER').length;
      const mentors = users.filter((u) => u.role === 'MENTOR').length;
      const pendingCoords = coordRequests.filter((r) => r.status === 'PENDING').length;
      const pendingGrades = submissions.filter((s) => s.status === 'SUBMITTED').length;

      return {
        totalLearners: learners,
        totalMentors: mentors,
        totalCourses: courses.length,
        totalInternships: internships.length,
        totalApplications: applications.length,
        pendingApprovals: pendingCoords,
        pendingVerifications: 1,
        activeEnrollments: 240,
        completionRate: 88,
        submissionsCount: submissions.length,
        gradesPending: pendingGrades,
      };
    }
    const response = await apiClient.get<DashboardStats>('/admin/reports/overview');
    return response.data;
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    if (USE_MOCK) {
      return mockStorage.getAuditLogs();
    }
    const response = await apiClient.get<AuditLog[]>('/admin/audit-logs');
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/uploads.service.ts -->
## src/services/uploads.service.ts

```ts
import { apiClient, USE_MOCK } from './api';

export interface UploadResult {
  url: string;
  filename: string;
  sizeBytes: number;
}

export const uploadsService = {
  async uploadFile(file: File, purpose: 'CV' | 'VERIFICATION_DOC' | 'COURSE_MATERIAL' | 'AVATAR'): Promise<UploadResult> {
    // Validate file constraints
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeBytes) {
      throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 10 MB limit.`);
    }

    if (USE_MOCK) {
      // Simulate file upload delay
      await new Promise((resolve) => setTimeout(resolve, 400));
      // In browser mock mode, create an object URL or mock CDN link
      const fakeUrl = URL.createObjectURL(file);
      return {
        url: fakeUrl,
        filename: file.name,
        sizeBytes: file.size,
      };
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', purpose);

    const response = await apiClient.post<UploadResult>('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/services/users.service.ts -->
## src/services/users.service.ts

```ts
import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { User } from '../types';
import { UserProfileFormData } from '../schemas';

export const usersService = {
  async getProfile(): Promise<User> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      if (stored) {
        const u = JSON.parse(stored);
        const live = await mockStorage.getUserById(u.id);
        return live || u;
      }
      const users = await mockStorage.getUsers();
      return users[0];
    }
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  async updateProfile(data: UserProfileFormData): Promise<User> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const current = stored ? JSON.parse(stored) : { id: 'user-learner-1' };
      const updated = await mockStorage.updateUser(current.id, data);
      localStorage.setItem('addis_auth_user', JSON.stringify(updated));
      return updated;
    }
    const response = await apiClient.patch<User>('/users/me', data);
    return response.data;
  },

  async getAllUsers(): Promise<User[]> {
    if (USE_MOCK) {
      return mockStorage.getUsers();
    }
    const response = await apiClient.get<User[]>('/admin/users');
    return response.data;
  },

  async toggleUserActive(id: string): Promise<User> {
    if (USE_MOCK) {
      return mockStorage.toggleUserActive(id);
    }
    const response = await apiClient.patch<User>(`/admin/users/${id}/status`);
    return response.data;
  },

  async uploadProfilePhoto(file: File): Promise<User> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const current = stored ? JSON.parse(stored) : { id: 'user-learner-1' };
      // Simulate file conversion or blob URL
      const avatarUrl = URL.createObjectURL(file);
      const updated = await mockStorage.updateUser(current.id, { avatarUrl });
      localStorage.setItem('addis_auth_user', JSON.stringify(updated));
      return updated;
    }
    const formData = new FormData();
    formData.append('photo', file);
    const response = await apiClient.post<User>('/users/me/profile-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async removeProfilePhoto(): Promise<User> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const current = stored ? JSON.parse(stored) : { id: 'user-learner-1' };
      const updated = await mockStorage.updateUser(current.id, { avatarUrl: undefined });
      localStorage.setItem('addis_auth_user', JSON.stringify(updated));
      return updated;
    }
    const response = await apiClient.delete<User>('/users/me/profile-photo');
    return response.data;
  },
};

```
<!-- END_FILE -->

---
<!-- FILE: src/test/AuthValidation.test.ts -->
## src/test/AuthValidation.test.ts

```ts
import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '../schemas';

describe('Auth Zod Validation Schemas', () => {
  it('validates correct login credentials', () => {
    const valid = { email: 'student@aau.edu', password: '***REDACTED***' };
    const res = loginSchema.safeParse(valid);
    expect(res.success).toBe(true);
  });

  it('rejects invalid email formats', () => {
    const invalid = { email: 'invalid-email', password: '***REDACTED***' };
    const res = loginSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('rejects passwords shorter than 6 characters', () => {
    const invalid = { email: 'student@aau.edu', password: '***REDACTED***' };
    const res = loginSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('validates matching registration passwords', () => {
    const valid = {
      fullName: 'Abebe Kebede',
      email: 'abebe@aau.edu',
      password: '***REDACTED***',
      confirmPassword: '***REDACTED***',
      role: 'LEARNER' as const,
    };
    const res = registerSchema.safeParse(valid);
    expect(res.success).toBe(true);
  });

  it('rejects mismatched registration passwords', () => {
    const invalid = {
      fullName: 'Abebe Kebede',
      email: 'abebe@aau.edu',
      password: '***REDACTED***',
      confirmPassword: '***REDACTED***',
      role: 'LEARNER' as const,
    };
    const res = registerSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });
});

```
<!-- END_FILE -->

---
<!-- FILE: src/test/CourseEnrollmentRestrictions.test.tsx -->
## src/test/CourseEnrollmentRestrictions.test.tsx

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CourseDetailPage } from '../pages/public/CourseDetailPage';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';

describe('Course Enrollment Restrictions & Permissions', () => {
  it('redirects unauthenticated visitors to login when clicking Enroll Now', async () => {
    // Unauthenticated context
    const mockAuthContext: any = {
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      updateCurrentUser: vi.fn(),
    };

    render(
      <MemoryRouter initialEntries={['/courses/course-2']}>
        <AuthContext.Provider value={mockAuthContext}>
          <Routes>
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/login" element={<div>Sign In Screen Destination</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Wait for course to load
    const enrollBtn = await screen.findByRole('button', { name: /Enroll Now/i });
    expect(enrollBtn).toBeInTheDocument();

    fireEvent.click(enrollBtn);

    // Should redirect to login screen destination
    await waitFor(() => {
      expect(screen.getByText(/Sign In Screen Destination/i)).toBeInTheDocument();
    });
  });

  it('prevents non-student roles from student enrollment', async () => {
    const mentorUser: User = {
      id: 'user-mentor-1',
      email: 'mentor@addisbuilder.edu',
      fullName: 'Dr. Hanna Tesfaye',
      role: 'MENTOR',
      createdAt: '2025-08-15T09:00:00Z',
      isActive: true,
    };

    const mockAuthContext: any = {
      user: mentorUser,
      token: '***REDACTED***',
      role: 'MENTOR',
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      updateCurrentUser: vi.fn(),
    };

    render(
      <MemoryRouter initialEntries={['/courses/course-2']}>
        <AuthContext.Provider value={mockAuthContext}>
          <Routes>
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const enrollBtn = await screen.findByRole('button', { name: /Enroll Now/i });
    expect(enrollBtn).toBeInTheDocument();

    fireEvent.click(enrollBtn);

    // Verify button remains and user is not enrolled as a mentor
    expect(enrollBtn).toBeInTheDocument();
  });

  it('displays enrolled status and continue learning action for already enrolled students', async () => {
    const studentUser: User = {
      id: 'user-learner-1',
      email: 'learner@addisbuilder.edu',
      fullName: 'Abebe Kebede',
      role: 'LEARNER',
      createdAt: '2025-09-01T10:00:00Z',
      isActive: true,
    };

    const mockAuthContext: any = {
      user: studentUser,
      token: '***REDACTED***',
      role: 'LEARNER',
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      updateCurrentUser: vi.fn(),
    };

    // course-1 is marked as isEnrolled: true in INITIAL_COURSES
    render(
      <MemoryRouter initialEntries={['/courses/course-1']}>
        <AuthContext.Provider value={mockAuthContext}>
          <Routes>
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(await screen.findByText(/You are enrolled in this course/i)).toBeInTheDocument();
    expect(screen.getByText(/Open in Student Dashboard/i)).toBeInTheDocument();
  });
});

```
<!-- END_FILE -->

---
<!-- FILE: src/test/EmptyState.test.tsx -->
## src/test/EmptyState.test.tsx

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { EmptyState } from '../components/feedback/EmptyState';

describe('EmptyState Component', () => {
  it('renders title and description properly', () => {
    render(
      <EmptyState
        title="No courses found"
        description="Try searching with a different term."
        action={<button>Clear</button>}
      />
    );
    expect(screen.getByText('No courses found')).toBeInTheDocument();
    expect(screen.getByText('Try searching with a different term.')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });
});

```
<!-- END_FILE -->

---
<!-- FILE: src/test/MentorStudents.test.tsx -->
## src/test/MentorStudents.test.tsx

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MentorStudentsPage } from '../pages/mentor/MentorStudentsPage';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';

describe('Instructor Student List & Progress Monitoring', () => {
  const mentorUser: User = {
    id: 'user-mentor-1',
    email: 'mentor@addisbuilder.edu',
    fullName: 'Dr. Hanna Tesfaye',
    role: 'MENTOR',
    createdAt: '2025-08-15T09:00:00Z',
    isActive: true,
  };

  const mockAuthContext: any = {
    user: mentorUser,
    token: '***REDACTED***',
    role: 'MENTOR',
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    updateCurrentUser: vi.fn(),
  };

  it('renders student roster with student names, courses, progress bars, and status badges', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <MentorStudentsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Header and metrics
    expect(await screen.findByText(/Enrolled Students Roster/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Enrolled/i)).toBeInTheDocument();

    // Verify students appear in roster
    expect(screen.getByText('Abebe Kebede')).toBeInTheDocument();
    expect(screen.getByText('Dawit Mengistu')).toBeInTheDocument();
    expect(screen.getByText('Sara Tadesse')).toBeInTheDocument();
  });

  it('filters students by search input', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <MentorStudentsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await screen.findByText('Abebe Kebede');

    const searchInput = screen.getByPlaceholderText(/Search by student name, email, or department/i);
    fireEvent.change(searchInput, { target: { value: 'Sara' } });

    // Sara should remain, Abebe should be filtered out
    expect(screen.getByText('Sara Tadesse')).toBeInTheDocument();
    expect(screen.queryByText('Abebe Kebede')).not.toBeInTheDocument();
  });

  it('opens student details modal with progress and status controls', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <MentorStudentsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await screen.findByText('Abebe Kebede');

    // Click details button
    const detailButtons = screen.getAllByRole('button', { name: /Details/i });
    fireEvent.click(detailButtons[0]);

    // Modal should open
    expect(await screen.findByText(/Student Enrollment Record/i)).toBeInTheDocument();
    expect(screen.getByText(/Update Student Enrollment Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Email to Student/i)).toBeInTheDocument();
  });
});

```
<!-- END_FILE -->

---
<!-- FILE: src/test/ProfilePhotoValidation.test.tsx -->
## src/test/ProfilePhotoValidation.test.tsx

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ProfilePhotoUploader } from '../components/ui/ProfilePhotoUploader';
import { AuthProvider } from '../contexts/AuthContext';

describe('Profile Photo Validation & Management', () => {
  it('displays default initials avatar when no photo exists', () => {
    render(
      <AuthProvider>
        <ProfilePhotoUploader userName="Abebe Kebede" />
      </AuthProvider>
    );

    // Initial letters 'AK' should appear in avatar circle
    expect(screen.getByText('AK')).toBeInTheDocument();
    expect(screen.getByText('Upload Photo')).toBeInTheDocument();
  });

  it('displays current photo when avatar URL is provided', () => {
    render(
      <AuthProvider>
        <ProfilePhotoUploader
          userName="Sara Tadesse"
          currentAvatarUrl="https://example.com/sara.jpg"
        />
      </AuthProvider>
    );

    const img = screen.getByRole('img', { name: /Sara Tadesse's profile/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe('https://example.com/sara.jpg');
    expect(screen.getByText('Replace Photo')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('rejects invalid file formats with an error message', () => {
    render(
      <AuthProvider>
        <ProfilePhotoUploader userName="Test User" />
      </AuthProvider>
    );

    const input = screen.getByLabelText(/Select profile picture file/i) as HTMLInputElement;

    // Simulate uploading a disallowed file type (e.g. text/plain)
    const invalidFile = new File(['dummy content'], 'document.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [invalidFile] } });

    expect(
      screen.getByText(/Invalid file format. Please upload a JPG, PNG, or WebP image./i)
    ).toBeInTheDocument();
  });

  it('rejects files exceeding maximum size limit', () => {
    render(
      <AuthProvider>
        <ProfilePhotoUploader
          userName="Test User"
          maxSizeBytes={1024 * 1024} // 1MB limit for test
        />
      </AuthProvider>
    );

    const input = screen.getByLabelText(/Select profile picture file/i) as HTMLInputElement;

    // 2MB dummy file
    const oversized = new File([new ArrayBuffer(2 * 1024 * 1024)], 'large-photo.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(input, { target: { files: [oversized] } });

    expect(screen.getByText(/Image file exceeds maximum allowed limit/i)).toBeInTheDocument();
  });
});

```
<!-- END_FILE -->

---
<!-- FILE: src/test/PublicNavigation.test.tsx -->
## src/test/PublicNavigation.test.tsx

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { AuthProvider } from '../contexts/AuthContext';

describe('Public Website Navigation', () => {
  it('renders the 4 primary navigation items in exact required order: HOME, ABOUT, SERVICES, CONTACT', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );

    // Desktop navigation container
    const nav = screen.getByRole('navigation', { name: '' });
    const links = nav.querySelectorAll('a');

    expect(links).toHaveLength(4);
    expect(links[0].textContent).toContain('HOME');
    expect(links[0].getAttribute('href')).toBe('/');

    expect(links[1].textContent).toContain('ABOUT');
    expect(links[1].getAttribute('href')).toBe('/about');

    expect(links[2].textContent).toContain('SERVICES');
    expect(links[2].getAttribute('href')).toBe('/services');

    expect(links[3].textContent).toContain('CONTACT');
    expect(links[3].getAttribute('href')).toBe('/contact');
  });

  it('renders brand logo and sign in buttons for unauthenticated visitors', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/AddisBuilder/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });
});

```
<!-- END_FILE -->

---
<!-- FILE: src/test/RoleGuards.test.tsx -->
## src/test/RoleGuards.test.tsx

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, RoleGuard, CoordinatorApprovalGuard } from '../routes/RouteGuards';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';

describe('Protected Routes & Role-Based Access Guards', () => {
  it('redirects unauthenticated users to /login', () => {
    const mockAuth: any = {
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    };

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthContext.Provider value={mockAuth}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Secret Protected Content</div>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div>Sign In Screen</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In Screen')).toBeInTheDocument();
    expect(screen.queryByText('Secret Protected Content')).not.toBeInTheDocument();
  });

  it('permits authorized role and renders protected dashboard content', () => {
    const studentUser: User = {
      id: 'user-learner-1',
      email: 'learner@addisbuilder.edu',
      fullName: 'Abebe Kebede',
      role: 'LEARNER',
      createdAt: '2025-09-01T10:00:00Z',
      isActive: true,
    };

    const mockAuth: any = {
      user: studentUser,
      role: 'LEARNER',
      isAuthenticated: true,
      isLoading: false,
    };

    render(
      <MemoryRouter initialEntries={['/learner/dashboard']}>
        <AuthContext.Provider value={mockAuth}>
          <RoleGuard allowedRoles={['LEARNER']}>
            <div>Student Dashboard Secret Workspace</div>
          </RoleGuard>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Student Dashboard Secret Workspace')).toBeInTheDocument();
  });

  it('blocks unauthorized roles and redirects to access denied', () => {
    const studentUser: User = {
      id: 'user-learner-1',
      email: 'learner@addisbuilder.edu',
      fullName: 'Abebe Kebede',
      role: 'LEARNER',
      createdAt: '2025-09-01T10:00:00Z',
      isActive: true,
    };

    const mockAuth: any = {
      user: studentUser,
      role: 'LEARNER',
      isAuthenticated: true,
      isLoading: false,
    };

    render(
      <MemoryRouter initialEntries={['/super-admin/dashboard']}>
        <AuthContext.Provider value={mockAuth}>
          <Routes>
            <Route
              path="/super-admin/dashboard"
              element={
                <RoleGuard allowedRoles={['SUPER_ADMIN']}>
                  <div>Super Admin Restricted Area</div>
                </RoleGuard>
              }
            />
            <Route path="/access-denied" element={<div>Access Denied Screen</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Access Denied Screen')).toBeInTheDocument();
    expect(screen.queryByText('Super Admin Restricted Area')).not.toBeInTheDocument();
  });

  it('redirects pending coordinators to approval holding screen', () => {
    const pendingCoordinator: User = {
      id: 'user-coord-pending',
      email: 'pending@addisbuilder.edu',
      fullName: 'Marta Bekele',
      role: 'INTERNSHIP_COORDINATOR',
      coordinatorStatus: 'PENDING',
      createdAt: '2026-01-10T14:30:00Z',
      isActive: true,
    };

    const mockAuth: any = {
      user: pendingCoordinator,
      role: 'INTERNSHIP_COORDINATOR',
      isAuthenticated: true,
      isLoading: false,
    };

    render(
      <MemoryRouter initialEntries={['/internship-manager/dashboard']}>
        <AuthContext.Provider value={mockAuth}>
          <Routes>
            <Route
              path="/internship-manager/dashboard"
              element={
                <CoordinatorApprovalGuard>
                  <div>Coordinator Workspace</div>
                </CoordinatorApprovalGuard>
              }
            />
            <Route path="/coordinator-pending" element={<div>Pending Institutional Review</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Pending Institutional Review')).toBeInTheDocument();
    expect(screen.queryByText('Coordinator Workspace')).not.toBeInTheDocument();
  });
});

```
<!-- END_FILE -->

---
<!-- FILE: src/test/setup.ts -->
## src/test/setup.ts

```ts
import '@testing-library/jest-dom/vitest';

```
<!-- END_FILE -->

---
<!-- FILE: src/test/StatusBadge.test.tsx -->
## src/test/StatusBadge.test.tsx

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { StatusBadge } from '../components/ui/StatusBadge';

describe('StatusBadge Component', () => {
  it('renders Approved status with readable text', () => {
    render(<StatusBadge status="APPROVED" />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('renders Pending Review status with readable text', () => {
    render(<StatusBadge status="PENDING" />);
    expect(screen.getByText('Pending Review')).toBeInTheDocument();
  });

  it('renders Verified organization status', () => {
    render(<StatusBadge status="VERIFIED" />);
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('renders Rejected status with readable text', () => {
    render(<StatusBadge status="REJECTED" />);
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });
});

```
<!-- END_FILE -->

---
<!-- FILE: src/types/index.ts -->
## src/types/index.ts

```ts
export type UserRole =
  | 'LEARNER'
  | 'MENTOR'
  | 'INTERNSHIP_COORDINATOR'
  | 'EMPLOYER'
  | 'SUPER_ADMIN';

export type ApprovalStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'SUSPENDED';

export type VerificationStatus =
  | 'UNVERIFIED'
  | 'PENDING'
  | 'VERIFIED'
  | 'REJECTED';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  university?: string;
  department?: string;
  studentId?: string;
  cvUrl?: string;
  coordinatorStatus?: ApprovalStatus;
  organizationId?: string;
  createdAt: string;
  isActive: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT';
  url: string;
  size?: string;
  duration?: string;
  uploadedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  durationWeeks: number;
  instructorId: string;
  instructorName: string;
  instructorTitle?: string;
  instructorAvatar?: string;
  thumbnailUrl: string;
  learningObjectives: string[];
  materials: CourseMaterial[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  enrolledStudentsCount: number;
  isEnrolled?: boolean;
  progressPercentage?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: 'VIDEO' | 'READING' | 'DOCUMENT';
  duration?: string;
  content?: string;
  videoUrl?: string;
  documentUrl?: string;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatarUrl?: string;
  studentUniversity?: string;
  studentDepartment?: string;
  enrollmentDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  progressPercentage: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  instructorId: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  totalPoints: number;
  submissionsCount?: number;
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  submittedAt: string;
  content: string;
  attachmentUrl?: string;
  attachmentName?: string;
  grade?: number;
  feedback?: string;
  status: 'SUBMITTED' | 'GRADED' | 'LATE';
}

export type WorkMode = 'REMOTE' | 'HYBRID' | 'ONSITE';

export interface Internship {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  organizationLogo?: string;
  location: string;
  workMode: WorkMode;
  category: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  eligibility: string;
  stipend?: string;
  durationMonths: number;
  deadline: string;
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'PENDING_APPROVAL';
  postedById: string;
  postedByRole: 'EMPLOYER' | 'INTERNSHIP_COORDINATOR';
  applicantsCount: number;
  isSaved?: boolean;
  hasApplied?: boolean;
  createdAt: string;
}

export type ApplicationStatus =
  | 'PENDING'
  | 'REVIEWING'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'ACCEPTED'
  | 'REJECTED';

export interface InternshipApplication {
  id: string;
  internshipId: string;
  internshipTitle: string;
  organizationName: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  university?: string;
  department?: string;
  coverLetter: string;
  cvUrl?: string;
  cvFileName?: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes?: string;
}

export interface OrganizationDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  description: string;
  website: string;
  location: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  registrationNumber?: string;
  taxId?: string;
  documents: OrganizationDocument[];
  createdAt: string;
}

export interface CoordinatorRequest {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  university: string;
  department: string;
  employeeId: string;
  proofDocumentUrl?: string;
  status: ApprovalStatus;
  requestDate: string;
  decisionDate?: string;
  decisionNotes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface DashboardStats {
  totalLearners?: number;
  totalMentors?: number;
  totalCourses?: number;
  totalInternships?: number;
  totalApplications?: number;
  pendingApprovals?: number;
  pendingVerifications?: number;
  activeEnrollments?: number;
  completionRate?: number;
  submissionsCount?: number;
  gradesPending?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

```
<!-- END_FILE -->

---
<!-- FILE: src/utils/index.ts -->
## src/utils/index.ts

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString?: string): string {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getInitials(name?: string): string {
  if (!name) return 'AB';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

```
<!-- END_FILE -->

---
<!-- FILE: src/vite-env.d.ts -->
## src/vite-env.d.ts

```ts
/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom/vitest" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_USE_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

```
<!-- END_FILE -->

---
<!-- FILE: tailwind.config.js -->
## tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        forest: {
          DEFAULT: '#14452f',
          dark: '#0e3020',
          light: '#235940',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

```
<!-- END_FILE -->

---
<!-- FILE: tsc_out.txt -->
## tsc_out.txt

```
src/main.tsx(3,8): error TS2882: Cannot find module or type declarations for side-effect import of './index.css'.
src/main.tsx(4,17): error TS5097: An import path can only end with a '.tsx' extension when 'allowImportingTsExtensions' is enabled.
src/pages/employer/EmployerDashboardPage.tsx(162,34): error TS2322: Type '"DRAFT" | "PUBLISHED" | "CLOSED" | "PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
  Type '"PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
src/pages/employer/EmployerInternshipEditorPage.tsx(28,5): error TS2322: Type 'Resolver<{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: unknown; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined; }, an...' is not assignable to type 'Resolver<{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: number; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined; }, any...'.
  Types of parameters 'options' and 'options' are incompatible.
    Type 'ResolverOptions<{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: number; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined;...' is not assignable to type 'ResolverOptions<{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: unknown; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined...'.
      Type 'unknown' is not assignable to type 'number'.
src/pages/employer/EmployerInternshipEditorPage.tsx(95,40): error TS2345: Argument of type '(data: InternshipFormData) => Promise<void>' is not assignable to parameter of type 'SubmitHandler<TFieldValues, Promise<void>>'.
  Types of parameters 'data' and 'data' are incompatible.
    Type 'TFieldValues' is not assignable to type '{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: number; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined; }'.
      Type 'FieldValues' is missing the following properties from type '{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: number; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined; }': title, category, location, workMode, and 7 more.
src/pages/employer/EmployerInternshipsPage.tsx(58,35): error TS2322: Type '"DRAFT" | "PUBLISHED" | "CLOSED" | "PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
  Type '"PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
src/pages/internship-manager/CoordinatorDashboardPage.tsx(143,34): error TS2322: Type '"DRAFT" | "PUBLISHED" | "CLOSED" | "PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
  Type '"PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
src/pages/internship-manager/CoordinatorInternshipEditorPage.tsx(27,5): error TS2322: Type 'Resolver<{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: unknown; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined; }, an...' is not assignable to type 'Resolver<{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: number; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined; }, any...'.
  Types of parameters 'options' and 'options' are incompatible.
    Type 'ResolverOptions<{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: number; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined;...' is not assignable to type 'ResolverOptions<{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: unknown; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined...'.
      Type 'unknown' is not assignable to type 'number'.
src/pages/internship-manager/CoordinatorInternshipEditorPage.tsx(92,40): error TS2345: Argument of type '(data: InternshipFormData) => Promise<void>' is not assignable to parameter of type 'SubmitHandler<TFieldValues, Promise<void>>'.
  Types of parameters 'data' and 'data' are incompatible.
    Type 'TFieldValues' is not assignable to type '{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: number; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined; }'.
      Type 'FieldValues' is missing the following properties from type '{ title: string; category: string; location: string; workMode: "REMOTE" | "HYBRID" | "ONSITE"; durationMonths: number; deadline: string; description: string; responsibilities: string; requirements: string; eligibility: string; status: "DRAFT" | ... 1 more ... | "CLOSED"; stipend?: string | undefined; }': title, category, location, workMode, and 7 more.
src/pages/internship-manager/CoordinatorInternshipsPage.tsx(63,35): error TS2322: Type '"DRAFT" | "PUBLISHED" | "CLOSED" | "PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
  Type '"PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
src/pages/mentor/MentorAssignmentsPage.tsx(33,5): error TS2322: Type 'Resolver<{ courseId: string; title: string; description: string; instructions: string; dueDate: string; totalPoints: unknown; }, any, { courseId: string; title: string; description: string; instructions: string; dueDate: string; totalPoints: number; }>' is not assignable to type 'Resolver<{ courseId: string; title: string; description: string; instructions: string; dueDate: string; totalPoints: number; }, any, { courseId: string; title: string; description: string; instructions: string; dueDate: string; totalPoints: number; }>'.
  Types of parameters 'options' and 'options' are incompatible.
    Type 'ResolverOptions<{ courseId: string; title: string; description: string; instructions: string; dueDate: string; totalPoints: number; }>' is not assignable to type 'ResolverOptions<{ courseId: string; title: string; description: string; instructions: string; dueDate: string; totalPoints: unknown; }>'.
      Type 'unknown' is not assignable to type 'number'.
src/pages/mentor/MentorAssignmentsPage.tsx(158,38): error TS2345: Argument of type '(data: AssignmentFormData) => Promise<void>' is not assignable to parameter of type 'SubmitHandler<TFieldValues, Promise<void>>'.
  Types of parameters 'data' and 'data' are incompatible.
    Type 'TFieldValues' is not assignable to type '{ courseId: string; title: string; description: string; instructions: string; dueDate: string; totalPoints: number; }'.
      Type 'FieldValues' is missing the following properties from type '{ courseId: string; title: string; description: string; instructions: string; dueDate: string; totalPoints: number; }': courseId, title, description, instructions, and 2 more.
src/pages/mentor/MentorCourseEditorPage.tsx(31,5): error TS2322: Type 'Resolver<{ title: string; shortDescription: string; description: string; category: string; level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; durationWeeks: unknown; thumbnailUrl: string; learningObjectives: string; status: "DRAFT" | ... 1 more ... | "ARCHIVED"; }, any, { ...; }>' is not assignable to type 'Resolver<{ title: string; shortDescription: string; description: string; category: string; level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; durationWeeks: number; thumbnailUrl: string; learningObjectives: string; status: "DRAFT" | ... 1 more ... | "ARCHIVED"; }, any, { ...; }>'.
  Types of parameters 'options' and 'options' are incompatible.
    Type 'ResolverOptions<{ title: string; shortDescription: string; description: string; category: string; level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; durationWeeks: number; thumbnailUrl: string; learningObjectives: string; status: "DRAFT" | ... 1 more ... | "ARCHIVED"; }>' is not assignable to type 'ResolverOptions<{ title: string; shortDescription: string; description: string; category: string; level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; durationWeeks: unknown; thumbnailUrl: string; learningObjectives: string; status: "DRAFT" | ... 1 more ... | "ARCHIVED"; }>'.
      Type 'unknown' is not assignable to type 'number'.
src/pages/mentor/MentorCourseEditorPage.tsx(131,40): error TS2345: Argument of type '(data: CourseFormData) => Promise<void>' is not assignable to parameter of type 'SubmitHandler<TFieldValues, Promise<void>>'.
  Types of parameters 'data' and 'data' are incompatible.
    Type 'TFieldValues' is not assignable to type '{ title: string; shortDescription: string; description: string; category: string; level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; durationWeeks: number; thumbnailUrl: string; learningObjectives: string; status: "DRAFT" | ... 1 more ... | "ARCHIVED"; }'.
      Type 'FieldValues' is missing the following properties from type '{ title: string; shortDescription: string; description: string; category: string; level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; durationWeeks: number; thumbnailUrl: string; learningObjectives: string; status: "DRAFT" | ... 1 more ... | "ARCHIVED"; }': title, shortDescription, description, category, and 5 more.
src/pages/super-admin/AdminModerationPage.tsx(74,35): error TS2322: Type '"DRAFT" | "PUBLISHED" | "CLOSED" | "PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
  Type '"PENDING_APPROVAL"' is not assignable to type '"PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "UNVERIFIED" | "VERIFIED" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUBMITTED" | "GRADED" | "LATE" | "CLOSED" | "REVIEWING" | ... 4 more ... | "INACTIVE"'.
src/services/api.ts(3,41): error TS2339: Property 'env' does not exist on type 'ImportMeta'.
src/services/api.ts(4,37): error TS2339: Property 'env' does not exist on type 'ImportMeta'.
src/services/notifications.service.ts(28,35): error TS2339: Property 'markAllAllRead' does not exist on type 'MockStorage'.
src/test/EmptyState.test.tsx(15,50): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'.
src/test/EmptyState.test.tsx(16,70): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'.
src/test/EmptyState.test.tsx(17,39): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'.
src/test/StatusBadge.test.tsx(9,42): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'.
src/test/StatusBadge.test.tsx(14,48): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'.
src/test/StatusBadge.test.tsx(19,42): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'.
src/test/StatusBadge.test.tsx(24,42): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'.


```
<!-- END_FILE -->

---
<!-- FILE: tsc_out2.txt -->
## tsc_out2.txt

```


```
<!-- END_FILE -->

---
<!-- FILE: tsconfig.app.json -->
## tsconfig.app.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "ignoreDeprecations": "6.0",

    /* Bundler mode */
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    /* Linting / strictness */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```
<!-- END_FILE -->

---
<!-- FILE: tsconfig.app.tsbuildinfo -->
## tsconfig.app.tsbuildinfo

```
{"root":["./src/app.tsx","./src/main.tsx","./src/vite-env.d.ts","./src/components/common/pageheader.tsx","./src/components/feedback/emptystate.tsx","./src/components/feedback/errorstate.tsx","./src/components/forms/formfield.tsx","./src/components/layout/authlayout.tsx","./src/components/layout/dashboardlayout.tsx","./src/components/layout/dashboardsidebar.tsx","./src/components/layout/dashboardtopbar.tsx","./src/components/layout/footer.tsx","./src/components/layout/navbar.tsx","./src/components/layout/publiclayout.tsx","./src/components/ui/badge.tsx","./src/components/ui/button.tsx","./src/components/ui/card.tsx","./src/components/ui/confirmdialog.tsx","./src/components/ui/datatable.tsx","./src/components/ui/fileupload.tsx","./src/components/ui/input.tsx","./src/components/ui/loadingspinner.tsx","./src/components/ui/modal.tsx","./src/components/ui/pagination.tsx","./src/components/ui/profilephotouploader.tsx","./src/components/ui/searchinput.tsx","./src/components/ui/select.tsx","./src/components/ui/skeleton.tsx","./src/components/ui/statusbadge.tsx","./src/components/ui/textarea.tsx","./src/constants/index.ts","./src/contexts/authcontext.tsx","./src/pages/auth/forgotpasswordpage.tsx","./src/pages/auth/loginpage.tsx","./src/pages/auth/registerpage.tsx","./src/pages/auth/resetpasswordpage.tsx","./src/pages/common/notificationspage.tsx","./src/pages/employer/employeranalyticspage.tsx","./src/pages/employer/employerapplicantspage.tsx","./src/pages/employer/employerdashboardpage.tsx","./src/pages/employer/employerinternshipeditorpage.tsx","./src/pages/employer/employerinternshipspage.tsx","./src/pages/employer/employerprofilepage.tsx","./src/pages/employer/employerverificationpage.tsx","./src/pages/internship-manager/coordinatorapplicationspage.tsx","./src/pages/internship-manager/coordinatordashboardpage.tsx","./src/pages/internship-manager/coordinatorinternshipeditorpage.tsx","./src/pages/internship-manager/coordinatorinternshipspage.tsx","./src/pages/learner/learnerapplicationspage.tsx","./src/pages/learner/learnerassignmentspage.tsx","./src/pages/learner/learnercourselearnpage.tsx","./src/pages/learner/learnercoursespage.tsx","./src/pages/learner/learnerdashboardpage.tsx","./src/pages/learner/learnerprofilepage.tsx","./src/pages/learner/learnerprogresspage.tsx","./src/pages/learner/learnersavedinternshipspage.tsx","./src/pages/mentor/mentorassignmentspage.tsx","./src/pages/mentor/mentorcourseeditorpage.tsx","./src/pages/mentor/mentorcoursespage.tsx","./src/pages/mentor/mentordashboardpage.tsx","./src/pages/mentor/mentormaterialspage.tsx","./src/pages/mentor/mentorstudentspage.tsx","./src/pages/mentor/mentorsubmissionspage.tsx","./src/pages/public/aboutpage.tsx","./src/pages/public/accessdeniedpage.tsx","./src/pages/public/contactpage.tsx","./src/pages/public/coordinatorpendingpage.tsx","./src/pages/public/coursedetailpage.tsx","./src/pages/public/coursespage.tsx","./src/pages/public/homepage.tsx","./src/pages/public/internshipdetailpage.tsx","./src/pages/public/internshipspage.tsx","./src/pages/public/notfoundpage.tsx","./src/pages/public/servicespage.tsx","./src/pages/super-admin/adminauditlogspage.tsx","./src/pages/super-admin/admincoordinatorapprovalspage.tsx","./src/pages/super-admin/admincoursespage.tsx","./src/pages/super-admin/admindashboardpage.tsx","./src/pages/super-admin/adminmoderationpage.tsx","./src/pages/super-admin/adminorganizationspage.tsx","./src/pages/super-admin/adminreportspage.tsx","./src/pages/super-admin/adminsettingspage.tsx","./src/pages/super-admin/adminuserspage.tsx","./src/routes/routeguards.tsx","./src/routes/index.tsx","./src/schemas/index.ts","./src/services/api.ts","./src/services/applications.service.ts","./src/services/assignments.service.ts","./src/services/auth.service.ts","./src/services/coordinators.service.ts","./src/services/courses.service.ts","./src/services/enrollments.service.ts","./src/services/internships.service.ts","./src/services/mockdata.ts","./src/services/mockstorage.ts","./src/services/notifications.service.ts","./src/services/organizations.service.ts","./src/services/reports.service.ts","./src/services/uploads.service.ts","./src/services/users.service.ts","./src/test/authvalidation.test.ts","./src/test/courseenrollmentrestrictions.test.tsx","./src/test/emptystate.test.tsx","./src/test/mentorstudents.test.tsx","./src/test/profilephotovalidation.test.tsx","./src/test/publicnavigation.test.tsx","./src/test/roleguards.test.tsx","./src/test/statusbadge.test.tsx","./src/test/setup.ts","./src/types/index.ts","./src/utils/index.ts"],"version":"6.0.3"}

```
<!-- END_FILE -->

---
<!-- FILE: tsconfig.json -->
## tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```
<!-- END_FILE -->

---
<!-- FILE: tsconfig.node.json -->
## tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```
<!-- END_FILE -->

---
<!-- FILE: vite.config.ts -->
## vite.config.ts

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})

```
<!-- END_FILE -->


---
## Bundle notes
- Redaction: enabled (mask: `***REDACTED***`).
- No truncations.

