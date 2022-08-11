import {combineReducers, createStore} from 'redux';
import studentsReducer from '../reducers/students-reducers';

const rootReducer = combineReducers({
  students: studentsReducer,
})

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>