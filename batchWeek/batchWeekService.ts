import axios, { AxiosRequestConfig } from 'axios';
import QcNote from './QcNote';
import QcWeek from './QcWeek';

class BatchWeekService {
    private URI: string;
    constructor() {
        this.URI ="https://x9ofuwde2l.execute-api.us-east-1.amazonaws.com/default";
    }

    private getConfig(token: string): AxiosRequestConfig {
        return { 
            headers: {'Authorization': `Bearer ${token}`}
        };
    }

    // get all week objects for a specific batch
    getWeeksByBatchId(token: string, batchid: string): Promise<QcWeek[]> {
        return axios.get(this.URI + `qc/batches/${batchid}/weeks`, this.getConfig(token)).then(result => result.data);
    }

    // get all qcnotes objects for a specific batch and for specific week
    getQcNotesByBatchByWeek(token: string, batchid: string, weekNumber: number): Promise<QcNote[]> {
    return axios.get(this.URI + `qc/batches/${batchid}/weeks/${weekNumber}`, this.getConfig(token)).then(result => result.data);
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


