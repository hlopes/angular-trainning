import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { combineLatest } from 'rxjs'

import { selectIsSubmitting, selectValidationErrors } from '../../store/reducer'
import { authActions } from '../../store/actions'
import { AuthState } from '../../types/authState'
import { BackendErrorsComponent } from '../../../shared/components/backendErrors/backendErrors.component'

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    BackendErrorsComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
  ) {}

  onSubmit() {
    const request = { user: this.form.getRawValue() }

    this.store.dispatch(authActions.register({ request }))
  }
}
