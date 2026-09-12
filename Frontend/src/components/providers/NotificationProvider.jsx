import { createContext, useContext } from "react";
import { notification } from "antd";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {

  const [api, contextHolder] = notification.useNotification();
  
  const notify = (type, title, description) => {
    api[type]({
      title: <span style={{ color: "#ffffff", fontWeight: 600 }}>{title}</span>,
      description: <span style={{ color: "#ffffff" }}>{description}</span>,
      style: {
        // backgroundColor: theme === "dark" ? "#000000" : "rgba(22, 119, 255, 0.38)",
        backgroundColor: "#000000",
        border: "1px dashed #1677ff",
      },
    });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);