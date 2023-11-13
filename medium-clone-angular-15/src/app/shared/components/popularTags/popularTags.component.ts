import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { CommonModule } from '@angular/common'

import { popularTagsActions } from './store/actions'
import {
  selectError,
  selectIsLoading,
  selectPopularData,
} from './store/reducer'
import { LoadingComponent } from '../loading/errorMessage.component'
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  templateUrl: './popularTags.component.html',
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    popularTags: this.store.select(selectPopularData),
  })

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags())
  }
}
