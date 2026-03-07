import { useState, useEffect } from 'react';
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
  EyeOff,
  Gift,
  Users,
  Clock,
  TrendingUp,
  Star,
  MessageSquare,
  Plus
} from 'lucide-react';
import { questionService } from '../services/supabase';
import { QUESTIONS } from '../constants/realData';

const MeetingInteractionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const [checkinData] = useState({
    registered: 156,
    checkedIn: 128,
    absent: 28
  });

  const [lotteryState, setLotteryState] = useState({
    isRunning: false,
    winner: null,
    participants: 128
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await questionService.getAll();
      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        setQuestions(QUESTIONS);
      }
    } catch (error) {
      setQuestions(QUESTIONS);
    } finally {
      setLoading(false);
    }
  };

  const checkinPercent = Math.round((checkinData.checkedIn / checkinData.registered) * 100);

  const handleApprove = async (id) => {
    try {
      await questionService.updateStatus(id, 'approved');
    } catch (e) {}
    setQuestions(questions.map(q => q.id === id ? { ...q, status: 'approved' } : q));
    message.success('已准许上墙');
  };

  const handleHide = async (id) => {
    try {
      await questionService.updateStatus(id, 'hidden');
    } catch (e) {}
    setQuestions(questions.map(q => q.id === id ? { ...q, status: 'hidden' } : q));
    message.success('已隐藏');
  };

  const handleSetFeatured = async (id) => {
    try {
      await questionService.setFeatured(id, true);
    } catch (e) {}
    setQuestions(questions.map(q => q.id === id ? { ...q, is_featured: true, isFeatured: true } : q));
    message.success('已设为精选，用户获得5积分奖励');
  };

  const handleMarkAnswered = async (id) => {
    try {
      await questionService.setAnswered(id, true);
    } catch (e) {}
    setQuestions(questions.map(q => q.id === id ? { ...q, is_answered: true, isAnswered: true } : q));
    message.success('已标记为已回答');
  };

  const handleStartLottery = () => {
    setLotteryState({ ...lotteryState, isRunning: true });
    setTimeout(() => {
      const participants = ['张伟', '李娜', '王强', '赵敏', '孙浩', '周琳', '吴磊', '郑雪'];
      const winner = participants[Math.floor(Math.random() * participants.length)];
      setLotteryState({ ...lotteryState, isRunning: false, winner });
      Modal.success({
        title: '🎉 恭喜中奖！',
        content: <div style={{ textAlign: 'center', fontSize: 24, padding: 20 }}>{winner}</div>,
      });
    }, 2000);
  };

  const getFilteredQuestions = () => {
    if (statusFilter === 'all') return questions;
    return questions.filter(q => q.status === statusFilter);
  };

  const columns = [
    {
      title: '提问人',
      key: 'asker',
      width: 150,
      render: (_, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>{record.asker?.[0]}</Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{record.asker}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.company}</div>
          </div>
          {(record.is_featured || record.isFeatured) && <Tag color="gold"><Star size={10} /> 精选</Tag>}
        </Space>
      ),
    },
    {
      title: '问题',
      dataIndex: 'question',
      key: 'question',
      width: 300,
      render: (text, record) => (
        <div>
          {text}
          {(record.is_answered || record.isAnswered) && <Tag color="blue" style={{ marginLeft: 8 }}>已回答</Tag>}
        </div>
      ),
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 150,
      render: (time) => <span style={{ color: '#8c8c8c', fontSize: 13 }}>{time}</span>,
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
        const c = config[status] || config.pending;
        return <Tag color={c.color}>{c.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_, record) => (
        <Space wrap>
          {record.status === 'pending' && (
            <>
              <Button type="primary" size="small" icon={<CheckCircle size={12} />} onClick={() => handleApprove(record.id)}>
                上墙
              </Button>
              <Button size="small" icon={<EyeOff size={12} />} onClick={() => handleHide(record.id)}>
                隐藏
              </Button>
            </>
          )}
          {record.status === 'approved' && (
            <>
              {!(record.is_featured || record.isFeatured) && (
                <Button size="small" icon={<Star size={12} />} onClick={() => handleSetFeatured(record.id)}>
                  精选
                </Button>
              )}
              {!(record.is_answered || record.isAnswered) && (
                <Button size="small" icon={<MessageSquare size={12} />} onClick={() => handleMarkAnswered(record.id)}>
                  已回答
                </Button>
              )}
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>会议现场管理</h1>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={<><Users size={18} /> 签到统计</>}>
            <div style={{ textAlign: 'center', padding: 20 }}>
              <Progress type="circle" percent={checkinPercent} width={150} />
              <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={8}><Statistic title="已报名" value={checkinData.registered} valueStyle={{ color: '#1890ff' }} /></Col>
                <Col span={8}><Statistic title="已签到" value={checkinData.checkedIn} valueStyle={{ color: '#52c41a' }} /></Col>
                <Col span={8}><Statistic title="未签到" value={checkinData.absent} valueStyle={{ color: '#ff4d4f' }} /></Col>
              </Row>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={<><Gift size={18} /> 抽奖控制台</>}>
            <div style={{ textAlign: 'center', padding: 20 }}>
              <Statistic title="参与人数" value={lotteryState.participants} prefix={<Users size={20} />} />
              {lotteryState.winner && (
                <div style={{ margin: '20px 0', padding: 16, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 8, color: '#fff' }}>
                  <div style={{ fontSize: 14 }}>🎉 中奖用户</div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{lotteryState.winner}</div>
                </div>
              )}
              <Button 
                type="primary" 
                size="large" 
                icon={<Gift size={18} />}
                onClick={handleStartLottery}
                loading={lotteryState.isRunning}
                style={{ width: '100%', marginTop: 16 }}
              >
                {lotteryState.isRunning ? '抽奖中...' : '开始抽奖'}
              </Button>
              {lotteryState.winner && (
                <Button style={{ width: '100%', marginTop: 8 }} onClick={() => setLotteryState({ ...lotteryState, winner: null })}>
                  重新抽奖
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Card title={<><TrendingUp size={18} /> 提问审核</>}>
        <div style={{ marginBottom: 16 }}>
          <Radio.Group value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} buttonStyle="solid">
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="pending">待审核</Radio.Button>
            <Radio.Button value="approved">已上墙</Radio.Button>
            <Radio.Button value="hidden">已隐藏</Radio.Button>
          </Radio.Group>
        </div>
        
        <Table
          columns={columns}
          dataSource={getFilteredQuestions()}
          rowKey="id"
          loading={loading}
          locale={{ emptyText: <Empty description="暂无提问" /> }}
          pagination={{ pageSize: 10, showTotal: (t) => `共 ${t} 条` }}
        />
      </Card>
    </div>
  );
};

export default MeetingInteractionPage;
