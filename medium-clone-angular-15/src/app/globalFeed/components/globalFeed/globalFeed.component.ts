import {Component} from "@angular/core";

import {FeedComponent} from "../../../shared/components/feed/feed.component";

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  templateUrl: './globalFeed.component.html',
  imports: [FeedComponent]
})
export class GlobalFeedComponent {
  apiUrl = '/articles'
}
