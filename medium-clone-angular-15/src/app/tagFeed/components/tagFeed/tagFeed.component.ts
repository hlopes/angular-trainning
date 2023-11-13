import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { FeedComponent } from '../../../shared/components/feed/feed.component'
import { BannerComponent } from '../../../shared/components/banner/banner.component'
import { PopularTagsComponent } from '../../../shared/components/popularTags/popularTags.component'
import { FeedTogglerComponent } from '../../../shared/components/feedToggler/feedToggler.component'

@Component({
  selector: 'mc-tag-feed',
  standalone: true,
  templateUrl: './tagFeed.component.html',
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  apiUrl = ''
  tagName = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tagName = params['slug']
      this.apiUrl = `articles?tag=${this.tagName}`
    })
  }
}
