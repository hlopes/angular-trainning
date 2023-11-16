import { createFeature, createReducer, on } from '@ngrx/store'

import { userProfileActions } from './actions'
import { UserProfileStateInterface } from '../types/userProfileState.interface'

const initialState: UserProfileStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.profile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
  ),
})

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectData: selectUserProfileData,
} = userProfileFeature
