import { useContext } from 'react';

import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import { ThemeContext } from '@/context/ThemeContext';

const LoginButton = ({ showDrawer }) => {

  const { buttonBackgroundTheme } = useContext(ThemeContext);

  return (
    <Button
        className="custom-button"
        type="default"
        onClick={showDrawer}
        style={{
        '--button-bg': buttonBackgroundTheme,
        }}
    >
        <LoginOutlined />
    </Button>
  );
};

export default LoginButton;