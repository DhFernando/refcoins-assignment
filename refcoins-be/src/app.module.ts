import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { PrismaModule } from './prisma/prisma.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [PropertyModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
