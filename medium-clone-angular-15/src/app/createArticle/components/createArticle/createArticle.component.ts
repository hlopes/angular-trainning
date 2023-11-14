import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'

import { ArticleFormComponent } from '../../../shared/components/articleForm/articleForm.component'
import { ArticleFormValuesInterface } from '../../../shared/components/articleForm/types/articleFormValues.interface'
import { createArticleActions } from '../../store/actions'
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducer'
import { BackendErrorsComponent } from '../../../shared/components/backendErrors/backendErrors.component'

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, BackendErrorsComponent],
})
export class CreateArticleComponent {
  initialValues: ArticleFormValuesInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    this.store.dispatch(
      createArticleActions.createArticle({
        request: { article: articleFormValues },
      }),
    )
  }
}
