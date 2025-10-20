import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isAuthenticated: false,
    user: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      const newState = {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
      AsyncStorage.setItem('authState', JSON.stringify(newState))
        .catch(err => console.error('Failed to save auth state', err));
      return newState;

    case 'LOGOUT':
      AsyncStorage.removeItem('authState')
        .catch(err => console.error('Failed to remove auth state', err));
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
}

export { authReducer, initialState };
