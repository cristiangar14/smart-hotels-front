import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from '../actions';

export interface UIState {
    isLoading: boolean;
}

export const initialState: UIState = {
   isLoading: false,
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true})),
    on(stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state:any, action:any) {
    return _uiReducer(state, action);
}
