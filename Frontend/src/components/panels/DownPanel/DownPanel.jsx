import './DownPanel.css'

import { useContext } from "react";
import { Segmented } from 'antd';

import { ThemeContext } from '@/context/ThemeContext';

function DounPanel() {
  const {
    objectBackgroundTheme,
    colorTheme,
    sliderColor,
    selectedBackgroundTheme,
    selectedColorTheme,
  } = useContext(ThemeContext);

  return (
    <div style={{  
          height: 'auto',
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
    }}>
      <Segmented
        className="custom-segmented"
        size="large"
        options={['В планах', 'Смотрю', 'Просмотрено', 'Отложено', 'Избранное']}
        style={{
          '--seg-bg': objectBackgroundTheme,
          '--seg-color': colorTheme,
          '--seg-selected-bg': selectedBackgroundTheme,
          '--seg-selected-color': selectedColorTheme,
          '--ant-primary-color': sliderColor,
          // '--ant-primary-color-hover': sliderColor,
        }}
      />
    </div>
  )
}

export default DounPanel;