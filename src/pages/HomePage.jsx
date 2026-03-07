import { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  List, 
  Avatar, 
  Tag, 
  Divider, 
  Rate, 
  Modal, 
  Button, 
  Space,
  Empty
} from 'antd';
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  Award,
  MessageSquare,
  FileText,
  Download,
  Target,
  PieChart,
  BarChart3,
  Calendar,
  TrendingDown
} from 'lucide-react';

const HomePage = () => {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const kpiData = {
    totalChannels: 328,
    avgCheckInRate: 92,
    totalPointsIssued: 15680,
    overallSatisfaction: 4.8
  };

  const meetingTrends = [
    { 
      id: 1, 
      meetingName: '渠道商大会', 
      registered: 156, 
      checkedIn: 143, 
      date: '2024-03-05' 
    },
    { 
      id: 2, 
      meetingName: '产品发布会', 
      registered: 120, 
      checkedIn: 108, 
      date: '2024-02-28' 
    },
    { 
      id: 3, 
      meetingName: '技术培训会', 
      registered: 98, 
      checkedIn: 89, 
      date: '2024-02-21' 
    },
    { 
      id: 4, 
      meetingName: '市场策略会', 
      registered: 145, 
      checkedIn: 132, 
      date: '2024-02-14' 
    },
    { 
      id: 5, 
      meetingName: '年度总结会', 
      registered: 200, 
      checkedIn: 185, 
      date: '2024-02-07' 
    },
    { 
      id: 6, 
      meetingName: '新品体验会', 
      registered: 88, 
      checkedIn: 78, 
      date: '2024-01-31' 
    },
    { 
      id: 7, 
      meetingName: '渠道拓展会', 
      registered: 165, 
      checkedIn: 150, 
      date: '2024-01-24' 
    }
  ];

  const channelDistribution = [
    { level: '金牌渠道商', count: 45, percentage: 13.7, color: '#ffd700' },
    { level: '银牌渠道商', count: 78, percentage: 23.8, color: '#c0c0c0' },
    { level: '普通渠道商', count: 205, percentage: 62.5, color: '#cd7f32' }
  ];

  const feedbackList = [
    {
      id: 1,
      userName: '张三',
      meetingName: '渠道商大会',
      rating: 5,
      suggestion: '会议内容非常干货，希望下次能增加更多实操环节。',
      time: '2024-03-05 18:30:00'
    },
    {
      id: 2,
      userName: '李四',
      meetingName: '渠道商大会',
      rating: 4,
      suggestion: '整体组织有序，但签到流程可以再优化一下。',
      time: '2024-03-05 17:45:00'
    },
    {
      id: 3,
      userName: '王五',
      meetingName: '产品发布会',
      rating: 5,
      suggestion: '产品展示非常精彩，期待更多新品发布！',
      time: '2024-02-28 19:20:00'
    },
    {
      id: 4,
      userName: '赵六',
      meetingName: '技术培训会',
      rating: 4,
      suggestion: '讲师专业，但培训时间有点紧张。',
      time: '2024-02-21 16:50:00'
    },
    {
      id: 5,
      userName: '孙七',
      meetingName: '市场策略会',
      rating: 5,
      suggestion: '策略分析很到位，对我们帮助很大。',
      time: '2024-02-14 17:30:00'
    }
  ];

  const keywordCloud = [
    { word: '内容干货', weight: 9, color: '#1890ff' },
    { word: '组织有序', weight: 8, color: '#52c41a' },
    { word: '希望增加互动', weight: 7, color: '#faad14' },
    { word: '讲师专业', weight: 6, color: '#722ed1' },
    { word: '签到流程优化', weight: 5, color: '#eb2f96' },
    { word: '时间紧张', weight: 4, color: '#13c2c2' },
    { word: '期待新品', weight: 4, color: '#1890ff' },
    { word: '策略分析', weight: 3, color: '#52c41a' },
    { word: '实操环节', weight: 3, color: '#faad14' },
    { word: '帮助很大', weight: 3, color: '#722ed1' }
  ];

  const topActiveUsers = [
    { rank: 1, userName: '张三', points: 1250, company: '科技有限公司' },
    { rank: 2, userName: '李四', points: 1180, company: '贸易公司' },
    { rank: 3, userName: '王五', points: 1050, company: '实业集团' },
    { rank: 4, userName: '赵六', points: 980, company: '网络科技' },
    { rank: 5, userName: '孙七', points: 920, company: '数据服务' }
  ];

  const topQuestions = [
    { rank: 1, question: '请问这个产品的定价策略是什么？', likes: 45, asker: '张三' },
    { rank: 2, question: '关于售后服务的响应时间有多长？', likes: 38, asker: '李四' },
    { rank: 3, question: '是否支持定制化开发？', likes: 32, asker: '王五' },
    { rank: 4, question: '技术支持团队有多少人？', likes: 28, asker: '赵六' },
    { rank: 5, question: '合作模式有哪些？', likes: 25, asker: '孙七' }
  ];

  const handleGenerateReport = () => {
    setIsReportModalVisible(true);
  };

  const renderTrendChart = () => {
    const maxValue = Math.max(...meetingTrends.map(m => Math.max(m.registered, m.checkedIn)));
    
    return (
      <div style={{ padding: '20px 0' }}>
        {meetingTrends.map((meeting, index) => {
          const registeredHeight = (meeting.registered / maxValue) * 150;
          const checkedInHeight = (meeting.checkedIn / maxValue) * 150;
          const checkInRate = Math.round((meeting.checkedIn / meeting.registered) * 100);
          
          return (
            <div key={meeting.id} style={{ marginBottom: 24 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 8 
              }}>
                <span style={{ fontWeight: 500 }}>{meeting.meetingName}</span>
                <Tag color={checkInRate >= 90 ? 'green' : checkInRate >= 80 ? 'orange' : 'red'}>
                  签到率 {checkInRate}%
                </Tag>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '100%',
                    height: `${registeredHeight}px`,
                    background: 'linear-gradient(180deg, #1890ff 0%, #096dd9 100%)',
                    borderRadius: '4px 4px 0 0',
                    position: 'relative',
                    transition: 'all 0.3s'
                  }}>
                    <span style={{ 
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 12,
                      color: '#1890ff',
                      fontWeight: 600
                    }}>
                      {meeting.registered}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>报名</span>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '100%',
                    height: `${checkedInHeight}px`,
                    background: 'linear-gradient(180deg, #52c41a 0%, #389e0d 100%)',
                    borderRadius: '4px 4px 0 0',
                    position: 'relative',
                    transition: 'all 0.3s'
                  }}>
                    <span style={{ 
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 12,
                      color: '#52c41a',
                      fontWeight: 600
                    }}>
                      {meeting.checkedIn}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>签到</span>
                </div>
              </div>
              
              <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
                <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                {meeting.date}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPieChart = () => {
    const total = channelDistribution.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = 0;
    
    return (
      <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          width: 200, 
          height: 200, 
          borderRadius: '50%',
          position: 'relative',
          background: 'conic-gradient(' + 
            channelDistribution.map(item => {
              const angle = (item.count / total) * 360;
              const endAngle = currentAngle + angle;
              const gradient = `${item.color} ${currentAngle}deg ${endAngle}deg`;
              currentAngle = endAngle;
              return gradient;
            }).join(', ') + 
          ')'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            background: '#fff',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: 24, fontWeight: 600, color: '#262626' }}>
              {total}
            </span>
            <span style={{ fontSize: 12, color: '#8c8c8c' }}>
              总数
            </span>
          </div>
        </div>
        
        <div style={{ marginTop: 24, width: '100%' }}>
          {channelDistribution.map((item, index) => (
            <div key={index} style={{ marginBottom: 12 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: 4,
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%',
                    background: item.color
                  }}></div>
                  <span style={{ fontWeight: 500 }}>{item.level}</span>
                </div>
                <span style={{ color: '#8c8c8c' }}>{item.percentage}%</span>
              </div>
              <Progress 
                percent={item.percentage} 
                strokeColor={item.color}
                showInfo={false}
                strokeWidth={8}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderKeywordCloud = () => {
    const sortedKeywords = [...keywordCloud].sort((a, b) => b.weight - a.weight);
    const maxWeight = sortedKeywords[0].weight;
    
    return (
      <div style={{ 
        padding: '24px', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: 8,
        minHeight: 200,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {sortedKeywords.map((keyword, index) => {
          const fontSize = 14 + (keyword.weight / maxWeight) * 12;
          return (
            <Tag 
              key={index}
              style={{ 
                fontSize: `${fontSize}px`,
                padding: '8px 16px',
                borderRadius: 20,
                border: `2px solid ${keyword.color}`,
                background: '#fff',
                color: keyword.color,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {keyword.word}
            </Tag>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h1 style={{ margin: 0 }}>数据大盘</h1>
        <Button 
          type="primary"
          icon={<FileText size={16} />}
          onClick={handleGenerateReport}
        >
          生成会议复盘报告
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff'
            }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>总覆盖渠道商</span>}
              value={kpiData.totalChannels}
              prefix={<Users size={20} style={{ color: 'rgba(255,255,255,0.9)' }} />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
              suffix={
                <div style={{ fontSize: 14, marginTop: 8 }}>
                  <TrendingUp size={14} style={{ display: 'inline', marginRight: 4 }} />
                  <span style={{ opacity: 0.9 }}>累计注册</span>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: '#fff'
            }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>平均签到率</span>}
              value={kpiData.avgCheckInRate}
              prefix={<Target size={20} style={{ color: 'rgba(255,255,255,0.9)' }} />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
              suffix={
                <>
                  %
                  <div style={{ fontSize: 14, marginTop: 8 }}>
                    <TrendingUp size={14} style={{ display: 'inline', marginRight: 4 }} />
                    <span style={{ opacity: 0.9 }}>所有会议</span>
                  </div>
                </>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: '#fff'
            }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>积分发放总额</span>}
              value={kpiData.totalPointsIssued}
              prefix={<Star size={20} style={{ color: 'rgba(255,255,255,0.9)' }} />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
              suffix={
                <div style={{ fontSize: 14, marginTop: 8 }}>
                  <TrendingUp size={14} style={{ display: 'inline', marginRight: 4 }} />
                  <span style={{ opacity: 0.9 }}>累计奖励</span>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: '#fff'
            }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>整体满意度</span>}
              value={kpiData.overallSatisfaction}
              prefix={<Award size={20} style={{ color: 'rgba(255,255,255,0.9)' }} />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
              suffix={
                <div style={{ fontSize: 14, marginTop: 8 }}>
                  <TrendingUp size={14} style={{ display: 'inline', marginRight: 4 }} />
                  <span style={{ opacity: 0.9 }}>5分制</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChart3 size={20} style={{ color: '#1890ff' }} />
                <span>参与趋势图</span>
              </div>
            }
            extra={<Tag color="blue">近7场会议</Tag>}
            style={{ minHeight: 500 }}
          >
            {renderTrendChart()}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PieChart size={20} style={{ color: '#1890ff' }} />
                <span>用户分布占比</span>
              </div>
            }
            extra={<Tag color="green">渠道商级别</Tag>}
            style={{ minHeight: 500 }}
          >
            {renderPieChart()}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageSquare size={20} style={{ color: '#1890ff' }} />
                <span>会后反馈详情</span>
              </div>
            }
            extra={<Tag color="orange">最新反馈</Tag>}
            style={{ minHeight: 400 }}
          >
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ marginBottom: 12, color: '#262626' }}>关键词云</h4>
              {renderKeywordCloud()}
            </div>
            
            <Divider />
            
            <h4 style={{ marginBottom: 12, color: '#262626' }}>反馈列表</h4>
            <List
              dataSource={feedbackList}
              renderItem={(item) => (
                <List.Item style={{ padding: '16px 0' }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        style={{ backgroundColor: '#1890ff' }}
                      >
                        {item.userName[0]}
                      </Avatar>
                    }
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontWeight: 500 }}>{item.userName}</span>
                          <Tag color="blue" style={{ marginLeft: 8 }}>{item.meetingName}</Tag>
                        </div>
                        <Rate disabled defaultValue={item.rating} style={{ fontSize: 14 }} />
                      </div>
                    }
                    description={
                      <div>
                        <p style={{ 
                          color: '#595959', 
                          margin: '8px 0',
                          lineHeight: 1.6
                        }}>
                          {item.suggestion}
                        </p>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                          <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                          {item.time}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Row gutter={[16]}>
            <Col xs={24}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Award size={20} style={{ color: '#1890ff' }} />
                    <span>互动排行榜</span>
                  </div>
                }
                extra={<Tag color="gold">Top 5</Tag>}
                style={{ minHeight: 300 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <h4 style={{ marginBottom: 12, color: '#262626' }}>积极分子 Top 5</h4>
                    <List
                      dataSource={topActiveUsers}
                      renderItem={(item) => (
                        <List.Item style={{ padding: '8px 0' }}>
                          <List.Item.Meta
                            avatar={
                              <div style={{ 
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: item.rank <= 3 ? '#ffd700' : '#c0c0c0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: 14
                              }}>
                                {item.rank}
                              </div>
                            }
                            title={
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500 }}>{item.userName}</span>
                                <span style={{ color: '#faad14', fontWeight: 600 }}>
                                  {item.points} 分
                                </span>
                              </div>
                            }
                            description={
                              <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                                {item.company}
                              </span>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <h4 style={{ marginBottom: 12, color: '#262626' }}>热门问题 Top 5</h4>
                    <List
                      dataSource={topQuestions}
                      renderItem={(item) => (
                        <List.Item style={{ padding: '8px 0' }}>
                          <List.Item.Meta
                            avatar={
                              <div style={{ 
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: item.rank <= 3 ? '#ffd700' : '#c0c0c0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: 14
                              }}>
                                {item.rank}
                              </div>
                            }
                            title={
                              <div style={{ fontSize: 13, fontWeight: 500 }}>
                                {item.question}
                              </div>
                            }
                            description={
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8c8c8c' }}>
                                <span>{item.asker}</span>
                                <span style={{ color: '#1890ff' }}>
                                  ❤️ {item.likes}
                                </span>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title="会议复盘报告"
        open={isReportModalVisible}
        onCancel={() => setIsReportModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsReportModalVisible(false)}>
            关闭
          </Button>,
          <Button key="download" type="primary" icon={<Download size={16} />}>
            下载报告
          </Button>
        ]}
      >
        <div style={{ padding: '24px 0' }}>
          <h3 style={{ marginBottom: 16, color: '#262626' }}>渠道商大会 - 会议复盘报告</h3>
          
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, color: '#595959' }}>一、核心数据</h4>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small" style={{ background: '#f5f7fa' }}>
                  <Statistic 
                    title="总覆盖渠道商" 
                    value={kpiData.totalChannels} 
                    valueStyle={{ fontSize: 20 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" style={{ background: '#f5f7fa' }}>
                  <Statistic 
                    title="平均签到率" 
                    value={kpiData.avgCheckInRate} 
                    suffix="%" 
                    valueStyle={{ fontSize: 20 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" style={{ background: '#f5f7fa' }}>
                  <Statistic 
                    title="积分发放总额" 
                    value={kpiData.totalPointsIssued} 
                    valueStyle={{ fontSize: 20 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" style={{ background: '#f5f7fa' }}>
                  <Statistic 
                    title="整体满意度" 
                    value={kpiData.overallSatisfaction} 
                    suffix="/ 5" 
                    valueStyle={{ fontSize: 20 }}
                  />
                </Card>
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, color: '#595959' }}>二、参与趋势</h4>
            <p style={{ color: '#8c8c8c', lineHeight: 1.8 }}>
              近7场会议平均签到率为 92%，整体表现优秀。其中渠道商大会签到率最高（92%），
              技术培训会签到率相对较低（91%），建议后续优化培训会的签到流程。
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, color: '#595959' }}>三、用户分布</h4>
            <p style={{ color: '#8c8c8c', lineHeight: 1.8 }}>
              普通渠道商占比 62.5%，银牌渠道商占比 23.8%，金牌渠道商占比 13.7%。
              建议加强对普通渠道商的培训和支持，提升其到金牌渠道商的转化率。
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, color: '#595959' }}>四、反馈总结</h4>
            <p style={{ color: '#8c8c8c', lineHeight: 1.8 }}>
              根据会后反馈分析，渠道商对会议内容普遍表示满意（平均评分 4.8/5）。
              关键词云显示，"内容干货"、"组织有序"是正面评价的主流。
              同时也收到了"希望增加互动"、"签到流程优化"等建设性建议。
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: 12, color: '#595959' }}>五、改进建议</h4>
            <ul style={{ color: '#8c8c8c', lineHeight: 1.8, paddingLeft: 20 }}>
              <li>优化签到流程，减少现场等待时间</li>
              <li>增加互动环节，提升参与感</li>
              <li>加强对普通渠道商的培训支持</li>
              <li>建立反馈跟进机制，及时响应渠道商需求</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;