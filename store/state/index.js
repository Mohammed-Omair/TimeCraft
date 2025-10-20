import { initialState as authState } from "../reducer/AuthReducer";
import tasksState from './tasksState'

const initialState = {
  ...authState,
  ...tasksState
};

export default initialState;
