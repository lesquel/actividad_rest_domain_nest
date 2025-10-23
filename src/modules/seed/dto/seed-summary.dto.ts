import { ApiProperty } from '@nestjs/swagger';

import type { SeedSummary } from '../../../infrastructure/persistence/seed/seed-runner.js';

export class SeedSummaryDto {
  @ApiProperty({ example: 12, description: 'Total users inserted.' })
  users!: number;

  @ApiProperty({ example: 4, description: 'Total subscription plans inserted.' })
  subscriptionPlans!: number;

  @ApiProperty({ example: 15, description: 'Total images inserted.' })
  images!: number;

  @ApiProperty({ example: 6, description: 'Total restaurants inserted.' })
  restaurants!: number;

  @ApiProperty({ example: 20, description: 'Total sections inserted.' })
  sections!: number;

  @ApiProperty({ example: 45, description: 'Total tables inserted.' })
  tables!: number;

  @ApiProperty({ example: 9, description: 'Total menus inserted.' })
  menus!: number;

  @ApiProperty({ example: 35, description: 'Total dishes inserted.' })
  dishes!: number;

  @ApiProperty({ example: 18, description: 'Total reservations inserted.' })
  reservations!: number;

  @ApiProperty({ example: 18, description: 'Total payments inserted.' })
  payments!: number;

  @ApiProperty({ example: 10, description: 'Total reviews inserted.' })
  reviews!: number;

  @ApiProperty({ example: 5, description: 'Total subscriptions inserted.' })
  subscriptions!: number;

  static fromSummary(summary: SeedSummary): SeedSummaryDto {
    const dto = new SeedSummaryDto();
    dto.users = summary.users;
    dto.subscriptionPlans = summary.subscriptionPlans;
    dto.images = summary.images;
    dto.restaurants = summary.restaurants;
    dto.sections = summary.sections;
    dto.tables = summary.tables;
    dto.menus = summary.menus;
    dto.dishes = summary.dishes;
    dto.reservations = summary.reservations;
    dto.payments = summary.payments;
    dto.reviews = summary.reviews;
    dto.subscriptions = summary.subscriptions;
    return dto;
  }
}
