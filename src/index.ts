import { Client } from '@notionhq/client';
import { NORMALIZED_RATINGS_FILE, OUT_DIRECTORY } from 'configs/paths';
import { deleteDirectory } from 'lib/file-system';
import { logger } from 'lib/logger';
import { Database } from 'lib/notion';
import { initTimer } from 'lib/timer';
import { buildAndSaveSummaries } from 'services/build-and-save-summaries';
import { groupRatingsByBook } from 'services/group-ratings';
import { promptForArgs } from 'services/prompt-for-args';
import { normalizeRatings } from 'services/normalize-ratings';
import { TimerKey } from 'services/timers';
import { __PROD__ } from 'lib/assertion';

const main = async () => {
  const timer = initTimer();
  let exitCode = 0;

  try {
    const args = await promptForArgs();
    const database = new Database(args.databaseId, new Client({ auth: args.apiKey }));
    timer.start(TimerKey.TotalDuration);

    timer.start(TimerKey.NormalizeRatings);
    await normalizeRatings(args.inputFile, NORMALIZED_RATINGS_FILE);
    timer.end(TimerKey.NormalizeRatings);

    timer.start(TimerKey.GroupRatingsByBook);
    const groupedRatings = await groupRatingsByBook(NORMALIZED_RATINGS_FILE);
    timer.end(TimerKey.GroupRatingsByBook);

    timer.start(TimerKey.buildAndSaveSummaries);
    await buildAndSaveSummaries(groupedRatings, database);
    timer.end(TimerKey.buildAndSaveSummaries);

    if (__PROD__) {
      logger.info('🌀 Cleaning up...');
      deleteDirectory(OUT_DIRECTORY);
    }
  } catch (err) {
    logger.error(err);
    exitCode = 1;
  }

  timer.end(TimerKey.TotalDuration);
  process.exit(exitCode);
};

main();
