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

export const setPlayerAction = (data) => {
  const player = {
    ...data,
    assertions: 0,
    score: 0,
  };
  localStorage.setItem('state', JSON.stringify({ player }));
  return {
    type: 'SET_PLAYER',
    payload: player,
  };
};

export const logIn = (token) => ({ type: 'LOG_IN', payload: token });

export const getToken = () => async (dispatch) => {
  const reponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await reponse.json();
  localStorage.setItem('token', token);
  return dispatch(logIn(token));
};
