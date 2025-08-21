import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {Superheroe} from "@prisma/client";
import {SuperheroeDto} from "./dto/SuperheroDto";
import {HeroResponseDto} from "./dto/HeroResponseDto";
import {HeroUpdateDto} from "./dto/HeroUpdateDto";

export interface HeroesResponse {
    content: HeroResponseDto[],
    page: number,
    total: number,
    totalPages: number,
}

@Injectable()
export class HeroService {
    constructor(private prismaService: PrismaService) {}

    async getHeroes(page: number, size: number): Promise<HeroesResponse> {
        const total = await this.prismaService.superheroe.count();
        const totalPages = Math.ceil(total / size);

        const content = await this.prismaService.superheroe.findMany({
            include: {
                hero_images: true,
                hero_powers: true,
            },
            skip: (page - 1) * size,
            take: size,
        });

        const response: HeroResponseDto[] = content.map(hero => ({
            id: hero.id,
            nick: hero.nickname,
            catchPhrase: hero.catch_phrase ?? '',
            originDescription: hero.origin_description,
            realName: hero.real_name,
            heroImages: hero.hero_images.map(image => (
                {
                    id: image.id,
                    url: image.url
                }
            )),
            heroPowers: hero.hero_powers.map(hp => (
                {
                    id: hp.id,
                    name: hp.name,
                }
            )),
        }));

        return {
            content: response,
            page,
            total,
            totalPages,
        };
    }

    async create(dto: SuperheroeDto): Promise<Superheroe> {
        return this.prismaService.superheroe.create({
            data: {
                nickname: dto.nickname,
                real_name: dto.realName,
                origin_description: dto.originDescription,
                catch_phrase: dto.catchPhrase,

                hero_images: {
                    create: dto.heroImages.map(url => ({
                        url,
                    })),
                },

                hero_powers: {
                    create: dto.heroPowers.map(name => ({
                        name,
                    })),
                },
            },
            include: {
                hero_images: true,
                hero_powers: true,
            },
        });
    }

    async update(dto: Partial<HeroUpdateDto>): Promise<Superheroe> {
        return this.prismaService.superheroe.update({
            where: { id: dto.id },
            include: {
                hero_images: true,
                hero_powers: true,
            },
            data: {
                nickname: dto.nick,
                real_name: dto.realName,
                origin_description: dto.originDescription,
                catch_phrase: dto.catchPhrase,

                hero_images: {
                    updateMany: dto.heroImages?.map((img) => ({
                        where: { id: img.id },
                        data: {
                            url: img.url,
                            alt_text: img.url,
                        },
                    })),
                },

                hero_powers: {
                    updateMany: dto.heroPowers?.map((p) => ({
                        where: { id: p.id },
                        data: {
                            name: p.name,
                        },
                    })),
                },
            },
        });
    }

    async delete(id: number): Promise<Superheroe> {
        return this.prismaService.superheroe.delete({
            where: {id},
        });
    }


}