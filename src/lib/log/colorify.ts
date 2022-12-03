/* eslint-disable no-unused-vars */
export enum EFontStyle {
  RESET = 0,
  BLACK = 30,
  RED = 31,
  GREEN = 32,
  YELLOW = 33,
  BLUE = 34,
  MAGENTA = 35,
  CYAN = 36,
  WHITE = 37,
  CRIMSON = 38,

  BG_BLACK = 40,
  BG_RED = 41,
  BG_GREEN = 42,
  BG_YELLOW = 43,
  BG_BLUE = 44,
  BG_MAGENTA = 45,
  BG_CYAN = 46,
  BG_WHITE = 47,
  BG_CRIMSON = 48
}

export function colorify(text: string | number, ...colors: EFontStyle[]) {
  return colors.reduce((result, color) => colorifyItem(result, color), text);
}

function colorifyItem(text: string | number, color: EFontStyle) {
  return `\x1b[${color}m${text}\x1b[0m`;
}
