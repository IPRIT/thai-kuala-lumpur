import { pluralize } from '@server/lib';
import { bot } from '@server/lib/telegram/bot';
import { channelId } from '@server/const/telegram';

export type TimeSlot = string

export function notify (timeSlots: TimeSlot[], hasStateChanged: boolean, elapsedMs?: number) {
  const hasSlots = timeSlots.length > 0;

  const noSlotsTitle = `${getSadEmoji()} No more slots \\(were available for ${formatElapsed(elapsedMs)}\\)\n`;
  // eslint-disable-next-line max-len
  const hasSlotsTitle = `${getMessageEmoji()}️ Time slots have changed\\.\n\n${timeSlots.length === 1 && !hasStateChanged ? 'Only' : ''} *${timeSlots.length}${hasStateChanged ? ' new' : ''} ${pluralize(timeSlots.length, 'slot', ['', 's', 's'])}*${timeSlots.length > 1 ? ' are' : ''} available\\.\n`;

  const message = hasSlots ? hasSlotsTitle : noSlotsTitle;

  const keyboard = [];

  if (hasSlots) {
    keyboard.push([{
      // eslint-disable-next-line max-len
      text: `${getButtonEmoji()}Book a time (${timeSlots.length} ${pluralize(timeSlots.length, 'slot', ['', 's', 's'])})`,
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
          text: `${getButtonEmoji()}${formatTime(slot)}`,
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

  return `${seconds} ${pluralize(seconds, 'second', ['', 's', 's'])}`;
}

function formatTime (time: string) {
  return new Date(time).toLocaleString('en-UK', { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric' });
}

function isHappyNewYearTime () {
  const dateMs = Date.now();
  const finishDateMs = new Date(2023, 0, 8).getTime();

  return dateMs < finishDateMs;
}

function getMessageEmoji () {
  return isHappyNewYearTime() ? getHappyNewYearEmoji() : '⚡️';
}

const sadEmojies = ['🥺', '😔', '😔🔫', '😕', '💔', '😢', '😭', '😖', '😓', '😥', '😡'];

function getSadEmoji () {
  return sadEmojies[Math.floor(Math.random() * 1e9) % sadEmojies.length];
}

function getButtonEmoji () {
  return isHappyNewYearTime() ? `${getHappyNewYearEmoji()} ` : '';
}

const newYearEmojies = [
  '🥳', '🍪', '🎄', '🦌', '☃️', '❄️', '🍾', '🍷', '🥂', '🍻', '✨', '🌟', '🎊', '🎉', '🎅', '🎅🏻'
];

function getHappyNewYearEmoji () {
  return newYearEmojies[Math.floor(Math.random() * 1e9) % newYearEmojies.length];
}
