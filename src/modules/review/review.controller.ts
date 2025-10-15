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
import type { CreateReviewDto } from './dto/create-review.dto.js';
import type { UpdateReviewDto } from './dto/update-review.dto.js';
import { ReviewResponseDto } from './dto/review-response.dto.js';
import { ReviewService } from './review.service.js';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewService.findAll(query);
    return reviews.map(ReviewResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReviewResponseDto> {
    const review = await this.reviewService.findOne(id);
    return ReviewResponseDto.fromDomain(review);
  }

  @Post()
  async create(@Body() dto: CreateReviewDto): Promise<ReviewResponseDto> {
    const review = await this.reviewService.create(dto);
    return ReviewResponseDto.fromDomain(review);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewService.update(id, dto);
    return ReviewResponseDto.fromDomain(review);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.reviewService.remove(id);
  }
}
