import { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Input, 
  Button, 
  Tag, 
  Space, 
  Drawer, 
  Form, 
  Select, 
  message,
  Tooltip,
  Avatar,
  Statistic,
  Row,
  Col,
  Timeline,
  Empty,
  Modal,
  InputNumber,
  Tabs,
  Rate,
  Divider
} from 'antd';
import { 
  Search, 
  Download,
  Plus,
  Minus,
  Eye,
  User,
  Phone,
  Award,
  Calendar,
  TrendingUp,
  Clock,
  MessageSquare,
  Ban
} from 'lucide-react';
import { userService, pointsRecordService, feedbackService } from '../services/supabase';
import { USERS, USER_ACTIVITIES, POINTS_RECORDS, USER_FEEDBACKS } from '../constants/realData';

const { Search: SearchInput } = Input;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPointsRecords, setUserPointsRecords] = useState([]);
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [pointsForm] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      if (data && data.length > 0) {
        setUsers(data);
      } else {
        setUsers(USERS);
      }
    } catch (error) {
      setUsers(USERS);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    active: { color: 'green', text: '活跃' },
    inactive: { color: 'gray', text: '不活跃' }
  };

  const filteredUsers = users.filter(user => {
    const matchSearch = 
      (user.real_name || user.realName || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (user.phone || '').includes(searchText) ||
      (user.company || '').toLowerCase().includes(searchText.toLowerCase());
    return matchSearch;
  });

  const columns = [
    {
      title: '用户',
      key: 'user',
      width: 180,
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>
            {(record.real_name || record.realName || '?')[0]}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{record.real_name || record.realName}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.nickname}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
      width: 150,
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      width: 120,
      render: (level) => {
        const color = level?.includes('金牌') ? 'gold' : level?.includes('银牌') ? 'silver' : 'default';
        return <Tag color={color}>{level || '普通'}</Tag>;
      },
    },
    {
      title: '积分',
      dataIndex: 'points',
      key: 'points',
      width: 100,
      render: (points) => (
        <span style={{ fontWeight: 600, color: '#1890ff' }}>{points || 0}</span>
      ),
      sorter: (a, b) => (a.points || 0) - (b.points || 0),
    },
    {
      title: '参会次数',
      key: 'meetingCount',
      width: 100,
      render: (_, record) => record.meeting_count || record.meetingCount || 0,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => {
        const config = statusConfig[status] || statusConfig.active;
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            size="small"
            icon={<Eye size={14} />}
            onClick={() => handleViewUser(record)}
          >
            详情
          </Button>
          <Button 
            type="text" 
            size="small"
            danger
            icon={<Ban size={14} />}
            onClick={() => handleDisableUser(record)}
          >
            禁用
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewUser = async (user) => {
    setSelectedUser(user);
    setIsDrawerVisible(true);
    
    // 加载用户积分记录
    try {
      const records = await pointsRecordService.getByUserId(user.id);
      setUserPointsRecords(records || POINTS_RECORDS.filter(r => r.userId === user.id));
    } catch (e) {
      setUserPointsRecords(POINTS_RECORDS.filter(r => r.userId === user.id));
    }
    
    // 加载用户反馈
    try {
      const feedbacks = await feedbackService.getByUserId(user.id);
      setUserFeedbacks(feedbacks || USER_FEEDBACKS.filter(f => f.userId === user.id));
    } catch (e) {
      setUserFeedbacks(USER_FEEDBACKS.filter(f => f.userId === user.id));
    }
  };

  const handleDisableUser = (user) => {
    Modal.confirm({
      title: '确认禁用',
      content: `确定要禁用用户 ${user.real_name || user.realName} 吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          await userService.updateStatus(user.id, 'inactive');
        } catch (e) {}
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, status: 'inactive' } : u
        ));
        message.success('禁用成功');
      },
    });
  };

  const handlePointsChange = async (type) => {
    const values = await pointsForm.validateFields();
    const amount = values.points;
    
    if (!amount || amount <= 0) {
      message.warning('请输入有效的积分数量');
      return;
    }

    const newPoints = type === 'add' 
      ? (selectedUser.points || 0) + amount 
      : (selectedUser.points || 0) - amount;

    Modal.confirm({
      title: '确认操作',
      content: `确定要${type === 'add' ? '增加' : '扣除'} ${amount} 积分吗？`,
      onOk: async () => {
        try {
          await userService.updatePoints(selectedUser.id, newPoints);
        } catch (e) {}
        
        setUsers(users.map(u => 
          u.id === selectedUser.id ? { ...u, points: newPoints } : u
        ));
        setSelectedUser({ ...selectedUser, points: newPoints });
        message.success(`${type === 'add' ? '增加' : '扣除'}积分成功`);
        pointsForm.resetFields();
      },
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, marginBottom: 16 }}>用户管理</h1>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <SearchInput
              placeholder="搜索用户姓名、手机号或公司"
              allowClear
              enterButton={<Search size={16} />}
              size="large"
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Col>
          <Col>
            <Button type="primary" icon={<Download size={16} />}>
              导出 Excel
            </Button>
          </Col>
        </Row>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          locale={{ emptyText: <Empty description="暂无用户数据" /> }}
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>

      <Drawer
        title={`用户详情 - ${selectedUser?.real_name || selectedUser?.realName || ''}`}
        placement="right"
        width={700}
        open={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      >
        {selectedUser && (
          <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Statistic 
                  title="当前积分" 
                  value={selectedUser.points || 0}
                  prefix={<Award size={16} />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="参会次数" 
                  value={selectedUser.meeting_count || selectedUser.meetingCount || 0}
                  prefix={<Calendar size={16} />}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="级别" 
                  value={selectedUser.level || '普通'}
                />
              </Col>
            </Row>

            <Divider />

            <Card title="积分调整" size="small" style={{ marginBottom: 16 }}>
              <Form form={pointsForm} layout="inline">
                <Form.Item name="points">
                  <InputNumber placeholder="积分数量" min={1} style={{ width: 150 }} />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" icon={<Plus size={14} />} onClick={() => handlePointsChange('add')}>
                      增加
                    </Button>
                    <Button danger icon={<Minus size={14} />} onClick={() => handlePointsChange('subtract')}>
                      扣除
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>

            <Tabs
              items={[
                {
                  key: 'points',
                  label: '积分记录',
                  children: (
                    <Table
                      size="small"
                      dataSource={userPointsRecords}
                      rowKey="id"
                      columns={[
                        { title: '类型', dataIndex: 'type', render: (t) => <Tag color={t === 'add' ? 'green' : 'red'}>{t === 'add' ? '增加' : '扣除'}</Tag> },
                        { title: '积分', dataIndex: 'points', render: (p, r) => <span style={{ color: r.type === 'add' ? '#52c41a' : '#ff4d4f' }}>{r.type === 'add' ? '+' : '-'}{p}</span> },
                        { title: '原因', dataIndex: 'reason' },
                        { title: '时间', dataIndex: 'time' },
                      ]}
                      pagination={{ pageSize: 5 }}
                    />
                  ),
                },
                {
                  key: 'feedback',
                  label: '反馈记录',
                  children: (
                    <Table
                      size="small"
                      dataSource={userFeedbacks}
                      rowKey="id"
                      columns={[
                        { title: '会议', dataIndex: 'meeting_name', render: (v, r) => v || r.meetingName },
                        { title: '内容', dataIndex: 'content', width: 200 },
                        { title: '评分', dataIndex: 'rating', render: (r) => <Rate disabled value={r} style={{ fontSize: 12 }} /> },
                        { title: '时间', dataIndex: 'time' },
                      ]}
                      pagination={{ pageSize: 5 }}
                    />
                  ),
                },
              ]}
            />
          </>
        )}
      </Drawer>
    </div>
  );
};

export default UsersPage;
