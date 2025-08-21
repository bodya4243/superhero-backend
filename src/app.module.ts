import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {PrismaService} from "./prisma.service";
import {HeroService} from "./hero.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, HeroService]
})
export class AppModule {}
