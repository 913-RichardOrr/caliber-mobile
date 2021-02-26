import {STATUS} from './batchWeekService';

export default class QcWeek {
    public qcweekid: number = 0;
    public weeknumber: number = 1;
    public note: string = '';
    public overallStatus: STATUS = 'Undefined';
    public batchid: string = '';
}