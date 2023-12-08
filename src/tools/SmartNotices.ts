export class SmartNotices {
    static getHomePageNotice(pendingSpentInt: number, todayBalance: number) {
        let notice = "Today's budget";
        if(pendingSpentInt > 0) {
            if(todayBalance > 0) {
                notice = "Today's budget after this purchase";
            } else {
                notice = "This spent will use total wallet, today's limit is out";
            }
        } else if(todayBalance === 0) {
            notice = "There's no enough money for today";
        }

        return notice;
    }
}