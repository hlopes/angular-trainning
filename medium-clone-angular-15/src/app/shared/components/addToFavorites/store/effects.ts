import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { catchError, map, of, switchMap } from 'rxjs'

import { addToFavoritesActions } from './actions'
import { FavoritesService } from '../services/favorites.service'

export const addToFavoritesEffect = createEffect(
  (actions$ = inject(Actions), favoritesService = inject(FavoritesService)) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? favoritesService.removeFromFavorites(slug)
          : favoritesService.addToFavorites(slug)

        return article$.pipe(
          map((article) =>
            addToFavoritesActions.addToFavoritesSuccess({ article }),
          ),
          catchError(() => of(addToFavoritesActions.addToFavoritesFailure())),
        )
      }),
    )
  },
  { functional: true },
)
