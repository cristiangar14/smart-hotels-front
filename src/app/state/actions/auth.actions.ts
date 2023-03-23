import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';

export const setUser = createAction(
  '[auth] setUser',
  props<{user: UserModel}>()
);

export const unSetUser = createAction(
  '[auth] unSetUser'
);
