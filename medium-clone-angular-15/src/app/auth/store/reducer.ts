import { createFeature, createReducer, on } from '@ngrx/store'
import { AuthState } from '../types/authState'
import { authActions } from './actions'
import { routerNavigatedAction } from '@ngrx/router-store'

const initialState: AuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registersuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerfailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginsuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginfailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(authActions.getCurrentuserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentuserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),

    on(routerNavigatedAction, (state) => ({
      ...state,
      validationErrors: null,
    })),
  ),
})

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature
