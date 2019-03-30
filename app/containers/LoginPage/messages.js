import { defineMessages } from 'react-intl';

export default defineMessages({
  loginMessage: {
    id: 'containers.LoginPage.login.message',
    defaultMessage: '登入',
  },
  registerMessage: {
    id: 'containers.LoginPage.register.message',
    defaultMessage: '註冊',
  },
  resetPasswordMessage: {
    id: 'containers.LoginPage.resetPassword.message',
    defaultMessage: '忘記密碼?',
  },
  emailMessage: {
    id: 'containers.LoginPage.email.message',
    defaultMessage: 'Email',
  },
  passwordMessage: {
    id: 'containers.LoginPage.password.message',
    defaultMessage: '密碼',
  },
  loginFailMessage: {
    id: 'containers.LoginPage.loginFailMessage.message',
    defaultMessage: '登入失敗，密碼錯誤或無效的 Email',
  },
  loginEmailEmptyMessage: {
    id: 'containers.LoginPage.loginEmailEmpty.message',
    defaultMessage: '忘了輸入 Email?',
  },
  loginPasswordEmptyMessage: {
    id: 'containers.LoginPage.loginPasswordEmpty.message',
    defaultMessage: '忘了輸入密碼?',
  },
});
