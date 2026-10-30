export class DurationUtils {
  static isISO8601(value: string): boolean {
    const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,3})?Z?$/;
    const match = value.match(iso8601Regex);
    if (!match) {
      return false;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    const hours = parseInt(match[4], 10);
    const minutes = parseInt(match[5], 10);
    const seconds = parseInt(match[6], 10);

    if (month < 1 || month > 12 || day < 1 || day > 31 || hours > 23 || minutes > 59 || seconds > 59) {
      return false;
    }

    const parsedDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

    return (
      parsedDate.getUTCFullYear() === year &&
      parsedDate.getUTCMonth() + 1 === month &&
      parsedDate.getUTCDate() === day
    );
  }

  static convertToMilliseconds(amount: number, unit: string): number {
    const unitMap: Record<string, number> = {
      seconds: 1000,
      minutes: 60 * 1000,
      hours: 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000,
      weeks: 7 * 24 * 60 * 60 * 1000,
      months: 30 * 24 * 60 * 60 * 1000,
    };

    if (!unitMap[unit]) {
      throw new Error(`Invalid time unit '${unit}'. Supported units: ${Object.keys(unitMap).join(', ')}`);
    }

    return amount * unitMap[unit];
  }
}
