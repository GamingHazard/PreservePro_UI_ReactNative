import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = (count) => {
    setUnreadCount(count);
  };

  return (
    <NotificationContext.Provider value={{ unreadCount, updateUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
