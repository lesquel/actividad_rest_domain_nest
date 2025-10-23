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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { ReviewResponseDto } from './dto/review-response.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { ReviewService } from './review.service.js';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar reseñas',
    description: 'Devuelve las reseñas realizadas por usuarios, con paginación opcional.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Cantidad de reseñas a omitir al iniciar la página.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Número máximo de reseñas a devolver en la página.',
  })
  @ApiOkResponse({ description: 'Reseñas recuperadas.', type: ReviewResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewService.findAll(query);
    return reviews.map(ReviewResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar reseña',
    description: 'Obtiene el detalle de una reseña específica.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la reseña',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Reseña encontrada.', type: ReviewResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la reseña solicitada.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<ReviewResponseDto> {
    const review = await this.reviewService.findOne(id);
    return ReviewResponseDto.fromDomain(review);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear reseña',
    description: 'Registra la opinión de un usuario sobre un restaurante.',
  })
  @ApiBody({
    type: CreateReviewDto,
    description: 'Datos de la reseña a registrar.',
  })
  @ApiCreatedResponse({ description: 'Reseña creada correctamente.', type: ReviewResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos.' })
  async create(@Body() dto: CreateReviewDto): Promise<ReviewResponseDto> {
    const review = await this.reviewService.create(dto);
    return ReviewResponseDto.fromDomain(review);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar reseña',
    description: 'Actualiza los campos permitidos de una reseña existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la reseña',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateReviewDto,
    description: 'Datos a modificar en la reseña.',
  })
  @ApiOkResponse({ description: 'Reseña actualizada.', type: ReviewResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la reseña a actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewService.update(id, dto);
    return ReviewResponseDto.fromDomain(review);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar reseña',
    description: 'Elimina permanentemente una reseña registrada.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la reseña',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Reseña eliminada.' })
  @ApiNotFoundResponse({ description: 'No se encontró la reseña solicitada.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.reviewService.remove(id);
  }
}
