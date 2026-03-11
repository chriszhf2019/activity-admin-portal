// 真实活动数据
export const ACTIVITIES = [
  {
    id: 1,
    name: '2024年度渠道商大会',
    category: '会议',
    activity_type: 'offline',
    priority: 'high',
    status: 'in_progress',
    start_time: '2024-03-15 09:00:00',
    end_time: '2024-03-15 18:00:00',
    location: '北京市朝阳区建国路88号SOHO现代城',
    responsible: '张经理',
    key_milestones: '09:00 签到，09:30 开场，12:00 午餐，14:00 主题演讲',
    description: '年度渠道商大会，讨论2024年市场策略和合作计划',
    registered: 156,
    checked_in: 128
  },
  {
    id: 2,
    name: '新产品发布会',
    category: '会议',
    activity_type: 'offline',
    priority: 'high',
    status: 'completed',
    start_time: '2024-03-10 14:00:00',
    end_time: '2024-03-10 17:00:00',
    location: '上海市浦东新区陆家嘴金融中心',
    responsible: '李总监',
    key_milestones: '14:00 签到，14:30 发布会开始，16:00 产品演示',
    description: '发布2024年度新产品线，展示技术创新成果',
    registered: 200,
    checked_in: 185
  },
  {
    id: 3,
    name: '技术培训研讨会',
    category: '培训',
    activity_type: 'online',
    priority: 'medium',
    status: 'in_progress',
    start_time: '2024-03-20 10:00:00',
    end_time: '2024-03-20 16:00:00',
    online_link: 'https://meeting.example.com/join/123456',
    responsible: '王工程师',
    key_milestones: '10:00 签到，10:30 培训开始，12:00 午休，14:00 实战演练',
    description: '针对渠道商技术人员的产品技术培训',
    registered: 98,
    checked_in: 89
  },
  {
    id: 4,
    name: '市场策略分享会',
    category: '会议',
    activity_type: 'offline',
    priority: 'medium',
    status: 'completed',
    start_time: '2024-03-05 09:30:00',
    end_time: '2024-03-05 12:00:00',
    location: '深圳市南山区科技园',
    responsible: '赵经理',
    key_milestones: '09:30 签到，10:00 分享开始，11:30 互动交流',
    description: '分享2024年市场推广策略和成功案例',
    registered: 145,
    checked_in: 132
  },
  {
    id: 5,
    name: '客户答谢晚宴',
    category: '活动',
    activity_type: 'offline',
    priority: 'high',
    status: 'in_progress',
    start_time: '2024-03-25 18:00:00',
    end_time: '2024-03-25 21:00:00',
    location: '广州市天河区珠江新城威斯汀酒店',
    responsible: '孙总',
    key_milestones: '18:00 签到，18:30 晚宴开始，20:00 颁奖环节',
    description: '感谢重要客户一年来的支持与合作',
    registered: 80,
    checked_in: 0
  }
];

// 真实用户数据
export const USERS = [
  {
    id: 1,
    realName: '张伟',
    nickname: '伟哥',
    phone: '13812345678',
    company: '北京科技有限公司',
    position: '销售总监',
    points: 2580,
    meetingCount: 12,
    registerSource: '小程序',
    avatar: '张',
    status: 'active',
    infoComplete: true,
    role: 'user',
    level: '金牌渠道商',
    registerTime: '2023-06-15 10:30:00',
    lastActiveTime: '2024-03-15 14:20:00'
  },
  {
    id: 2,
    realName: '李娜',
    nickname: '娜姐',
    phone: '13987654321',
    company: '上海贸易集团',
    position: '采购经理',
    points: 1890,
    meetingCount: 8,
    registerSource: '小程序',
    avatar: '李',
    status: 'active',
    infoComplete: true,
    role: 'user',
    level: '银牌渠道商',
    registerTime: '2023-08-20 09:15:00',
    lastActiveTime: '2024-03-14 11:45:00'
  },
  {
    id: 3,
    realName: '王强',
    nickname: '强哥',
    phone: '13765432198',
    company: '深圳实业集团',
    position: '总经理',
    points: 3200,
    meetingCount: 15,
    registerSource: '手动录入',
    avatar: '王',
    status: 'active',
    infoComplete: true,
    role: 'user',
    level: '金牌渠道商',
    registerTime: '2023-03-01 16:20:00',
    lastActiveTime: '2024-03-15 18:30:00'
  },
  {
    id: 4,
    realName: '赵敏',
    nickname: '敏敏',
    phone: '13654321987',
    company: '广州网络科技',
    position: '市场总监',
    points: 1560,
    meetingCount: 6,
    registerSource: '小程序',
    avatar: '赵',
    status: 'active',
    infoComplete: true,
    role: 'user',
    level: '银牌渠道商',
    registerTime: '2023-10-10 11:00:00',
    lastActiveTime: '2024-03-13 09:20:00'
  },
  {
    id: 5,
    realName: '孙浩',
    nickname: '浩子',
    phone: '15812345678',
    company: '杭州数据服务',
    position: '技术总监',
    points: 980,
    meetingCount: 4,
    registerSource: '小程序',
    avatar: '孙',
    status: 'active',
    infoComplete: false,
    role: 'user',
    level: '普通渠道商',
    registerTime: '2024-01-25 14:30:00',
    lastActiveTime: '2024-03-10 10:15:00'
  },
  {
    id: 6,
    realName: '周琳',
    nickname: '琳琳',
    phone: '13512348765',
    company: '成都创新科技',
    position: '运营经理',
    points: 2100,
    meetingCount: 10,
    registerSource: '小程序',
    avatar: '周',
    status: 'active',
    infoComplete: true,
    role: 'user',
    level: '银牌渠道商',
    registerTime: '2023-07-01 08:45:00',
    lastActiveTime: '2024-03-15 16:50:00'
  },
  {
    id: 7,
    realName: '吴磊',
    nickname: '磊哥',
    phone: '15987651234',
    company: '武汉软件开发',
    position: '项目经理',
    points: 750,
    meetingCount: 3,
    registerSource: '手动录入',
    avatar: '吴',
    status: 'inactive',
    infoComplete: false,
    role: 'user',
    level: '普通渠道商',
    registerTime: '2024-02-02 13:20:00',
    lastActiveTime: '2024-02-28 12:30:00'
  },
  {
    id: 8,
    realName: '郑雪',
    nickname: '雪儿',
    phone: '15087654321',
    company: '南京电子商务',
    position: '销售经理',
    points: 1350,
    meetingCount: 7,
    registerSource: '小程序',
    avatar: '郑',
    status: 'active',
    infoComplete: true,
    role: 'user',
    level: '银牌渠道商',
    registerTime: '2023-09-03 10:10:00',
    lastActiveTime: '2024-03-14 15:40:00'
  }
];

// 用户活动记录
export const USER_ACTIVITIES = [
  { id: 1, userId: 1, userName: '张伟', action: '报名参加', target: '2024年度渠道商大会', time: '2024-03-10 09:00:00', points: 10, type: 'registration' },
  { id: 2, userId: 1, userName: '张伟', action: '签到成功', target: '2024年度渠道商大会', time: '2024-03-15 08:45:00', points: 20, type: 'checkin' },
  { id: 3, userId: 1, userName: '张伟', action: '提交提问', target: '关于新产品定价策略', time: '2024-03-15 10:30:00', points: 5, type: 'question' },
  { id: 4, userId: 1, userName: '张伟', action: '问题被采纳', target: '关于新产品定价策略', time: '2024-03-15 11:00:00', points: 20, type: 'featured' },
  { id: 5, userId: 2, userName: '李娜', action: '报名参加', target: '新产品发布会', time: '2024-03-05 10:00:00', points: 10, type: 'registration' },
  { id: 6, userId: 2, userName: '李娜', action: '签到成功', target: '新产品发布会', time: '2024-03-10 13:50:00', points: 20, type: 'checkin' },
  { id: 7, userId: 2, userName: '李娜', action: '填写反馈', target: '新产品发布会满意度调查', time: '2024-03-10 17:30:00', points: 30, type: 'feedback' },
  { id: 8, userId: 3, userName: '王强', action: '兑换礼品', target: '蓝牙耳机', time: '2024-03-12 11:00:00', points: -1000, type: 'redeem' },
  { id: 9, userId: 4, userName: '赵敏', action: '报名参加', target: '技术培训研讨会', time: '2024-03-18 09:00:00', points: 10, type: 'registration' },
  { id: 10, userId: 6, userName: '周琳', action: '签到成功', target: '市场策略分享会', time: '2024-03-05 09:20:00', points: 20, type: 'checkin' }
];

// 积分记录
export const POINTS_RECORDS = [
  { id: 1, userId: 1, userName: '张伟', type: 'add', points: 20, reason: '会议签到', time: '2024-03-15 08:45:00', operator: '系统自动', operatorTime: '2024-03-15 08:45:00' },
  { id: 2, userId: 1, userName: '张伟', type: 'add', points: 20, reason: '问题被采纳', time: '2024-03-15 11:00:00', operator: '系统自动', operatorTime: '2024-03-15 11:00:00' },
  { id: 3, userId: 2, userName: '李娜', type: 'add', points: 30, reason: '填写反馈问卷', time: '2024-03-10 17:30:00', operator: '系统自动', operatorTime: '2024-03-10 17:30:00' },
  { id: 4, userId: 3, userName: '王强', type: 'subtract', points: 1000, reason: '兑换蓝牙耳机', time: '2024-03-12 11:00:00', operator: '管理员-张经理', operatorTime: '2024-03-12 11:05:00' },
  { id: 5, userId: 4, userName: '赵敏', type: 'add', points: 10, reason: '会议报名', time: '2024-03-18 09:00:00', operator: '系统自动', operatorTime: '2024-03-18 09:00:00' },
  { id: 6, userId: 6, userName: '周琳', type: 'add', points: 50, reason: '完善个人资料', time: '2024-03-01 10:00:00', operator: '系统自动', operatorTime: '2024-03-01 10:00:00' }
];

// 用户反馈
export const USER_FEEDBACKS = [
  { id: 1, userId: 1, userName: '张伟', meetingName: '2024年度渠道商大会', content: '会议组织得非常好，内容很有价值，希望下次能增加更多互动环节', time: '2024-03-15 17:00:00', rating: 5 },
  { id: 2, userId: 2, userName: '李娜', meetingName: '新产品发布会', content: '产品讲解很清晰，但时间安排有点紧张，建议延长Q&A环节', time: '2024-03-10 17:30:00', rating: 4 },
  { id: 3, userId: 3, userName: '王强', meetingName: '市场策略分享会', content: '策略分析很到位，对我们的业务帮助很大，期待更多这样的分享', time: '2024-03-05 12:30:00', rating: 5 },
  { id: 4, userId: 6, userName: '周琳', meetingName: '技术培训研讨会', content: '培训内容专业，讲师水平高，但部分技术细节可以再深入一些', time: '2024-03-20 16:30:00', rating: 4 }
];

// 现场提问数据
export const QUESTIONS = [
  { id: 1, asker: '张伟', company: '北京科技有限公司', question: '请问新产品的定价策略是什么？针对不同级别渠道商有什么优惠政策？', time: '2024-03-15 10:30:00', status: 'approved', isFeatured: true, isAnswered: true },
  { id: 2, asker: '李娜', company: '上海贸易集团', question: '关于售后服务的响应时间，能否承诺24小时内响应？', time: '2024-03-15 10:45:00', status: 'approved', isFeatured: false, isAnswered: true },
  { id: 3, asker: '王强', company: '深圳实业集团', question: '是否支持定制化开发？我们有一些特殊的业务需求', time: '2024-03-15 11:00:00', status: 'approved', isFeatured: true, isAnswered: false },
  { id: 4, asker: '赵敏', company: '广州网络科技', question: '技术支持团队的规模有多大？能否提供驻场支持？', time: '2024-03-15 11:30:00', status: 'pending', isFeatured: false, isAnswered: false },
  { id: 5, asker: '孙浩', company: '杭州数据服务', question: '合作模式有哪些？代理和分销的区别是什么？', time: '2024-03-15 14:00:00', status: 'pending', isFeatured: false, isAnswered: false },
  { id: 6, asker: '周琳', company: '成都创新科技', question: '返利政策具体是怎样的？季度结算还是年度结算？', time: '2024-03-15 14:30:00', status: 'approved', isFeatured: false, isAnswered: false }
];

// 礼品数据
export const GIFTS = [
  { id: 1, name: '品牌雨伞', points: 500, stock: 50, redeemed: 12, image: '🌂', description: '高品质防风雨伞，自动开合' },
  { id: 2, name: '定制笔记本', points: 300, stock: 100, redeemed: 35, image: '📓', description: 'A5精装笔记本，含公司Logo' },
  { id: 3, name: '保温杯', points: 400, stock: 80, redeemed: 28, image: '☕', description: '304不锈钢，500ml容量' },
  { id: 4, name: '充电宝', points: 800, stock: 30, redeemed: 18, image: '🔋', description: '10000mAh，支持快充' },
  { id: 5, name: '蓝牙耳机', points: 1000, stock: 20, redeemed: 8, image: '🎧', description: '主动降噪，续航30小时' },
  { id: 6, name: '商务背包', points: 1500, stock: 15, redeemed: 5, image: '🎒', description: '防水面料，USB充电口' },
  { id: 7, name: '智能手环', points: 1200, stock: 25, redeemed: 10, image: '⌚', description: '心率监测，睡眠追踪' },
  { id: 8, name: '无线鼠标', points: 600, stock: 40, redeemed: 22, image: '🖱️', description: '静音设计，人体工学' }
];

// 兑换记录
export const REDEEM_RECORDS = [
  { id: 1, userName: '张伟', phone: '138****5678', company: '北京科技有限公司', giftName: '蓝牙耳机', points: 1000, time: '2024-03-14 10:30:00', status: 'completed' },
  { id: 2, userName: '李娜', phone: '139****4321', company: '上海贸易集团', giftName: '充电宝', points: 800, time: '2024-03-14 11:20:00', status: 'completed' },
  { id: 3, userName: '王强', phone: '137****2198', company: '深圳实业集团', giftName: '商务背包', points: 1500, time: '2024-03-15 09:15:00', status: 'pending' },
  { id: 4, userName: '赵敏', phone: '136****1987', company: '广州网络科技', giftName: '保温杯', points: 400, time: '2024-03-15 14:30:00', status: 'pending' },
  { id: 5, userName: '周琳', phone: '135****8765', company: '成都创新科技', giftName: '智能手环', points: 1200, time: '2024-03-15 15:45:00', status: 'pending' }
];

// 积分规则
export const POINT_RULES = [
  { id: 1, action: '会议签到', points: 20, description: '参加会议并完成现场签到', status: true },
  { id: 2, action: '提问互动', points: 5, description: '在会议中提交问题', status: true },
  { id: 3, action: '问题被采纳', points: 20, description: '提问被主持人采纳上墙展示', status: true },
  { id: 4, action: '填写反馈', points: 30, description: '完成会议满意度调查问卷', status: true },
  { id: 5, action: '完善资料', points: 50, description: '完善个人和公司信息', status: true },
  { id: 6, action: '邀请好友', points: 100, description: '成功邀请新用户注册', status: false },
  { id: 7, action: '抽奖中奖', points: 200, description: '现场抽奖活动中奖', status: true }
];
