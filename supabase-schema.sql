-- 매거진 테이블 생성
CREATE TABLE IF NOT EXISTS magazines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  locale TEXT NOT NULL DEFAULT 'ko',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

-- 공지사항 테이블 생성
CREATE TABLE IF NOT EXISTS notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  locale TEXT NOT NULL DEFAULT 'ko',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high'))
);

-- 데일리 브리프 테이블 생성
CREATE TABLE IF NOT EXISTS daily_briefs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  published_date DATE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  locale TEXT NOT NULL DEFAULT 'ko',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_magazines_locale ON magazines(locale);
CREATE INDEX IF NOT EXISTS idx_magazines_status ON magazines(status);
CREATE INDEX IF NOT EXISTS idx_magazines_published_at ON magazines(published_at);
CREATE INDEX IF NOT EXISTS idx_notices_locale ON notices(locale);
CREATE INDEX IF NOT EXISTS idx_notices_status ON notices(status);
CREATE INDEX IF NOT EXISTS idx_notices_priority ON notices(priority);
CREATE INDEX IF NOT EXISTS idx_daily_briefs_locale ON daily_briefs(locale);
CREATE INDEX IF NOT EXISTS idx_daily_briefs_status ON daily_briefs(status);
CREATE INDEX IF NOT EXISTS idx_daily_briefs_published_date ON daily_briefs(published_date);

-- RLS (Row Level Security) 비활성화 (개발 단계)
-- ALTER TABLE magazines ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE daily_briefs ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능하도록 정책 설정
-- CREATE POLICY "Allow public read access to published magazines" ON magazines
--   FOR SELECT USING (status = 'published');

-- CREATE POLICY "Allow public read access to published notices" ON notices
--   FOR SELECT USING (status = 'published');

-- CREATE POLICY "Allow public read access to published daily briefs" ON daily_briefs
--   FOR SELECT USING (status = 'published');

-- 관리자 권한 정책 (실제 운영에서는 인증 시스템과 연동 필요)
-- CREATE POLICY "Allow all operations for authenticated users" ON magazines
--   FOR ALL USING (true);

-- CREATE POLICY "Allow all operations for authenticated users" ON notices
--   FOR ALL USING (true);

-- CREATE POLICY "Allow all operations for authenticated users" ON daily_briefs
--   FOR ALL USING (true);

-- Storage 버킷 생성 (이미지 저장용)
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage 정책 설정 (개발 단계에서는 비활성화)
-- CREATE POLICY "Allow public read access to images" ON storage.objects
--   FOR SELECT USING (bucket_id = 'images');

-- CREATE POLICY "Allow authenticated uploads to images" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'images');

-- CREATE POLICY "Allow authenticated updates to images" ON storage.objects
--   FOR UPDATE USING (bucket_id = 'images');

-- CREATE POLICY "Allow authenticated deletes from images" ON storage.objects
--   FOR DELETE USING (bucket_id = 'images');

-- 카테고리 테이블 생성
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 매거진에 카테고리 필드 추가
ALTER TABLE magazines ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id);

-- 카테고리 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_magazines_category_id ON magazines(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);

-- 카테고리 RLS 정책 설정 (개발 단계에서는 비활성화)
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Allow public read access to categories" ON categories
--   FOR SELECT USING (true);

-- CREATE POLICY "Allow authenticated insert to categories" ON categories
--   FOR INSERT WITH CHECK (true);

-- CREATE POLICY "Allow authenticated update to categories" ON categories
--   FOR UPDATE USING (true);

-- CREATE POLICY "Allow authenticated delete from categories" ON categories
--   FOR DELETE USING (true);




