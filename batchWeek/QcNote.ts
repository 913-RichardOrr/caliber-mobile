import {STATUS} from './batchWeekService';

export default class QcNote {
    public qcnoteid: number =0;
    public weeknumber: number =0;
    public batchid: string='';
    public associateid: string ='';
    public technicalstatus: STATUS='Undefined';  // must be string
    public notecontent: string ='';

}