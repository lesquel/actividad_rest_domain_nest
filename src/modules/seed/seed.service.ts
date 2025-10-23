import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { performance } from 'node:perf_hooks';

import {
  DISH_REPOSITORY,
  IMAGE_REPOSITORY,
  MENU_REPOSITORY,
  PAYMENT_REPOSITORY,
  RESERVATION_REPOSITORY,
  RESTAURANT_REPOSITORY,
  REVIEW_REPOSITORY,
  SECTION_REPOSITORY,
  SUBSCRIPTION_PLAN_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
  TABLE_REPOSITORY,
  USER_REPOSITORY,
} from '../../application/tokens.js';
import { executeSeed } from '../../infrastructure/persistence/seed/seed-runner.js';
import type {
  TypeOrmDishRepository,
  TypeOrmImageRepository,
  TypeOrmMenuRepository,
  TypeOrmPaymentRepository,
  TypeOrmReservationRepository,
  TypeOrmRestaurantRepository,
  TypeOrmReviewRepository,
  TypeOrmSectionRepository,
  TypeOrmSubscriptionPlanRepository,
  TypeOrmSubscriptionRepository,
  TypeOrmTableRepository,
  TypeOrmUserRepository,
} from '../../infrastructure/persistence/repositories/index.js';
import { SeedResponseDto } from './dto/seed-response.dto.js';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: TypeOrmUserRepository,
    @Inject(SUBSCRIPTION_PLAN_REPOSITORY)
    private readonly subscriptionPlanRepo: TypeOrmSubscriptionPlanRepository,
    @Inject(IMAGE_REPOSITORY) private readonly imageRepo: TypeOrmImageRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepo: TypeOrmRestaurantRepository,
    @Inject(SECTION_REPOSITORY) private readonly sectionRepo: TypeOrmSectionRepository,
    @Inject(TABLE_REPOSITORY) private readonly tableRepo: TypeOrmTableRepository,
    @Inject(MENU_REPOSITORY) private readonly menuRepo: TypeOrmMenuRepository,
    @Inject(DISH_REPOSITORY) private readonly dishRepo: TypeOrmDishRepository,
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepo: TypeOrmReservationRepository,
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: TypeOrmPaymentRepository,
    @Inject(REVIEW_REPOSITORY) private readonly reviewRepo: TypeOrmReviewRepository,
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepo: TypeOrmSubscriptionRepository,
  ) {}

  async run(): Promise<SeedResponseDto> {
    const start = performance.now();

    try {
      const summary = await executeSeed({
        userRepo: this.userRepo,
        subscriptionPlanRepo: this.subscriptionPlanRepo,
        imageRepo: this.imageRepo,
        restaurantRepo: this.restaurantRepo,
        sectionRepo: this.sectionRepo,
        tableRepo: this.tableRepo,
        menuRepo: this.menuRepo,
        dishRepo: this.dishRepo,
        reservationRepo: this.reservationRepo,
        paymentRepo: this.paymentRepo,
        reviewRepo: this.reviewRepo,
        subscriptionRepo: this.subscriptionRepo,
      });

      const durationMs = Math.round(performance.now() - start);
      return SeedResponseDto.fromSummary(summary, durationMs);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Seed execution failed: ${error.message}`, error.stack);
      } else {
        this.logger.error(`Seed execution failed: ${String(error)}`);
      }
      throw new InternalServerErrorException('Failed to seed database.');
    }
  }
}
