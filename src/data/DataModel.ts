export type DataModel = {
    activeDay?: string,
    finishDay?: string,
    balance?: number,
    todayBalance?: number,
    lastOperation?: number,
    lastOperationDate?: string,
    spentHistory?: {
        days: {[date: string]: number},
        months: {[date: string]: number},
    }
}