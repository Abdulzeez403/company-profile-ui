export interface CompanyProfile {
  id: string
  recruiter_id: string
  company_name: string
  website: string
  email: string
  logo: string | null
  description: string
  branding: {
    reports: boolean
    emails: boolean
  }
  social_profiles: {
    twitter: string
    facebook: string
    linkedin: string
  }
}

export interface ValidationErrors {
  [key: string]: string
}

export interface TouchedFields {
  [key: string]: boolean
}

export type SaveStatus = "idle" | "saving" | "saved" | "error"
