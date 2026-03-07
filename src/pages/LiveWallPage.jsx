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

const LiveWallPage = () => {
  const { activityId } = useParams();
  
  const [questions, setQuestions] = useState([
    {
      id: 1,
      asker: '张三',
      question: '请问这个产品的定价策略是什么？',
      time: '2024-03-05 10:30:00',
      isFeatured: true
    },
    {
      id: 2,
      asker: '李四',
      question: '关于售后服务的问题，希望能得到详细的解答',
      time: '2024-03-05 11:15:00',
      isFeatured: false
    },
    {
      id: 3,
      asker: '王五',
      question: '是否支持定制化开发？我们的需求比较特殊',
      time: '2024-03-05 14:20:00',
      isFeatured: true
    },
    {
      id: 4,
      asker: '赵六',
      question: '技术支持的时间是多久？',
      time: '2024-03-05 15:45:00',
      isFeatured: false
    },
    {
      id: 5,
      asker: '孙七',
      question: '关于合作模式的疑问，希望能了解更多细节',
      time: '2024-03-05 16:30:00',
      isFeatured: false
    },
    {
      id: 6,
      asker: '周八',
      question: '产品的技术架构是怎样的？',
      time: '2024-03-05 17:00:00',
      isFeatured: true
    },
    {
      id: 7,
      asker: '吴九',
      question: '如何申请成为高级代理商？',
      time: '2024-03-05 17:30:00',
      isFeatured: false
    }
  ]);

  const [newQuestions, setNewQuestions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
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
      
      if (Math.random() > 0.7) {
        const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
        const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        
        const newQuestion = {
          id: Date.now(),
          asker: randomName,
          question: randomQuestion,
          time: new Date().toLocaleString('zh-CN', { hour12: false }),
          isFeatured: Math.random() > 0.8
        };
        
        setNewQuestions(prev => [newQuestion, ...prev].slice(0, 5));
        setQuestions(prev => [newQuestion, ...prev].slice(0, 20));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
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