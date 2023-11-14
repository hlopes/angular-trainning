import { Route } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'

import * as articleEffects from './store/effects'
import { ArticleComponent } from './components/article.component'
import { articleFeatureKey, articleReducer } from './store/reducer'
import { ArticleService } from './services/article.service'

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
      ArticleService,
    ],
  },
]
