import chalk from 'chalk';

const rootLevel = 0;
const baseColor = chalk.hex('#87F1FF');
const prefixes = ['\n⏰', '  ', '     -'] as const;
const colors = [baseColor.bold, baseColor, baseColor.dim] as const;

export interface Timer {
  start(key: string): void;
  end(key: string): void;
  child(degreesOfSeparation?: number): Timer;
  level: number;
}

export function initTimer(level: number = rootLevel): Timer {
  const prefix = prefixes[level];
  const color = colors[level] ?? baseColor.dim;

  function start(key: string): void {
    console.time(prefix + ' ' + color(key));
  }

  function end(key: string): void {
    console.timeEnd(prefix + ' ' + color(key));
  }

  function child(degreesOfSeparation = 1): Timer {
    return initTimer(level + degreesOfSeparation);
  }

  return { start, end, level, child };
}
