import initialState from '../state';

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggleBottomModal': {
      return {
        ...state,
        bottomModal: action.payload.bottomModal,
      };
    }
    case 'viewTask': {
      return {
        ...state,
        selectedTask: action.payload.selectedTask,
      };
    }
    case 'ADD_TASK':
      const maxId = state.tasks.reduce((max, task) => Math.max(max, task.id), 0);
      const newTask = {
        ...action.payload,
        id: maxId + 1,
        progress: 0,  // Assuming new tasks start with 0% completion
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, progress: task.progress === 100 ? 0 : 100 } : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.taskId),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, ...action.payload.updates } : task
        ),
      };
    default:
      return state;
  }
};

export default appReducer;
