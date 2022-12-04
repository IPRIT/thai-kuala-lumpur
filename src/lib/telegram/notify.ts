import { pluralize } from '@server/lib';
import { bot } from '@server/lib/telegram/bot';
import { channelId } from '@server/const/telegram';

export type TimeSlot = string

export function notify (timeSlots: TimeSlot[], hasStateChanged: boolean, elapsedMs?: number) {
  const hasSlots = timeSlots.length > 0;

  const noSlotsTitle = `😢 Все слоты разобрали \\(были доступны ${formatElapsed(elapsedMs)}\\)\n`;
  // eslint-disable-next-line max-len
  const hasSlotsTitle = `⚡️ ${hasStateChanged ? pluralize(timeSlots.length, 'Появил', ['ся', 'ось', 'ось']) : `Доступность слотов поменялась\\.\n\nСейчас ${pluralize(timeSlots.length, 'доступ', ['ен', 'но', 'ны'])}`}${timeSlots.length === 1 ? ' только' : ''} *${timeSlots.length}${hasStateChanged ? ` ${pluralize(timeSlots.length, 'нов', ['ый', 'ых', 'ых'])}` : ''} ${pluralize(timeSlots.length, 'слот', ['', 'а', 'ов'])}*\\.\n`;

  const message = hasSlots ? hasSlotsTitle : noSlotsTitle;

  const keyboard = [];

  if (hasSlots) {
    keyboard.push([{
      text: `Записаться (${timeSlots.length} ${pluralize(timeSlots.length, 'слот', ['', 'а', 'ов'])})`,
      url: 'https://my.linistry.com/Customer/ReserveTime?b=127&serviceMenuItemId=1195'
    }]);

    const columns = Math.min(2, timeSlots.length);
    const rows = Math.ceil(timeSlots.length / columns);

    for (let i = 0; i < rows; ++i) {
      const slots = [];

      for (let j = 0; j < columns; ++j) {
        const index = i * columns + j;
        const slot = timeSlots[index];

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
