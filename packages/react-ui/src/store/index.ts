import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { sliceCounter } from './sliceCounter';

const rootReducer = combineReducers({ counter: sliceCounter.reducer });
export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (preloadedState?: object) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });
