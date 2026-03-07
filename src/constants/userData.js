export const MOCK_USERS = [
  {
    id: 1,
    realName: '张三',
    nickname: '小明',
    phone: '138****1234',
    company: '科技有限公司',
    points: 1250,
    meetingCount: 8,
    registerSource: '小程序',
    avatar: '张',
    status: 'active',
    infoComplete: true,
    role: 'user',
    registerTime: '2024-01-15 10:30:00',
    lastActiveTime: '2024-03-05 14:20:00'
  },
  {
    id: 2,
    realName: '李四',
    nickname: '小李',
    phone: '139****5678',
    company: '贸易公司',
    points: 890,
    meetingCount: 5,
    registerSource: '小程序',
    avatar: '李',
    status: 'active',
    infoComplete: true,
    role: 'user',
    registerTime: '2024-01-20 09:15:00',
    lastActiveTime: '2024-03-05 11:45:00'
  },
  {
    id: 3,
    realName: '王五',
    nickname: '小王',
    phone: '137****9012',
    company: '未完善',
    points: 2100,
    meetingCount: 12,
    registerSource: '手动录入',
    avatar: '王',
    status: 'active',
    infoComplete: false,
    role: 'user',
    registerTime: '2024-02-01 16:20:00',
    lastActiveTime: '2024-03-04 18:30:00'
  },
  {
    id: 4,
    realName: '赵六',
    nickname: '小赵',
    phone: '136****3456',
    company: '实业集团',
    points: 560,
    meetingCount: 3,
    registerSource: '小程序',
    avatar: '赵',
    status: 'active',
    infoComplete: true,
    role: 'user',
    registerTime: '2024-02-10 11:00:00',
    lastActiveTime: '2024-03-05 09:20:00'
  },
  {
    id: 5,
    realName: '孙七',
    nickname: '小孙',
    phone: '158****7890',
    company: '未完善',
    points: 340,
    meetingCount: 2,
    registerSource: '小程序',
    avatar: '孙',
    status: 'inactive',
    infoComplete: false,
    role: 'user',
    registerTime: '2024-02-25 14:30:00',
    lastActiveTime: '2024-03-01 10:15:00'
  },
  {
    id: 6,
    realName: '周八',
    nickname: '小周',
    phone: '135****2468',
    company: '网络科技',
    points: 1780,
    meetingCount: 10,
    registerSource: '小程序',
    avatar: '周',
    status: 'active',
    infoComplete: true,
    role: 'user',
    registerTime: '2024-03-01 08:45:00',
    lastActiveTime: '2024-03-05 16:50:00'
  },
  {
    id: 7,
    realName: '吴九',
    nickname: '小吴',
    phone: '159****1357',
    company: '未完善',
    points: 420,
    meetingCount: 4,
    registerSource: '手动录入',
    avatar: '吴',
    status: 'active',
    infoComplete: false,
    role: 'user',
    registerTime: '2024-03-02 13:20:00',
    lastActiveTime: '2024-03-05 12:30:00'
  },
  {
    id: 8,
    realName: '郑十',
    nickname: '小郑',
    phone: '150****8024',
    company: '数据服务',
    points: 980,
    meetingCount: 6,
    registerSource: '小程序',
    avatar: '郑',
    status: 'active',
    infoComplete: true,
    role: 'admin',
    registerTime: '2024-03-03 10:10:00',
    lastActiveTime: '2024-03-05 15:40:00'
  }
];

export const USER_ACTIVITIES = [
  {
    id: 1,
    userId: 1,
    userName: '张三',
    action: '报名参加',
    target: '渠道商大会',
    time: '2024-03-01 09:00:00',
    points: 10,
    type: 'registration'
  },
  {
    id: 2,
    userId: 1,
    userName: '张三',
    action: '签到成功',
    target: '渠道商大会',
    time: '2024-03-01 09:30:00',
    points: 10,
    type: 'checkin'
  },
  {
    id: 3,
    userId: 1,
    userName: '张三',
    action: '提交提问',
    target: '关于产品定价的疑问',
    time: '2024-03-01 14:00:00',
    points: 5,
    type: 'question'
  },
  {
    id: 4,
    userId: 1,
    userName: '张三',
    action: '填写反馈',
    target: '会议满意度调查',
    time: '2024-03-02 10:00:00',
    points: 20,
    type: 'feedback'
  },
  {
    id: 5,
    userId: 1,
    userName: '张三',
    action: '兑换礼品',
    target: '精美雨伞',
    time: '2024-03-03 11:00:00',
    points: -500,
    type: 'redeem'
  },
  {
    id: 6,
    userId: 2,
    userName: '李四',
    action: '报名参加',
    target: '产品发布会',
    time: '2024-03-05 10:00:00',
    points: 10,
    type: 'registration'
  },
  {
    id: 7,
    userId: 2,
    userName: '李四',
    action: '签到成功',
    target: '产品发布会',
    time: '2024-03-05 10:30:00',
    points: 10,
    type: 'checkin'
  }
];

export const USER_POINTS_RECORDS = [
  {
    id: 1,
    userId: 1,
    userName: '张三',
    type: 'add',
    points: 10,
    reason: '会议签到',
    time: '2024-03-01 09:30:00',
    operator: '系统自动',
    operatorTime: '2024-03-01 09:30:00'
  },
  {
    id: 2,
    userId: 1,
    userName: '张三',
    type: 'add',
    points: 5,
    reason: '提问互动',
    time: '2024-03-01 14:00:00',
    operator: '系统自动',
    operatorTime: '2024-03-01 14:00:00'
  },
  {
    id: 3,
    userId: 1,
    userName: '张三',
    type: 'add',
    points: 20,
    reason: '填写反馈',
    time: '2024-03-02 10:00:00',
    operator: '系统自动',
    operatorTime: '2024-03-02 10:00:00'
  },
  {
    id: 4,
    userId: 1,
    userName: '张三',
    type: 'subtract',
    points: 500,
    reason: '兑换雨伞',
    time: '2024-03-03 11:00:00',
    operator: '管理员-张经理',
    operatorTime: '2024-03-03 11:05:00'
  },
  {
    id: 5,
    userId: 2,
    userName: '李四',
    type: 'add',
    points: 10,
    reason: '会议签到',
    time: '2024-03-05 10:30:00',
    operator: '系统自动',
    operatorTime: '2024-03-05 10:30:00'
  }
];

export const USER_FEEDBACKS = [
  {
    id: 1,
    userId: 1,
    userName: '张三',
    meetingName: '渠道商大会',
    content: '会议组织得很好，希望下次能增加更多互动环节',
    time: '2024-03-01 15:00:00',
    rating: 5
  },
  {
    id: 2,
    userId: 2,
    userName: '李四',
    meetingName: '产品发布会',
    content: '产品讲解很清晰，但时间安排有点紧张',
    time: '2024-03-05 11:00:00',
    rating: 4
  }
];
