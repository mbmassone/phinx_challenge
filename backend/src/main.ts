import { NestFactory } from '@nestjs/core';
import { PokemonModule } from './pokemon/pokemon.module';

async function bootstrap() {
  const app = await NestFactory.create(PokemonModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
