export class DateString {
    static toDayString(date: Date) {
        return date.toISOString().substring(0, 10);
    }

    static fromDayString(s: string) {
        return new Date(s);
    }

    static toMonthString(date: Date) {
        return date.toISOString().substring(0, 7);
    }

    static fromMonthString(s: string) {
        return new Date(`${s}-01`);
    }
}
