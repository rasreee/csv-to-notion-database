import stream from 'stream';

import { noop } from './function';
import { logger } from './logger';

export function readable(): stream.Readable {
  const inputStream = new stream.Readable({ objectMode: true });
  inputStream._read = noop;

  return inputStream;
}

export function writable(): stream.Writable {
  const outputStream = new stream.Writable({ objectMode: true });

  outputStream.on('error', error => {
    logger.error(error.message, error.stack);
  });

  return outputStream;
}

export type TransformImpl<Chunk, Result = any> = (chunk: Chunk, encoding: BufferEncoding, callback: stream.TransformCallback) => Result;

export function streamTransform<Chunk, Result = any>(transformFn: TransformImpl<Chunk, Result>): stream.Transform {
  const transformStream = new stream.Transform({ objectMode: true });

  transformStream._transform = (chunk, encoding, callback) => {
    const outputChunk = transformFn(chunk, encoding, callback);
    transformStream.push(outputChunk);
    callback();
  };

  return transformStream;
}
