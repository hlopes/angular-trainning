import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { combineLatest, filter, Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'

import { selectCurrentUser } from '../../auth/store/reducer'
import { CurrentUser } from '../../shared/types/currentUser.interface'
import { selectIsSubmitting, selectValidationErrors } from '../store/reducer'
import { BackendErrorsComponent } from '../../shared/components/backendErrors/backendErrors.component'
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface'
import { authActions } from '../../auth/store/actions'
import { FavoritesService } from '../../shared/components/addToFavorites/services/favorites.service'

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorsComponent, ReactiveFormsModule],
  providers: [FavoritesService],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })

  currentUser?: CurrentUser | null

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  currentUserSubscription?: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  private initializeForm() {
    if (!this.currentUser) {
      throw new Error('Missing current user')
    }

    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    })
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe()
  }

  protected readonly onsubmit = onsubmit

  logout() {
    this.store.dispatch(authActions.logout())
  }

  onSubmit() {
    if (!this.currentUser) {
      throw new Error('Missing current user')
    }

    const request: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    }

    this.store.dispatch(authActions.updateCurrentUser({ request }))
  }
}
