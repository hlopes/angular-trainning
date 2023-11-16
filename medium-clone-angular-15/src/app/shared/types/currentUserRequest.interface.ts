import { CurrentUser } from './currentUser.interface'

export interface CurrentUserRequestInterface {
  user: CurrentUser & { password: string }
}
