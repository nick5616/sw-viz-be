import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/film/:filmNumber')
  getStarShipsInFilm(@Param('filmNumber') filmNumber: number) {
    return this.appService.getStarshipsInFilm(filmNumber);
  }

  @Get('/cost/:filmNumber')
  getCostOfFilm(@Param('filmNumber') filmNumber: number) {
    return this.appService.getCostOfStarshipsInFilm(filmNumber);
  }
}
