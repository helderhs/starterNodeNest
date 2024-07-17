export function strToBool(str: string) {
  return ['true', '1', 'yes', 'y'].includes(str.toLowerCase());
}
