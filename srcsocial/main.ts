import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
import Amplify from 'aws-amplify';

  Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: 'us-east-1',
        userPoolId: 'us-east-1_fiLGu5JtO',
        identityPoolId: 'us-east-1:3b688ffa-eb1e-4157-bdcf-2abed2117e65',
        userPoolWebClientId: '7j5jrsiv5prvi3ep29mg72m5ri'
    },

    Storage: {
        AWSS3: {
        bucket: 'p2p2p', //REQUIRED - Amazon S3 bucket
        region: 'us-east-1', //OPTIONAL - Amazon service region
      }
    }
  });
