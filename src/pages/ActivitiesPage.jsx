import { useState } from 'react';
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
  Avatar,
  Divider,
  Empty,
  Row,
  Col,
  Segmented,
  TimePicker,
  Radio
} from 'antd';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Clock,
  User,
  X,
  MonitorPlay,
  QrCode,
  Download,
  MessageSquare
} from 'lucide-react';
import { ACTIVITIES } from '../constants/realData';
import { useNavigate } from 'react-router-dom';

const { Search: SearchInput } = Input;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(ACTIVITIES);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [meetingType, setMeetingType] = useState('offline');
  const [agendaList, setAgendaList] = useState([{ time: '', content: '' }]);
  const [form] = Form.useForm();

  const responsibleOptions = [
    { label: '张三', value: 'zhangsan' },
    { label: '李四', value: 'lisi' },
    { label: '王五', value: 'wangwu' },
    { label: '赵六', value: 'zhaoliu' }
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

  const categoryConfig = {
    运动: { color: 'cyan', icon: '🏃' },
    学习: { color: 'purple', icon: '📚' },
    工作: { color: 'blue', icon: '💼' },
    生活: { color: 'pink', icon: '🏠' }
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
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
      width: 120,
      render: (category) => {
        const config = categoryConfig[category] || categoryConfig['生活'];
        return (
          <Tag color={config.color} style={{ margin: 0 }}>
            {config.icon} {category}
          </Tag>
        );
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority) => {
        const config = priorityConfig[priority];
        return (
          <Tag color={config.color} style={{ margin: 0 }}>
            {config.text}
          </Tag>
        );
      },
      sorter: (a, b) => {
        const order = { high: 3, medium: 2, low: 1 };
        return order[a.priority] - order[b.priority];
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const config = statusConfig[status];
        return (
          <Tag color={config.color} style={{ margin: 0 }}>
            {config.text}
          </Tag>
        );
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (time) => (
        <span style={{ color: '#8c8c8c', fontSize: 13 }}>{time}</span>
      ),
      sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime),
    },
    {
      title: '操作',
      key: 'action',
      width: 400,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="签到码">
            <Button 
              type="default" 
              size="small"
              icon={<QrCode size={16} />}
              onClick={() => handleShowQrCode(record)}
            >
              签到码
            </Button>
          </Tooltip>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              size="small"
              icon={<Eye size={16} />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              size="small"
              icon={<Edit2 size={16} />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="管理现场">
            <Button 
              type="primary" 
              size="small"
              icon={<MonitorPlay size={16} />}
              onClick={() => navigate(`/meeting-management/${record.id}`)}
            >
              管理现场
            </Button>
          </Tooltip>
          <Tooltip title="查看提问墙">
            <Button 
              type="default" 
              size="small"
              icon={<MessageSquare size={16} />}
              onClick={() => navigate(`/live-wall/${record.id}`)}
            >
              提问墙
            </Button>
          </Tooltip>
          <Tooltip title="删除">
            <Button 
              type="text" 
              size="small"
              danger
              icon={<Trash2 size={16} />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleAdd = () => {
    setEditingActivity(null);
    setMeetingType('offline');
    setAgendaList([{ time: '', content: '' }]);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingActivity(record);
    form.setFieldsValue({
      name: record.name,
      category: record.category,
      activityDate: record.createTime ? record.createTime : null,
      description: record.description || ''
    });
    setIsModalVisible(true);
  };

  const handleAddAgenda = () => {
    setAgendaList([...agendaList, { time: '', content: '' }]);
  };

  const handleRemoveAgenda = (index) => {
    const newList = agendaList.filter((_, i) => i !== index);
    setAgendaList(newList);
  };

  const handleAgendaChange = (index, field, value) => {
    const newList = [...agendaList];
    newList[index][field] = value;
    setAgendaList(newList);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setMeetingType('offline');
    setAgendaList([{ time: '', content: '' }]);
  };

  const handleView = (record) => {
    Modal.info({
      title: '活动详情',
      content: (
        <div style={{ marginTop: 16 }}>
          <p><strong>活动名称：</strong>{record.name}</p>
          <p><strong>分类：</strong>{record.category}</p>
          <p><strong>优先级：</strong>{priorityConfig[record.priority].text}</p>
          <p><strong>状态：</strong>{statusConfig[record.status].text}</p>
          <p><strong>创建时间：</strong>{record.createTime}</p>
          <p><strong>描述：</strong>{record.description || '暂无描述'}</p>
        </div>
      ),
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个活动吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setActivities(activities.filter(item => item.id !== id));
        message.success('删除成功');
      },
    });
  };

  const handleShowQrCode = (record) => {
    setSelectedActivity(record);
    setIsQrCodeVisible(true);
  };

  const handleDownloadQrCode = () => {
    message.success('二维码下载成功');
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const newActivity = {
        ...values,
        id: editingActivity ? editingActivity.id : Date.now(),
        createTime: values.activityDate ? values.activityDate.format('YYYY-MM-DD HH:mm:ss') : new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
      };

      if (editingActivity) {
        setActivities(activities.map(item => 
          item.id === editingActivity.id ? newActivity : item
        ));
        message.success('更新成功');
      } else {
        setActivities([...activities, newActivity]);
        message.success('添加成功');
      }

      setIsModalVisible(false);
      form.resetFields();
      setMeetingType('offline');
      setAgendaList([{ time: '', content: '' }]);
    }).catch((error) => {
      message.error('表单验证失败，请检查输入');
    });
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
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredActivities}
          rowKey="id"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div>
                    <p style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 8 }}>
                      暂无活动数据
                    </p>
                    <p style={{ fontSize: 14, color: '#bfbfbf' }}>
                      点击"新增会议"按钮创建第一个活动
                    </p>
                  </div>
                }
              />
            )
          }}
          pagination={{
            total: filteredActivities.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      <Modal
        title={editingActivity ? '编辑会议' : '新增会议'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText="发布会议"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Divider orientation="left">基本信息</Divider>
          
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="会议名称"
                rules={[{ required: true, message: '请输入会议名称' }]}
              >
                <Input placeholder="请输入会议名称" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="responsible"
                label="负责人"
                rules={[{ required: true, message: '请选择负责人' }]}
              >
                <Select placeholder="请选择负责人" options={responsibleOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="meetingType"
                label="会议形式"
                rules={[{ required: true, message: '请选择会议形式' }]}
                initialValue="offline"
              >
                <Segmented
                  options={[
                    { label: '线下', value: 'offline', icon: <MapPin size={14} /> },
                    { label: '线上', value: 'online', icon: <LinkIcon size={14} /> }
                  ]}
                  onChange={setMeetingType}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">时间地点</Divider>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="meetingTime"
                label="会议时间"
                rules={[{ required: true, message: '请选择会议时间' }]}
              >
                <RangePicker 
                  showTime 
                  style={{ width: '100%' }} 
                  placeholder={['开始时间', '结束时间']}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="location"
                label={meetingType === 'offline' ? '会议地址' : '会议链接'}
                rules={[{ required: true, message: meetingType === 'offline' ? '请输入会议地址' : '请输入会议链接' }]}
              >
                <Input 
                  placeholder={meetingType === 'offline' ? '请输入会议地址' : '请输入会议链接'}
                  prefix={meetingType === 'offline' ? <MapPin size={16} /> : <LinkIcon size={16} />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">日程安排</Divider>

          <div style={{ marginBottom: 16 }}>
            <Button 
              type="dashed" 
              onClick={handleAddAgenda}
              icon={<Plus size={14} />}
              style={{ width: '100%' }}
            >
              添加流程
            </Button>
          </div>

          {agendaList.map((item, index) => (
            <Row key={index} gutter={16} style={{ marginBottom: 12 }}>
              <Col span={8}>
                <Form.Item
                  name={['agenda', index, 'time']}
                  label={`时间点 ${index + 1}`}
                  rules={[{ required: true, message: '请输入时间点' }]}
                >
                  <TimePicker 
                    style={{ width: '100%' }} 
                    placeholder="请选择时间"
                    format="HH:mm"
                  />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item
                  name={['agenda', index, 'content']}
                  label={`事项内容 ${index + 1}`}
                  rules={[{ required: true, message: '请输入事项内容' }]}
                >
                  <Input placeholder="请输入事项内容" />
                </Form.Item>
              </Col>
              <Col span={2} style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 24 }}>
                <Button 
                  type="text" 
                  danger
                  icon={<X size={16} />}
                  onClick={() => handleRemoveAgenda(index)}
                />
              </Col>
            </Row>
          ))}

          <Divider orientation="left">会议简介</Divider>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="会议简介"
              >
                <TextArea 
                  rows={6} 
                  placeholder="请输入会议简介" 
                  maxLength={1000}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="会议签到二维码"
        open={isQrCodeVisible}
        onCancel={() => setIsQrCodeVisible(false)}
        width={500}
        footer={[
          <Button key="close" onClick={() => setIsQrCodeVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<Download size={16} />}
            onClick={handleDownloadQrCode}
          >
            下载二维码
          </Button>
        ]}
      >
        {selectedActivity && (
          <div style={{ padding: '24px 0', textAlign: 'center' }}>
            <div style={{ 
              width: 300, 
              height: 300, 
              margin: '0 auto',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24
            }}>
              <QrCode size={150} color="#fff" />
            </div>
            <h3 style={{ marginBottom: 12, color: '#262626' }}>
              {selectedActivity.name}
            </h3>
            <p style={{ color: '#8c8c8c', marginBottom: 8 }}>
              会议ID：{selectedActivity.id}
            </p>
            <p style={{ color: '#8c8c8c', marginBottom: 8 }}>
              时间：{selectedActivity.createTime}
            </p>
            <p style={{ color: '#8c8c8c', marginBottom: 8 }}>
              地点：{selectedActivity.description || '线上会议'}
            </p>
            <div style={{ 
              marginTop: 24, 
              padding: 16, 
              background: '#f5f7fa', 
              borderRadius: 8 
            }}>
              <p style={{ margin: 0, color: '#595959', fontSize: 13 }}>
                💡 使用说明：参会人员扫描此二维码即可完成签到
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ActivitiesPage;
