import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 管理员账号
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const onFinish = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      if (values.username === ADMIN_CREDENTIALS.username && 
          values.password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', '超级管理员');
        message.success('登录成功');
        navigate('/');
      } else {
        message.error('用户名或密码错误');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card
        style={{
          width: 400,
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 80,
            height: 80,
            margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={40} color="#fff" />
          </div>
          <h1 style={{ margin: 0, fontSize: 24, color: '#262626' }}>
            日常活动管理系统
          </h1>
          <p style={{ color: '#8c8c8c', marginTop: 8 }}>
            请登录管理后台
          </p>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<User size={18} style={{ color: '#bfbfbf' }} />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password 
              prefix={<Lock size={18} style={{ color: '#bfbfbf' }} />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              style={{
                height: 48,
                fontSize: 16,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            >
              登 录
            </Button>
          </Form.Item>
        </Form>

        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          background: '#f5f7fa', 
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#8c8c8c', fontSize: 13 }}>
            默认账号：admin / admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
