import {STATUS} from './batchWeekService';
export default class qcweeks {
    public qcweekid: number=0; //
    public weeknumber: number = 1;
    public note: string = '';
    // This may need to be changed, I'm not sure how node postgres will convert an enum
    public overallStatus: STATUS = 'Undefined';
    public batchid: string = '';
}