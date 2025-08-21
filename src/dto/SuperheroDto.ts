import { IsArray, IsString } from 'class-validator';

export class SuperheroeDto {
    @IsString()
    nickname: string;

    @IsString()
    realName: string;

    @IsString()
    originDescription: string;

    @IsString()
    catchPhrase: string;

    @IsArray()
    @IsString({ each: true })
    heroImages: string[];

    @IsArray()
    @IsString({ each: true })
    heroPowers: string[];
}