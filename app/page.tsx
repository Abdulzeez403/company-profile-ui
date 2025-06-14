"use client";

import { useState } from "react";
import { Eye, CheckCircle2 } from "lucide-react";
import type { CompanyProfile, SaveStatus } from "../types/profile";
import { useFormValidation } from "../hooks/useFormValidation";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { FormField } from "../components/FormField";
import { Card, CardHeader, CardContent } from "../components/Card";
import { LogoUpload } from "../components/LogoUpload";
import { SocialInput } from "../components/SocialInput";

export default function CompanyProfileEditor() {
  const [profile, setProfile] = useState<CompanyProfile>({
    id: "comp_123",
    recruiter_id: "rec_456",
    company_name: "Sisyphus Ventures",
    website: "untitledui.com",
    email: "contact@sisyphusventures.com",
    logo: null,
    description:
      "We're a venture capital firm focused on early-stage startups with innovative solutions.",
    branding: {
      reports: true,
      emails: true,
    },
    social_profiles: {
      twitter: "sisyphusvc",
      facebook: "sisyphusventures",
      linkedin: "sisyphusventures",
    },
  });

  const [isUploading, setIsUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const {
    validateForm,
    updateFieldError,
    markFieldTouched,
    getFieldError,
    isFieldValid,
    setErrors,
  } = useFormValidation();

  const handleInputChange = (field: keyof CompanyProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    updateFieldError(field, value);
    markFieldTouched(field);
  };

  const handleSocialProfileChange = (
    platform: keyof CompanyProfile["social_profiles"],
    value: string
  ) => {
    setProfile((prev) => ({
      ...prev,
      social_profiles: { ...prev.social_profiles, [platform]: value },
    }));
  };

  const handleBrandingChange = (
    field: keyof CompanyProfile["branding"],
    checked: boolean
  ) => {
    setProfile((prev) => ({
      ...prev,
      branding: { ...prev.branding, [field]: checked },
    }));
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, logo: "Please select an image file" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        logo: "Image size must be less than 5MB",
      }));
      return;
    }

    setIsUploading(true);
    setErrors((prev) => ({ ...prev, logo: "" }));

    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, logo: e.target?.result as string }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1500);
  };

  const handleRemoveLogo = () => {
    setProfile((prev) => ({ ...prev, logo: null }));
  };

  const handleSave = async () => {
    if (validateForm(profile)) {
      setSaveStatus("saving");
      setTimeout(() => {
        console.log("Saving profile:", profile);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }, 2000);
    }
  };

  const handleCancel = () => {
    console.log("Cancelled changes");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with Company Branding */}
      <div className="bg-white border-b border-gray-200">
        {/* Company Branding Section */}
        <div className="px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center relative flex-shrink-0">
                {profile.logo ? (
                  <img
                    src={profile.logo || "/placeholder.svg"}
                    alt="Company logo"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="text-white">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 6h2v2H3V6zm4 0h2v2H7V6zm4 0h2v2h-2V6zm4 0h2v2h-2V6zM3 10h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM3 14h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                    </svg>
                  </div>
                )}
                {/* Verification badge */}
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg
                    className="h-2.5 w-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                  {profile.company_name}
                </h1>
                <p className="text-sm text-gray-500 truncate">
                  {profile.website}/{profile.social_profiles.twitter}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button variant="secondary" size="sm">
                View profile
              </Button>
            </div>
          </div>
        </div>

        {/* Page Header Section */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Company profile
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Update your company photo and details here.
                </p>
              </div>
              <div className="flex space-x-3 flex-shrink-0">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={saveStatus === "saving"}
                  className="min-w-[120px]"
                >
                  {saveStatus === "saved" && (
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                  )}
                  {saveStatus === "saving"
                    ? "Saving..."
                    : saveStatus === "saved"
                    ? "Saved!"
                    : "Save changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Public Profile Section */}
          <Card>
            <CardHeader
              title="Public profile"
              description="This will be displayed on your profile."
            />
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FormField
                    label="Company name"
                    required
                    error={getFieldError("company_name")}
                    isValid={isFieldValid("company_name", profile.company_name)}
                  >
                    <Input
                      value={profile.company_name}
                      onChange={(e) =>
                        handleInputChange("company_name", e.target.value)
                      }
                      onBlur={() => markFieldTouched("company_name")}
                      error={!!getFieldError("company_name")}
                      isValid={isFieldValid(
                        "company_name",
                        profile.company_name
                      )}
                      placeholder="Enter company name"
                    />
                  </FormField>

                  <FormField
                    label="Email"
                    required
                    error={getFieldError("email")}
                    isValid={isFieldValid("email", profile.email)}
                  >
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onBlur={() => markFieldTouched("email")}
                      error={!!getFieldError("email")}
                      isValid={isFieldValid("email", profile.email)}
                      placeholder="Enter email address"
                    />
                  </FormField>
                </div>

                <FormField label="Website" error={getFieldError("website")}>
                  <div className="flex rounded-lg shadow-sm">
                    <Input
                      value={profile.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      onBlur={() => markFieldTouched("website")}
                      error={!!getFieldError("website")}
                      className="rounded-r-none border-r-0 focus:ring-offset-0"
                      placeholder="example.com"
                    />
                    <span className="inline-flex items-center px-4 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-600 text-sm font-medium whitespace-nowrap">
                      /@{profile.social_profiles.twitter || "username"}
                    </span>
                  </div>
                </FormField>
              </div>
            </CardContent>
          </Card>

          {/* Company Logo Section */}
          <Card>
            <CardHeader
              title="Company logo"
              description="Update your company logo and then choose where you want it to display."
            />
            <CardContent>
              <LogoUpload
                logo={profile.logo}
                companyName={profile.company_name}
                onUpload={processFile}
                onRemove={handleRemoveLogo}
                isUploading={isUploading}
                error={getFieldError("logo")}
              />
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card>
            <CardHeader
              title="Company Description"
              description="Tell candidates about your company and what makes it special."
            />
            <CardContent>
              <FormField
                label="Description"
                error={getFieldError("description")}
                description={`${profile.description.length}/500 characters`}
              >
                <Textarea
                  rows={4}
                  value={profile.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  onBlur={() => markFieldTouched("description")}
                  error={!!getFieldError("description")}
                  placeholder="Describe your company, culture, and what makes you unique..."
                />
              </FormField>
            </CardContent>
          </Card>

          {/* Branding Section */}
          <Card>
            <CardHeader
              title="Branding"
              description="Add your logo to reports and emails."
            />
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      id="reports"
                      type="checkbox"
                      checked={profile.branding.reports}
                      onChange={(e) =>
                        handleBrandingChange("reports", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="reports"
                      className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Reports
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Include my logo in summary reports.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      id="emails"
                      type="checkbox"
                      checked={profile.branding.emails}
                      onChange={(e) =>
                        handleBrandingChange("emails", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="emails"
                      className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Emails
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Include my logo in customer emails.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Profiles Section */}
          <Card>
            <CardHeader title="Social profiles" />
            <CardContent>
              <div className="space-y-6">
                <SocialInput
                  label="Twitter"
                  prefix="twitter.com/"
                  value={profile.social_profiles.twitter}
                  onChange={(value) =>
                    handleSocialProfileChange("twitter", value)
                  }
                  placeholder="username"
                />

                <SocialInput
                  label="Facebook"
                  prefix="facebook.com/"
                  value={profile.social_profiles.facebook}
                  onChange={(value) =>
                    handleSocialProfileChange("facebook", value)
                  }
                  placeholder="username"
                />

                <SocialInput
                  label="LinkedIn"
                  prefix="linkedin.com/company/"
                  value={profile.social_profiles.linkedin}
                  onChange={(value) =>
                    handleSocialProfileChange("linkedin", value)
                  }
                  placeholder="company-name"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
