import { CurrentUser } from '../../shared/types/currentUser.interface'
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface'

export interface AuthState {
  isSubmitting: boolean
  currentUser: CurrentUser | null | undefined
  isLoading: boolean
  validationErrors: BackendErrorsInterface | null
}
