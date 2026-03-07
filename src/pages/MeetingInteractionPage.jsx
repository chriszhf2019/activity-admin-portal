import { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Modal, 
  message,
  Progress,
  Avatar,
  Divider,
  Empty,
  Radio
} from 'antd';
import { 
  CheckCircle, 
  X, 
  Eye, 
  EyeOff,
  Gift,
  Users,
  Clock,
  TrendingUp,
  Star,
  MessageSquare,
  Plus,
  Bell
} from 'lucide-react';

const MeetingInteractionPage = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      asker: '张三',
      question: '请问这个产品的定价策略是什么？',
      time: '2024-03-05 10:30:00',
      status: 'pending',
      isFeatured: false,
      isAnswered: false
    },
    {
      id: 2,
      asker: '李四',
      question: '关于售后服务的问题',
      time: '2024-03-05 11:15:00',
      status: 'pending',
      isFeatured: false,
      isAnswered: false
    },
    {
      id: 3,
      asker: '王五',
      question: '是否支持定制化开发？',
      time: '2024-03-05 14:20:00',
      status: 'approved',
      isFeatured: true,
      isAnswered: false
    },
    {
      id: 4,
      asker: '赵六',
      question: '技术支持的时间是多久？',
      time: '2024-03-05 15:45:00',
      status: 'approved',
      isFeatured: false,
      isAnswered: true
    },
    {
      id: 5,
      asker: '孙七',
      question: '关于合作模式的疑问',
      time: '2024-03-05 16:30:00',
      status: 'pending',
      isFeatured: false,
      isAnswered: false
    }
  ]);

  const [checkinData, setCheckinData] = useState({
    registered: 156,
    checkedIn: 128,
    absent: 28
  });

  const [lotteryState, setLotteryState] = useState({
    isRunning: false,
    winner: null,
    participants: 128
  });

  const [statusFilter, setStatusFilter] = useState('all');

  const checkinPercent = Math.round((checkinData.checkedIn / checkinData.registered) * 100);

  const handleApprove = (id) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, status: 'approved' } : q
    ));
    message.success('已准许上墙');
    message.info('已向用户发送通知：您的问题已上墙');
  };

  const handleHide = (id) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, status: 'hidden' } : q
    ));
    message.success('已隐藏该问题');
  };

  const handleSetFeatured = (id) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, isFeatured: true } : q
    ));
    message.success('已设为精选问题');
    message.info('该用户已获得 5 积分奖励');
  };

  const handleMarkAnswered = (id) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, isAnswered: true } : q
    ));
    message.success('已标记为已回答');
  };

  const handleSimulateQuestion = () => {
    const sampleQuestions = [
      '请问这个产品的定价策略是什么？',
      '关于售后服务的问题',
      '是否支持定制化开发？',
      '技术支持的时间是多久？',
      '关于合作模式的疑问',
      '产品的技术架构是怎样的？',
      '如何申请成为高级代理商？',
      '返利政策是怎样的？',
      '是否有培训支持？',
      '产品的核心竞争力是什么？'
    ];
    
    const sampleNames = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '钱十一', '陈十二'];
    
    const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    
    const newQuestion = {
      id: Date.now(),
      asker: randomName,
      question: randomQuestion,
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      status: 'pending',
      isFeatured: false,
      isAnswered: false
    };
    
    setQuestions([newQuestion, ...questions]);
    message.success(`模拟用户 ${randomName} 提问成功`);
  };

  const handleStartLottery = () => {
    if (lotteryState.participants === 0) {
      message.warning('当前没有已签到用户，无法抽奖');
      return;
    }

    setLotteryState({ ...lotteryState, isRunning: true });

    setTimeout(() => {
      const participants = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'];
      const randomIndex = Math.floor(Math.random() * participants.length);
      const winner = participants[randomIndex];
      
      setLotteryState({
        ...lotteryState,
        isRunning: false,
        winner: winner
      });
      
      Modal.success({
        title: '🎉 恭喜中奖！',
        content: (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Avatar 
              size={80} 
              style={{ backgroundColor: '#ff4d4f', marginBottom: 16 }}
            >
              {winner[0]}
            </Avatar>
            <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
              {winner}
            </div>
            <p style={{ color: '#8c8c8c', fontSize: 16 }}>
              恭喜您成为幸运用户！
            </p>
          </div>
        ),
        okText: '确定',
        width: 400
      });
    }, 2000);
  };

  const getFilteredQuestions = () => {
    if (statusFilter === 'all') return questions;
    return questions.filter(q => q.status === statusFilter);
  };

  const questionColumns = [
    {
      title: '提问人',
      dataIndex: 'asker',
      key: 'asker',
      width: 120,
      render: (asker, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {asker[0]}
          </Avatar>
          <span style={{ fontWeight: 500 }}>{asker}</span>
          {record.isFeatured && (
            <Tag color="gold" style={{ marginLeft: 8 }}>
              <Star size={12} style={{ display: 'inline', marginRight: 2 }} />
              精选
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: '问题内容',
      dataIndex: 'question',
      key: 'question',
      width: 300,
      render: (question, record) => (
        <div style={{ maxWidth: 280 }}>
          {question}
          {record.isAnswered && (
            <Tag color="blue" style={{ marginTop: 4, marginLeft: 0 }}>
              已回答
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: '提交时间',
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
      width: 100,
      render: (status) => {
        const config = {
          pending: { color: 'orange', text: '待审核' },
          approved: { color: 'green', text: '已上墙' },
          hidden: { color: 'red', text: '已隐藏' }
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
      width: 280,
      render: (_, record) => (
        <Space size="small" wrap>
          {record.status === 'pending' && (
            <>
              <Button 
                type="primary" 
                size="small"
                icon={<CheckCircle size={14} />}
                onClick={() => handleApprove(record.id)}
              >
                准许上墙
              </Button>
              <Button 
                type="default" 
                size="small"
                icon={<EyeOff size={14} />}
                onClick={() => handleHide(record.id)}
              >
                隐藏
              </Button>
            </>
          )}
          {record.status === 'approved' && (
            <>
              {!record.isFeatured && (
                <Button 
                  type="default" 
                  size="small"
                  icon={<Star size={14} />}
                  onClick={() => handleSetFeatured(record.id)}
                >
                  设为精选
                </Button>
              )}
              {!record.isAnswered && (
                <Button 
                  type="default" 
                  size="small"
                  icon={<MessageSquare size={14} />}
                  onClick={() => handleMarkAnswered(record.id)}
                >
                  标记已回答
                </Button>
              )}
              {record.isAnswered && (
                <Tag color="blue">已回答</Tag>
              )}
            </>
          )}
          {record.status === 'hidden' && (
            <Tag color="red">已隐藏</Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>会议现场管理</h1>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={20} style={{ color: '#1890ff' }} />
                <span>签到统计</span>
              </div>
            }
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Progress 
                type="circle" 
                percent={checkinPercent}
                strokeColor={{
                  '0%': '#ff4d4f',
                  '100%': '#52c41a',
                }}
                width={200}
              />
              <div style={{ marginTop: 24 }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Statistic 
                      title="已报名" 
                      value={checkinData.registered} 
                      valueStyle={{ color: '#1890ff', fontSize: 20 }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic 
                      title="已签到" 
                      value={checkinData.checkedIn} 
                      valueStyle={{ color: '#52c41a', fontSize: 20 }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic 
                      title="未签到" 
                      value={checkinData.absent} 
                      valueStyle={{ color: '#ff4d4f', fontSize: 20 }}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Gift size={20} style={{ color: '#722ed1' }} />
                <span>抽奖控制台</span>
              </div>
            }
          >
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ marginBottom: 24 }}>
                <Statistic 
                  title="已签到人数" 
                  value={lotteryState.participants} 
                  prefix={<Users size={24} style={{ color: '#1890ff' }} />}
                  valueStyle={{ color: '#1890ff', fontSize: 32 }}
                />
              </div>
              
              {lotteryState.winner && (
                <div style={{ 
                  padding: 20, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 12,
                  color: '#fff',
                  marginBottom: 24
                }}>
                  <div style={{ fontSize: 14, marginBottom: 8, opacity: 0.9 }}>
                    🎉 中奖用户
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>
                    {lotteryState.winner}
                  </div>
                </div>
              )}
              <Button 
                type="primary" 
                size="large"
                icon={<Gift size={20} />}
                onClick={handleStartLottery}
                loading={lotteryState.isRunning}
                disabled={lotteryState.winner !== null}
                style={{ 
                  width: '100%',
                  height: 48,
                  fontSize: 18
                }}
              >
                {lotteryState.isRunning ? '抽奖中...' : '开始随机抽奖'}
              </Button>
              
              {lotteryState.winner && (
                <Button 
                  type="default" 
                  size="large"
                  onClick={() => setLotteryState({ ...lotteryState, winner: null })}
                  style={{ 
                    width: '100%',
                    height: 48,
                    fontSize: 18,
                    marginTop: 16
                  }}
                >
                  重新抽奖
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={20} style={{ color: '#1890ff' }} />
              <span>提问审核列表</span>
            </div>
            <Button 
              type="primary"
              icon={<Plus size={16} />}
              onClick={handleSimulateQuestion}
            >
              模拟用户提问
            </Button>
          </div>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Radio.Group 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="pending">待审核</Radio.Button>
            <Radio.Button value="approved">已上墙</Radio.Button>
            <Radio.Button value="hidden">已隐藏</Radio.Button>
          </Radio.Group>
        </div>
        
        <Table
          columns={questionColumns}
          dataSource={getFilteredQuestions()}
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
                      快去引导大家提问吧！
                    </p>
                  </div>
                }
              />
            )
          }}
          pagination={{
            total: getFilteredQuestions().length,
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default MeetingInteractionPage;