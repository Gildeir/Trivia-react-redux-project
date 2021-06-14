export const saveEmailNomeLogin = (infoPlayer) => ({
  type: 'SAVE_EMAIL_NOME_LOGIN',
  payload: infoPlayer,
});

export const requestApi = () => ({
  type: 'REQUEST_API',
  payload: {
    isFetching: true,
  },
});
