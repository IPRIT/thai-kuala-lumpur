import { pluralize } from '@server/lib';
import { bot } from '@server/lib/telegram/bot';
import { channelId } from '@server/const/telegram';

export function notify (length: number, has: boolean, elapsedMs?: number) {
  const noPlacesTitle = `Места закончились\\. Места были доступны *${formatTime(elapsedMs)}*\\.`;
  // eslint-disable-next-line max-len
  const hasPlacesTitle = `Есть *${length} ${pluralize(length, 'мест', ['о', 'а', ''])}*\\.`;

  const message = `
  *Произошло изменение\\!*\n\n${has ? hasPlacesTitle : noPlacesTitle}
  `;

  const keyboard = [];

  if (has) {
    keyboard.push([{
      text: `Записаться (${length} ${pluralize(length, 'мест', ['о', 'а', ''])})`,
      url: 'https://my.linistry.com/Customer/ReserveTime?b=127&serviceMenuItemId=1195'
    }]);
  }

  return bot.telegram.sendMessage(channelId, message, {
    parse_mode: 'MarkdownV2',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
}

function formatTime (timeMs?: number) {
  if (!timeMs) {
    return '';
  }

  const seconds = Math.floor(timeMs / 1000);

  return `${seconds} ${pluralize(seconds, 'секунд', ['а', 'ы', ''])}`;
}
