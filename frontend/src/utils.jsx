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

export const handleApiError = (operationName, error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(`${operationName} - Error response:`, error.response);
    showNotification('error', `Error during ${operationName}: ${error.response.data.message || error.response.data}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error(`${operationName} - Error request:`, error.request);
    showNotification('error', `No response received.`);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(`${operationName} - Error message:`, error.message);
    showNotification('error', `Error during ${operationName}: ${error.message}`);
  }
};

