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
  default:
    return state;
  }
};

export default game;
