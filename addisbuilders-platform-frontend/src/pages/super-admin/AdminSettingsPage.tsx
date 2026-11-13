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

      <Card className="bg-white dark:bg-neutral-900">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 pb-2">
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
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 pb-2">
                Compliance & Verification Governance
              </h3>

              <div className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                <label className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireCoordApproval}
                    onChange={(e) => setRequireCoordApproval(e.target.checked)}
                    className="w-4 h-4 text-brand-700 rounded border-neutral-300 focus:ring-brand-700"
                  />
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-neutral-100">Enforce Coordinator Super Admin Verification</p>
                    <p className="text-neutral-500">
                      Coordinators must be approved by Super Admin before posting internship opportunities.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireOrgVerification}
                    onChange={(e) => setRequireOrgVerification(e.target.checked)}
                    className="w-4 h-4 text-brand-700 rounded border-neutral-300 focus:ring-brand-700"
                  />
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-neutral-100">Enforce Corporate Trade License & TIN Check</p>
                    <p className="text-neutral-500">
                      Organizations must have verified documentation before receiving published trust badges.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 pb-2">
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
