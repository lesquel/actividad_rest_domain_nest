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
import type { CreateSubscriptionDto } from './dto/create-subscription.dto.js';
import type { UpdateSubscriptionDto } from './dto/update-subscription.dto.js';
import { SubscriptionResponseDto } from './dto/subscription-response.dto.js';
import { SubscriptionService } from './subscription.service.js';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<SubscriptionResponseDto[]> {
    const subscriptions = await this.subscriptionService.findAll(query);
    return subscriptions.map(SubscriptionResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionService.findOne(id);
    return SubscriptionResponseDto.fromDomain(subscription);
  }

  @Post()
  async create(
    @Body() dto: CreateSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionService.create(dto);
    return SubscriptionResponseDto.fromDomain(subscription);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionService.update(id, dto);
    return SubscriptionResponseDto.fromDomain(subscription);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.subscriptionService.remove(id);
  }
}
