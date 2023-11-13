import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'

import { selectCurrentUser } from '../../../auth/store/reducer'

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  templateUrl: './topBar.component.html',
  imports: [CommonModule, RouterLink],
})
export class TopBarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  })

  constructor(private store: Store) {}
}
