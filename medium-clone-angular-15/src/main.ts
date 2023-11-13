import { isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideEffects } from '@ngrx/effects'
import { provideState, provideStore } from '@ngrx/store'
import { provideRouterStore, routerReducer } from '@ngrx/router-store'
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'
import { authFeatureKey, authReducer } from './app/auth/store/reducer'
import * as authEffects from './app/auth/store/effects'
import { authInterceptor } from './app/shared/services/authInterceptor'

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ router: routerReducer }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
}).catch((err) => console.error(err))