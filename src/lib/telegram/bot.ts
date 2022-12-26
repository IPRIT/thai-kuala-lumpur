import { Telegraf } from 'telegraf';
import { ownerId, token } from '@server/const/telegram';
import { isDevelopment } from '@server/const';

export const bot = new Telegraf(token);

bot.start((ctx) => {
  if (isDevelopment) {
    console.log(ctx.update.message);
  }

  ctx.reply('Welcome');
});

bot.on('message', (ctx) => {
  if (isDevelopment) {
    console.log(ctx.update.message);
  }

  ctx.forwardMessage(ownerId);
});

bot.launch({
  dropPendingUpdates: true
});
