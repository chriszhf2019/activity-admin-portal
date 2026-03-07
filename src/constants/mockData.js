export const MOCK_ACTIVITIES = [
  {
    id: 1,
    name: '晨练跑步',
    category: '运动',
    priority: 'high',
    status: 'in_progress',
    createTime: '2024-03-01 06:30:00',
    description: '每天早上6点晨跑5公里'
  },
  {
    id: 2,
    name: '英语学习',
    category: '学习',
    priority: 'high',
    status: 'in_progress',
    createTime: '2024-03-01 08:00:00',
    description: '每天学习英语2小时'
  },
  {
    id: 3,
    name: '阅读书籍',
    category: '学习',
    priority: 'medium',
    status: 'completed',
    createTime: '2024-03-02 09:00:00',
    description: '阅读《深入理解计算机系统》'
  },
  {
    id: 4,
    name: '健身训练',
    category: '运动',
    priority: 'medium',
    status: 'in_progress',
    createTime: '2024-03-02 18:00:00',
    description: '每周三次力量训练'
  },
  {
    id: 5,
    name: '代码练习',
    category: '学习',
    priority: 'high',
    status: 'in_progress',
    createTime: '2024-03-03 10:00:00',
    description: 'LeetCode每日一题'
  },
  {
    id: 6,
    name: '瑜伽课程',
    category: '运动',
    priority: 'low',
    status: 'completed',
    createTime: '2024-03-03 19:00:00',
    description: '每周两次瑜伽课程'
  },
  {
    id: 7,
    name: '技术博客',
    category: '学习',
    priority: 'medium',
    status: 'in_progress',
    createTime: '2024-03-04 14:00:00',
    description: '每周写一篇技术博客'
  },
  {
    id: 8,
    name: '游泳训练',
    category: '运动',
    priority: 'medium',
    status: 'in_progress',
    createTime: '2024-03-04 17:00:00',
    description: '每周两次游泳训练'
  },
  {
    id: 9,
    name: '项目开发',
    category: '工作',
    priority: 'high',
    status: 'in_progress',
    createTime: '2024-03-05 09:00:00',
    description: '日常活动管理系统开发'
  },
  {
    id: 10,
    name: '团队会议',
    category: '工作',
    priority: 'medium',
    status: 'completed',
    createTime: '2024-03-05 15:00:00',
    description: '每周团队例会'
  },
  {
    id: 11,
    name: '冥想练习',
    category: '运动',
    priority: 'low',
    status: 'in_progress',
    createTime: '2024-03-06 07:00:00',
    description: '每天早上冥想15分钟'
  },
  {
    id: 12,
    name: '在线课程',
    category: '学习',
    priority: 'high',
    status: 'in_progress',
    createTime: '2024-03-06 20:00:00',
    description: 'React高级课程学习'
  }
];

export const CATEGORY_OPTIONS = [
  { label: '运动', value: '运动' },
  { label: '学习', value: '学习' },
  { label: '工作', value: '工作' },
  { label: '生活', value: '生活' }
];

export const PRIORITY_OPTIONS = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' }
];

export const STATUS_OPTIONS = [
  { label: '进行中', value: 'in_progress' },
  { label: '已完成', value: 'completed' }
];
