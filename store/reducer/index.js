import {authReducer} from './AuthReducer';
import { appReducer } from './appReducer';

const reduceReducers = (...reducers) => (prevState, value, ...args) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState,
  );

export default reduceReducers(authReducer, appReducer);
