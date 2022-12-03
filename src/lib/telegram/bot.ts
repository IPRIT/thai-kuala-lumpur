import { Telegraf } from 'telegraf';
import { token } from '@server/const/telegram';

export const bot = new Telegraf(token);

bot.start((ctx) => {
  console.log(ctx.update.message);

  ctx.reply('Welcome');
});

bot.launch({
  dropPendingUpdates: true
});
