import fs from 'fs';
import path from 'path';

export function assertPathExists(pathname: string): void {
  if (!fs.existsSync(pathname)) {
    throw new Error(`Location ${pathname} could not be found.`);
  }
}

export function ensureDirExists(pathname: string): void {
  if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname);
  }
}

export function readTextFile(inputFile: string): string {
  return fs.readFileSync(inputFile, 'utf8');
}

export function ensureFileExists(inputFile: string): void {
  if (!fs.existsSync(inputFile)) {
    fs.writeFileSync(inputFile, '');
  }
}

export function clearFile(inputFile: string): void {
  fs.writeFileSync(inputFile, '');
}

export function fileSize(inputFile: string): number {
  return fs.statSync(inputFile).size;
}

export const ensureLocationExists = (location: string) => (type: 'file' | 'directory') => {
  if (type === 'file') {
    ensureFileExists(location);
  } else if (type === 'directory') {
    ensureDirExists(location);
  }

  return location;
};

export function isJoinablePath(...paths: string[]): boolean {
  return paths.some(value => value === '..');
}

export const getOrCreateLocation =
  (...paths: string[]) =>
  (type: 'file' | 'directory') => {
    const pathFn = isJoinablePath(...paths) ? path.join : path.resolve;
    const fullPath = pathFn(...paths);

    ensureLocationExists(fullPath)(type);

    return fullPath;
  };

export const deleteDirectory = (location: string) => {
  fs.rmdirSync(location, { recursive: true });
};
