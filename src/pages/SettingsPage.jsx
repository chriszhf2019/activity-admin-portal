import { Card, Empty } from 'antd';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>系统设置</h1>
      <Card>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <p style={{ fontSize: 16, marginBottom: 8 }}>系统设置功能开发中</p>
              <p style={{ color: '#8c8c8c' }}>这里将提供系统配置选项，包括主题、语言、通知等设置</p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default SettingsPage;
