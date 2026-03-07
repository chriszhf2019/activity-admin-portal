import { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Modal, 
  Form, 
  Input, 
  InputNumber,
  message,
  Avatar,
  Statistic,
  Divider,
  List,
  Switch,
  Empty,
  Upload,
  Select
} from 'antd';

const { TextArea } = Input;
import { 
  Gift, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle,
  XCircle,
  Package,
  Star,
  Settings,
  Upload as UploadIcon,
  TrendingUp,
  Clock,
  User,
  Phone
} from 'lucide-react';

const PointsMallPage = () => {
  const [activeTab, setActiveTab] = useState('rules');
  
  const [pointRules, setPointRules] = useState([
    { id: 1, action: '现场签到', points: 10, description: '会议现场扫码签到获得积分', status: true },
    { id: 2, action: '提问被采纳', points: 20, description: '提问被主持人采纳上墙获得积分', status: true },
    { id: 3, action: '提交问卷', points: 30, description: '完成会议反馈问卷获得积分', status: true },
    { id: 4, action: '完善资料', points: 50, description: '完善个人资料信息获得积分', status: true },
    { id: 5, action: '中奖奖励', points: 100, description: '现场抽奖中奖获得积分', status: false }
  ]);

  const [gifts, setGifts] = useState([
    { 
      id: 1, 
      name: '精美雨伞', 
      points: 500, 
      stock: 50, 
      redeemed: 12,
      image: '🌂',
      description: '优质材质，防雨防晒'
    },
    { 
      id: 2, 
      name: '定制笔记本', 
      points: 800, 
      stock: 30, 
      redeemed: 8,
      image: '📓',
      description: '会议定制，高端商务'
    },
    { 
      id: 3, 
      name: '保温杯', 
      points: 300, 
      stock: 100, 
      redeemed: 25,
      image: '☕',
      description: '304不锈钢，保冷保热'
    },
    { 
      id: 4, 
      name: '充电宝', 
      points: 600, 
      stock: 25, 
      redeemed: 15,
      image: '🔋',
      description: '10000mAh，快速充电'
    },
    { 
      id: 5, 
      name: '蓝牙耳机', 
      points: 1000, 
      stock: 15, 
      redeemed: 5,
      image: '🎧',
      description: '降噪功能，音质清晰'
    },
    { 
      id: 6, 
      name: '商务背包', 
      points: 1500, 
      stock: 10, 
      redeemed: 3,
      image: '🎒',
      description: '防水耐磨，多层收纳'
    }
  ]);

  const [redeemRecords, setRedeemRecords] = useState([
    { 
      id: 1, 
      userName: '张三', 
      phone: '138****1234',
      company: '科技有限公司',
      giftName: '精美雨伞', 
      points: 500, 
      time: '2024-03-05 10:30:00', 
      status: 'pending' 
    },
    { 
      id: 2, 
      userName: '李四', 
      phone: '139****5678',
      company: '贸易公司',
      giftName: '定制笔记本', 
      points: 800, 
      time: '2024-03-05 11:20:00', 
      status: 'completed' 
    },
    { 
      id: 3, 
      userName: '王五', 
      phone: '137****9012',
      company: '实业集团',
      giftName: '保温杯', 
      points: 300, 
      time: '2024-03-05 14:15:00', 
      status: 'pending' 
    },
    { 
      id: 4, 
      userName: '赵六', 
      phone: '136****3456',
      company: '网络科技',
      giftName: '充电宝', 
      points: 600, 
      time: '2024-03-05 15:30:00', 
      status: 'rejected',
      rejectReason: '库存不足'
    },
    { 
      id: 5, 
      userName: '孙七', 
      phone: '158****7890',
      company: '数据服务',
      giftName: '蓝牙耳机', 
      points: 1000, 
      time: '2024-03-05 16:45:00', 
      status: 'pending' 
    }
  ]);

  const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
  const [isGiftModalVisible, setIsGiftModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [editingGift, setEditingGift] = useState(null);
  const [rejectingRecord, setRejectingRecord] = useState(null);
  const [ruleForm] = Form.useForm();
  const [giftForm] = Form.useForm();
  const [rejectForm] = Form.useForm();

  const handleEditRule = (record) => {
    setEditingRule(record);
    ruleForm.setFieldsValue(record);
    setIsRuleModalVisible(true);
  };

  const handleAddRule = () => {
    setEditingRule(null);
    ruleForm.resetFields();
    setIsRuleModalVisible(true);
  };

  const handleRuleOk = () => {
    ruleForm.validateFields().then((values) => {
      if (editingRule) {
        setPointRules(pointRules.map(rule => 
          rule.id === editingRule.id ? { ...rule, ...values } : rule
        ));
        message.success('规则更新成功');
      } else {
        setPointRules([...pointRules, { ...values, id: Date.now(), status: true }]);
        message.success('规则添加成功');
      }
      setIsRuleModalVisible(false);
      ruleForm.resetFields();
    });
  };

  const handleToggleRule = (id, status) => {
    setPointRules(pointRules.map(rule => 
      rule.id === id ? { ...rule, status: !status } : rule
    ));
    message.success(status ? '规则已关闭' : '规则已开启');
  };

  const handleDeleteRule = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个积分规则吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setPointRules(pointRules.filter(rule => rule.id !== id));
        message.success('删除成功');
      },
    });
  };

  const handleEditGift = (record) => {
    setEditingGift(record);
    giftForm.setFieldsValue(record);
    setIsGiftModalVisible(true);
  };

  const handleAddGift = () => {
    setEditingGift(null);
    giftForm.resetFields();
    setIsGiftModalVisible(true);
  };

  const handleGiftOk = () => {
    giftForm.validateFields().then((values) => {
      if (editingGift) {
        setGifts(gifts.map(gift => 
          gift.id === editingGift.id ? { ...gift, ...values } : gift
        ));
        message.success('礼品更新成功');
      } else {
        setGifts([...gifts, { ...values, id: Date.now(), redeemed: 0 }]);
        message.success('礼品添加成功');
      }
      setIsGiftModalVisible(false);
      giftForm.resetFields();
    });
  };

  const handleDeleteGift = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个礼品吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setGifts(gifts.filter(gift => gift.id !== id));
        message.success('删除成功');
      },
    });
  };

  const handleConfirmRedeem = (record) => {
    Modal.confirm({
      title: '确认发放',
      content: (
        <div>
          <p>确定要为以下用户发放礼品吗？</p>
          <p><strong>用户：</strong>{record.userName}</p>
          <p><strong>礼品：</strong>{record.giftName}</p>
          <p><strong>消耗积分：</strong>{record.points}</p>
        </div>
      ),
      okText: '确定发放',
      cancelText: '取消',
      onOk: () => {
        setRedeemRecords(redeemRecords.map(r => 
          r.id === record.id ? { ...r, status: 'completed' } : r
        ));
        
        setGifts(gifts.map(gift => 
          gift.name === record.giftName ? { ...gift, stock: gift.stock - 1, redeemed: gift.redeemed + 1 } : gift
        ));
        
        message.success('礼品发放成功');
      },
    });
  };

  const handleRejectRedeem = (record) => {
    setRejectingRecord(record);
    rejectForm.resetFields();
    setIsRejectModalVisible(true);
  };

  const handleRejectOk = () => {
    rejectForm.validateFields().then((values) => {
      setRedeemRecords(redeemRecords.map(r => 
        r.id === rejectingRecord.id ? { ...r, status: 'rejected', rejectReason: values.reason } : r
      ));
      
      message.success('已拒绝兑换，积分已返还');
      setIsRejectModalVisible(false);
      rejectForm.resetFields();
    });
  };

  const ruleColumns = [
    {
      title: '行为名称',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (action) => (
        <Tag color="blue" style={{ margin: 0, fontSize: 14, padding: '4px 12px' }}>
          {action}
        </Tag>
      ),
    },
    {
      title: '奖励分值',
      dataIndex: 'points',
      key: 'points',
      width: 120,
      render: (points) => (
        <span style={{ fontWeight: 600, color: '#52c41a', fontSize: 16 }}>
          +{points}
        </span>
      ),
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (description) => (
        <span style={{ color: '#8c8c8c' }}>{description}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status, record) => (
        <Switch 
          checked={status}
          onChange={() => handleToggleRule(record.id, status)}
          checkedChildren="开启"
          unCheckedChildren="关闭"
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            size="small"
            icon={<Edit2 size={14} />}
            onClick={() => handleEditRule(record)}
          >
            编辑
          </Button>
          <Button 
            type="text" 
            size="small"
            danger
            icon={<Trash2 size={14} />}
            onClick={() => handleDeleteRule(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const redeemColumns = [
    {
      title: '用户信息',
      key: 'userInfo',
      width: 200,
      render: (_, record) => (
        <div>
          <Space style={{ marginBottom: 4 }}>
            <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
              {record.userName[0]}
            </Avatar>
            <span style={{ fontWeight: 500 }}>{record.userName}</span>
          </Space>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            <Phone size={12} style={{ display: 'inline', marginRight: 4 }} />
            {record.phone}
          </div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            {record.company}
          </div>
        </div>
      ),
    },
    {
      title: '兑换礼品',
      dataIndex: 'giftName',
      key: 'giftName',
      width: 150,
      render: (giftName) => (
        <span style={{ fontWeight: 500 }}>{giftName}</span>
      ),
    },
    {
      title: '消耗积分',
      dataIndex: 'points',
      key: 'points',
      width: 120,
      render: (points) => (
        <span style={{ fontWeight: 600, color: '#ff4d4f', fontSize: 16 }}>
          -{points}
        </span>
      ),
    },
    {
      title: '兑换时间',
      dataIndex: 'time',
      key: 'time',
      width: 180,
      render: (time) => (
        <span style={{ color: '#8c8c8c', fontSize: 13 }}>
          <Clock size={14} style={{ display: 'inline', marginRight: 4 }} />
          {time}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const config = {
          pending: { color: 'orange', text: '待领取' },
          completed: { color: 'green', text: '已发放' },
          rejected: { color: 'red', text: '已拒绝' }
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
        record.status === 'pending' ? (
          <Space size="small">
            <Button 
              type="primary" 
              size="small"
              icon={<CheckCircle size={14} />}
              onClick={() => handleConfirmRedeem(record)}
            >
              确认发放
            </Button>
            <Button 
              type="default" 
              size="small"
              danger
              icon={<XCircle size={14} />}
              onClick={() => handleRejectRedeem(record)}
            >
              拒绝
            </Button>
          </Space>
        ) : record.status === 'rejected' ? (
          <span style={{ color: '#8c8c8c', fontSize: 12 }}>
            原因：{record.rejectReason}
          </span>
        ) : (
          <Tag color="green">已完成</Tag>
        )
      ),
    },
  ];

  const todayRedeemedPoints = redeemRecords
    .filter(r => r.status === 'completed' && r.time.startsWith('2024-03-05'))
    .reduce((sum, r) => sum + r.points, 0);

  const pendingRedeems = redeemRecords.filter(r => r.status === 'pending').length;

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>积分商城与激励规则</h1>
      
      <Card 
        tabList={[
          { key: 'rules', tab: '积分规则设置' },
          { key: 'gifts', tab: '礼品库存管理' },
          { key: 'redeem', tab: '兑换记录处理' }
        ]}
        activeTabKey={activeTab}
        onTabChange={setActiveTab}
      >
        {activeTab === 'rules' && (
          <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="primary" 
                icon={<Plus size={16} />}
                onClick={handleAddRule}
              >
                添加规则
              </Button>
            </div>

            <Table
              columns={ruleColumns}
              dataSource={pointRules}
              rowKey="id"
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <div>
                        <p style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 8 }}>
                          暂无积分规则
                        </p>
                        <p style={{ fontSize: 14, color: '#bfbfbf' }}>
                          点击"添加规则"按钮创建第一个规则
                        </p>
                      </div>
                    }
                  />
                )
              }}
              pagination={false}
              scroll={{ x: 1000 }}
            />
          </div>
        )}

        {activeTab === 'gifts' && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="礼品总数" 
                    value={gifts.length} 
                    prefix={<Package size={20} style={{ color: '#1890ff' }} />}
                    valueStyle={{ color: '#1890ff', fontSize: 24 }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="总库存" 
                    value={gifts.reduce((sum, gift) => sum + gift.stock, 0)} 
                    prefix={<Star size={20} style={{ color: '#faad14' }} />}
                    valueStyle={{ color: '#faad14', fontSize: 24 }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="低库存预警" 
                    value={gifts.filter(g => g.stock < 20).length} 
                    prefix={<Settings size={20} style={{ color: '#ff4d4f' }} />}
                    valueStyle={{ color: '#ff4d4f', fontSize: 24 }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="已兑换" 
                    value={gifts.reduce((sum, gift) => sum + gift.redeemed, 0)} 
                    prefix={<Gift size={20} style={{ color: '#52c41a' }} />}
                    valueStyle={{ color: '#52c41a', fontSize: 24 }}
                  />
                </Card>
              </Col>
            </Row>

            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="primary" 
                icon={<Plus size={16} />}
                onClick={handleAddGift}
              >
                上架礼品
              </Button>
            </div>

            <Row gutter={[16, 16]}>
              {gifts.map((gift) => (
                <Col xs={24} sm={12} md={8} lg={6} key={gift.id}>
                  <Card
                    hoverable
                    style={{ height: '100%' }}
                    cover={
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '40px 0', 
                        fontSize: 80,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}>
                        {gift.image}
                      </div>
                    }
                    actions={[
                      <Button 
                        type="text" 
                        icon={<Edit2 size={16} />}
                        onClick={() => handleEditGift(gift)}
                      >
                        编辑
                      </Button>,
                      <Button 
                        type="text" 
                        danger
                        icon={<Trash2 size={16} />}
                        onClick={() => handleDeleteGift(gift.id)}
                      >
                        删除
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div style={{ fontSize: 18, fontWeight: 600 }}>
                          {gift.name}
                        </div>
                      }
                      description={
                        <div>
                          <div style={{ marginBottom: 12 }}>
                            <span style={{ 
                              fontWeight: 600, 
                              color: '#faad14', 
                              fontSize: 20 
                            }}>
                              {gift.points}
                            </span>
                            <span style={{ color: '#8c8c8c', marginLeft: 4 }}>积分</span>
                          </div>
                          <div style={{ marginBottom: 8 }}>
                            <span style={{ color: '#8c8c8c' }}>库存：</span>
                            <span style={{ 
                              fontWeight: 600,
                              color: gift.stock < 20 ? '#ff4d4f' : gift.stock < 50 ? '#faad14' : '#52c41a'
                            }}>
                              {gift.stock}
                            </span>
                          </div>
                          <div style={{ marginBottom: 8 }}>
                            <span style={{ color: '#8c8c8c' }}>已兑换：</span>
                            <span style={{ fontWeight: 600, color: '#52c41a' }}>
                              {gift.redeemed}
                            </span>
                          </div>
                          <div style={{ color: '#8c8c8c', fontSize: 12 }}>
                            {gift.description}
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {activeTab === 'redeem' && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Card>
                  <Statistic 
                    title="今日已兑换分值" 
                    value={todayRedeemedPoints} 
                    prefix={<TrendingUp size={20} style={{ color: '#1890ff' }} />}
                    valueStyle={{ color: '#1890ff', fontSize: 28 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic 
                    title="待处理核销单" 
                    value={pendingRedeems} 
                    prefix={<Clock size={20} style={{ color: '#faad14' }} />}
                    valueStyle={{ color: '#faad14', fontSize: 28 }}
                  />
                </Card>
              </Col>
            </Row>

            <Table
              columns={redeemColumns}
              dataSource={redeemRecords}
              rowKey="id"
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <div>
                        <p style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 8 }}>
                          暂无兑换记录
                        </p>
                        <p style={{ fontSize: 14, color: '#bfbfbf' }}>
                          还没有人兑换礼品
                        </p>
                      </div>
                    }
                  />
                )
              }}
              pagination={{
                total: redeemRecords.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条`,
              }}
              scroll={{ x: 1200 }}
            />
          </div>
        )}
      </Card>

      <Modal
        title={editingRule ? '编辑积分规则' : '添加积分规则'}
        open={isRuleModalVisible}
        onOk={handleRuleOk}
        onCancel={() => {
          setIsRuleModalVisible(false);
          ruleForm.resetFields();
        }}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={ruleForm}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="action"
            label="行为名称"
            rules={[{ required: true, message: '请输入行为名称' }]}
          >
            <Select placeholder="请选择或输入行为名称">
              <Select.Option value="现场签到">现场签到</Select.Option>
              <Select.Option value="提问被采纳">提问被采纳</Select.Option>
              <Select.Option value="提交问卷">提交问卷</Select.Option>
              <Select.Option value="完善资料">完善资料</Select.Option>
              <Select.Option value="中奖奖励">中奖奖励</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="points"
            label="奖励分值"
            rules={[{ required: true, message: '请输入奖励分值' }]}
          >
            <InputNumber 
              placeholder="请输入奖励分值" 
              min={1}
              max={1000}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="规则说明"
            rules={[{ required: true, message: '请输入规则说明' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="请输入规则说明" 
              maxLength={200}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingGift ? '编辑礼品' : '上架礼品'}
        open={isGiftModalVisible}
        onOk={handleGiftOk}
        onCancel={() => {
          setIsGiftModalVisible(false);
          giftForm.resetFields();
        }}
        width={700}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={giftForm}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="礼品名称"
                rules={[{ required: true, message: '请输入礼品名称' }]}
              >
                <Input placeholder="请输入礼品名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="礼品图标"
                rules={[{ required: true, message: '请输入礼品图标' }]}
              >
                <Input placeholder="请输入礼品图标（Emoji）" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="points"
                label="所需积分"
                rules={[{ required: true, message: '请输入所需积分' }]}
              >
                <InputNumber 
                  placeholder="请输入所需积分" 
                  min={1}
                  max={10000}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="stock"
                label="库存数量"
                rules={[{ required: true, message: '请输入库存数量' }]}
              >
                <InputNumber 
                  placeholder="请输入库存数量" 
                  min={1}
                  max={1000}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="礼品描述"
            rules={[{ required: true, message: '请输入礼品描述' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="请输入礼品描述" 
              maxLength={200}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="拒绝兑换"
        open={isRejectModalVisible}
        onOk={handleRejectOk}
        onCancel={() => {
          setIsRejectModalVisible(false);
          rejectForm.resetFields();
        }}
        width={500}
        okText="确定拒绝"
        cancelText="取消"
      >
        <Form
          form={rejectForm}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="reason"
            label="拒绝原因"
            rules={[{ required: true, message: '请输入拒绝原因' }]}
          >
            <Select placeholder="请选择拒绝原因">
              <Select.Option value="库存不足">库存不足</Select.Option>
              <Select.Option value="礼品已下架">礼品已下架</Select.Option>
              <Select.Option value="用户信息异常">用户信息异常</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PointsMallPage;