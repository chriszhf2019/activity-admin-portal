import { useState, useEffect } from 'react';
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
  Switch,
  Empty,
  Select
} from 'antd';
import { 
  Gift, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle,
  XCircle,
  Package,
  TrendingUp,
  Clock,
  Phone
} from 'lucide-react';
import { giftService, redeemService, pointRuleService } from '../services/supabase';
import { GIFTS, REDEEM_RECORDS, POINT_RULES } from '../constants/realData';

const { TextArea } = Input;

const PointsMallPage = () => {
  const [activeTab, setActiveTab] = useState('rules');
  const [pointRules, setPointRules] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [redeemRecords, setRedeemRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
  const [isGiftModalVisible, setIsGiftModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [editingGift, setEditingGift] = useState(null);
  const [rejectingRecord, setRejectingRecord] = useState(null);
  const [ruleForm] = Form.useForm();
  const [giftForm] = Form.useForm();
  const [rejectForm] = Form.useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rulesData, giftsData, recordsData] = await Promise.all([
        pointRuleService.getAll(),
        giftService.getAll(),
        redeemService.getAll()
      ]);
      setPointRules(rulesData?.length ? rulesData : POINT_RULES);
      setGifts(giftsData?.length ? giftsData : GIFTS);
      setRedeemRecords(recordsData?.length ? recordsData : REDEEM_RECORDS);
    } catch (e) {
      setPointRules(POINT_RULES);
      setGifts(GIFTS);
      setRedeemRecords(REDEEM_RECORDS);
    } finally {
      setLoading(false);
    }
  };

  // 积分规则操作
  const handleAddRule = () => {
    setEditingRule(null);
    ruleForm.resetFields();
    setIsRuleModalVisible(true);
  };

  const handleEditRule = (record) => {
    setEditingRule(record);
    ruleForm.setFieldsValue(record);
    setIsRuleModalVisible(true);
  };

  const handleRuleOk = async () => {
    const values = await ruleForm.validateFields();
    if (editingRule) {
      try { await pointRuleService.update(editingRule.id, values); } catch (e) {}
      setPointRules(pointRules.map(r => r.id === editingRule.id ? { ...r, ...values } : r));
      message.success('更新成功');
    } else {
      const newRule = { ...values, id: Date.now(), status: true };
      try { await pointRuleService.create(values); } catch (e) {}
      setPointRules([...pointRules, newRule]);
      message.success('添加成功');
    }
    setIsRuleModalVisible(false);
  };

  const handleToggleRule = async (id, status) => {
    try { await pointRuleService.toggleStatus(id, !status); } catch (e) {}
    setPointRules(pointRules.map(r => r.id === id ? { ...r, status: !status } : r));
    message.success(status ? '已关闭' : '已开启');
  };

  const handleDeleteRule = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个规则吗？',
      onOk: async () => {
        try { await pointRuleService.delete(id); } catch (e) {}
        setPointRules(pointRules.filter(r => r.id !== id));
        message.success('删除成功');
      },
    });
  };

  // 礼品操作
  const handleAddGift = () => {
    setEditingGift(null);
    giftForm.resetFields();
    setIsGiftModalVisible(true);
  };

  const handleEditGift = (record) => {
    setEditingGift(record);
    giftForm.setFieldsValue(record);
    setIsGiftModalVisible(true);
  };

  const handleGiftOk = async () => {
    const values = await giftForm.validateFields();
    if (editingGift) {
      try { await giftService.update(editingGift.id, values); } catch (e) {}
      setGifts(gifts.map(g => g.id === editingGift.id ? { ...g, ...values } : g));
      message.success('更新成功');
    } else {
      const newGift = { ...values, id: Date.now(), redeemed: 0 };
      try { await giftService.create(values); } catch (e) {}
      setGifts([...gifts, newGift]);
      message.success('添加成功');
    }
    setIsGiftModalVisible(false);
  };

  const handleDeleteGift = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个礼品吗？',
      onOk: async () => {
        try { await giftService.delete(id); } catch (e) {}
        setGifts(gifts.filter(g => g.id !== id));
        message.success('删除成功');
      },
    });
  };

  // 兑换操作
  const handleConfirmRedeem = (record) => {
    Modal.confirm({
      title: '确认发放',
      content: `确定要为 ${record.user_name || record.userName} 发放 ${record.gift_name || record.giftName} 吗？`,
      onOk: async () => {
        try { await redeemService.updateStatus(record.id, 'completed'); } catch (e) {}
        setRedeemRecords(redeemRecords.map(r => r.id === record.id ? { ...r, status: 'completed' } : r));
        message.success('发放成功');
      },
    });
  };

  const handleRejectRedeem = (record) => {
    setRejectingRecord(record);
    rejectForm.resetFields();
    setIsRejectModalVisible(true);
  };

  const handleRejectOk = async () => {
    const values = await rejectForm.validateFields();
    try { await redeemService.updateStatus(rejectingRecord.id, 'rejected', values.reason); } catch (e) {}
    setRedeemRecords(redeemRecords.map(r => 
      r.id === rejectingRecord.id ? { ...r, status: 'rejected', reject_reason: values.reason } : r
    ));
    message.success('已拒绝，积分已返还');
    setIsRejectModalVisible(false);
  };

  const ruleColumns = [
    { title: '行为', dataIndex: 'action', render: (t) => <Tag color="blue">{t}</Tag> },
    { title: '积分', dataIndex: 'points', render: (p) => <span style={{ color: '#52c41a', fontWeight: 600 }}>+{p}</span> },
    { title: '说明', dataIndex: 'description' },
    { title: '状态', dataIndex: 'status', render: (s, r) => <Switch checked={s} onChange={() => handleToggleRule(r.id, s)} /> },
    { 
      title: '操作', 
      render: (_, r) => (
        <Space>
          <Button type="text" size="small" icon={<Edit2 size={14} />} onClick={() => handleEditRule(r)}>编辑</Button>
          <Button type="text" size="small" danger icon={<Trash2 size={14} />} onClick={() => handleDeleteRule(r.id)}>删除</Button>
        </Space>
      )
    },
  ];

  const redeemColumns = [
    {
      title: '用户',
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 500 }}>{r.user_name || r.userName}</div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{r.phone} · {r.company}</div>
        </div>
      ),
    },
    { title: '礼品', dataIndex: 'gift_name', render: (v, r) => v || r.giftName },
    { title: '积分', dataIndex: 'points', render: (p) => <span style={{ color: '#ff4d4f' }}>-{p}</span> },
    { title: '时间', dataIndex: 'time' },
    { 
      title: '状态', 
      dataIndex: 'status',
      render: (s) => {
        const config = { pending: { color: 'orange', text: '待领取' }, completed: { color: 'green', text: '已发放' }, rejected: { color: 'red', text: '已拒绝' } };
        const c = config[s] || config.pending;
        return <Tag color={c.color}>{c.text}</Tag>;
      }
    },
    {
      title: '操作',
      render: (_, r) => r.status === 'pending' ? (
        <Space>
          <Button type="primary" size="small" icon={<CheckCircle size={12} />} onClick={() => handleConfirmRedeem(r)}>发放</Button>
          <Button size="small" danger icon={<XCircle size={12} />} onClick={() => handleRejectRedeem(r)}>拒绝</Button>
        </Space>
      ) : r.status === 'rejected' ? (
        <span style={{ color: '#8c8c8c', fontSize: 12 }}>原因：{r.reject_reason || r.rejectReason}</span>
      ) : <Tag color="green">已完成</Tag>
    },
  ];

  const pendingCount = redeemRecords.filter(r => r.status === 'pending').length;

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>积分商城</h1>
      
      <Card
        tabList={[
          { key: 'rules', tab: '积分规则' },
          { key: 'gifts', tab: '礼品管理' },
          { key: 'redeem', tab: `兑换记录 (${pendingCount})` }
        ]}
        activeTabKey={activeTab}
        onTabChange={setActiveTab}
      >
        {activeTab === 'rules' && (
          <>
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button type="primary" icon={<Plus size={14} />} onClick={handleAddRule}>添加规则</Button>
            </div>
            <Table columns={ruleColumns} dataSource={pointRules} rowKey="id" loading={loading} pagination={false} />
          </>
        )}

        {activeTab === 'gifts' && (
          <>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={6}><Card><Statistic title="礼品总数" value={gifts.length} prefix={<Package size={16} />} /></Card></Col>
              <Col span={6}><Card><Statistic title="总库存" value={gifts.reduce((s, g) => s + (g.stock || 0), 0)} /></Card></Col>
              <Col span={6}><Card><Statistic title="已兑换" value={gifts.reduce((s, g) => s + (g.redeemed || 0), 0)} valueStyle={{ color: '#52c41a' }} /></Card></Col>
              <Col span={6}><Card><Statistic title="低库存" value={gifts.filter(g => g.stock < 20).length} valueStyle={{ color: '#ff4d4f' }} /></Card></Col>
            </Row>
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button type="primary" icon={<Plus size={14} />} onClick={handleAddGift}>上架礼品</Button>
            </div>
            <Row gutter={16}>
              {gifts.map(gift => (
                <Col xs={24} sm={12} md={8} lg={6} key={gift.id} style={{ marginBottom: 16 }}>
                  <Card
                    cover={<div style={{ textAlign: 'center', fontSize: 60, padding: 30, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>{gift.image}</div>}
                    actions={[
                      <Button type="text" icon={<Edit2 size={14} />} onClick={() => handleEditGift(gift)}>编辑</Button>,
                      <Button type="text" danger icon={<Trash2 size={14} />} onClick={() => handleDeleteGift(gift.id)}>删除</Button>
                    ]}
                  >
                    <Card.Meta
                      title={gift.name}
                      description={
                        <div>
                          <div><span style={{ color: '#faad14', fontSize: 18, fontWeight: 600 }}>{gift.points}</span> 积分</div>
                          <div>库存：<span style={{ color: gift.stock < 20 ? '#ff4d4f' : '#52c41a' }}>{gift.stock}</span> | 已兑：{gift.redeemed}</div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {activeTab === 'redeem' && (
          <>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={12}><Card><Statistic title="待处理" value={pendingCount} prefix={<Clock size={16} />} valueStyle={{ color: '#faad14' }} /></Card></Col>
              <Col span={12}><Card><Statistic title="今日已发放" value={redeemRecords.filter(r => r.status === 'completed').length} prefix={<TrendingUp size={16} />} valueStyle={{ color: '#52c41a' }} /></Card></Col>
            </Row>
            <Table columns={redeemColumns} dataSource={redeemRecords} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
          </>
        )}
      </Card>

      {/* 规则弹窗 */}
      <Modal title={editingRule ? '编辑规则' : '添加规则'} open={isRuleModalVisible} onOk={handleRuleOk} onCancel={() => setIsRuleModalVisible(false)}>
        <Form form={ruleForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="action" label="行为名称" rules={[{ required: true }]}>
            <Input placeholder="如：会议签到" />
          </Form.Item>
          <Form.Item name="points" label="奖励积分" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="description" label="说明">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 礼品弹窗 */}
      <Modal title={editingGift ? '编辑礼品' : '上架礼品'} open={isGiftModalVisible} onOk={handleGiftOk} onCancel={() => setIsGiftModalVisible(false)}>
        <Form form={giftForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}><Form.Item name="name" label="礼品名称" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="image" label="图标" rules={[{ required: true }]}><Input placeholder="emoji" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="points" label="所需积分" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="stock" label="库存" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.Item name="description" label="描述"><TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>

      {/* 拒绝弹窗 */}
      <Modal title="拒绝兑换" open={isRejectModalVisible} onOk={handleRejectOk} onCancel={() => setIsRejectModalVisible(false)}>
        <Form form={rejectForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="reason" label="拒绝原因" rules={[{ required: true }]}>
            <Select options={[
              { label: '库存不足', value: '库存不足' },
              { label: '礼品已下架', value: '礼品已下架' },
              { label: '用户信息异常', value: '用户信息异常' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PointsMallPage;
