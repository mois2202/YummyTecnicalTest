import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Mobility Inc.',
      version: '1.0.0',
      description: 'API for managing payments of users',
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
    components: {
      schemas: {
        UserWithoutPassword: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            user: { type: 'string', example: 'mois2202' },
            email: { type: 'string', example: 'yummy@prueba.com' },
            role: { type: 'integer', example: 1 },
            balance: { type: 'number', example: 1000.0 },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-20T12:34:56.789Z',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'integer' },
            balance: { type: 'number' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            amount: { type: 'number', format: 'float', example: 500.0 },
            payerId: { type: 'integer', example: 1 },
            collectorId: { type: 'integer', example: 2 },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'cancelled'],
              example: 'pending',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-21T10:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-21T12:00:00.000Z',
            },
          },
        },
        TransactionCreation: {
          type: 'object',
          properties: {
            amount: { type: 'number', format: 'float', example: 500.0 },
            payerId: { type: 'integer', example: 1 },
            collectorId: { type: 'integer', example: 2 },
          },
        },
        UserRole: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            role_name: { type: 'string', example: 'payer' },
            initial_balance: { type: 'number', format: 'float', example: 1000.0 },
          },
        },
        UserRoleCreation: {
          type: 'object',
          properties: {
            role_name: { type: 'string', example: 'new_role' },
            initial_balance: { type: 'number', format: 'float', example: 500.0 },
          },
        },
      },
    },
  },
  apis: [
    './src/users/*.ts',
    './src/roles/*.ts',
    './src/transactions/*.ts',
    './src/shared/**/*.ts',
    './src/auth/*.ts',
  ],
};

export const specs = swaggerJSDoc(options);

