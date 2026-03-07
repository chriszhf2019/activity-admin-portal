import { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  List, 
  Avatar, 
  Tag, 
  Rate,
  Button
} from 'antd';
import { 
  Users, 
  TrendingUp, 
  Star, 
  Award,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { userService, activityService } from '../services/supabase';
import { USERS, ACTIVITIES, USER_FEEDBACKS } from '../constants/realData';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalActivities: 0,
    totalPoints: 0,
    avgSatisfaction: 4.8
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [users, activities] = await Promise.all([
        userService.getAll(),
        activityService.getAll()
      ]);
      
      const userData = users?.length ? users : USERS;
      const activityData = activities?.length ? activities : ACTIVITIES;
      
      setStats({
        totalUsers: userData.length,
        totalActivities: activityData.length,
        totalPoints: userData.reduce((s, u) => s + (u.points || 0), 0),
        avgSatisfaction: 4.8
      });
      
      setRecentActivities(activityData.slice(0, 5));
      setTopUsers(userData.sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 5));
    } catch (e) {
      setStats({ totalUsers: USERS.length, totalActivities: ACTIVITIES.length, totalPoints: USERS.reduce((s, u) => s + u.points, 0), avgSatisfaction: 4.8 });
      setRecentActivities(ACTIVITIES.slice(0, 5));
      setTopUsers(USERS.sort((a, b) => b.points - a.points).slice(0, 5));
    }
  };

  const channelDistribution = [
    { level: '金牌渠道商', count: 2, percentage: 25, color: '#ffd700' },
    { level: '银牌渠道商', count: 4, percentage: 50, color: '#c0c0c0' },
    { level: '普通渠道商', count: 2, percentage: 25, color: '#cd7f32' }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>数据大盘</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>总用户数</span>}
              value={stats.totalUsers}
              prefix={<Users size={20} color="rgba(255,255,255,0.9)" />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>活动总数</span>}
              value={stats.totalActivities}
              prefix={<Calendar size={20} color="rgba(255,255,255,0.9)" />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>积分发放总额</span>}
              value={stats.totalPoints}
              prefix={<Star size={20} color="rgba(255,255,255,0.9)" />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.9)' }}>平均满意度</span>}
              value={stats.avgSatisfaction}
              prefix={<Award size={20} color="rgba(255,255,255,0.9)" />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
              suffix="/ 5"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title={<><Calendar size={18} /> 最近活动</>} extra={<Tag color="blue">近5场</Tag>}>
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{item.name?.[0]}</Avatar>}
                    title={item.name}
                    description={
                      <div>
                        <Tag color={item.status === 'completed' ? 'green' : 'blue'}>
                          {item.status === 'completed' ? '已完成' : '进行中'}
                        </Tag>
                        <span style={{ marginLeft: 8, color: '#8c8c8c' }}>{item.location}</span>
                      </div>
                    }
                  />
                  <div>
                    <div>报名：{item.registered || 0}</div>
                    <div>签到：{item.checked_in || item.checkedIn || 0}</div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={<><Award size={18} /> 积分排行榜</>} extra={<Tag color="gold">Top 5</Tag>}>
            <List
              dataSource={topUsers}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div style={{ 
                        width: 32, height: 32, borderRadius: '50%',
                        background: index < 3 ? '#ffd700' : '#c0c0c0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 600
                      }}>
                        {index + 1}
                      </div>
                    }
                    title={item.real_name || item.realName}
                    description={item.company}
                  />
                  <div style={{ color: '#faad14', fontWeight: 600, fontSize: 16 }}>
                    {item.points} 分
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title={<><Users size={18} /> 用户分布</>}>
            <div style={{ padding: 20 }}>
              {channelDistribution.map((item, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: item.color, marginRight: 8 }}></span>{item.level}</span>
                    <span>{item.count} 人 ({item.percentage}%)</span>
                  </div>
                  <Progress percent={item.percentage} strokeColor={item.color} showInfo={false} />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={<><MessageSquare size={18} /> 最新反馈</>}>
            <List
              dataSource={USER_FEEDBACKS.slice(0, 4)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{(item.user_name || item.userName)?.[0]}</Avatar>}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.user_name || item.userName}</span>
                        <Rate disabled value={item.rating} style={{ fontSize: 12 }} />
                      </div>
                    }
                    description={
                      <div>
                        <Tag color="blue">{item.meeting_name || item.meetingName}</Tag>
                        <div style={{ marginTop: 4, color: '#595959' }}>{item.content}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
