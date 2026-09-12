import { Button, Typography, Descriptions, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const { Text } = Typography;

const SessionList = ({ sessions, onLogoutSession }) => {
  const sessionEntries = Object.entries(sessions);

  const { 
    // theme,
    buttonBackgroundTheme,
    selectedBackgroundTheme
    // selectedColorTheme,
  } = useContext(ThemeContext);

  const colors = {
    textPrimary: selectedBackgroundTheme,
    textAccent: selectedBackgroundTheme,
    borderDashed: 'rgba(0, 225, 255, 0.58)',
    tagBg: buttonBackgroundTheme,
    tagBorder: selectedBackgroundTheme,
    tagText: selectedBackgroundTheme,
    label: '#fff',
  };

  return (
    <>
      {sessionEntries.map(([sessionId, session], index) => {
        const isLast = index === sessionEntries.length - 1;

        return (
          <div
            key={sessionId}
            style={{
              marginBottom: isLast ? 0 : 24,
              paddingBottom: isLast ? 0 : 16,
              borderBottom: isLast ? 'none' : `1px dashed ${colors.borderDashed}`,
            }}
          >
            <Descriptions
              column={1}
              bordered
              size="small"
              styles={{
                label: { color: colors.label, fontWeight: 500 },
                content: { color: colors.textPrimary },
              }}
            >
              <Descriptions.Item label="Browser">
                {session.agent_user_info?.browser || '—'}{' '}
                {session.agent_user_info?.browser_version || ''}
              </Descriptions.Item>

              <Descriptions.Item label="OS">
                {session.agent_user_info?.os || '—'}{' '}
                {session.agent_user_info?.os_version || ''}
              </Descriptions.Item>

              <Descriptions.Item label="Device">
                <Tag
                    style={{
                        backgroundColor: colors.tagBg,
                        borderColor: colors.tagBorder,
                        color: colors.tagText,
                    }}
                >
                    {session.agent_user_info?.device || 'Unknown'}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Logged in">
                {new Date(session.login_at * 1000).toLocaleString()}
              </Descriptions.Item>

              <Descriptions.Item label="Session ID">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Text
                    ellipsis
                    style={{
                      maxWidth: 240,
                      color: colors.textAccent,
                    }}
                  >
                    {sessionId}
                  </Text>

                  <Button
                    type="text"
                    danger
                    icon={<CloseOutlined />}
                    size="small"
                    onClick={() => onLogoutSession(sessionId)}
                    style={{ padding: 0 }}
                  />
                </div>
              </Descriptions.Item>
            </Descriptions>
          </div>
        );
      })}
    </>
  );
};

export { SessionList };