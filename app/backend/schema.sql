-- Prime Sky International — DB Schema

CREATE TABLE IF NOT EXISTS packages (
  id          TEXT PRIMARY KEY,
  category    TEXT NOT NULL DEFAULT 'tour',
  data        JSONB NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS packages_category_idx ON packages(category);
CREATE INDEX IF NOT EXISTS packages_sort_idx ON packages(sort_order);

CREATE TABLE IF NOT EXISTS bookings (
  id          BIGSERIAL PRIMARY KEY,
  data        JSONB NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Generic CMS key-value store for everything else (hero, services, content, seo, etc.)
CREATE TABLE IF NOT EXISTS cms_data (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
