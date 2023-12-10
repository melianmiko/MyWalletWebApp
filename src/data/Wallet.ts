import {WalletFile} from "./WalletFile";
import {DateString} from "../tools/DateString";

export type SpentChartData = {
    date: string,
    sum: number,
}[];

export class Wallet extends WalletFile {
    isPeriodFinished() {
        return !this.data.finishDay || this.getDaysCount() <= 0;
    }

    getBalance(): number {
        if(this.data.balance === undefined) return 8000;
        return this.data.balance;
    }

    getTodayBalance(): number {
        if(this.data.todayBalance === undefined) return 0;
        return this.data.todayBalance;
    }

    isDayFinished() {
        return DateString.toDayString(new Date()) !== this.data.activeDay;
    }

    startNewDay() {
        this.data.activeDay = DateString.toDayString(new Date());
        this.data.todayBalance = this.getNewTodayBalance();
        this.save();
    }

    setupPeriod(endDate: Date, balance: number) {
        this.data.finishDay = DateString.toDayString(endDate);
        this.data.balance = balance;
        this.startNewDay();
    }

    getDaysCount() {
        if(this.data.finishDay === undefined) return 1;
        return (DateString.fromDayString(this.data.finishDay as string).getTime()
            - DateString.fromDayString(this.data.activeDay as string).getTime()) / 3600 / 24 / 1000;
    }

    getFinishDate() {
        if(this.data.finishDay === undefined) {
            const today = new Date(new Date().toISOString().substring(0, 10));
            today.setTime(today.getTime() + (30 * 3600 * 24 * 1000))
            return today;
        }
        return DateString.fromDayString(this.data.finishDay);
    }

    addSpendRecord(sum: number, withUndo: boolean = true) {
        if(this.data.todayBalance === undefined || this.data.balance === undefined) return;
        if(this.data.spentHistory === undefined) this.initHistory();

        this.data.balance = Math.max(0, this.data.balance - sum);
        this.data.todayBalance = Math.max(0, this.data.todayBalance - sum);

        if(this.data.spentHistory) {
            const todayString = DateString.toDayString(new Date());

            if(withUndo) {
                this.data.lastOperation = sum;
                this.data.lastOperationDate = todayString;
            }

            if(!this.data.spentHistory.days[todayString])
                this.data.spentHistory.days[todayString] = 0;
            this.data.spentHistory.days[todayString] += sum;

            const monthString = DateString.toMonthString(new Date());
            if(!this.data.spentHistory.months[monthString])
                this.data.spentHistory.months[monthString] = 0;
            this.data.spentHistory.months[monthString] += sum;
        }

        this.compressData();
        this.save();
    }

    undoLastOperation() {
        if(!this.data.lastOperation ||
            this.data.lastOperationDate !== DateString.toDayString(new Date())) return;

        const amount = -this.data.lastOperation;
        delete this.data.lastOperationDate;
        delete this.data.lastOperation;

        this.addSpendRecord(amount, false);
    }

    compressData() {
        if(this.data.spentHistory) {
            this.limitObjectSize(this.data.spentHistory.days, 30);
            this.limitObjectSize(this.data.spentHistory.months, 12);
        }
    }

    private limitObjectSize(object: {[id: string]: any}, length: number) {
        while(Object.keys(object).length > length) {
            const key = Object.keys(object)[0];
            console.log("Drop", key);
            delete object[key];
        }
    }

    private initHistory() {
        if(this.data.spentHistory) return;
        this.data.spentHistory = {
            days: {},
            months: {},
        };
    }

    getNewTodayBalance(delta: number=0) {
        if(this.data.balance === undefined) return 300;

        const val = (this.data.balance - delta) / this.getDaysCount();
        return Math.floor(Math.max(0, val));
    }

    getDailySpentData(): SpentChartData {
        if(this.data.spentHistory === undefined) return [];

        const output: SpentChartData = [];
        for(const date in this.data.spentHistory.days)
            output.push({date, sum: this.data.spentHistory.days[date]});

        return output;
    }

    getMonthlySpentHistory(): SpentChartData {
        if(this.data.spentHistory === undefined) return [];

        const output: SpentChartData = [];
        for(const date in this.data.spentHistory.months)
            output.push({date, sum: this.data.spentHistory.months[date]});

        return output;
    }

    getUndoAmount(): number {
        console.log(this.data);
        if(!this.data.lastOperation ||
            this.data.lastOperationDate !== DateString.toDayString(new Date())) return 0;
        return this.data.lastOperation
    }
}
