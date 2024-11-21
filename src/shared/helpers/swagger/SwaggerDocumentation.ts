import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const isProduction = process.env.NODE_ENV === 'production';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Mobility Inc.',
      version: '1.0.0',
      description: 'API for manage payments of Users',
      contact: {
        name: 'Developer',
      },
    },
    servers: [
      {
        url: isProduction
          ? 'http://api.your-production-url.com'
          : 'http://localhost:3000',
        description: isProduction ? 'Production server' : 'Local server',
      },
    ],
  },
  apis: isProduction
    ? [
        path.resolve('/usr/src/app/dist/shared/helpers/swagger/SwaggerSchemas.yml'),
        path.resolve('/usr/src/app/dist/users/*.js'),
        path.resolve('/usr/src/app/dist/roles/*.js'),
        path.resolve('/usr/src/app/dist/transactions/*.js'),
      ]
    : [
        path.resolve(__dirname, '../shared/helpers/swagger/SwaggerSchemas.yml'),
        path.resolve(__dirname, '../users/*.ts'),
        path.resolve(__dirname, '../roles/*.ts'),
        path.resolve(__dirname, '../transactions/*.ts'),
      ],
};

export const specs = swaggerJSDoc(options);
