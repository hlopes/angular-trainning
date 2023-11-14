import { Route } from '@angular/router'
import { provideEffects } from '@ngrx/effects'

import { UpdateArticleComponent } from './components/updateArticle/updateArticle.component'
import { UpdateArticleService } from './components/services/updateArticle.service'
import * as updateArticleEffects from './store/effects'
import { provideState } from '@ngrx/store'
import { updateArticleFeatureKey, updateArticleReducer } from './store/reducer'

export const routes: Route[] = [
  {
    path: '',
    component: UpdateArticleComponent,
    providers: [
      UpdateArticleService,
      provideEffects(updateArticleEffects),
      provideState(updateArticleFeatureKey, updateArticleReducer),
    ],
  },
]
