const INITIAL_GAME = {
  time: 30,
};

const game = (state = INITIAL_GAME, action) => {
  switch (action.type) {
  case 'TIME_REMAIN':
    return {
      ...state,
      time: action.payload.time,
    };
  case 'TIME_OUT':
    return {
      ...state,
      timeOut: action.payload.timeOut,
    };
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

export default game;
