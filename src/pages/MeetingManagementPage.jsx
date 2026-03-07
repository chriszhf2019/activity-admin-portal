import { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Modal, 
  message,
  Tooltip,
  Avatar,
  Statistic,
  Row,
  Col,
  Progress,
  Divider,
  Tabs,
  Form,
  Input,
  TextArea,
  Empty
} from 'antd';
import { 
  RefreshCw,
  Download,
  Check,
  X,
  Eye,
  User,
  Phone,
  Calendar,
  MapPin,
  MonitorPlay,
  Clock,
  MessageSquare,
  Send,
  Bell
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const MeetingManagementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('registration');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [notificationForm] = Form.useForm();
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: '会议议程.pdf',
      size: '2.3 MB',
      uploadTime: '2024-03-05 08:30:00',
      uploader: '张经理'
    },
    {
      id: 2,
      name: '产品介绍.pptx',
      size: '15.6 MB',
      uploadTime: '2024-03-05 09:00:00',
      uploader: '张经理'
    },
    {
      id: 3,
      name: '培训资料.zip',
      size: '45.2 MB',
      uploadTime: '2024-03-05 10:15:00',
      uploader: '李主管'
    }
  ]);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [uploadForm] = Form.useForm();

  const meetingData = {
    name: '渠道商大会',
    time: '2024-03-05 09:00 - 18:00',
    location: '北京市朝阳区建国路88号',
    totalRegistrations: 156,
    checkedInCount: 128,
    pendingQuestions: 5
  };

  const registrationData = [
    {
      id: 1,
      name: '张三',
      company: '科技有限公司',
      phone: '138****1234',
      avatar: '张',
      registrationTime: '2024-03-01 10:30:00',
      checkInStatus: 'checked',
      checkInTime: '2024-03-05 09:15:00'
    },
    {
      id: 2,
      name: '李四',
      company: '贸易公司',
      phone: '139****5678',
      avatar: '李',
      registrationTime: '2024-03-02 14:20:00',
      checkInStatus: 'pending',
      checkInTime: null
    },
    {
      id: 3,
      name: '王五',
      company: '实业集团',
      phone: '137****9012',
      avatar: '王',
      registrationTime: '2024-03-03 09:00:00',
      checkInStatus: 'checked',
      checkInTime: '2024-03-05 09:20:00'
    },
    {
      id: 4,
      name: '赵六',
      company: '网络科技',
      phone: '136****3456',
      avatar: '赵',
      registrationTime: '2024-03-04 11:30:00',
      checkInStatus: 'pending',
      checkInTime: null
    },
    {
      id: 5,
      name: '孙七',
      company: '未完善',
      phone: '158****7890',
      avatar: '孙',
      registrationTime: '2024-03-04 15:00:00',
      checkInStatus: 'pending',
      checkInTime: null
    },
    {
      id: 6,
      name: '周八',
      company: '数据服务',
      phone: '135****2468',
      avatar: '周',
      registrationTime: '2024-03-05 08:45:00',
      checkInStatus: 'checked',
      checkInTime: '2024-03-05 09:00:00'
    }
  ];

  const checkInUsers = registrationData.filter(user => user.checkInStatus === 'checked');

  const questionData = [
    {
      id: 1,
      userName: '张三',
      question: '请问这个产品的定价策略是什么？',
      time: '2024-03-05 10:30:00',
      status: 'pending'
    },
    {
      id: 2,
      userName: '李四',
      question: '关于售后服务的响应时间有多长？',
      time: '2024-03-05 10:45:00',
      status: 'approved'
    },
    {
      id: 3,
      userName: '王五',
      question: '是否支持定制化开发？',
      time: '2024-03-05 11:00:00',
      status: 'pending'
    },
    {
      id: 4,
      userName: '赵六',
      question: '技术支持团队有多少人？',
      time: '2024-03-05 11:30:00',
      status: 'pending'
    },
    {
      id: 5,
      userName: '孙七',
      question: '合作模式有哪些？',
      time: '2024-03-05 14:00:00',
      status: 'approved'
    }
  ];

  const checkInRate = Math.round((checkInUsers.length / registrationData.length) * 100);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
    message.success('数据已刷新');
  };

  const handleManualCheckIn = (userId) => {
    Modal.confirm({
      title: '确认签到',
      content: '确定要为该用户签到吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('签到成功');
      },
    });
  };

  const handleExportExcel = () => {
    message.success('正在导出报名名单到 Excel...');
  };

  const handleApproveQuestion = (id) => {
    const newData = questionData.map(q => 
      q.id === id ? { ...q, status: 'approved' } : q
    );
    message.success('已准许上墙');
  };

  const handleHideQuestion = (id) => {
    Modal.confirm({
      title: '确认隐藏',
      content: '确定要隐藏这个问题吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('已隐藏');
      },
    });
  };

  const handleReplyQuestion = (id) => {
    Modal.info({
      title: '回复问题',
      content: (
        <div style={{ marginTop: 16 }}>
          <span>回复功能开发中...</span>
        </div>
      ),
    });
  };

  const handleBatchNotification = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要通知的用户');
      return;
    }
    setIsNotificationModalVisible(true);
  };

  const handleNotificationOk = () => {
    notificationForm.validateFields().then((values) => {
      message.success(`已向 ${selectedRowKeys.length} 位用户发送通知`);
      setIsNotificationModalVisible(false);
      notificationForm.resetFields();
      setSelectedRowKeys([]);
    });
  };

  const handleShowUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const handleUploadOk = () => {
    uploadForm.validateFields().then((values) => {
      const newMaterial = {
        id: Date.now(),
        name: values.fileName,
        size: '0 KB',
        uploadTime: new Date().toLocaleString('zh-CN', { hour12: false }),
        uploader: '当前管理员'
      };
      setMaterials([...materials, newMaterial]);
      message.success('文件上传成功');
      setIsUploadModalVisible(false);
      uploadForm.resetFields();
    });
  };

  const handleDeleteMaterial = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个文件吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setMaterials(materials.filter(m => m.id !== id));
        message.success('删除成功');
      },
    });
  };

  const registrationColumns = [
    {
      title: '用户',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (_, record) => (
        <Space>
          <Avatar 
            size="default"
            style={{ backgroundColor: '#1890ff' }}
          >
            {record.avatar}
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontWeight: 500 }}>{record.name}</span>
            <span style={{ fontSize: 12, color: '#8c8c8c' }}>{record.company}</span>
          </div>
        </Space>
      ),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
      render: (phone) => (
        <Space>
          <Phone size={14} style={{ color: '#8c8c8c', marginRight: 4 }} />
          <span style={{ color: '#8c8c8c', fontSize: 13 }}>{phone}</span>
        </Space>
      ),
    },
    {
      title: '报名时间',
      dataIndex: 'registrationTime',
      key: 'registrationTime',
      width: 180,
      render: (time) => (
        <span style={{ color: '#8c8c8c', fontSize: 13 }}>{time}</span>
      ),
    },
    {
      title: '签到状态',
      dataIndex: 'checkInStatus',
      key: 'checkInStatus',
      width: 120,
      render: (status) => {
        const config = {
          checked: { color: 'success', text: '已签到' },
          pending: { color: 'default', text: '未签到' }
        };
        const c = config[status];
        return (
          <Tag color={c.color} style={{ margin: 0 }}>
            {c.text}
          </Tag>
        );
      },
    },
    {
      title: '签到时间',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
      width: 180,
      render: (time) => (
        <span style={{ color: '#8c8c8c', fontSize: 13 }}>{time || '-'}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          {record.checkInStatus === 'pending' && (
            <Tooltip title="手动签到">
              <Button 
                type="primary"
                size="small"
                icon={<Check size={14} />}
                onClick={() => handleManualCheckIn(record.id)}
              >
                签到
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const questionColumns = [
    {
      title: '提问人',
      dataIndex: 'userName',
      key: 'userName',
      width: 120,
      render: (userName) => (
        <Space>
          <Avatar 
            size="small"
            style={{ backgroundColor: '#1890ff' }}
          >
            {userName[0]}
          </Avatar>
          <span style={{ fontWeight: 500 }}>{userName}</span>
        </Space>
      ),
    },
    {
      title: '问题内容',
      dataIndex: 'question',
      key: 'question',
      width: 300,
      render: (question) => (
        <span style={{ color: '#262626' }}>{question}</span>
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const config = {
          approved: { color: 'success', text: '已审核' },
          pending: { color: 'warning', text: '待审核' }
        };
        const c = config[status];
        return (
          <Tag color={c.color} style={{ margin: 0 }}>
            {c.text}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <>
              <Tooltip title="准许上墙">
                <Button 
                  type="primary"
                  size="small"
                  icon={<Check size={14} />}
                  onClick={() => handleApproveQuestion(record.id)}
                >
                  准许
                </Button>
              </Tooltip>
              <Tooltip title="隐藏">
                <Button 
                  type="default"
                  size="small"
                  icon={<X size={14} />}
                  onClick={() => handleHideQuestion(record.id)}
                >
                  隐藏
                </Button>
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button 
          icon={<MonitorPlay size={16} />}
          onClick={() => navigate('/activities')}
          style={{ marginBottom: 16 }}
        >
          返回活动列表
        </Button>
        
        <h1 style={{ margin: 0, marginBottom: 16 }}>会议现场管理</h1>
      </div>

      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={24}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: 24,
              borderRadius: 12,
              color: '#fff',
              marginBottom: 24
            }}>
              <h2 style={{ margin: 0, marginBottom: 16, fontSize: 24 }}>
                {meetingData.name}
              </h2>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>
                      <Calendar size={16} style={{ display: 'inline', marginRight: 8 }} />
                      <span>会议时间：</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>
                      {meetingData.time}
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>
                      <MapPin size={16} style={{ display: 'inline', marginRight: 8 }} />
                      <span>会议地点：</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>
                      {meetingData.location}
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Card>
                        <Statistic 
                          title="报名总人数"
                          value={meetingData.totalRegistrations}
                          prefix={<User size={20} style={{ color: '#1890ff' }} />}
                          valueStyle={{ color: '#1890ff', fontSize: 32 }}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <Statistic 
                          title="已签到人数"
                          value={meetingData.checkedInCount}
                          prefix={<Check size={20} style={{ color: '#52c41a' }} />}
                          valueStyle={{ color: '#52c41a', fontSize: 32 }}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 14, marginBottom: 8 }}>签到率</div>
                          <Progress 
                            type="circle"
                            percent={checkInRate}
                            strokeColor={{
                              '0%': '#ff4d4f',
                              '100%': '#52c41a',
                            }}
                            width={120}
                          />
                        </div>
                      </Card>
                    </Col>
                  </Row>
                  <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Card>
                        <Statistic 
                          title="待审核提问"
                          value={meetingData.pendingQuestions}
                          prefix={<MessageSquare size={20} style={{ color: '#faad14' }} />}
                          valueStyle={{ color: '#faad14', fontSize: 32 }}
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <div style={{ textAlign: 'right' }}>
                        <Button 
                          type="default"
                          icon={<RefreshCw size={16} />}
                          onClick={handleRefresh}
                          loading={refreshing}
                          size="large"
                        >
                          刷新数据
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: 24 }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'registration',
              label: (
                <span>
                  <User size={14} style={{ marginRight: 4 }} />
                  报名名单
                </span>
              ),
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>报名名单</h3>
                    <Space>
                      <Button 
                        type="primary"
                        icon={<Bell size={14} />}
                        onClick={handleBatchNotification}
                      >
                        批量通知
                      </Button>
                      <Button 
                        type="default"
                        icon={<Download size={14} />}
                        onClick={handleExportExcel}
                      >
                        导出 Excel
                      </Button>
                    </Space>
                  </div>
                  <Table
                    rowSelection={{
                      selectedRowKeys,
                      onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
                    }}
                    columns={registrationColumns}
                    dataSource={registrationData}
                    rowKey="id"
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <div>
                              <p style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 8 }}>
                                暂无报名数据
                              </p>
                              <p style={{ fontSize: 14, color: '#bfbfbf' }}>
                                还没有人报名参加会议
                              </p>
                            </div>
                          }
                        />
                      )
                    }}
                    pagination={{
                      total: registrationData.length,
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total) => `共 ${total} 条`,
                    }}
                    scroll={{ x: 1200 }}
                  />
                </div>
              ),
            },
            {
              key: 'checkin-wall',
              label: (
                <span>
                  <Check size={14} style={{ marginRight: 4 }} />
                  实时签到墙
                </span>
              ),
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>实时签到墙</h3>
                    <div style={{ fontSize: 14, color: '#8c8c8c' }}>
                      已签到 {checkInUsers.length} 人
                    </div>
                  </div>
                  <Row gutter={[16, 16]} style={{ minHeight: 400 }}>
                    {checkInUsers.map((user, index) => (
                      <Col xs={12} sm={8} md={6} lg={4} key={user.id}>
                        <Card
                          style={{ 
                            textAlign: 'center',
                            padding: 24,
                            transition: 'all 0.3s',
                            animation: index < 3 ? 'fadeInDown' : 'none'
                          }}
                        >
                          <Avatar 
                            size={64}
                            style={{ 
                              backgroundColor: '#52c41a',
                              marginBottom: 12
                            }}
                          >
                            {user.avatar}
                          </Avatar>
                          <div style={{ fontSize: 16, fontWeight: 600 }}>
                            {user.name}
                          </div>
                          <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                            签到时间：{user.checkInTime}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ),
            },
            {
              key: 'questions',
              label: (
                <span>
                  <MessageSquare size={14} style={{ marginRight: 4 }} />
                  现场提问审核
                </span>
              ),
              children: (
                <div>
                  <h3 style={{ margin: 0, marginBottom: 16 }}>现场提问审核</h3>
                  <Table
                    columns={questionColumns}
                    dataSource={questionData}
                    rowKey="id"
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <div>
                              <p style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 8 }}>
                                暂无提问数据
                              </p>
                              <p style={{ fontSize: 14, color: '#bfbfbf' }}>
                                还没有人提交问题
                              </p>
                            </div>
                          }
                        />
                      )
                    }}
                    pagination={{
                      total: questionData.length,
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total) => `共 ${total} 条`,
                    }}
                    scroll={{ x: 1000 }}
                  />
                </div>
              ),
            },
            {
              key: 'materials',
              label: (
                <span>
                  <Send size={14} style={{ marginRight: 4 }} />
                  资料管理
                </span>
              ),
              children: (
                <div>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>会议资料</h3>
                    <Button 
                      type="primary"
                      icon={<Send size={14} />}
                      onClick={handleShowUploadModal}
                    >
                      上传资料
                    </Button>
                  </div>
                  <Table
                    columns={[
                      {
                        title: '文件名',
                        dataIndex: 'name',
                        key: 'name',
                        width: 200,
                        render: (name) => (
                          <Space>
                            <Send size={16} style={{ color: '#1890ff' }} />
                            <span style={{ fontWeight: 500 }}>{name}</span>
                          </Space>
                        ),
                      },
                      {
                        title: '文件大小',
                        dataIndex: 'size',
                        key: 'size',
                        width: 120,
                        render: (size) => (
                          <span style={{ color: '#8c8c8c', fontSize: 13 }}>{size}</span>
                        ),
                      },
                      {
                        title: '上传时间',
                        dataIndex: 'uploadTime',
                        key: 'uploadTime',
                        width: 180,
                        render: (uploadTime) => (
                          <span style={{ color: '#8c8c8c', fontSize: 13 }}>{uploadTime}</span>
                        ),
                      },
                      {
                        title: '上传人',
                        dataIndex: 'uploader',
                        key: 'uploader',
                        width: 120,
                        render: (uploader) => (
                          <Tag color="blue" style={{ margin: 0 }}>
                            {uploader}
                          </Tag>
                        ),
                      },
                      {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        render: (_, record) => (
                          <Button 
                            type="text" 
                            danger
                            icon={<X size={14} />}
                            onClick={() => handleDeleteMaterial(record.id)}
                          >
                            删除
                          </Button>
                        ),
                      },
                    ]}
                    dataSource={materials}
                    rowKey="id"
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <div>
                              <p style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 8 }}>
                                暂无资料文件
                              </p>
                              <p style={{ fontSize: 14, color: '#bfbfbf' }}>
                                点击"上传资料"按钮添加文件
                              </p>
                            </div>
                          }
                        />
                      )
                    }}
                    pagination={{
                      total: materials.length,
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total) => `共 ${total} 个文件`,
                    }}
                    scroll={{ x: 1000 }}
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title="发送批量通知"
        open={isNotificationModalVisible}
        onOk={handleNotificationOk}
        onCancel={() => {
          setIsNotificationModalVisible(false);
          notificationForm.resetFields();
        }}
        width={600}
        okText="发送"
        cancelText="取消"
      >
        <Form
          form={notificationForm}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="title"
            label="通知标题"
            rules={[{ required: true, message: '请输入通知标题' }]}
          >
            <Input placeholder="请输入通知标题" />
          </Form.Item>

          <Form.Item
            name="content"
            label="通知内容"
            rules={[{ required: true, message: '请输入通知内容' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="请输入通知内容" 
              maxLength={200}
              showCount
            />
          </Form.Item>

          <div style={{ 
            padding: 16, 
            background: '#f5f7fa', 
            borderRadius: 8,
            marginBottom: 16
          }}>
            <p style={{ margin: 0, color: '#595959', fontSize: 13 }}>
              📱 已选择 {selectedRowKeys.length} 位用户，将通过小程序订阅消息发送通知
            </p>
          </div>
        </Form>
      </Modal>

      <Modal
        title="上传会议资料"
        open={isUploadModalVisible}
        onOk={handleUploadOk}
        onCancel={() => {
          setIsUploadModalVisible(false);
          uploadForm.resetFields();
        }}
        width={600}
        okText="上传"
        cancelText="取消"
      >
        <Form
          form={uploadForm}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="fileName"
            label="文件名"
            rules={[{ required: true, message: '请输入文件名' }]}
          >
            <Input placeholder="请输入文件名（如：会议议程.pdf）" />
          </Form.Item>

          <Form.Item
            name="file"
            label="选择文件"
            rules={[{ required: true, message: '请选择文件' }]}
          >
            <Input type="file" placeholder="请选择文件" />
          </Form.Item>

          <div style={{ 
            padding: 16, 
            background: '#f5f7fa', 
            borderRadius: 8,
            marginBottom: 16
          }}>
            <p style={{ margin: 0, color: '#595959', fontSize: 13 }}>
              📁 支持上传 PDF、PPT、Word、图片等格式，单个文件大小不超过 50MB
            </p>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default MeetingManagementPage;