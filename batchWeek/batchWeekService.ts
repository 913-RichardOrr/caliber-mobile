import axios from 'axios';
// add new qc_week to database
// get all qc_note for specific batch and specific week

class BatchWeekService {
    private URI: string;
    constructor() {
        this.URI ="http://localhost:3000/";


    }

    // get qc_notes for all weeks for the batch
    getBatchWeekNotes(batchId: string, week: number): Promise <QcNote []> {
        let pathToBatch = `batches/${batchId}`;

        return axios.get(this.URI + pathToBatch + '/weeks' ).then(result => result.data);
    }

    // get qc_notes for specific batch for specific week
    getBatchWeekNote(batchId: string, week: number): Promise <QcNote []> {
        let pathToWeek =`batches/${batchId}/weeks/${week}`
        return axios.get(this.URI + pathToWeek ).then(result => result.data);
    }



    // add new qc_week to the qc_week table for /batches/{batchId}/weeks
    addNewQcWeek(qw: QcWeek): Promise<null> {
        const pathToQcWeek =''
        return axios.post(this.URI + pathToQcWeek, qw).then(result => null);
    }


     // POST function for  many qc_notes /batches/{batchId}/weeks/{weekid}
     addNewQcNote(qn: QcNote []): Promise<null> {
        let pathname = `batches/${qn[0].batchId}/weeks/${qn[0].weeknumber}`;
        return axios.post(this.URI + pathname, qn).then(result => null);
    }


}


export default new BatchWeekService();


export class QcWeek {
    public id: number =0;
    public categoryId: number =0;
    public batchId: string='';
    public week: number =1;

}
/* 
export class QcNote {
    public id: number =0;
    public batchId: string ='';
    public associateId: string='';
    public week: number =1;
    public technicalStatus: Status ='Good';
    public softSkillStatus: Status ='Good';
    public content: string ='';
    public type: QcNoteType = '';

} */

export class QcNote {
    public qcnoteid: number =0;
    public weeknumber: number =0;
    public batchId: string='';
    public associateid: string ='';
    public technicalstatus: STATUS='Undefined';  // must be string
    public notecontent: string ='';

}

export type STATUS = 'Undefined' | 'Poor' | 'Average' | 'Good' | 'Superstar';

interface QcNoteType {

}