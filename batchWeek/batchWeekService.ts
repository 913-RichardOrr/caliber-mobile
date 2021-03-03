import axios, { AxiosRequestConfig } from 'axios';
import QcWeek from './QcWeek';

class BatchWeekService {
    private URI: string;
    constructor() {
        this.URI ="https://a737vxhhbh.execute-api.us-east-1.amazonaws.com/default/";
    }

    private getConfig(token: string): AxiosRequestConfig {
        return { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }

    // get all week objects for a specific batch
    getWeeksByBatchId(token: string, batchid: string): Promise<QcWeek[]> {
        return axios.get(this.URI + `qc/batches/${batchid}/weeks`, this.getConfig(token)).then(result => result.data).catch((err) => {
            console.error(err);
        });
    }

    // add new qc_week to the qc_week table for /batches/{batchId}/weeks
    addWeek(token: string, qw: QcWeek): Promise<any> {
        return axios.post(this.URI + `qc/batches/${qw.batchid}/weeks`, qw, this.getConfig(token)).then().catch((err) => {
            console.error(err);
        });
    }

     // update the overall note and technical status for a week
    updateFeedback(token: string, qw: QcWeek): Promise<any> {
        return axios.post(this.URI + `qc/batches/TR-1004/weeks/${qw.weeknumber}`, qw, this.getConfig(token)).then().catch((err) => {
            console.error(err);
        });
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