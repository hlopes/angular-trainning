import { Component, OnInit } from '@angular/core'
import { articleActions } from '../store/actions'
import { Store } from '@ngrx/store'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { combineLatest, filter, map } from 'rxjs'
import { CommonModule } from '@angular/common'
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/reducer'
import { selectCurrentUser } from '../../auth/store/reducer'
import { CurrentUser } from '../../shared/types/currentUser.interface'
import { LoadingComponent } from '../../shared/components/loading/errorMessage.component'
import { ErrorMessageComponent } from '../../shared/components/errorMessage/errorMessage.component'
import { TagListComponent } from '../../shared/tagList/tagList.component'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? ''

  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUser | null =>
            currentUser !== undefined,
        ),
      ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false
      }

      return article.author.username === currentUser.username
    }),
  )

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  })

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }))
  }

  deleteArticle() {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }))
  }
}
