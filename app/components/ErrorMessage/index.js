import message from 'antd/lib/message';

export function showHTTPErrorMessage(status) {
  message.error(HTTP_STATUS_MESSAGE[status], DURATION_ERROR_MESSAGE);
}

export function showErrorMessage(code) {
  message.error(ERROR_CODE_MESSAGE[code], DURATION_ERROR_MESSAGE);
}

const HTTP_STATUS_MESSAGE = {
  401: 'Session 過期，請重新登入',
  500: '系統壞了，麻煩請通知系統管理員來做修正，感謝',
  503: '無法與伺服器建立連線！',
  420: '請檢查您的網路連線！',
};

export const ERROR_CODE_MESSAGE = {
};

const DURATION_ERROR_MESSAGE = 3;
