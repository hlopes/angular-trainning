import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'
import { authActions } from './actions'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { CurrentUser } from '../../shared/types/currentUser.interface'
import { HttpErrorResponse } from '@angular/common/http'
import { PersistenceService } from '../../shared/services/persistence.service'
import { Router } from '@angular/router'

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistenceService.get('accessToken')

        if (!token) {
          return of(authActions.getCurrentuserFailure())
        }

        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUser) => {
            return authActions.getCurrentuserSuccess({ currentUser })
          }),
          catchError(() => of(authActions.getCurrentuserFailure())),
        )
      }),
    )
  },
  { functional: true },
)

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUser) => {
            persistenceService.set('accessToken', currentUser.token)

            return authActions.registersuccess({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.registerfailure({
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

export const registerAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registersuccess),
      tap(() => router.navigateByUrl('/')),
    )
  },
  { functional: true, dispatch: false },
)

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUser) => {
            persistenceService.set('accessToken', currentUser.token)

            return authActions.loginsuccess({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.loginfailure({
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

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginsuccess),
      tap(() => router.navigateByUrl('/')),
    )
  },
  { functional: true, dispatch: false },
)
