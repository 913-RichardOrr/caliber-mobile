import axios, { AxiosRequestConfig } from 'axios';
import QcWeek from './QcWeek';
// add new qc_week to database
// get all qc_note for specific batch and specific week

class BatchWeekService {
    private URI: string;
    constructor() {
        this.URI ="http://localhost:3000/";
    }

    private getConfig(token: string): AxiosRequestConfig {
        return { 
            headers: {'Authorization': `Bearer ${token}`}
        };
    }

    // get all week objects for a specific batch
    getWeeksByBatchId(token: string, batchid: string): Promise<QcWeek[]> {
        // return axios.get(this.URI + `qc/batches/${batchid}/weeks`, this.getConfig(token)).then(result => result.data);
        let testWeeks: QcWeek[] = [
            {qcweekid: 0, weeknumber: 1, note: '', overallstatus: 'Good', batchid: 'id1'},
            {qcweekid: 1, weeknumber: 3, note: '', overallstatus: 'Average', batchid: 'id1'},
            {qcweekid: 2, weeknumber: 2, note: '', overallstatus: 'Poor', batchid: 'id1'}
        ];
        return new Promise((resolve) => resolve(testWeeks));
    }

    // add new qc_week to the qc_week table for /batches/{batchId}/weeks
    addWeek(token: string, qw: QcWeek): Promise<null> {
        return axios.post(this.URI + `qc/batches/${qw.batchid}/weeks`, qw, this.getConfig(token)).then(result => null);
    }

     // update the overall note and technical status for a week
    updateFeedback(token: string, qw: QcWeek): Promise<null> {
        return axios.post(this.URI + `qc/batches/${qw.batchid}/weeks/${qw.weeknumber}`, qw, this.getConfig(token)).then(result => null);
    }

}

export default new BatchWeekService();

// the way stored in postgres below 

export type STATUS = 'Undefined' | 'Poor' | 'Average' | 'Good' | 'Superstar';


export class qcnotes {
    public qcnoteid: number =0;
    public weeknumber: number =0;
    public batchid: string='';
    public associateid: string ='';
    public technicalstatus: STATUS='Undefined';  // must be string
    public notecontent: string ='';

}