import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { stringify as yamlStringify } from 'yaml';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Restaurant Platform API')
    .setDescription(
      'Colección de endpoints para la gestión integral de restaurantes, incluyendo menús, reservaciones, mesas y suscripciones.',
    )
    .setVersion('1.0.0')
    .setContact(
      'Equipo de Plataforma Restaurantes',
      'https://example.com',
      'soporte@example.com',
    )
    .addServer('/', 'Servidor local')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        description:
          'Token JWT emitido por el servicio de autenticación. Inclúyelo en el encabezado Authorization.',
      },
      'bearer',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
    customSiteTitle: 'Restaurant Platform API Docs',
  });

  const swaggerDir = join(process.cwd(), 'swagger');
  if (!existsSync(swaggerDir)) {
    mkdirSync(swaggerDir, { recursive: true });
  }

  writeFileSync(
    join(swaggerDir, 'swagger.json'),
    JSON.stringify(swaggerDocument, null, 2),
    'utf-8',
  );
  writeFileSync(
    join(swaggerDir, 'swagger.yaml'),
    yamlStringify(swaggerDocument),
    'utf-8',
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
bootstrap();
