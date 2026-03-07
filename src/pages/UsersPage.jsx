import { useState } from 'react';
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
import { USERS, USER_ACTIVITIES, POINTS_RECORDS, USER_FEEDBACKS } from '../constants/realData';

const { Search: SearchInput } = Input;

const UsersPage = () => {
  const [users, setUsers] = useState(USERS);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [infoFilter, setInfoFilter] = useState('all');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pointsForm] = Form.useForm();

  const statusConfig = {
    active: { color: 'green', text: '活跃' },
    inactive: { color: 'gray', text: '不活跃' }
  };

  const sourceConfig = {
    '小程序': { color: 'blue', text: '小程序' },
    '手动录入': { color: 'purple', text: '手动录入' }
  };

  const roleConfig = {
    'all': { label: '全部', value: 'all' },
    'user': { label: '普通用户', value: 'user' },
    'admin': { label: '管理员', value: 'admin' }
  };

  const infoConfig = {
    'all': { label: '全部', value: 'all' },
    'complete': { label: '已完善', value: 'complete' },
    'incomplete': { label: '未完善', value: 'incomplete' }
  };

  const filteredUsers = users.filter(user => {
    const matchSearch = user.realName.toLowerCase().includes(searchText.toLowerCase()) ||
                       user.nickname.toLowerCase().includes(searchText.toLowerCase()) ||
                       user.phone.includes(searchText) ||
                       user.company.toLowerCase().includes(searchText.toLowerCase());
    
    const matchRole = roleFilter === 'all' || user.role === roleFilter;
    const matchInfo = infoFilter === 'all' || 
                     (infoFilter === 'complete' && user.infoComplete) ||
                     (infoFilter === 'incomplete' && !user.infoComplete);
    
    return matchSearch && matchRole && matchInfo;
  });

  const columns = [
    {
      title: '用户',
      dataIndex: 'realName',
      key: 'realName',
      width: 180,
      render: (_, record) => (
        <Space>
          <Avatar 
            size="default"
            style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
            onClick={() => handleViewUser(record)}
          >
            {record.avatar}
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontWeight: 500, cursor: 'pointer', color: '#1890ff' }} onClick={() => handleViewUser(record)}>
              {record.realName}
            </span>
            <span style={{ fontSize: 12, color: '#8c8c8c' }}>
              {record.nickname}
            </span>
          </div>
        </Space>
      ),
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (phone) => (
        <Space>
          <Phone size={14} style={{ color: '#8c8c8c', marginRight: 4 }} />
          <span style={{ color: '#8c8c8c', fontSize: 13 }}>{phone}</span>
        </Space>
      ),
    },
    {
      title: '所属公司',
      dataIndex: 'company',
      key: 'company',
      width: 180,
      render: (company) => {
        const isComplete = company !== '未完善';
        return (
          <Tag color={isComplete ? 'green' : 'orange'} style={{ margin: 0 }}>
            {company}
          </Tag>
        );
      },
    },
    {
      title: '账户状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const config = statusConfig[status];
        return (
          <Tag color={config.color} style={{ margin: 0 }}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: '当前积分',
      dataIndex: 'points',
      key: 'points',
      width: 120,
      render: (points) => (
        <span style={{ fontWeight: 600, color: points >= 1000 ? '#52c41a' : points >= 500 ? '#faad14' : '#ff4d4f' }}>
          {points}
        </span>
      ),
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: '参与会议数',
      dataIndex: 'meetingCount',
      key: 'meetingCount',
      width: 120,
      render: (count) => (
        <Space>
          <Calendar size={14} style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{count}</span>
        </Space>
      ),
      sorter: (a, b) => a.meetingCount - b.meetingCount,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              size="small"
              icon={<Eye size={16} />}
              onClick={() => handleViewUser(record)}
            >
              详情
            </Button>
          </Tooltip>
          {record.role !== 'admin' && (
            <Tooltip title="禁用用户">
              <Button 
                type="text" 
                size="small"
                danger
                icon={<Ban size={16} />}
                onClick={() => handleDisableUser(record)}
              >
                禁用
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    setSelectedUser(null);
    pointsForm.resetFields();
  };

  const handleExportExcel = () => {
    message.success('正在导出用户数据到 Excel...');
  };

  const handleDisableUser = (user) => {
    Modal.confirm({
      title: '确认禁用',
      content: `确定要禁用用户 ${user.realName} 吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, status: 'inactive' } : u
        ));
        message.success('禁用成功');
      },
    });
  };

  const handlePointsChange = (type, value) => {
    if (!value || value === 0) {
      message.warning('请输入有效的积分数量');
      return;
    }

    Modal.confirm({
      title: '确认操作',
      content: `确定要${type === 'add' ? '增加' : '扣除'} ${value} 积分吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const newPoints = type === 'add' 
          ? selectedUser.points + value 
          : selectedUser.points - value;
        
        const operationRecord = {
          id: Date.now(),
          userId: selectedUser.id,
          userName: selectedUser.realName,
          type: type === 'add' ? 'add' : 'deduct',
          points: value,
          operator: '当前管理员',
          operatorTime: new Date().toLocaleString('zh-CN', { hour12: false }),
          reason: type === 'add' ? '管理员手动增加' : '管理员手动扣除'
        };

        setUsers(users.map(user => 
          user.id === selectedUser.id 
            ? { ...user, points: newPoints }
            : user
        ));
        
        setSelectedUser({ ...selectedUser, points: newPoints });
        message.success(`${type === 'add' ? '增加' : '扣除'}积分成功`);
        pointsForm.resetFields();
        
        console.log('积分变动审计日志:', operationRecord);
      },
    });
  };

  const getActivityIcon = (type) => {
    const icons = {
      registration: <User size={16} style={{ color: '#1890ff' }} />,
      checkin: <Clock size={16} style={{ color: '#52c41a' }} />,
      question: <TrendingUp size={16} style={{ color: '#faad14' }} />,
      feedback: <MessageSquare size={16} style={{ color: '#722ed1' }} />,
      redeem: <Phone size={16} style={{ color: '#eb2f96' }} />
    };
    return icons[type] || <User size={16} />;
  };

  const getActivityColor = (type) => {
    const colors = {
      registration: 'blue',
      checkin: 'green',
      question: 'orange',
      feedback: 'purple',
      redeem: 'pink'
    };
    return colors[type] || 'blue';
  };

  const getPointsIcon = (type) => {
    const icons = {
      add: <Plus size={14} style={{ color: '#52c41a' }} />,
      subtract: <Minus size={14} style={{ color: '#ff4d4f' }} />
    };
    return icons[type] || <Plus size={14} />;
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, marginBottom: 16 }}>用户画像中心</h1>
        
        <Row gutter={[16, 16]} style={{ alignItems: 'center' }}>
          <Col flex="auto">
            <Space size="large">
              <SearchInput
                placeholder="搜索用户姓名、昵称、手机号或公司名"
                allowClear
                enterButton={<Search size={16} />}
                size="large"
                onSearch={handleSearch}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
              
              <Select
                placeholder="用户角色"
                value={roleFilter}
                onChange={setRoleFilter}
                style={{ width: 150 }}
                options={Object.values(roleConfig).map(item => ({ label: item.label, value: item.value }))}
              />
              
              <Select
                placeholder="信息完整度"
                value={infoFilter}
                onChange={setInfoFilter}
                style={{ width: 150 }}
                options={Object.values(infoConfig).map(item => ({ label: item.label, value: item.value }))}
              />
            </Space>
          </Col>
          
          <Col>
            <Button 
              type="primary"
              icon={<Download size={16} />}
              onClick={handleExportExcel}
            >
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
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div>
                    <p style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 8 }}>
                      暂无用户数据
                    </p>
                    <p style={{ fontSize: 14, color: '#bfbfbf' }}>
                      用户列表为空，等待用户注册
                    </p>
                  </div>
                }
              />
            )
          }}
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar 
              size="large"
              style={{ backgroundColor: '#1890ff' }}
            >
              {selectedUser?.avatar}
            </Avatar>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{selectedUser?.realName}</div>
              <div style={{ fontSize: 13, color: '#8c8c8c' }}>
                {selectedUser?.nickname} · {selectedUser?.phone}
              </div>
            </div>
          </div>
        }
        placement="right"
        width={900}
        open={isDrawerVisible}
        onClose={handleDrawerClose}
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Card>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Statistic 
                    title="当前积分"
                    value={selectedUser?.points || 0} 
                    prefix={<Award size={20} style={{ color: '#1890ff' }} />}
                    valueStyle={{ color: '#1890ff', fontSize: 28 }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic 
                    title="参与会议"
                    value={selectedUser?.meetingCount || 0} 
                    prefix={<Calendar size={20} style={{ color: '#52c41a' }} />}
                    valueStyle={{ color: '#52c41a', fontSize: 28 }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic 
                    title="注册时间"
                    value={selectedUser?.registerTime?.split(' ')[0] || '-'} 
                    prefix={<Clock size={20} style={{ color: '#722ed1' }} />}
                    valueStyle={{ color: '#722ed1', fontSize: 28 }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic 
                    title="最后活跃"
                    value={selectedUser?.lastActiveTime?.split(' ')[0] || '-'} 
                    prefix={<TrendingUp size={20} style={{ color: '#faad14' }} />}
                    valueStyle={{ color: '#faad14', fontSize: 28 }}
                  />
                </Col>
              </Row>

              <Divider />

              <Card title="积分调整" size="small" style={{ marginBottom: 24 }}>
                <Form
                  form={pointsForm}
                  layout="inline"
                >
                  <Form.Item name="points" rules={[{ required: true, message: '请输入积分数量' }]}>
                    <InputNumber 
                      placeholder="请输入积分数量" 
                      min={1}
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button 
                        type="primary"
                        icon={<Plus size={14} />}
                        onClick={() => pointsForm.validateFields().then(values => handlePointsChange('add', values.points))}
                      >
                        增加积分
                      </Button>
                      <Button 
                        danger
                        icon={<Minus size={14} />}
                        onClick={() => pointsForm.validateFields().then(values => handlePointsChange('subtract', values.points))}
                      >
                        扣除积分
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Card>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Tabs
                defaultActiveKey="activities"
                items={[
                  {
                    key: 'activities',
                    label: (
                      <span>
                        <Calendar size={14} style={{ marginRight: 4 }} />
                        活动轨迹
                      </span>
                    ),
                    children: (
                      <Timeline
                        items={USER_ACTIVITIES
                          .filter(activity => activity.userId === selectedUser?.id)
                          .map(activity => ({
                            color: getActivityColor(activity.type),
                            dot: getActivityIcon(activity.type),
                            children: (
                              <div>
                                <div style={{ fontWeight: 500, marginBottom: 4 }}>
                                  {activity.action} - {activity.target}
                                </div>
                                <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                                  <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                                  {activity.time}
                                  <span style={{ marginLeft: 12, color: activity.points > 0 ? '#52c41a' : '#ff4d4f' }}>
                                    {activity.points > 0 ? '+' : ''}{activity.points} 积分
                                  </span>
                                </div>
                              </div>
                            ),
                          }))}
                      />
                    ),
                  },
                  {
                    key: 'points',
                    label: (
                      <span>
                        <Award size={14} style={{ marginRight: 4 }} />
                        积分明细
                      </span>
                    ),
                    children: (
                      <Table
                        columns={[
                          {
                            title: '类型',
                            dataIndex: 'type',
                            key: 'type',
                            width: 100,
                            render: (type) => {
                              const config = {
                                add: { color: 'green', text: '增加' },
                                subtract: { color: 'red', text: '扣除' }
                              };
                              const c = config[type];
                              return (
                                <Tag color={c.color} style={{ margin: 0 }}>
                                  {c.text}
                                </Tag>
                              );
                            },
                          },
                          {
                            title: '积分值',
                            dataIndex: 'points',
                            key: 'points',
                            width: 100,
                            render: (points) => (
                              <span style={{ fontWeight: 600, color: points > 0 ? '#52c41a' : '#ff4d4f' }}>
                                {points > 0 ? '+' : ''}{points}
                              </span>
                            ),
                          },
                          {
                            title: '原因',
                            dataIndex: 'reason',
                            key: 'reason',
                            width: 200,
                            render: (reason) => (
                              <span style={{ color: '#8c8c8c' }}>{reason}</span>
                            ),
                          },
                          {
                            title: '时间',
                            dataIndex: 'time',
                            key: 'time',
                            width: 180,
                            render: (time) => (
                              <span style={{ color: '#8c8c8c', fontSize: 13 }}>{time}</span>
                            ),
                          },
                          {
                            title: '操作人',
                            dataIndex: 'operator',
                            key: 'operator',
                            width: 120,
                            render: (operator) => (
                              <Tag color="blue" style={{ margin: 0 }}>
                                {operator}
                              </Tag>
                            ),
                          },
                          {
                            title: '修改时间',
                            dataIndex: 'operatorTime',
                            key: 'operatorTime',
                            width: 180,
                            render: (operatorTime) => (
                              <span style={{ color: '#8c8c8c', fontSize: 13 }}>{operatorTime}</span>
                            ),
                          },
                        ]}
                        dataSource={POINTS_RECORDS.filter(record => record.userId === selectedUser?.id)}
                        rowKey="id"
                        pagination={{
                          total: POINTS_RECORDS.filter(record => record.userId === selectedUser?.id).length,
                          pageSize: 5,
                          showSizeChanger: true,
                          showQuickJumper: true,
                          showTotal: (total) => `共 ${total} 条`,
                        }}
                        scroll={{ x: 800 }}
                      />
                    ),
                  },
                  {
                    key: 'feedback',
                    label: (
                      <span>
                        <MessageSquare size={14} style={{ marginRight: 4 }} />
                        反馈建议
                      </span>
                    ),
                    children: (
                      <div>
                        {USER_FEEDBACKS.filter(feedback => feedback.userId === selectedUser?.id).length > 0 ? (
                          <Table
                            columns={[
                              {
                                title: '会议名称',
                                dataIndex: 'meetingName',
                                key: 'meetingName',
                                width: 200,
                                render: (name) => (
                                  <span style={{ fontWeight: 500 }}>{name}</span>
                                ),
                              },
                              {
                                title: '反馈内容',
                                dataIndex: 'content',
                                key: 'content',
                                width: 300,
                                render: (content) => (
                                  <span style={{ color: '#8c8c8c' }}>{content}</span>
                                ),
                              },
                              {
                                title: '提交时间',
                                dataIndex: 'time',
                                key: 'time',
                                width: 180,
                                render: (time) => (
                                  <span style={{ color: '#8c8c8c', fontSize: 13 }}>{time}</span>
                                ),
                              },
                              {
                                title: '评分',
                                dataIndex: 'rating',
                                key: 'rating',
                                width: 120,
                                render: (rating) => (
                                  <Rate disabled value={rating} style={{ fontSize: 14 }} />
                                ),
                              },
                            ]}
                            dataSource={USER_FEEDBACKS.filter(feedback => feedback.userId === selectedUser?.id)}
                            rowKey="id"
                            pagination={{
                              total: USER_FEEDBACKS.filter(feedback => feedback.userId === selectedUser?.id).length,
                              pageSize: 5,
                              showSizeChanger: true,
                              showQuickJumper: true,
                              showTotal: (total) => `共 ${total} 条`,
                            }}
                            scroll={{ x: 1000 }}
                          />
                        ) : (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <p style={{ fontSize: 16, marginBottom: 8 }}>暂时还没有反馈记录</p>
                                <p style={{ color: '#8c8c8c', fontSize: 14 }}>
                                  该用户还没有提交过任何会议反馈
                                </p>
                              </div>
                            }
                          />
                        )}
                      </div>
                    ),
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default UsersPage;
