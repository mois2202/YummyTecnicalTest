import swaggerJSDoc from 'swagger-jsdoc';

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
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: [ 
    './src/shared/helpers/swagger/SwaggerSchemas.yml',
    './src/users/*.ts', 
    './src/roles/*.ts', 
    './src/transactions/*.ts', 
    './src/shared/**/*.ts',
    './src/auth/*.ts']
};

export const specs = swaggerJSDoc(options);

