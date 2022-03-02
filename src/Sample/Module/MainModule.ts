import { Module } from '@nestjs/common'
import { AppController } from '../Presentation/Sample/app.controller'
import { AppService } from '../Application/Sample/app.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
