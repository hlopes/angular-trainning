import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../../../medium-clone-angular-15/src/app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
