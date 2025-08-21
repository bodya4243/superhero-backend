import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {HeroesResponse, HeroService} from "./hero.service";
import type {Superheroe} from "@prisma/client";
import {SuperheroeDto} from "./dto/SuperheroDto";

@Controller("/heroes")
export class AppController {
  constructor(private readonly heroService: HeroService) {}

  @Post("/create")
  createSuperHero(@Body() superhero: SuperheroeDto): Promise<Superheroe> {
    return this.heroService.create(superhero);
  }

  @Get("/getAll")
  getAllHeroes(
      @Query('page', ParseIntPipe) page = 1,
      @Query('size', ParseIntPipe) size: number
  ): Promise<HeroesResponse> {
    return this.heroService.getHeroes(page, size);
  }

  @Put("/update")
  updateHero(
      @Body() data: Partial<Superheroe>,
    ): Promise<Superheroe> {
    return this.heroService.update(data);
  }

  @Delete("/delete/:id")
  deleteHeroById(
      @Param("id") id: number
  ): Promise<Superheroe> {
    return this.heroService.delete(Number(id));
  }
}
