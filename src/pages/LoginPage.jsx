import { useState } from 'react';
import { Form, Input, Button, Card, message, Modal } from 'antd';
import { User, Lock, Key, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/supabase';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const navigate = useNavigate();
  const [passwordForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const admin = await authService.login(values.username, values.password);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', admin.role);
      localStorage.setItem('userName', admin.name);
      localStorage.setItem('username', admin.username);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error(error.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const onRegisterFinish = async (values) => {
    setRegisterLoading(true);
    try {
      const user = await authService.register(values);
      message.success('注册成功，请登录');
      setRegisterVisible(false);
      registerForm.resetFields();
    } catch (error) {
      message.error(error.message || '注册失败');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('两次输入的新密码不一致');
      return;
    }
    
    setChangePasswordLoading(true);
    try {
      await authService.changePassword(
        values.username,
        values.oldPassword,
        values.newPassword
      );
      message.success('密码修改成功，请使用新密码登录');
      setChangePasswordVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error(error.message || '密码修改失败');
    } finally {
      setChangePasswordLoading(false);
    }
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

          <Form.Item style={{ marginBottom: 16 }}>
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

          <div style={{ textAlign: 'center' }}>
            <Button 
              type="link" 
              icon={<UserPlus size={14} />}
              onClick={() => setRegisterVisible(true)}
            >
              注册新用户
            </Button>
            <Button 
              type="link" 
              icon={<Key size={14} />}
              onClick={() => setChangePasswordVisible(true)}
            >
              修改密码
            </Button>
          </div>
        </Form>

        <div style={{ 
          marginTop: 16, 
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

      <Modal
        title="修改密码"
        open={changePasswordVisible}
        onCancel={() => {
          setChangePasswordVisible(false);
          passwordForm.resetFields();
        }}
        footer={null}
        width={400}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<User size={16} style={{ color: '#bfbfbf' }} />}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="oldPassword"
            label="原密码"
            rules={[{ required: true, message: '请输入原密码' }]}
          >
            <Input.Password 
              prefix={<Lock size={16} style={{ color: '#bfbfbf' }} />}
              placeholder="请输入原密码"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6位' }
            ]}
          >
            <Input.Password 
              prefix={<Key size={16} style={{ color: '#bfbfbf' }} />}
              placeholder="请输入新密码（至少6位）"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            rules={[{ required: true, message: '请确认新密码' }]}
          >
            <Input.Password 
              prefix={<Key size={16} style={{ color: '#bfbfbf' }} />}
              placeholder="请再次输入新密码"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={changePasswordLoading}
              block
            >
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="注册新用户"
        open={registerVisible}
        onCancel={() => {
          setRegisterVisible(false);
          registerForm.resetFields();
        }}
        footer={null}
        width={400}
      >
        <Form
          form={registerForm}
          layout="vertical"
          onFinish={onRegisterFinish}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3位' },
              { max: 20, message: '用户名最多20位' }
            ]}
          >
            <Input 
              prefix={<User size={16} style={{ color: '#bfbfbf' }} />}
              placeholder="请输入用户名（3-20位）"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' }
            ]}
          >
            <Input.Password 
              prefix={<Lock size={16} style={{ color: '#bfbfbf' }} />}
              placeholder="请输入密码（至少6位）"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') !== value) {
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<Lock size={16} style={{ color: '#bfbfbf' }} />}
              placeholder="请再次输入密码"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={registerLoading}
              block
              style={{
                height: 48,
                fontSize: 16,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginPage;
