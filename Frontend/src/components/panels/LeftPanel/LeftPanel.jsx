import './LeftPanel.css'

import { useContext, useEffect, useState } from 'react';
import { Button, Menu } from 'antd';
import axios from "axios";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import { ThemeContext } from '@/context/ThemeContext';

function LeftPanel() {
  
  const [options, setOptions] = useState([]);
  const fetchOptions = async () => {
  try {
    // const response = await axios.get('some-ip');
    const nameOptions = response.data.map(c => ({
      key: c.id,
      label: c.first_name,
    }));

    setOptions(nameOptions);

    // console.log(response.data);
    } catch(err) {
      // console.error("Ошибка при загрузке options:", err);
    }
  };

  useEffect(() => {
    fetchOptions()
  }, []);

  const {
    // theme,
    buttonBackgroundTheme,
    objectBackgroundTheme,
    colorTheme,
    // sliderColor,
    selectedBackgroundTheme,
    selectedColorTheme,
  } = useContext(ThemeContext);

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      width: collapsed ? 80 : 256,
      zIndex: 500,
      transition: 'width 220ms linear',
    }}>
      <Button className="custom-button" type="primary" onClick={toggleCollapsed} style={{ 
          marginBottom: 16,
          '--button-bg': buttonBackgroundTheme,
      }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
      className="custom-menu"
      style={{
        flex: 1,
        overflow: 'auto',
        '--menu-bg': objectBackgroundTheme,
        '--menu-color': colorTheme,
        '--menu-selected-bg': selectedBackgroundTheme,
        '--menu-selected-color': selectedColorTheme,
      }}
        // theme={theme}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={options}
      />
    </div>
  );
};

export default LeftPanel;