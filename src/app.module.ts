import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import CiclistaModule from './ciclista/ciclista.module';

@Module({
  imports: [DatabaseModule, CiclistaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
