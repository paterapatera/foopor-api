import { PrismaService } from './_Common'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MainModule } from 'src/MainModule'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)
  app.get(PrismaService).enableShutdownHooks(app)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
