-- 用户表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  real_name VARCHAR(50) NOT NULL,
  nickname VARCHAR(50),
  phone VARCHAR(20) NOT NULL UNIQUE,
  company VARCHAR(100),
  position VARCHAR(50),
  points INTEGER DEFAULT 0,
  meeting_count INTEGER DEFAULT 0,
  avatar VARCHAR(10),
  status VARCHAR(20) DEFAULT 'active',
  info_complete BOOLEAN DEFAULT false,
  level VARCHAR(20) DEFAULT '普通渠道商',
  register_time TIMESTAMP DEFAULT NOW(),
  last_active_time TIMESTAMP DEFAULT NOW()
);

-- 活动表
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(20),
  priority VARCHAR(10) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'in_progress',
  create_time TIMESTAMP DEFAULT NOW(),
  end_time TIMESTAMP,
  location VARCHAR(200),
  meeting_type VARCHAR(20) DEFAULT 'offline',
  responsible VARCHAR(50),
  description TEXT,
  registered INTEGER DEFAULT 0,
  checked_in INTEGER DEFAULT 0
);

-- 提问表
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(id),
  asker VARCHAR(50) NOT NULL,
  company VARCHAR(100),
  question TEXT NOT NULL,
  time TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending',
  is_featured BOOLEAN DEFAULT false,
  is_answered BOOLEAN DEFAULT false
);

-- 礼品表
CREATE TABLE gifts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  points INTEGER NOT NULL,
  stock INTEGER DEFAULT 0,
  redeemed INTEGER DEFAULT 0,
  image VARCHAR(10),
  description TEXT
);

-- 兑换记录表
CREATE TABLE redeem_records (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  gift_id INTEGER REFERENCES gifts(id),
  user_name VARCHAR(50),
  phone VARCHAR(20),
  company VARCHAR(100),
  gift_name VARCHAR(100),
  points INTEGER,
  time TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending',
  reject_reason VARCHAR(200)
);

-- 积分规则表
CREATE TABLE point_rules (
  id SERIAL PRIMARY KEY,
  action VARCHAR(50) NOT NULL,
  points INTEGER NOT NULL,
  description TEXT,
  status BOOLEAN DEFAULT true
);

-- 积分记录表
CREATE TABLE points_records (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  user_name VARCHAR(50),
  type VARCHAR(20) NOT NULL,
  points INTEGER NOT NULL,
  reason VARCHAR(200),
  time TIMESTAMP DEFAULT NOW(),
  operator VARCHAR(50),
  operator_time TIMESTAMP DEFAULT NOW()
);

-- 用户反馈表
CREATE TABLE user_feedbacks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  user_name VARCHAR(50),
  meeting_name VARCHAR(100),
  content TEXT,
  time TIMESTAMP DEFAULT NOW(),
  rating INTEGER DEFAULT 5
);

-- 管理员表
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(50),
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 插入默认管理员 (密码: admin123)
INSERT INTO admins (username, password, name, role) 
VALUES ('admin', 'admin123', '超级管理员', 'admin');

-- 插入示例数据
INSERT INTO users (real_name, nickname, phone, company, position, points, meeting_count, avatar, status, info_complete, level) VALUES
('张伟', '伟哥', '13812345678', '北京科技有限公司', '销售总监', 2580, 12, '张', 'active', true, '金牌渠道商'),
('李娜', '娜姐', '13987654321', '上海贸易集团', '采购经理', 1890, 8, '李', 'active', true, '银牌渠道商'),
('王强', '强哥', '13765432198', '深圳实业集团', '总经理', 3200, 15, '王', 'active', true, '金牌渠道商'),
('赵敏', '敏敏', '13654321987', '广州网络科技', '市场总监', 1560, 6, '赵', 'active', true, '银牌渠道商'),
('孙浩', '浩子', '15812345678', '杭州数据服务', '技术总监', 980, 4, '孙', 'active', false, '普通渠道商');

INSERT INTO activities (name, category, priority, status, location, meeting_type, responsible, description, registered, checked_in) VALUES
('2024年度渠道商大会', '会议', 'high', 'in_progress', '北京市朝阳区建国路88号', 'offline', '张经理', '年度渠道商大会', 156, 128),
('新产品发布会', '会议', 'high', 'completed', '上海市浦东新区陆家嘴金融中心', 'offline', '李总监', '发布2024年度新产品线', 200, 185),
('技术培训研讨会', '培训', 'medium', 'in_progress', '线上会议', 'online', '王工程师', '针对渠道商技术人员的产品技术培训', 98, 89);

INSERT INTO gifts (name, points, stock, redeemed, image, description) VALUES
('品牌雨伞', 500, 50, 12, '🌂', '高品质防风雨伞'),
('定制笔记本', 300, 100, 35, '📓', 'A5精装笔记本'),
('保温杯', 400, 80, 28, '☕', '304不锈钢，500ml'),
('充电宝', 800, 30, 18, '🔋', '10000mAh快充'),
('蓝牙耳机', 1000, 20, 8, '🎧', '主动降噪');

INSERT INTO point_rules (action, points, description, status) VALUES
('会议签到', 20, '参加会议并完成现场签到', true),
('提问互动', 5, '在会议中提交问题', true),
('问题被采纳', 20, '提问被主持人采纳上墙展示', true),
('填写反馈', 30, '完成会议满意度调查问卷', true),
('完善资料', 50, '完善个人和公司信息', true);
