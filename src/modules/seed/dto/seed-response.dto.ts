import { ApiProperty } from '@nestjs/swagger';

import type { SeedSummary } from '../../../infrastructure/persistence/seed/seed-runner.js';
import { SeedSummaryDto } from './seed-summary.dto.js';

export class SeedResponseDto {
  @ApiProperty({ example: 'Seed executed successfully.' })
  message!: string;

  @ApiProperty({ example: 1240, description: 'Total execution time in milliseconds.' })
  durationMs!: number;

  @ApiProperty({ type: () => SeedSummaryDto })
  summary!: SeedSummaryDto;

  static fromSummary(summary: SeedSummary, durationMs: number): SeedResponseDto {
    const dto = new SeedResponseDto();
    dto.message = 'Seed executed successfully.';
    dto.durationMs = durationMs;
    dto.summary = SeedSummaryDto.fromSummary(summary);
    return dto;
  }
}
