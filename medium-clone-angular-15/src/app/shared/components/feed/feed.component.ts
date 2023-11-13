import {Component, Input, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {combineLatest} from "rxjs";

import {feedActions} from "./store/actions";
import {selectError, selectFeedData, selectIsLoading} from "./store/reducer";

@Component({
  selector: 'mc-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  imports: [CommonModule, RouterLink]
})
export class FeedComponent implements OnInit{
  @Input()
  apiUrl = ''

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData)
  })

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))
  }
}
