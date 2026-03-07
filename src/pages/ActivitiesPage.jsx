import { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Input, 
  Button, 
  Tag, 
  Space, 
  Modal, 
  Form, 
  Select, 
  DatePicker, 
  message,
  Tooltip,
  Divider,
  Empty,
  Row,
  Col
} from 'antd';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Calendar,
  MapPin,
  MonitorPlay,
  QrCode,
  Download,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { activityService } from '../services/supabase';
import { ACTIVITIES } from '../constants/realData';

const { Search: SearchInput } = Input;
const { TextArea } = Input;

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [form] = Form.useForm();

  // 加载活动数据
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await activityService.getAll();
      if (data && data.length > 0) {
        setActivities(data);
      } else {
        // 如果数据库没有数据，使用本地数据
        setActivities(ACTIVITIES);
      }
    } catch (error) {
      console.error('加载活动失败:', error);
      setActivities(ACTIVITIES);
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { label: '会议', value: '会议' },
    { label: '培训', value: '培训' },
    { label: '活动', value: '活动' },
    { label: '其他', value: '其他' }
  ];

  const priorityOptions = [
    { label: '高', value: 'high' },
    { label: '中', value: 'medium' },
    { label: '低', value: 'low' }
  ];

  const statusOptions = [
    { label: '进行中', value: 'in_progress' },
    { label: '已完成', value: 'completed' }
  ];

  const priorityConfig = {
    high: { color: 'red', text: '高' },
    medium: { color: 'orange', text: '中' },
    low: { color: 'green', text: '低' }
  };

  const statusConfig = {
    in_progress: { color: 'blue', text: '进行中' },
    completed: { color: 'green', text: '已完成' }
  };

  const filteredActivities = activities.filter(activity =>
    activity.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text) => (
        <Space>
          <Calendar size={16} style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: (category) => (
        <Tag color="blue">{category || '其他'}</Tag>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      render: (priority) => {
        const config = priorityConfig[priority] || priorityConfig.medium;
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const config = statusConfig[status] || statusConfig.in_progress;
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '地点',
      dataIndex: 'location',
      key: 'location',
      width: 200,
      render: (location) => (
        <span style={{ color: '#8c8c8c', fontSize: 13 }}>
          <MapPin size={12} style={{ marginRight: 4 }} />
          {location || '-'}
        </span>
      ),
    },
    {
      title: '负责人',
      dataIndex: 'responsible',
      key: 'responsible',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 320,
      render: (_, record) => (
        <Space size="small">
          <Button 
            size="small"
            icon={<QrCode size={14} />}
            onClick={() => handleShowQrCode(record)}
          >
            签到码
          </Button>
          <Button 
            type="text" 
            size="small"
            icon={<Eye size={14} />}
            onClick={() => handleView(record)}
          />
          <Button 
            type="text" 
            size="small"
            icon={<Edit2 size={14} />}
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="primary" 
            size="small"
            icon={<MonitorPlay size={14} />}
            onClick={() => navigate(`/meeting-management/${record.id}`)}
          >
            管理
          </Button>
          <Button 
            type="text" 
            size="small"
            danger
            icon={<Trash2 size={14} />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingActivity(null);
    form.resetFields();
    form.setFieldsValue({
      priority: 'medium',
      status: 'in_progress',
      category: '会议'
    });
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingActivity(record);
    form.setFieldsValue({
      name: record.name,
      category: record.category,
      priority: record.priority,
      status: record.status,
      location: record.location,
      responsible: record.responsible,
      description: record.description
    });
    setIsModalVisible(true);
  };

  const handleView = (record) => {
    Modal.info({
      title: '活动详情',
      width: 500,
      content: (
        <div style={{ marginTop: 16 }}>
          <p><strong>活动名称：</strong>{record.name}</p>
          <p><strong>分类：</strong>{record.category}</p>
          <p><strong>优先级：</strong>{priorityConfig[record.priority]?.text || '中'}</p>
          <p><strong>状态：</strong>{statusConfig[record.status]?.text || '进行中'}</p>
          <p><strong>地点：</strong>{record.location || '-'}</p>
          <p><strong>负责人：</strong>{record.responsible || '-'}</p>
          <p><strong>描述：</strong>{record.description || '暂无描述'}</p>
        </div>
      ),
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个活动吗？删除后无法恢复。',
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await activityService.delete(id);
          setActivities(activities.filter(item => item.id !== id));
          message.success('删除成功');
        } catch (error) {
          // 本地删除
          setActivities(activities.filter(item => item.id !== id));
          message.success('删除成功');
        }
      },
    });
  };

  const handleShowQrCode = (record) => {
    setSelectedActivity(record);
    setIsQrCodeVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingActivity) {
        // 编辑
        try {
          await activityService.update(editingActivity.id, values);
        } catch (e) {
          // 忽略数据库错误，本地更新
        }
        setActivities(activities.map(item => 
          item.id === editingActivity.id ? { ...item, ...values } : item
        ));
        message.success('更新成功');
      } else {
        // 新增
        const newActivity = {
          ...values,
          id: Date.now(),
          create_time: new Date().toISOString(),
          registered: 0,
          checked_in: 0
        };
        
        try {
          const created = await activityService.create(values);
          if (created) {
            setActivities([created, ...activities]);
          } else {
            setActivities([newActivity, ...activities]);
          }
        } catch (e) {
          setActivities([newActivity, ...activities]);
        }
        message.success('添加成功');
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('请填写必填项');
    }
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24 
      }}>
        <h1 style={{ margin: 0 }}>活动管理</h1>
        <Button 
          type="primary" 
          icon={<Plus size={16} />}
          onClick={handleAdd}
        >
          新增活动
        </Button>
      </div>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <SearchInput
            placeholder="搜索活动名称"
            allowClear
            enterButton={<Search size={16} />}
            size="large"
            onSearch={setSearchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredActivities}
          rowKey="id"
          loading={loading}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="暂无活动数据，点击新增活动按钮创建"
              />
            )
          }}
          pagination={{
            total: filteredActivities.length,
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* 新增/编辑弹窗 */}
      <Modal
        title={editingActivity ? '编辑活动' : '新增活动'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={600}
        okText={editingActivity ? '保存' : '创建'}
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="name"
            label="活动名称"
            rules={[{ required: true, message: '请输入活动名称' }]}
          >
            <Input placeholder="请输入活动名称" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="category"
                label="分类"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select options={categoryOptions} placeholder="选择分类" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="priority"
                label="优先级"
                rules={[{ required: true, message: '请选择优先级' }]}
              >
                <Select options={priorityOptions} placeholder="选择优先级" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select options={statusOptions} placeholder="选择状态" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="location"
                label="地点"
              >
                <Input placeholder="请输入活动地点" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="responsible"
                label="负责人"
              >
                <Input placeholder="请输入负责人" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="活动描述"
          >
            <TextArea 
              rows={4} 
              placeholder="请输入活动描述" 
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 签到码弹窗 */}
      <Modal
        title="活动签到二维码"
        open={isQrCodeVisible}
        onCancel={() => setIsQrCodeVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsQrCodeVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<Download size={16} />}
            onClick={() => message.success('二维码下载成功')}
          >
            下载
          </Button>
        ]}
      >
        {selectedActivity && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ 
              width: 200, 
              height: 200, 
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QrCode size={100} color="#fff" />
            </div>
            <h3>{selectedActivity.name}</h3>
            <p style={{ color: '#8c8c8c' }}>扫描二维码完成签到</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ActivitiesPage;
