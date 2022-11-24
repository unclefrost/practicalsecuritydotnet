import config from '../../auth_config.json';

const { domain, clientId, audience, apiUri, errorPath, aspnetApiUri } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  aspnetApiUri: string;
  errorPath: string;
};

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    ...(audience && audience !== "YOUR_API_IDENTIFIER" ? { audience } : null),
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
