import { isProduction } from '@server/const/env';

export const token = process.env.TELEGRAM_TOKEN ?? '';
export const ownerId = '615945';
export const channelId = isProduction ? '-1001690004488' : ownerId; // '-1001560040351' - channel's chat id
