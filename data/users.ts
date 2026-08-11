export const users = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  invalidPassword: {
    username: 'standard_user',
    password: 'mauvais_mot_de_passe',
  },

  unknownUser: {
    username: 'utilisateur_inexistant',
    password: 'secret_sauce',
  },

  emptyUsername: {
    username: '',
    password: 'secret_sauce',
  },

  emptyPassword: {
    username: 'standard_user',
    password: '',
  },
};
