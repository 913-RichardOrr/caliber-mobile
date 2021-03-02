export default class QcWeek {
    public qcWeekId: number = 0;
    public weekNumber: number = 1;
    public note: string = '';
    // This may need to be changed, I'm not sure how node postgres will convert an enum
    public overallStatus: string = '';
    public batchId: string = '';
}