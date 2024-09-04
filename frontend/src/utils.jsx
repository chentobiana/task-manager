import { notification } from 'antd';

export const showNotification = (type, message) => {
  notification[type]({
    message: message,
    placement: 'top', // Position the notification at the top
    duration: 3, // Duration in seconds
    style: {
      backgroundColor: type === 'success' ? '#f6ffed' : '#fff2f0', // Green for success, Red for error
      color: type === 'success' ? '#389e0d' : '#cf1322', // Green text for success, Red text for error
    },
  });
};
