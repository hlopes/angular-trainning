import { Route } from '@angular/router'
import { provideEffects } from '@ngrx/effects'

import { CreateArticleComponent } from './components/createArticle/createArticle.component'
import { CreateArticleService } from './components/services/createArticle.service'
import * as createArticleEffects from './store/effects'
import { provideState } from '@ngrx/store'
import { createArticleFeatureKey, createArticleReducer } from './store/reducer'

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
]
