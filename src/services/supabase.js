import { createClient } from '@supabase/supabase-js';

// 从环境变量读取配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 创建 Supabase 客户端
export const supabase = createClient(supabaseUrl, supabaseKey);

// ==================== 认证服务 ====================
export const authService = {
  // 管理员登录
  async login(username, password) {
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

  // 修改密码
  async changePassword(username, oldPassword, newPassword) {
    // 先验证旧密码
    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .eq('password', oldPassword)
      .single();
    
    if (!admin) {
      throw new Error('原密码错误');
    }

    // 更新密码
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
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async updatePoints(id, points) {
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
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('create_time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(activity) {
    const { data, error } = await supabase
      .from('activities')
      .insert(activity)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, activity) {
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
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateStatus(id, status) {
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
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return data;
  },

  async create(gift) {
    const { data, error } = await supabase
      .from('gifts')
      .insert(gift)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, gift) {
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
    const { data, error } = await supabase
      .from('redeem_records')
      .select('*')
      .order('time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateStatus(id, status, rejectReason = null) {
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
    const { data, error } = await supabase
      .from('point_rules')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return data;
  },

  async create(rule) {
    const { data, error } = await supabase
      .from('point_rules')
      .insert(rule)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, rule) {
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
    const { error } = await supabase
      .from('point_rules')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  async toggleStatus(id, status) {
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
    const { data, error } = await supabase
      .from('points_records')
      .select('*')
      .eq('user_id', userId)
      .order('time', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(record) {
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
    const { data, error } = await supabase
      .from('user_feedbacks')
      .select('*')
      .eq('user_id', userId)
      .order('time', { ascending: false });
    if (error) throw error;
    return data;
  }
};
