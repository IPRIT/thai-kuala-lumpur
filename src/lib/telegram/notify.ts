import { pluralize } from '@server/lib';
import { bot } from '@server/lib/telegram/bot';
import { channelId } from '@server/const/telegram';

export type TimeSlot = string

export function notify (result: TimeSlot[], has: boolean, elapsedMs?: number) {
  const noPlacesTitle = `Места закончились\\. Места были доступны *${formatElapsed(elapsedMs)}*\\.`;
  // eslint-disable-next-line max-len
  const hasPlacesTitle = `Есть *${result.length} ${pluralize(result.length, 'мест', ['о', 'а', ''])}*\\.`;

  const message = `
  *Произошло изменение\\!*\n\n${has ? hasPlacesTitle : noPlacesTitle}
  `;

  const keyboard = [];

  if (has) {
    keyboard.push([{
      text: `Записаться (${result.length} ${pluralize(result.length, 'мест', ['о', 'а', ''])})`,
      url: 'https://my.linistry.com/Customer/ReserveTime?b=127&serviceMenuItemId=1195'
    }]);

    const columns = Math.min(3, result.length);
    const rows = Math.ceil(result.length / columns);

    for (let i = 0; i < rows; ++i) {
      const slots = [];

      for (let j = 0; j < columns; ++j) {
        const index = i * columns + j;
        const slot = result[index];

        if (!slot) {
          continue;
        }

        slots.push({
          text: formatTime(slot),
          url: 'https://my.linistry.com/Customer/ReserveTime?b=127&serviceMenuItemId=1195'
        });
      }

      keyboard.push(slots);
    }
  }

  return bot.telegram.sendMessage(channelId, message, {
    parse_mode: 'MarkdownV2',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
}

function formatElapsed (timeMs?: number) {
  if (!timeMs) {
    return '';
  }

  const seconds = Math.floor(timeMs / 1000);

  return `${seconds} ${pluralize(seconds, 'секунд', ['а', 'ы', ''])}`;
}

function formatTime (time: string) {
  return new Date(time).toLocaleString('ru-RU', { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric' });
}
