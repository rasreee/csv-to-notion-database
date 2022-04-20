import fs from 'fs';

export function readStream(inputFilePath: string): fs.ReadStream {
  return fs.createReadStream(inputFilePath, 'utf-8');
}

export function writeStream(outputFilePath: string): fs.WriteStream {
  return fs.createWriteStream(outputFilePath, 'utf-8');
}
