import { useContext } from 'react';
import { Drawer, Form } from 'antd';

import { LoadingState, LoggedInState, LoginForm } from './LoginStates';

import { ThemeContext } from '@/context/ThemeContext';
import { AuthContext } from "@/context/AuthContext";

import { useNotification } from "@/components/providers/NotificationProvider";

function LoginPanel({ open, onClose }) {
  const { 
    user, 
    login, 
    sessions,
    logoutSession,
    loading 
  } = useContext(AuthContext);
  
  const [form] = Form.useForm();

  const { notify } = useNotification();

  const { 
    // theme,
    buttonBackgroundTheme,
    // objectBackgroundTheme,
    colorTheme,
    // sliderColor,
    // selectedBackgroundTheme,
    // selectedColorTheme,
    loginBackgroundThemeBody,
    loginBackgroundThemeHeader,
  } = useContext(ThemeContext);
  
  const handleFinish = async (values) => {
    try {
      const data = await login(values.username, values.password);
      form.resetFields();

      notify("success", "Login Successful", `Welcome, ${data.username}!`);
      console.log("LOGIN OK:", data);
    } catch (err) {
      let errorText = "Unexpected error occurred";
      if (err.response) {
        const detail = err.response.data?.detail;
        errorText = typeof detail === 'string' 
          ? detail 
          : (detail ? JSON.stringify(detail) : err.response.data?.message || errorText);
      }
      notify("error", "Login Failed", errorText);
      console.error("LOGIN FAILED:", err);
    }
  };

  const drawerTitle = user ? `Welcome ${user.username} :)` : "Your Welcome :)";

  let content;
  if (loading) {
    content = <LoadingState />;
  } else if (user) {
    content = <LoggedInState user={user} sessions={sessions} onLogoutSession={logoutSession}/>;
  } else {
    content = (
      <LoginForm
        form={form}
        onFinish={handleFinish}
        buttonBackgroundTheme={buttonBackgroundTheme}
      />
    );
  }

  return (
    <div>
      <Drawer
        title={drawerTitle}
        placement="top"
        closable={false}
        onClose={onClose}
        open={open}
        key="top"
        height="55vh"
        styles={{
          body: {
            background: loginBackgroundThemeBody,
            color: colorTheme,
          },
          header: {
            backgroundColor: loginBackgroundThemeHeader,
            color: "#fff",
          },
        }}
      >
        {content}
      </Drawer>
    </div>
  );
};

export default LoginPanel;