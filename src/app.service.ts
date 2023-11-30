import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { FilmStarshipsCostResponse, SW_BASE_URL } from './common';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }
  starshipCostCache = new Map<number, number | string>();

  async getStarshipsInFilm(filmNumber: number): Promise<AxiosResponse<[]>> {
    const response = await this.httpService.axiosRef.get(
      `${SW_BASE_URL}/films/${filmNumber}`,
    );
    return response.data.starships;
  }
  async getCostOfStarshipsInFilm(
    filmNumber: number,
  ): Promise<FilmStarshipsCostResponse> {
    const starshipUrls = (await this.getStarshipsInFilm(
      filmNumber,
    )) as unknown as string[];

    let totalCost: number = 0;
    let unknownCount: number = 0;

    for (const url of starshipUrls) {
      const urlComponents = url.split('/');
      const starshipId = parseInt(urlComponents[urlComponents.length - 2]);
      if (typeof starshipId !== 'number') {
        throw new Error(
          'expected the value before the last / in the starship URL to be a number',
        );
      }

      let rawStarshipCost = this.starshipCostCache.get(starshipId);
      if (!rawStarshipCost) {
        rawStarshipCost = await (
          await this.httpService.axiosRef.get(url)
        ).data.cost_in_credits;
        this.starshipCostCache.set(starshipId, rawStarshipCost);
      }

      if (rawStarshipCost === 'unknown') {
        unknownCount++;
      } else if (typeof rawStarshipCost === 'string') {
        totalCost += parseInt(rawStarshipCost);
      }
    }

    return { cost: totalCost, unknownCosts: unknownCount };
  }

  async getCostOfAllStarships(): Promise<FilmStarshipsCostResponse[]> {
    const res: FilmStarshipsCostResponse[] = [];
    for (let i = 1; i <= 6; i++) {
      res.push(await this.getCostOfStarshipsInFilm(i));
    }

    return res;
  }
}
