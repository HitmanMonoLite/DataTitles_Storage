import { Form, Typography, Input, Button, Spin, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

import { SessionList } from "./SessionList";

const { Title, Text } = Typography;

const LoadingState = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      height: '100%',
      width: '100%',
    }}
  >
    <Spin 
      size="default" 
      style={{ transform: 'scale(2)' }}
    />
  </div>
);

const LoggedInState = ({ user, sessions, onLogoutSession }) => {
  const activeSessions = sessions?.all_sessions_user || {};
  const hasSessions = Object.keys(activeSessions).length > 0;

  const { 
    selectedBackgroundTheme
  } = useContext(ThemeContext);

  const colors = {
    textPrimary: selectedBackgroundTheme,
    textSecondary: '#ffffff',
    textMuted: selectedBackgroundTheme,
    borderTop: 'rgba(0, 225, 255, 0.58)',
  };

  return (
    <div
      style={{
        padding: 24,
        color: colors.textPrimary,
        borderRadius: 12,
      }}
    >
      <Title
        level={4}
        style={{
          color: colors.textSecondary,
          marginBottom: 20,
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}
      >
        Active Sessions
      </Title>

      {hasSessions ? (
        <SessionList
          sessions={activeSessions}
          onLogoutSession={onLogoutSession}
        />
      ) : (
        <Text style={{ color: colors.textMuted }}>
          No active sessions found
        </Text>
      )}

      <Divider style={{ borderColor: colors.borderTop, margin: '32px 0 16px' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Text strong style={{ color: colors.textSecondary }}>
          Email:
        </Text>
        <Text copyable style={{ color: colors.textPrimary }}>{user.email}</Text>
      </div>
    </div>
  );
};

const LoginForm = ({ form, onFinish }) => {
  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "Please input your Email!" },
          {
            pattern: /^[a-zA-Z0-9_@.]+$/,
            message: "Please input email only"
          },
          {
            max: 50,
            message: "Email too long"
          }
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          // { min: 6, message: "Password must be at least 6 characters" },
          { max: 100, message: "Password too long" }
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            className="custom-button"
            type="primary"
            htmlType="submit"
            disabled={
              form.getFieldsError().some(({ errors }) => errors.length > 0) ||
              !form.isFieldsTouched()
            }
          >
            Log in
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export {
  LoadingState,
  LoggedInState,
  LoginForm
};