export function pluralize (number: number, word: string, postfixes: string[]) {
  const mod10 = number % 10;
  const mod100 = number % 100;
  let postfix = '';
  if (mod100 >= 5 && mod100 < 21 ||
    mod10 >= 5 && mod10 <= 9 ||
    !mod10) {
    postfix = postfixes[2];
  } else if (mod10 === 1) {
    postfix = postfixes[0];
  } else {
    postfix = postfixes[1];
  }
  return `${word}${postfix}`;
}
