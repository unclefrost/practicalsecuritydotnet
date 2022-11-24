// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import config from '../../auth_config.json';

const { domain, clientId, audience, apiUri, errorPath,aspnetApiUri } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  aspnetApiUri: string;
  errorPath: string;
};

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
    redirectUri: window.location.origin,
    errorPath,
  },
  httpInterceptor: {
    allowedList: [
      aspnetApiUri,
      apiUri,
    `${apiUri}/*`,
    `${aspnetApiUri}/*`,
    {
      uri: '/weatherforecast',
      tokenOptions: {
        audience: aspnetApiUri
      },
    },
    {
      uri: '/api/accounts/*',
      tokenOptions: {
        audience: apiUri,
        scope: 'read:accounts',
      },
    },
    {
      uri: '/api/orders',
      httpMethod: 'post',
      tokenOptions: {
        audience: apiUri,
        scope: 'write:orders',
      },
    },
    {
      uri: `${domain}/api/v2/users`,
      tokenOptions: {
        audience: `${domain}/api/v2/`,
        scope: 'read:users',
      },
    },
  ]
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
