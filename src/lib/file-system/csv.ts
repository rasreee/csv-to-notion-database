import { mergeWith } from 'lib/object';
import { readable, streamTransform, TransformImpl, writable } from 'lib/stream';
import Papa from 'papaparse';
import stream from 'stream';

import { readStream, writeStream } from './file-stream';
import { readTextFile } from './file-system';

/**
 * Reads CSV file and returns 2D array of strings where each
 * item is an array of strings that represent a single row
 *
 * @param inputFile path of CSV file to read
 * @returns {string[][]}
 */
export function readCSV<Row extends string[] = string[]>(inputFile: string): Row[] {
  const rows = readTextFile(inputFile)
    .trim()
    .split('\n')
    .map((row: string): Row => row.split(',') as Row);

  return rows;
}

export type ParseCSVStreamHandlers<Row> = { onRow: (row: Row) => void; onComplete: () => void; onError: (error: Error) => void };

const papaParseConfig = Object.freeze({ fastMode: true, delimiter: ',', newline: '\n', skipEmptyLines: true });

export const createPapaParseConfig = <Row, TInput extends string = string>(
  customConfig: Papa.ParseAsyncConfig<Row, TInput>,
): Papa.ParseAsyncConfig<Row, TInput> => {
  const config = mergeWith({}, papaParseConfig, customConfig);

  return config;
};

export const parseCSVStream = <Row, TInput extends string = string>(
  inputFile: TInput,
  { onRow, onComplete, onError }: ParseCSVStreamHandlers<Row>,
) => {
  if (typeof inputFile !== 'string') {
    throw new Error(`Invalid inputFile type ${inputFile}`);
  }

  const inputStream = readStream(inputFile);

  const config = createPapaParseConfig<Row, TInput>({
    step: results => {
      onRow(results.data);
    },
    complete: () => {
      onComplete();
    },
    error: error => {
      onError(error);
    },
  });

  Papa.parse<Row>(inputStream, config as any);
};

export function openCSVInputStream<Row = any>(inputFile: string) {
  const csvInputStream = readable();

  parseCSVStream<Row>(inputFile, {
    onRow: row => {
      csvInputStream.push(row);
    },
    onComplete: () => {
      csvInputStream.push(null);
    },
    onError: error => {
      csvInputStream.emit('error', error);
    },
  });

  return csvInputStream;
}

export function openCSVOutputStream<Row = any>(outputFile: string): stream.Writable {
  const outputStream = writeStream(outputFile);
  const csvOutputStream = writable();

  csvOutputStream._write = (chunk, _, callback) => {
    const outputCSV = Papa.unparse<Row>([chunk]);
    outputStream.write(outputCSV + '\n');
    callback();
  };

  return csvOutputStream;
}

export const transformAndOutputCSV = async <Chunk, Result = any>(inputFile: string, outputFile: string, transformImpl: TransformImpl<Chunk>) => {
  const inputStream = openCSVInputStream<Chunk>(inputFile);
  const outputStream = openCSVOutputStream<Chunk>(outputFile);
  const transform = streamTransform<Chunk, Result>(transformImpl);

  await new Promise((res, rej) => {
    return inputStream
      .pipe(transform)
      .pipe(outputStream)
      .on('error', error => {
        rej(error);
      })
      .on('finish', () => {
        res(null);
      });
  });
};
