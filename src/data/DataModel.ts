export type DataModel = {
    activeDay?: string,
    finishDay?: string,
    balance?: number,
    todayBalance?: number,
    spentHistory?: {
        days: {[date: string]: number},
        months: {[date: string]: number},
    }
}