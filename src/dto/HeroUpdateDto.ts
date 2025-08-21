import { IsString, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class HeroImageDto {
    @IsInt()
    id: number;

    @IsString()
    url: string;
}

export class HeroPowerDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;
}

export class HeroUpdateDto {
    @IsInt()
    id: number;

    @IsString()
    nick: string;

    @IsString()
    realName: string;

    @IsString()
    originDescription: string;

    @IsString()
    catchPhrase: string;

    @ValidateNested({ each: true })
    @Type(() => HeroImageDto)
    heroImages: HeroImageDto[];

    @ValidateNested({ each: true })
    @Type(() => HeroPowerDto)
    heroPowers: HeroPowerDto[];
}