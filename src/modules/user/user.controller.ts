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
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar usuarios',
    description: 'Obtiene el listado de usuarios registrados con paginación opcional.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Cantidad de registros a omitir al iniciar la página.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Número máximo de usuarios a devolver en la página.',
  })
  @ApiOkResponse({ description: 'Usuarios recuperados.', type: UserResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll(query);
    return users.map(UserResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar usuario',
    description: 'Recupera el detalle de un usuario mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del usuario',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Usuario encontrado.', type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el usuario solicitado.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findOne(id);
    return UserResponseDto.fromDomain(user);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear usuario',
    description: 'Registra un nuevo usuario dentro de la plataforma.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos necesarios para crear al usuario.',
  })
  @ApiCreatedResponse({ description: 'Usuario creado correctamente.', type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Los datos proporcionados no son válidos.' })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(dto);
    return UserResponseDto.fromDomain(user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualiza los campos permitidos de un usuario existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del usuario',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Campos que se desean modificar.',
  })
  @ApiOkResponse({ description: 'Usuario actualizado correctamente.', type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el usuario a actualizar.' })
  @ApiBadRequestResponse({ description: 'Los datos de actualización no son válidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.update(id, dto);
    return UserResponseDto.fromDomain(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar usuario',
    description: 'Elimina definitivamente a un usuario de la plataforma.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del usuario',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Usuario eliminado correctamente.' })
  @ApiNotFoundResponse({ description: 'No se encontró el usuario a eliminar.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
