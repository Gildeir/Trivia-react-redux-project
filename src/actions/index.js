export const saveEmailLogin = (email) => ({
  type: 'SAVE_EMAIL_LOGIN',
  payload: email,
});

export const requestApi = () => ({
  type: 'REQUEST_API',
  payload: {
    isFetching: true,
  },
});
