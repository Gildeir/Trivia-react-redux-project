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

export const requestTriviaApi = () => ({
  type: 'REQUEST_TRIVIA_API',
  payload: {
    isFetching: true,
  },
});
export const requestTriviaApiSuccess = (queryFromApi) => ({
  type: 'REQUEST_TRIVIA_API_SUCCESS',
  payload: {
    isFetching: false,
    query: queryFromApi,
  },
});
export const requestTriviaApiError = (error) => ({
  type: 'REQUEST_TRIVIA_API_ERROR',
  payload: {
    isFetching: false,
    error,
  },
});

export const fetchApiTrivia = () => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(requestTriviaApi);
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((success) => dispatch(requestTriviaApiSuccess(success)))
    .catch((error) => dispatch(requestTriviaApiError(error)));
};

export const pointsPlayer = (points) => ({
  type: 'POINTS_PLAYER',
  payload: {
    points,
  },
});

export const timeOut = (condition) => ({
  type: 'TIME_OUT',
  payload: {
    timeOut: condition,
  },
});

export const timeRemain = (time) => ({
  type: 'TIME_REMAIN',
  payload: {
    time,
  },
});

export const setScore = (score) => ({
  type: 'SET_SCORE',
  payload: {
    score,
  },
});
