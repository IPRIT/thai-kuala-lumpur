import fetch from 'node-fetch';
import { log } from '@server/lib';
import type { TimeSlot } from '@server/lib/telegram/notify';
import { notify } from '@server/lib/telegram/notify';

interface AvailabilityParams {
  startyear: number;
  startmonth: number
  startday: number
  endyear: number
  endmonth: number
  endday: number
}

const BASE_URI = 'https://my.linistry.com/api/CustomerApi/GetAvailabilityAsync';

const defaultParams = {
  serviceId: '3fb796f6-3829-40b9-a549-3feb2b12453a',
  count: 1
};

let ticks = 0;
let lastMs = 0;
let lastSlots: TimeSlot[] = [];
let lastHasSlots = false;

export async function tick () {
  const params = getAvailabilityParams();
  const slots = await getAvailability(params);

  const hasSlots = slots.length > 0;
  const hasStateChanged = lastHasSlots !== hasSlots;

  if (hasStateChanged || isSlotsChanged(slots, lastSlots)) {
    const elapsed = !hasSlots ? Date.now() - lastMs : undefined;

    await notify(slots, hasStateChanged, elapsed);

    if (hasStateChanged && hasSlots) {
      lastMs = Date.now();
    }

    lastHasSlots = hasSlots;
  }

  lastSlots = slots;

  log(`tick: ${ticks++} (${slots.length})`);
}

function getAvailabilityParams (): AvailabilityParams {
  const curDate = new Date();
  const firstDate = getFirstDate(curDate);
  const lastDate = getLastDate(curDate);

  return {
    startyear: firstDate.getFullYear(),
    startmonth: firstDate.getMonth() + 1,
    startday: firstDate.getDate(),
    endyear: lastDate.getFullYear(),
    endmonth: lastDate.getMonth() + 1,
    endday: lastDate.getDate(),
  };
}

function getFirstDate (date: Date) {
  const month = new Date(date.getFullYear(), date.getMonth());

  month.setDate(-month.getDay() + 1);

  return month;
}

function getLastDate (date: Date) {
  const month = new Date(date.getFullYear(), date.getMonth() + 1);

  month.setDate(0);
  month.setDate(month.getDate() + 6 - month.getDay());

  return month;
}

function isSlotsChanged (slots: TimeSlot[], lastSlots: TimeSlot[]): boolean {
  const set = new Set(slots);
  const lastSet = new Set(lastSlots);

  return !setsEqual(set, lastSet);
}

function setsEqual (xs: Set<string>, ys: Set<string>) {
  return xs.size === ys.size &&
    [...xs].every((x) => ys.has(x));
}

async function getAvailability (params: AvailabilityParams) {
  const url = new URL(BASE_URI);

  const finalParams = {
    ...defaultParams,
    ...params
  };

  Object.keys(finalParams).forEach(key => {
    // @ts-ignore
    const value = finalParams[key];

    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line max-len
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 YaBrowser/22.11.0.2408 Yowser/2.5 Safari/537.36'
    },
    timeout: 10000,
  });

  return response.json();
}
