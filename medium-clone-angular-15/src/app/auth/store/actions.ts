import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { RegisterRequest } from '../types/registerRequest.interface'
import { CurrentUser } from '../../shared/types/currentUser.interface'
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface'
import { LoginRequestInterface } from '../types/loginRequest.interface'

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequest }>(),
    RegisterSuccess: props<{ currentUser: CurrentUser }>(),
    RegisterFailure: props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    LoginSuccess: props<{ currentUser: CurrentUser }>(),
    LoginFailure: props<{ errors: BackendErrorsInterface }>(),

    'Get Current User': emptyProps(),
    'Get CurrentUser Success': props<{ currentUser: CurrentUser }>(),
    'Get CurrentUser Failure': emptyProps(),
  },
})
