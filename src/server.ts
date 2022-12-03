import 'dotenv/config';
import { setInterval } from 'node:timers/promises';
import app from '@server/app';
import http from 'http';

import { logError, onError, onListening, onProcessMessage } from '@server/lib';
import { tick } from './tick';
import { bot } from '@server/lib/telegram/bot';
import { ownerId } from '@server/const/telegram';

export const server = http.createServer(app);

server.on('error', onError.bind(null, server));
server.on('listening', onListening.bind(null, server));

process.on('message', onProcessMessage);

async function start () {
  for await (const _ of setInterval(5000)) {
    try {
      await tick();
    } catch (e) {
      console.error('Error:', e);

      // @ts-ignore
      await bot.telegram.sendMessage(ownerId, e.message ?? String(e));
    }
  }
}

const port = app.get('port');
server.listen(port);

start().catch(logError);
