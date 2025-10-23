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
import { CreateImageDto } from './dto/create-image.dto.js';
import { ImageResponseDto } from './dto/image-response.dto.js';
import { UpdateImageDto } from './dto/update-image.dto.js';
import { ImageService } from './image.service.js';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar imágenes',
    description:
      'Recupera de forma paginada los recursos multimedia disponibles para menús, platillos y espacios.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Número de elementos a omitir antes de iniciar la paginación.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad máxima de elementos que se devolverán en la página actual.',
  })
  @ApiOkResponse({ description: 'Listado de imágenes obtenido.', type: ImageResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ImageResponseDto[]> {
    const images = await this.imageService.findAll(query);
    return images.map(ImageResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar una imagen',
    description: 'Devuelve la información detallada de una imagen por su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la imagen',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Imagen encontrada.', type: ImageResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la imagen solicitada.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<ImageResponseDto> {
    const image = await this.imageService.findOne(id);
    return ImageResponseDto.fromDomain(image);
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar una imagen',
    description: 'Guarda un nuevo recurso multimedia con sus metadatos descriptivos.',
  })
  @ApiBody({
    type: CreateImageDto,
    description: 'Carga útil con los datos de la imagen a registrar.',
  })
  @ApiCreatedResponse({ description: 'Imagen creada.', type: ImageResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos.' })
  async create(@Body() dto: CreateImageDto): Promise<ImageResponseDto> {
    const image = await this.imageService.create(dto);
    return ImageResponseDto.fromDomain(image);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una imagen',
    description: 'Modifica los atributos permitidos de una imagen previamente almacenada.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la imagen',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateImageDto,
    description: 'Carga útil con los campos a modificar.',
  })
  @ApiOkResponse({ description: 'Imagen actualizada.', type: ImageResponseDto })
  @ApiNotFoundResponse({ description: 'La imagen indicada no existe.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateImageDto,
  ): Promise<ImageResponseDto> {
    const image = await this.imageService.update(id, dto);
    return ImageResponseDto.fromDomain(image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar una imagen',
    description: 'Elimina permanentemente un recurso multimedia registrado.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la imagen',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Imagen eliminada correctamente.' })
  @ApiNotFoundResponse({ description: 'No se encontró la imagen solicitada.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.imageService.remove(id);
  }
}
