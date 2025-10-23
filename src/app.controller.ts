import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Estado del servicio',
    description: 'Devuelve un mensaje corto que permite validar que la API está en línea.',
  })
  @ApiOkResponse({ description: 'Mensaje de bienvenida del servicio.', type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}
