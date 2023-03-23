import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/core/models/user.state';
import { setUser, unSetUser } from '../actions';



export const userInitialState: UserState = {
  user: null,
}

const _authReducer = createReducer(
  userInitialState,
  on(setUser, (state, { user }) => ({
    ...state,
    user: {...user}

  })),
  on(unSetUser, (state) => ({
    ...state,
    user: null
  }))
);

export function authReducer(state:any, action:any) {
  return _authReducer(state, action)
}
