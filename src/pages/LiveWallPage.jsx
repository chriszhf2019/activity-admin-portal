import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  Avatar, 
  Tag, 
  Space,
  Button,
  message
} from 'antd';
import { 
  MessageSquare,
  RefreshCw,
  ArrowLeft,
  Star,
  Clock
} from 'lucide-react';
import { questionService } from '../services/supabase';
import { QUESTIONS } from '../constants/realData';

const LiveWallPage = () => {
  const { activityId } = useParams();
  
  const [questions, setQuestions] = useState([]);
  const [newQuestions, setNewQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await questionService.getAll();
      // 只显示已上墙的问题
      const approvedQuestions = (data?.length ? data : QUESTIONS)
        .filter(q => q.status === 'approved')
        .map(q => ({
          ...q,
          isFeatured: q.is_featured || q.isFeatured
        }));
      setQuestions(approvedQuestions);
    } catch (e) {
      const approvedQuestions = QUESTIONS
        .filter(q => q.status === 'approved')
        .map(q => ({
          ...q,
          isFeatured: q.is_featured || q.isFeatured
        }));
      setQuestions(approvedQuestions);
    } finally {
      setLoading(false);
    }
  };

  // 定时刷新数据
  useEffect(() => {
    const interval = setInterval(() => {
      loadQuestions();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    loadQuestions();
    message.success('已刷新提问墙');
    setNewQuestions([]);
  };

  const allQuestions = [...newQuestions, ...questions].slice(0, 20);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '40px 20px',
      color: '#fff'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 32 
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: 36, 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            🎤 提问墙
          </h1>
          <Space>
            <Button 
              type="primary"
              icon={<RefreshCw size={20} />}
              onClick={handleRefresh}
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                height: 48,
                fontSize: 16
              }}
            >
              刷新
            </Button>
          </Space>
        </div>

        <div style={{ 
          marginBottom: 24,
          padding: '16px 24px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12,
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <MessageSquare size={20} />
            <span>实时互动中 · 已上墙 {allQuestions.length} 条</span>
          </div>
        </div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          {allQuestions.map((item, index) => (
            <div 
              key={item.id}
              style={{
                padding: '20px 24px',
                background: item.isFeatured 
                  ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
                  : 'rgba(255, 255, 255, 0.08)',
                borderRadius: 12,
                border: item.isFeatured 
                  ? '1px solid rgba(102, 126, 234, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                transition: 'all 0.3s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <Avatar 
                  size={48}
                  style={{ 
                    backgroundColor: '#667eea',
                    fontSize: 20,
                    fontWeight: 600
                  }}
                >
                  {item.asker[0]}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 8,
                    marginBottom: 8
                  }}>
                    <span style={{ 
                      fontSize: 18, 
                      fontWeight: 600,
                      color: '#fff'
                    }}>
                      {item.asker}
                    </span>
                    {item.isFeatured && (
                      <Tag 
                        color="gold"
                        style={{ 
                          margin: 0,
                          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                          border: 'none',
                          color: '#000'
                        }}
                      >
                        <Star size={12} style={{ display: 'inline', marginRight: 4 }} />
                        精选
                      </Tag>
                    )}
                  </div>
                  <p style={{ 
                    margin: 0,
                    fontSize: 20,
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    {item.question}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 8,
                    fontSize: 13,
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginTop: 8
                  }}>
                    <Clock size={14} style={{ display: 'inline' }} />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LiveWallPage;