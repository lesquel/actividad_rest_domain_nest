import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto.js';
import type { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto.js';
import { SubscriptionPlanResponseDto } from './dto/subscription-plan-response.dto.js';
import { SubscriptionPlanService } from './subscription-plan.service.js';

@Controller('subscription-plans')
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<SubscriptionPlanResponseDto[]> {
    const plans = await this.subscriptionPlanService.findAll(query);
    return plans.map(SubscriptionPlanResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubscriptionPlanResponseDto> {
    const plan = await this.subscriptionPlanService.findOne(id);
    return SubscriptionPlanResponseDto.fromDomain(plan);
  }

  @Post()
  async create(
    @Body() dto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanResponseDto> {
    const plan = await this.subscriptionPlanService.create(dto);
    return SubscriptionPlanResponseDto.fromDomain(plan);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanResponseDto> {
    const plan = await this.subscriptionPlanService.update(id, dto);
    return SubscriptionPlanResponseDto.fromDomain(plan);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.subscriptionPlanService.remove(id);
  }
}
