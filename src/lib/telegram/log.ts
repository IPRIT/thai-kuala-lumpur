import { bot } from '@server/lib/telegram/bot';
import { ownerId } from '@server/const/telegram';

export function sendLog (text: string) {
  return bot.telegram.sendMessage(ownerId, text);
}
