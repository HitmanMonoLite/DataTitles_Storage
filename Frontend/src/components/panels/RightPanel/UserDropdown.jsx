import { Button, Dropdown, Space } from 'antd';
import { DownOutlined, LogoutOutlined /* SettingOutlined */ } from '@ant-design/icons';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNotification } from "@/components/providers/NotificationProvider";
import { ThemeContext } from '@/context/ThemeContext';

const UserDropdown = ({ user, showDrawer }) => {
  const { logout } = useContext(AuthContext);
  const { notify } = useNotification();

  const {
    buttonBackgroundTheme,
    objectBackgroundTheme,
    colorTheme,
    selectedBackgroundTheme,
    selectedColorTheme,
  } = useContext(ThemeContext);

  const menu = {
    className: "custom-dropdown-menu",
    style: {
      '--menu-bg': objectBackgroundTheme,
      '--menu-color': colorTheme,
      '--menu-selected-bg': selectedBackgroundTheme,
      '--menu-selected-color': selectedColorTheme,
    },
    items: [
      {
        key: '1',
        label: 'Profile',
        onClick: () => showDrawer(),
      },
      // {
      //   key: '2',
      //   label: 'Settings',
      //   icon: <SettingOutlined />,
      // },
      // {
      //   type: 'divider',
      // },
      {
        key: '2',
        label: 'Logout',
        icon: <LogoutOutlined />,
        danger: true,
        onClick: async () => {
          const result = await logout();
          console.log(result?.message);
          if (notify) notify("info", "Logout", result?.message || "You have logged out");
        },
      },
    ],
  };

  return (
    <Dropdown menu={menu} placement="bottomLeft">
      <Button
        className="custom-button"
        type="default"
        style={{
          '--button-bg': buttonBackgroundTheme,
        }}
      >
        <Space>
          {user.username}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default UserDropdown;