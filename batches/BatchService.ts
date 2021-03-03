import axios from 'axios';
import Batch from './batch';

interface trainerBatchResp {
  batches: Batch[];
  validYears: number[];
}

class BatchService {
  private URI: string;
  constructor() {
    this.URI =
      /*process.env.CALIBER_URI*/ 'https://rtnkp17gz4.execute-api.us-east-1.amazonaws.com/default/batches';
  }

  getValidYears(token: string): Promise<[]> {
    console.log('Batch Service: getValidYears');
    return axios
      .get(this.URI, {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: 'validYears' },
      })
      .then((result) => result.data)
      .catch((error) => {
        console.error(error);
      });
  }
  getBatchesByTrainerEmail(
    token: string,
    trainerEmail: string
  ): Promise<trainerBatchResp> {
    console.log('Batch Service: getBatchesByTrainerEmail');
    return axios
      .get(this.URI, {
        headers: { Authorization: `Bearer ${token}` },
        params: { trainerEmail: trainerEmail },
      })
      .then((result) => result.data)
      .catch((error) => {
        console.error(error);
      });
  }
  getAllBatches(token: string, year: number): Promise<Batch[]> {
    console.log('Batch Sevice: getAllBatches');
    return axios
      .get(this.URI, {
        headers: { Authorization: `Bearer ${token}` },
        params: { year: year },
      })
      .then((result) => result.data)
      .catch((error) => {
        console.error(error);
      });
  }
}

const batchService = new BatchService();
export default batchService;
