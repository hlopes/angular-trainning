import { createFeature, createReducer, on } from '@ngrx/store'
import { routerNavigatedAction } from '@ngrx/router-store'

import { updateArticleActions } from './actions'
import { UpdateArticleStateInterface } from '../types/updateArticleState.interface'

const initialState: UpdateArticleStateInterface = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
}

const updateArticleFeature = createFeature({
  name: 'updateArticle',
  reducer: createReducer(
    initialState,
    on(updateArticleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(updateArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(updateArticleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(updateArticleActions.updateArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(updateArticleActions.updateArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
    })),
    on(updateArticleActions.updateArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState),
  ),
})

export const {
  name: updateArticleFeatureKey,
  reducer: updateArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} = updateArticleFeature
