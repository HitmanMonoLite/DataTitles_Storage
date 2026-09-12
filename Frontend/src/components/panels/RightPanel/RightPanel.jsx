import './RightPanel.css'

import { useContext, useState } from 'react';

import { AuthContext } from '@/context/AuthContext';

import ThemeSwitch from '../../theme/ThemeSwitcher';
import LoginPanel from '../LoginPanel/LoginPanel';

// import { useNotification } from "@/components/providers/NotificationProvider";

import LoginButton from './LoginButton';
import UserDropdown from './UserDropdown';

function RightPanel() {
  const { user } = useContext(AuthContext);

  const [loginOpen, setLoginOpen] = useState(false);

  const showDrawer = () => setLoginOpen(true);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <ThemeSwitch />

        {!user ? (
          <LoginButton
            showDrawer={showDrawer}
          />
        ) : (
          <UserDropdown
            user={user}
            showDrawer={showDrawer}
          />
        )}
      </div>

      <LoginPanel open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default RightPanel;