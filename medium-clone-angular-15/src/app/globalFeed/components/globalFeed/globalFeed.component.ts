import { Component } from '@angular/core'

import { FeedComponent } from '../../../shared/components/feed/feed.component'
import { BannerComponent } from '../../../shared/components/banner/banner.component'
import { PopularTagsComponent } from '../../../shared/components/popularTags/popularTags.component'

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  templateUrl: './globalFeed.component.html',
  imports: [FeedComponent, BannerComponent, PopularTagsComponent],
})
export class GlobalFeedComponent {
  apiUrl = '/articles'
}
