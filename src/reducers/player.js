const INITIAL_PLAYER_STATE = {
  email: '',
  nome: '',
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
      nome: action.payload.name,
    };
  default:
    return state;
  }
};

export default player;
