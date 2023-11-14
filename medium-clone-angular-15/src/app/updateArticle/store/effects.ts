import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

import { ArticleInterface } from '../../shared/types/article.interface'
import { updateArticleActions } from './actions'
import { UpdateArticleService } from '../components/services/updateArticle.service'
import { ArticleService as SharedArticleService } from '../../shared/services/articles.service'

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService),
  ) => {
    return actions$.pipe(
      ofType(updateArticleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return updateArticleActions.getArticleSuccess({ article })
          }),
          catchError(() => of(updateArticleActions.getArticleFailure())),
        )
      }),
    )
  },
  { functional: true },
)

export const updateArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    updateArticleService = inject(UpdateArticleService),
  ) => {
    return actions$.pipe(
      ofType(updateArticleActions.updateArticle),
      switchMap(({ request, slug }) => {
        return updateArticleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) => {
            return updateArticleActions.updateArticleSuccess({ article })
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              updateArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              }),
            ),
          ),
        )
      }),
    )
  },
  { functional: true },
)

export const redirectAfterUpdateArticleEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(updateArticleActions.updateArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug])
      }),
    )
  },
  { functional: true, dispatch: false },
)
