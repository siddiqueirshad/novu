export class DurationUtils {
  static isISO8601(value: string): boolean {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?$/;
    if (!iso8601Regex.test(value)) {
      return false;
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return false;
    }

    const [yearStr, monthStr, dayStr] = value.split('T')[0].split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    const utcDate = new Date(Date.UTC(year, month - 1, day));

    return (
      utcDate.getUTCFullYear() === year &&
      utcDate.getUTCMonth() === month - 1 &&
      utcDate.getUTCDate() === day
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
