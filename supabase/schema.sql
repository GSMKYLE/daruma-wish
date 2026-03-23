-- Create profiles table
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text,
    display_name text,
    avatar_url text,
    created_at timestamptz DEFAULT now()
);

-- Create wishes table
CREATE TABLE public.wishes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    mood text NOT NULL,
    category text,
    content text NOT NULL,
    is_private boolean DEFAULT true,
    is_shared boolean DEFAULT false,
    ritual_completed boolean DEFAULT false,
    ritual_progress integer DEFAULT 0,
    affirmation text,
    fulfilled boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    completed_at timestamptz
);

-- Create community_posts table
CREATE TABLE public.community_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    wish_id uuid REFERENCES public.wishes(id) ON DELETE CASCADE,
    mood text NOT NULL,
    content_preview text NOT NULL,
    tag_list text[] DEFAULT '{}',
    reaction_count integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Create reactions table
CREATE TABLE public.reactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    reaction_type text NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(post_id, user_id, reaction_type) -- Prevent duplicate reactions from same user
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile."
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Wishes policies
CREATE POLICY "Users can view their own wishes."
    ON public.wishes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wishes."
    ON public.wishes FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL); -- Allow anonymous wishes for MVP

CREATE POLICY "Users can update their own wishes."
    ON public.wishes FOR UPDATE
    USING (auth.uid() = user_id OR user_id IS NULL);

-- Community posts policies
CREATE POLICY "Community posts are viewable by everyone."
    ON public.community_posts FOR SELECT
    USING (true);

CREATE POLICY "Users can insert community posts for their shared wishes."
    ON public.community_posts FOR INSERT
    WITH CHECK (true); -- Simplify for MVP

-- Reactions policies
CREATE POLICY "Reactions are viewable by everyone."
    ON public.reactions FOR SELECT
    USING (true);

CREATE POLICY "Users can insert reactions."
    ON public.reactions FOR INSERT
    WITH CHECK (true); -- Simplify for MVP
