import { createClient } from '@supabase/supabase-js';

// 从环境变量读取配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 检查配置是否有效
const isConfigured = supabaseUrl && supabaseKey;

// 创建 Supabase 客户端
export const supabase = isConfigured ? createClient(supabaseUrl, supabaseKey) : null;

// ==================== 认证服务 ====================
export const authService = {
  async login(username, password) {
    // 如果数据库未配置，使用本地验证
    if (!supabase) {
      if (username === 'admin' && password === 'admin123') {
        return { username: 'admin', name: '超级管理员', role: 'admin' };
      }
      throw new Error('用户名或密码错误');
    }
    
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();
    
    if (error || !data) {
      throw new Error('用户名或密码错误');
    }
    return data;
  },

  async changePassword(username, oldPassword, newPassword) {
    if (!supabase) {
      throw new Error('数据库未配置，无法修改密码');
    }
    
    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .eq('password', oldPassword)
      .single();
    
    if (!admin) {
      throw new Error('原密码错误');
    }

    const { error } = await supabase
      .from('admins')
      .update({ password: newPassword })
      .eq('username', username);
    
    if (error) throw error;
    return true;
  }
};

// ==================== 用户服务 ====================
export const userService = {
  async getAll() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(user) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updatePoints(id, points) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .update({ points })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id, status) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// ==================== 活动服务 ====================
export const activityService = {
  async getAll() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('create_time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(activity) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('activities')
      .insert(activity)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, activity) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('activities')
      .update(activity)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    if (!supabase) return false;
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
};

// ==================== 提问服务 ====================
export const questionService = {
  async getAll() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateStatus(id, status) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('questions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async setFeatured(id, isFeatured) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('questions')
      .update({ is_featured: isFeatured })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async setAnswered(id, isAnswered) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('questions')
      .update({ is_answered: isAnswered })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// ==================== 礼品服务 ====================
export const giftService = {
  async getAll() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return data;
  },

  async create(gift) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('gifts')
      .insert(gift)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, gift) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('gifts')
      .update(gift)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    if (!supabase) return false;
    const { error } = await supabase
      .from('gifts')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
};

// ==================== 兑换记录服务 ====================
export const redeemService = {
  async getAll() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('redeem_records')
      .select('*')
      .order('time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateStatus(id, status, rejectReason = null) {
    if (!supabase) return null;
    const updateData = { status };
    if (rejectReason) updateData.reject_reason = rejectReason;
    
    const { data, error } = await supabase
      .from('redeem_records')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// ==================== 积分规则服务 ====================
export const pointRuleService = {
  async getAll() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('point_rules')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return data;
  },

  async create(rule) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('point_rules')
      .insert(rule)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, rule) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('point_rules')
      .update(rule)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    if (!supabase) return false;
    const { error } = await supabase
      .from('point_rules')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  async toggleStatus(id, status) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('point_rules')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// ==================== 积分记录服务 ====================
export const pointsRecordService = {
  async getByUserId(userId) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('points_records')
      .select('*')
      .eq('user_id', userId)
      .order('time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(record) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('points_records')
      .insert(record)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// ==================== 用户反馈服务 ====================
export const feedbackService = {
  async getByUserId(userId) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('user_feedbacks')
      .select('*')
      .eq('user_id', userId)
      .order('time', { ascending: false });
    if (error) throw error;
    return data;
  }
};
