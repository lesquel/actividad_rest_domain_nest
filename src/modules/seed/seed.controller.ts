import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SeedResponseDto } from './dto/seed-response.dto.js';
import { SeedService } from './seed.service.js';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Trigger data seed',
    description:
      'Executes all database seeders to populate the catalog data set. Intended for development and testing environments.',
  })
  @ApiOkResponse({ description: 'Seed completed successfully.', type: SeedResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Seed execution failed.' })
  async run(): Promise<SeedResponseDto> {
    return this.seedService.run();
  }
}
