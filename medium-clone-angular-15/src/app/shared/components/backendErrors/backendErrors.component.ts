import { Component, Input, OnInit } from '@angular/core'
import { BackendErrorsInterface } from '../../types/backendErrors.interface'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  templateUrl: './backendErrors.component.html',
  imports: [CommonModule],
})
export class BackendErrorsComponent implements OnInit {
  @Input()
  backendErrors: BackendErrorsInterface = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ')

      return `${name} ${messages}`
    })
  }
}
