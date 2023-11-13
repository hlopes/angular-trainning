import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { catchError, map, of, switchMap } from 'rxjs'

import { PopularTagsService } from '../services/popularTags.service'
import { popularTagsActions } from './actions'
import { PopularTagType } from '../../../types/popularTag.type'

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagsService),
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((tags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({
              popularTags: tags,
            })
          }),
          catchError(() => of(popularTagsActions.getPopularTagsFailure())),
        )
      }),
    )
  },
  { functional: true },
)
