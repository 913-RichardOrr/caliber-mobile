import axios from 'axios';
// add new qc_week to database
// get all qc_note for specific batch and specific week

class BatchWeekService {
    private URI: string;
    constructor() {
        this.URI ="http://localhost:3000/";


    }

    // get qc_notes for all weeks for the batch
    getBatchWeekNotes(batchId: string, week: number): Promise <qcnotes []> {
        let pathToBatch = `batches/${batchId}`;

        return axios.get(this.URI + pathToBatch + '/weeks' ).then(result => result.data);
    }

    // get qc_notes for specific batch for specific week
    getBatchWeekNote(batchId: string, week: number): Promise <qcnotes []> {
        let pathToWeek =`batches/${batchId}/weeks/${week}`
        return axios.get(this.URI + pathToWeek ).then(result => result.data);
    }



    // add new qc_week to the qc_week table for /batches/{batchId}/weeks
    addNewQcWeek(qw: qcweeks): Promise<null> {
        const pathToQcWeek =''
        return axios.post(this.URI + pathToQcWeek, qw).then(result => null);
    }


     // POST function for  many qc_notes /batches/{batchid}/weeks/{week}
     addNewQcNote(qn: qcnotes []): Promise<null> {
        let pathname = `batch/${qn[0].batchid}/weeks/${qn[0].weeknumber}`;
        return axios.post(this.URI + pathname, qn).then(result => null);
    }

}


export default new BatchWeekService();
export class qcweeks {
    public id: number =0;
    public categoryId: number =0;
    public batchId: string='';
    public week: number =1;

}

// the way stored in postgres below 
// type STATUS as enum ('Undefined', 'Poor', 'Average', 'Good', 'Superstar');

export type STATUS = 'Undefined' | 'Poor' | 'Average' | 'Good' | 'Superstar';


export class qcnotes {
    public qcnoteid: number =0;
    public weeknumber: number =0;
    public batchid: string='';
    public associateid: string ='';
    public technicalstatus: STATUS='Undefined';  // must be string
    public notecontent: string ='';

}