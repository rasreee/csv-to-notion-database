import { fileSize } from './file-system';
import { logger } from './logger';
import { round } from './math';

const KILOBYTE = 1024;
const MEGABYTE = KILOBYTE * KILOBYTE;

export function bytesToMB(bytes: number, fractionDigits = 2): number {
  return round(bytes / MEGABYTE, fractionDigits);
}

export function formatMB(megabytes: number, fractionDigits = 2): string {
  return `${bytesToMB(megabytes, fractionDigits)} MB`;
}

export function reportFileSize(inputFile: string): void {
  logger.info(`💾 File at ${inputFile} is size: ${formatMB(fileSize(inputFile))}`);
}

export function reportMemoryUsage() {
  const heapUsed = process.memoryUsage().heapUsed;
  logger.debug(`💾 Heap memory used:`, formatMB(heapUsed));
}
