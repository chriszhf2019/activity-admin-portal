import { useState, useEffect } from 'react';
import { Layout, Menu, theme, Dropdown, Avatar, Button, Select, Space } from 'antd';
import { 
  Home, 
  Calendar, 
  Users, 
  Settings,
  Menu as MenuIcon,
  Bell,
  LogOut,
  User,
  Activity,
  Gift,
  Shield
} from 'lucide-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <Home size={18} />,
      label: '仪表盘',
      roles: ['admin'],
      onClick: () => {
        navigate('/');
        if (isMobile) setDrawerVisible(false);
      },
    },
    {
      key: '/activities',
      icon: <Calendar size={18} />,
      label: '活动管理',
      roles: ['admin', 'staff'],
      onClick: () => {
        navigate('/activities');
        if (isMobile) setDrawerVisible(false);
      },
    },
    {
      key: '/users',
      icon: <Users size={18} />,
      label: '用户管理',
      roles: ['admin', 'staff'],
      onClick: () => {
        navigate('/users');
        if (isMobile) setDrawerVisible(false);
      },
    },
    {
      key: '/meeting-interaction',
      icon: <Activity size={18} />,
      label: '会议现场管理',
      roles: ['admin', 'staff'],
      onClick: () => {
        navigate('/meeting-interaction');
        if (isMobile) setDrawerVisible(false);
      },
    },
    {
      key: '/points-mall',
      icon: <Gift size={18} />,
      label: '积分商城',
      roles: ['admin', 'staff'],
      onClick: () => {
        navigate('/points-mall');
        if (isMobile) setDrawerVisible(false);
      },
    },
    {
      key: '/settings',
      icon: <Settings size={18} />,
      label: '系统设置',
      roles: ['admin'],
      onClick: () => {
        navigate('/settings');
        if (isMobile) setDrawerVisible(false);
      },
    },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  });

  const userMenuItems = [
    {
      key: 'profile',
      icon: <User size={16} />,
      label: '个人资料',
    },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: '退出登录',
      danger: true,
    },
  ];

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      console.log('退出登录');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
          if (isMobile) setDrawerVisible(!collapsed);
        }}
        collapsedWidth={isMobile ? 0 : 80}
        theme="dark"
        width={240}
        breakpoint="lg"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          transition: 'all 0.2s',
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#fff',
          fontSize: collapsed ? 18 : 20,
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)'
        }}>
          {collapsed ? '活动' : '日常活动管理'}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={filteredMenuItems}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>
      <Layout style={{ 
        marginLeft: isMobile ? 0 : (collapsed ? 80 : 240), 
        transition: 'margin-left 0.2s',
        width: '100%'
      }}>
        <Header 
          style={{ 
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            position: 'sticky',
            top: 0,
            zIndex: 999,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              type="text"
              icon={<MenuIcon size={20} />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <h2 style={{ 
              margin: 0, 
              fontSize: isMobile ? 16 : 18, 
              fontWeight: 600, 
              color: '#262626' 
            }}>
              日常活动后台管理
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Space>
              <Select
                value={userRole}
                onChange={setUserRole}
                style={{ width: 120 }}
                options={[
                  { label: '超级管理员', value: 'admin' },
                  { label: '现场核销员', value: 'staff' }
                ]}
              />
              <Button 
                type="text"
                icon={<Bell size={20} />}
                style={{ color: '#595959' }}
              />
              <Dropdown
                menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
                placement="bottomRight"
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  cursor: 'pointer',
                  padding: '4px 12px',
                  borderRadius: 8,
                  transition: 'background-color 0.2s'
                }}>
                  <Avatar 
                    size="small" 
                    style={{ backgroundColor: '#1890ff' }}
                    icon={<User size={14} />}
                  />
                  <span style={{ fontSize: 14, color: '#262626', display: isMobile ? 'none' : 'block' }}>
                    {userRole === 'admin' ? '超级管理员' : '现场核销员'}
                  </span>
                </div>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Content
          style={{
            margin: isMobile ? '16px 8px' : '24px 16px',
            padding: isMobile ? 16 : 24,
            minHeight: 280,
            background: '#f5f5f5',
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
