
CREATE TABLE IF NOT EXISTS "t_p22472582_knowledge_base_layou".employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(200) NOT NULL,
  dept VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  room VARCHAR(50),
  phone VARCHAR(50),
  email VARCHAR(200),
  initials VARCHAR(5),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "t_p22472582_knowledge_base_layou".news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  body TEXT,
  category VARCHAR(100) DEFAULT 'Общее',
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "t_p22472582_knowledge_base_layou".documents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  file_type VARCHAR(10) DEFAULT 'PDF',
  file_size VARCHAR(30),
  file_url TEXT,
  version VARCHAR(20) DEFAULT '1.0',
  is_template BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "t_p22472582_knowledge_base_layou".presentations (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  audience VARCHAR(20) DEFAULT 'internal',
  slides_count INTEGER DEFAULT 0,
  file_size VARCHAR(30),
  file_url TEXT,
  author VARCHAR(200),
  is_new BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "t_p22472582_knowledge_base_layou".settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO "t_p22472582_knowledge_base_layou".settings (key, value)
VALUES ('admin_password', 'admin2026')
ON CONFLICT (key) DO NOTHING;
