const INITIAL_PLAYER_STATE = {
  email: '',
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_PLAYER_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL_NOME_LOGIN':
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  case 'SET_PLAYER':
    return action.payload;
  case 'REQUEST_TRIVIA_API':
    return {
      ...state,
      isFetching: action.payload.isFetching,
    };
  case 'REQUEST_TRIVIA_API_SUCCESS':
    return {
      ...state,
      isFetching: action.payload.isFetching,
      query: action.payload.query,
    };
  case 'REQUEST_TRIVIA_API_ERROR':
    return {
      ...state,
      isFetching: action.payload.isFetching,
      error: action.payload.error,
    };
  default:
    return state;
  }
};

export default player;
