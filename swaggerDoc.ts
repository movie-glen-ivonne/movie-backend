import swaggerJsDoc from "swagger-jsdoc";

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Library of Movies API',
        version: '1.0.0',
        description: 'API for managing libaries of movies and/or TV show',
      },
      servers: [
        {
          url: 'https://movie-project-bk-630243095989.us-central1.run.app',
        },
      ],
    },
    apis: [
        './routes/authRouter.ts',
        './routes/userRouter.ts', 
        './routes/libraryMovieRouter.ts', 
        './routes/libraryRouter.ts', 
        './routes/movieRouter.ts', 
        './routes/recommendationsRouter.ts', 
        './routes/searchRouter.ts',
        './docs/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


export default swaggerDocs