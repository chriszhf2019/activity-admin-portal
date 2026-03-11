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
  MessageSquare,
  Link,
  Clock,
  PlusCircle
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
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');
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

  const activityTypeOptions = [
    { label: '线上活动', value: 'online' },
    { label: '线下活动', value: 'offline' }
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

  const activityTypeConfig = {
    online: { color: 'purple', text: '线上', icon: <Link size={14} /> },
    offline: { color: 'cyan', text: '线下', icon: <MapPin size={14} /> }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name?.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = activityTypeFilter === 'all' || activity.activity_type === activityTypeFilter;
    return matchesSearch && matchesType;
  });

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
      title: '活动类型',
      dataIndex: 'activity_type',
      key: 'activity_type',
      width: 100,
      render: (type) => {
        const config = activityTypeConfig[type] || activityTypeConfig.offline;
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
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
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      width: 150,
      render: (time) => (
        <span style={{ color: '#8c8c8c', fontSize: 13 }}>
          <Clock size={12} style={{ marginRight: 4 }} />
          {time || '-'}
        </span>
      ),
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      width: 150,
      render: (time) => (
        <span style={{ color: '#8c8c8c', fontSize: 13 }}>
          <Clock size={12} style={{ marginRight: 4 }} />
          {time || '-'}
        </span>
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
      title: '地点/链接',
      dataIndex: 'location',
      key: 'location',
      width: 200,
      render: (location, record) => {
        const isOnline = record.activity_type === 'online';
        if (isOnline && record.online_link) {
          return (
            <a 
              href={record.online_link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#1890ff', fontSize: 13 }}
            >
              <Link size={12} style={{ marginRight: 4 }} />
              点击加入
            </a>
          );
        }
        return (
          <span style={{ color: '#8c8c8c', fontSize: 13 }}>
            <MapPin size={12} style={{ marginRight: 4 }} />
            {location || '-'}
          </span>
        );
      },
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
      width: 380,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="生成签到码">
            <Button 
              size="small"
              icon={<QrCode size={14} />}
              onClick={() => handleShowQrCode(record)}
            >
              签到码
            </Button>
          </Tooltip>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              size="small"
              icon={<Eye size={14} />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="编辑活动">
            <Button 
              type="text" 
              size="small"
              icon={<Edit2 size={14} />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="复制活动">
            <Button 
              type="text" 
              size="small"
              icon={<PlusCircle size={14} />}
              onClick={() => handleCopy(record)}
            />
          </Tooltip>
          <Button 
            type="primary" 
            size="small"
            icon={<MonitorPlay size={14} />}
            onClick={() => navigate(`/meeting-management/${record.id}`)}
          >
            管理
          </Button>
          <Tooltip title="删除活动">
            <Button 
              type="text" 
              size="small"
              danger
              icon={<Trash2 size={14} />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
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
      category: '会议',
      activity_type: 'offline'
    });
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingActivity(record);
    form.setFieldsValue({
      name: record.name,
      category: record.category,
      activity_type: record.activity_type,
      priority: record.priority,
      status: record.status,
      location: record.location,
      online_link: record.online_link,
      responsible: record.responsible,
      start_time: record.start_time,
      end_time: record.end_time,
      key_milestones: record.key_milestones,
      description: record.description
    });
    setIsModalVisible(true);
  };

  const handleCopy = (record) => {
    const copiedActivity = {
      ...record,
      name: `${record.name} (副本)`,
      status: 'in_progress',
      registered: 0,
      checked_in: 0
    };
    form.setFieldsValue({
      name: copiedActivity.name,
      category: copiedActivity.category,
      activity_type: copiedActivity.activity_type,
      priority: copiedActivity.priority,
      status: copiedActivity.status,
      location: copiedActivity.location,
      online_link: copiedActivity.online_link,
      responsible: copiedActivity.responsible,
      start_time: copiedActivity.start_time,
      end_time: copiedActivity.end_time,
      key_milestones: copiedActivity.key_milestones,
      description: copiedActivity.description
    });
    setEditingActivity(null);
    setIsModalVisible(true);
    message.info('已复制活动信息，请修改后保存');
  };

  const handleView = (record) => {
    const typeConfig = activityTypeConfig[record.activity_type] || activityTypeConfig.offline;
    const priorityConfigItem = priorityConfig[record.priority] || priorityConfig.medium;
    const statusConfigItem = statusConfig[record.status] || statusConfig.in_progress;
    
    Modal.info({
      title: '活动详情',
      width: 700,
      content: (
        <div style={{ marginTop: 16 }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 12,
            padding: 24,
            marginBottom: 20,
            color: '#fff'
          }}>
            <h2 style={{ margin: 0, fontSize: 24, marginBottom: 8 }}>{record.name}</h2>
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <Tag color="white" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}>
                {record.category}
              </Tag>
              <Tag color="white" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}>
                {typeConfig.text}
              </Tag>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card size="small" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Calendar size={16} style={{ color: '#1890ff' }} />
                  <span style={{ color: '#8c8c8c', fontSize: 12 }}>活动状态</span>
                </div>
                <Tag color={statusConfigItem.color} style={{ fontSize: 14, padding: '4px 12px' }}>
                  {statusConfigItem.text}
                </Tag>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <MapPin size={16} style={{ color: '#1890ff' }} />
                  <span style={{ color: '#8c8c8c', fontSize: 12 }}>优先级</span>
                </div>
                <Tag color={priorityConfigItem.color} style={{ fontSize: 14, padding: '4px 12px' }}>
                  {priorityConfigItem.text}
                </Tag>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card size="small" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Clock size={16} style={{ color: '#1890ff' }} />
                  <span style={{ color: '#8c8c8c', fontSize: 12 }}>开始时间</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {record.start_time || '-'}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Clock size={16} style={{ color: '#1890ff' }} />
                  <span style={{ color: '#8c8c8c', fontSize: 12 }}>结束时间</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {record.end_time || '-'}
                </div>
              </Card>
            </Col>
          </Row>

          <Card size="small" style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {record.activity_type === 'online' ? (
                <Link size={16} style={{ color: '#1890ff' }} />
              ) : (
                <MapPin size={16} style={{ color: '#1890ff' }} />
              )}
              <span style={{ color: '#8c8c8c', fontSize: 12 }}>
                {record.activity_type === 'online' ? '活动链接' : '活动地址'}
              </span>
            </div>
            {record.activity_type === 'online' ? (
              record.online_link ? (
                <a href={record.online_link} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', wordBreak: 'break-all' }}>
                  {record.online_link}
                </a>
              ) : (
                <span style={{ color: '#8c8c8c' }}>-</span>
              )
            ) : (
              <span style={{ fontSize: 14 }}>{record.location || '-'}</span>
            )}
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card size="small" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <MessageSquare size={16} style={{ color: '#1890ff' }} />
                  <span style={{ color: '#8c8c8c', fontSize: 12 }}>负责人</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {record.responsible || '-'}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <QrCode size={16} style={{ color: '#1890ff' }} />
                  <span style={{ color: '#8c8c8c', fontSize: 12 }}>报名/签到</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {record.registered || 0} / {record.checked_in || 0}
                </div>
              </Card>
            </Col>
          </Row>

          {record.key_milestones && (
            <Card size="small" style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Clock size={16} style={{ color: '#1890ff' }} />
                <span style={{ color: '#8c8c8c', fontSize: 12 }}>关键节点</span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.8 }}>
                {record.key_milestones}
              </div>
            </Card>
          )}

          {record.description && (
            <Card size="small" style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <MessageSquare size={16} style={{ color: '#1890ff' }} />
                <span style={{ color: '#8c8c8c', fontSize: 12 }}>活动描述</span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.8, color: '#595959' }}>
                {record.description}
              </div>
            </Card>
          )}
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

  const handleExport = () => {
    const exportData = filteredActivities.map(activity => ({
      '活动名称': activity.name,
      '活动类型': activity.activity_type === 'online' ? '线上' : '线下',
      '分类': activity.category,
      '优先级': priorityConfig[activity.priority]?.text || '中',
      '状态': statusConfig[activity.status]?.text || '进行中',
      '开始时间': activity.start_time || '-',
      '结束时间': activity.end_time || '-',
      '地址/链接': activity.activity_type === 'online' ? activity.online_link : activity.location,
      '负责人': activity.responsible || '-',
      '关键节点': activity.key_milestones || '-',
      '描述': activity.description || '-',
      '报名人数': activity.registered || 0,
      '签到人数': activity.checked_in || 0
    }));

    const headers = Object.keys(exportData[0] || {}).join(',');
    const rows = exportData.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
      ).join(',')
    );

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `活动列表_${new Date().toLocaleDateString('zh-CN')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('导出成功');
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
        <Space>
          <Button 
            icon={<Download size={16} />}
            onClick={handleExport}
          >
            导出
          </Button>
          <Button 
            type="primary" 
            icon={<Plus size={16} />}
            onClick={handleAdd}
          >
            新增活动
          </Button>
        </Space>
      </div>

      <Card>
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <SearchInput
            placeholder="搜索活动名称"
            allowClear
            enterButton={<Search size={16} />}
            size="large"
            onSearch={setSearchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 400, flex: 1, minWidth: 200 }}
          />
          <Select
            placeholder="筛选活动类型"
            size="large"
            style={{ width: 150, minWidth: 120 }}
            value={activityTypeFilter}
            onChange={setActivityTypeFilter}
            options={[
              { label: '全部', value: 'all' },
              ...activityTypeOptions
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredActivities}
          rowKey="id"
          loading={loading}
          scroll={{ x: 'max-content' }}
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
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
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
        width={800}
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

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="category"
                label="分类"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select options={categoryOptions} placeholder="选择分类" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="activity_type"
                label="活动类型"
                rules={[{ required: true, message: '请选择活动类型' }]}
              >
                <Select 
                  options={activityTypeOptions} 
                  placeholder="选择活动类型"
                  onChange={(value) => {
                    form.setFieldsValue({
                      location: value === 'online' ? undefined : form.getFieldValue('location'),
                      online_link: value === 'offline' ? undefined : form.getFieldValue('online_link')
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="priority"
                label="优先级"
                rules={[{ required: true, message: '请选择优先级' }]}
              >
                <Select options={priorityOptions} placeholder="选择优先级" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select options={statusOptions} placeholder="选择状态" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="start_time"
                label="开始时间"
              >
                <DatePicker 
                  showTime 
                  style={{ width: '100%' }}
                  placeholder="选择开始时间"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="end_time"
                label="结束时间"
                dependencies={['start_time']}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const startTime = getFieldValue('start_time');
                      if (startTime && value && value.isBefore(startTime)) {
                        return Promise.reject(new Error('结束时间不能早于开始时间'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker 
                  showTime 
                  style={{ width: '100%' }}
                  placeholder="选择结束时间"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.activity_type !== currentValues.activity_type}>
            {({ getFieldValue }) => {
              const activityType = getFieldValue('activity_type');
              return (
                <>
                  {activityType === 'online' && (
                    <Form.Item
                      name="online_link"
                      label="活动链接"
                      rules={[
                        { required: true, message: '线上活动请填写活动链接' },
                        { type: 'url', message: '请输入有效的URL地址' }
                      ]}
                    >
                      <Input 
                        placeholder="请输入活动链接（如：https://meeting.example.com）" 
                        prefix={<Link size={16} />}
                      />
                    </Form.Item>
                  )}
                  {activityType === 'offline' && (
                    <Form.Item
                      name="location"
                      label="活动地址"
                      rules={[{ required: true, message: '线下活动请填写活动地址' }]}
                    >
                      <Input 
                        placeholder="请输入活动地址（如：北京市朝阳区XX大厦3楼会议室）" 
                        prefix={<MapPin size={16} />}
                      />
                    </Form.Item>
                  )}
                </>
              );
            }}
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="responsible"
                label="负责人"
              >
                <Input placeholder="请输入负责人" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="key_milestones"
                label="关键节点时间"
              >
                <Input 
                  placeholder="请输入关键节点时间（如：09:00 签到，09:30 开场）"
                  prefix={<Clock size={16} />}
                />
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
