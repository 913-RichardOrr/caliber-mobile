import axios from 'axios';
import QcWeek from './QcWeek';
// add new qc_week to database
// get all qc_note for specific batch and specific week

class BatchWeekService {
    private URI: string;
    constructor() {
        this.URI ="http://localhost:3000/";
    }

    // get all week objects for a specific batch
    getWeeksByBatchId(batchid: string): Promise<QcWeek[]> {
        return axios.get(this.URI + `qc/batches/${batchid}/weeks`).then(result => result.data);
    }

    // add new qc_week to the qc_week table for /batches/{batchId}/weeks
    addWeek(qw: QcWeek): Promise<null> {
        return axios.post(this.URI + `qc/batches/${qw.batchid}/weeks`, qw).then(result => null);
    }

     // update the overall note and technical status for a week
     updateFeedback(qw: QcWeek): Promise<null> {
        return axios.post(this.URI + `qc/batches/${qw.batchid}/weeks/${qw.weeknumber}`, qw).then(result => null);
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