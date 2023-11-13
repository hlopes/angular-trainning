import { Component } from '@angular/core'

import { FeedComponent } from '../../../shared/components/feed/feed.component'
import { BannerComponent } from '../../../shared/components/banner/banner.component'
import { PopularTagsComponent } from '../../../shared/components/popularTags/popularTags.component'
import { FeedTogglerComponent } from '../../../shared/components/feedToggler/feedToggler.component'

@Component({
  selector: 'mc-your-feed',
  standalone: true,
  templateUrl: './yourFeed.component.html',
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class YourFeedComponent {
  apiUrl = 'articles/feed'
}
