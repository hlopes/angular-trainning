import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { select, Store } from '@ngrx/store'
import { combineLatest, filter, map, Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

import { ArticleFormComponent } from '../../../shared/components/articleForm/articleForm.component'
import { ArticleFormValuesInterface } from '../../../shared/components/articleForm/types/articleFormValues.interface'
import { updateArticleActions } from '../../store/actions'
import {
  selectIsSubmitting,
  selectValidationErrors,
  selectArticle,
  selectIsLoading,
} from '../../store/reducer'
import { BackendErrorsComponent } from '../../../shared/components/backendErrors/backendErrors.component'
import { ArticleService } from '../../../shared/services/articles.service'
import { ArticleInterface } from '../../../shared/types/article.interface'
import { LoadingComponent } from '../../../shared/components/loading/errorMessage.component'

@Component({
  selector: 'mc-update-article',
  templateUrl: './updateArticle.component.html',
  standalone: true,
  imports: [
    ArticleFormComponent,
    CommonModule,
    BackendErrorsComponent,
    LoadingComponent,
  ],
})
export class UpdateArticleComponent implements OnInit {
  // initialValues: ArticleFormValuesInterface = {
  //   title: '',
  //   description: '',
  //   body: '',
  //   tagList: [],
  // }
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map(
      (article: ArticleInterface): ArticleFormValuesInterface => ({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }),
    ),
  )

  slug = this.route.snapshot.paramMap.get('slug') ?? ''

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  })

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    this.store.dispatch(
      updateArticleActions.updateArticle({
        request: { article: articleFormValues },
        slug: this.slug,
      }),
    )
  }

  ngOnInit(): void {
    this.store.dispatch(updateArticleActions.getArticle({ slug: this.slug }))
  }
}
