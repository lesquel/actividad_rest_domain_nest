import { BadRequestException } from '@nestjs/common';

export function parseDate(input: Date | string, fieldName: string): Date {
  const value = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(value.getTime())) {
    throw new BadRequestException(`Invalid date value for ${fieldName}.`);
  }
  return value;
}
