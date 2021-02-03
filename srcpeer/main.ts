import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

import Amplify from 'aws-amplify';

  Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: 'us-east-1',
        userPoolId: 'us-east-1_lM5ZrYKiT',
        identityPoolId: 'us-east-1:652d077c-acdc-4bc1-936d-2c844defc340',
        userPoolWebClientId: '7h1ev0k4nb2n59quve3o4jc591'
    },

    Storage: {
        AWSS3: {
        bucket: 'p2p2p', //REQUIRED - Amazon S3 bucket
        region: 'us-east-1', //OPTIONAL - Amazon service region
      }
    }
  });

  // You can get the current config object
  // const currentConfig = Auth.configure();
