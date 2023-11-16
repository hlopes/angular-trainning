import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { catchError, map, of, switchMap } from 'rxjs'

import { userProfileActions } from './actions'
import { UserProfileService } from '../services/userProfile.service'
import { UserProfileInterface } from '../types/userProfile.interface'

export const getUserProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService),
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((profile: UserProfileInterface) => {
            return userProfileActions.getUserProfileSuccess({ profile })
          }),
          catchError(() => of(userProfileActions.getUserProfileFailure())),
        )
      }),
    )
  },
  { functional: true },
)
