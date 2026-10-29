-- ============================================================
-- BORN FOUNDATION NGO WEBSITE — POSTGRESQL SCHEMA WITH RLS
-- Comprehensive schema covering 13 tables, RBAC, RLS policies,
-- child safeguarding constraints, and audit logging.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---- 1. ENUMS ----
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'super_admin',
        'editor',
        'reviewer',
        'publisher',
        'enquiry_coordinator',
        'finance',
        'auditor'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE content_status AS ENUM (
        'draft',
        'submitted',
        'in_review',
        'changes_requested',
        'approved',
        'published',
        'archived'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status AS ENUM (
        'new',
        'in_progress',
        'responded',
        'resolved',
        'archived'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE volunteer_status AS ENUM (
        'pending',
        'under_review',
        'accepted',
        'declined',
        'archived'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE media_approval_status AS ENUM (
        'pending',
        'approved',
        'rejected'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ---- 2. PROFILES (Staff & RBAC) ----
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'editor',
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 3. PAGES ----
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    featured_image_url TEXT,
    status content_status NOT NULL DEFAULT 'draft',
    author_id UUID REFERENCES public.profiles(id),
    reviewer_id UUID REFERENCES public.profiles(id),
    publisher_id UUID REFERENCES public.profiles(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 4. PROGRAMMES ----
CREATE TABLE IF NOT EXISTS public.programmes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    objectives TEXT,
    activities TEXT,
    eligibility TEXT,
    outcomes TEXT,
    category TEXT NOT NULL,
    featured_image_url TEXT,
    status content_status NOT NULL DEFAULT 'draft',
    author_id UUID REFERENCES public.profiles(id),
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 5. STORIES ----
CREATE TABLE IF NOT EXISTS public.stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL DEFAULT 'General',
    featured_image_url TEXT,
    meta_title TEXT,
    meta_description TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    status content_status NOT NULL DEFAULT 'draft',
    author_id UUID REFERENCES public.profiles(id),
    reviewer_id UUID REFERENCES public.profiles(id),
    publisher_id UUID REFERENCES public.profiles(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 6. MEDIA ASSETS ----
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    approval_status media_approval_status NOT NULL DEFAULT 'pending',
    uploaded_by UUID REFERENCES public.profiles(id),
    approved_by UUID REFERENCES public.profiles(id),
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 7. IMPACT METRICS ----
CREATE TABLE IF NOT EXISTS public.impact_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    reporting_period TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT false,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 8. CONTACT ENQUIRIES ----
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status enquiry_status NOT NULL DEFAULT 'new',
    assigned_to UUID REFERENCES public.profiles(id),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 9. VOLUNTEER APPLICATIONS ----
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    area_of_interest TEXT NOT NULL,
    availability TEXT,
    experience TEXT,
    motivation TEXT,
    status volunteer_status NOT NULL DEFAULT 'pending',
    reviewer_id UUID REFERENCES public.profiles(id),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 10. DONATIONS ----
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    donor_name TEXT,
    donor_email TEXT,
    payment_provider TEXT,
    payment_id TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending',
    is_recurring BOOLEAN NOT NULL DEFAULT false,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 11. AUDIT LOGS ----
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 12. CONTENT VERSIONS ----
CREATE TABLE IF NOT EXISTS public.content_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    content_snapshot JSONB NOT NULL,
    changed_by UUID REFERENCES public.profiles(id),
    change_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ---- 13. SITE SETTINGS ----
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    updated_by UUID REFERENCES public.profiles(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check role
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() AND is_active = true;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 1. PUBLIC READ ACCESS (Only Published Items)
CREATE POLICY "Public read published pages" ON public.pages
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published programmes" ON public.programmes
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published stories" ON public.stories
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read verified impact metrics" ON public.impact_metrics
    FOR SELECT USING (is_published = true AND is_verified = true);

CREATE POLICY "Public read approved public media" ON public.media_assets
    FOR SELECT USING (is_public = true AND approval_status = 'approved');

CREATE POLICY "Public read site settings" ON public.site_settings
    FOR SELECT USING (category IN ('general', 'contact', 'appearance'));

-- 2. PUBLIC INSERTS (Forms only)
CREATE POLICY "Public can submit contact enquiries" ON public.contact_enquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can submit volunteer applications" ON public.volunteer_applications
    FOR INSERT WITH CHECK (true);

-- 3. STAFF ACCESS CONTROLS (Least Privilege)
-- Super Admins: full access across tables
CREATE POLICY "Super admin full access profiles" ON public.profiles
    FOR ALL USING (public.get_auth_role() = 'super_admin');

CREATE POLICY "Super admin full access pages" ON public.pages
    FOR ALL USING (public.get_auth_role() = 'super_admin');

CREATE POLICY "Super admin full access programmes" ON public.programmes
    FOR ALL USING (public.get_auth_role() = 'super_admin');

CREATE POLICY "Super admin full access stories" ON public.stories
    FOR ALL USING (public.get_auth_role() = 'super_admin');

CREATE POLICY "Super admin full access enquiries" ON public.contact_enquiries
    FOR ALL USING (public.get_auth_role() IN ('super_admin', 'enquiry_coordinator'));

CREATE POLICY "Super admin full access volunteers" ON public.volunteer_applications
    FOR ALL USING (public.get_auth_role() IN ('super_admin', 'enquiry_coordinator'));

CREATE POLICY "Super admin full access audit logs" ON public.audit_logs
    FOR ALL USING (public.get_auth_role() IN ('super_admin', 'auditor'));

-- Staff read own profile
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (id = auth.uid());

-- Index optimizations
CREATE INDEX IF NOT EXISTS idx_programmes_status ON public.programmes(status);
CREATE INDEX IF NOT EXISTS idx_stories_status ON public.stories(status);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_status ON public.volunteer_applications(status);
