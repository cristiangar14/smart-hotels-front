import { createSelector } from '@ngrx/store';
import { UIState } from '../reducers';
import { Appstate } from '../app.reducers';


export const selectUiFeature = (state: Appstate) => state.ui;

export const selectLoadind = createSelector(
  selectUiFeature,
  (state: UIState) => state.isLoading
);

