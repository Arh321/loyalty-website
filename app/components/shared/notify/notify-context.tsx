"use client";
// context/NotificationContext.tsx
import React, { createContext, useContext, useCallback } from "react";
import { notification } from "antd";
import style from "./notif.module.css";
import {
  WarningOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import clsx from "clsx";

interface NotificationContextType {
  showNotification: (config: NotificationConfig) => void;
}

interface NotificationConfig {
  message: string;
  description: string;
  type: "success" | "error" | "warning" | "info"; // you can also add 'info' as a default
  icon?: React.ReactNode; // Optional custom icon
  duration?: number;
}

// Define the types of the provider's props
interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification({
    rtl: true,
  });

  const showNotification = useCallback(
    ({ type, icon, message, description, duration }: NotificationConfig) => {
      // Set default icons based on the type of notification
      let defaultIcon: React.ReactNode;
      switch (type) {
        case "success":
          defaultIcon = <CheckCircleOutlined className=" text-succuss" />;
          break;
        case "error":
          defaultIcon = <CloseCircleOutlined className=" text-alert" />;
          break;
        case "warning":
          defaultIcon = <WarningOutlined className=" text-focus-1" />;
          break;
        default:
          defaultIcon = null; // info type doesn't need a default icon
      }

      // Custom content render
      const content = (
        <div dir="rtl">
          <div
            style={{ flex: 1 }}
            className=" flex flex-col gap-2 xl:gap-3 ldxl:gap-5"
          >
            <div className=" flex gap-1">
              <div style={{ paddingLeft: "10px", alignSelf: "center" }}>
                {icon || defaultIcon}
              </div>
              <strong className=" text-base xl:text-lg dxl:text-xl">
                {message}
              </strong>
            </div>
            <p className=" text-sm xl:text-base dxl:text-lg">{description}</p>
          </div>
        </div>
      );

      // If a custom icon is provided, use that; otherwise, use the default icon
      api.open({
        message: content,
        props: {
          className: "z-[10000000000]",
        },
        duration: duration || 4.5,
        className: clsx(
          "font-regular notification-wrapper z-[10000000000]",
          style["notif-container"]
        ),
        showProgress: true,
        style: {
          background: "rgba(255, 255, 255, 0.1)", // Light transparency
          backdropFilter: "blur(10px)", // Blur effect
          borderRadius: "10px", // Optional: smooth edges
          padding: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow
        },
        role: "alert",
      });
    },
    [api]
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className={style["notif-parent"]}>{contextHolder}</div>
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
