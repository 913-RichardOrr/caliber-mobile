import axios from 'axios';
import Batch from './batch';

class BatchService {
  private URI: string;
  constructor() {
    this.URI =
      /*process.env.CALIBER_URI*/ 'https://aosczl5fvf.execute-api.us-west-2.amazonaws.com/default';
  }

  getBatchesByTrainerEmail(trainerEmail: string): Promise<Batch[]> {
    console.log('Batch Service: getBatchesByTrainerEmail');
    return axios
      .get(this.URI + '/batches', { params: { trainerEmail: trainerEmail } })
      .then((result) => result.data)
      .catch((error) => {
        console.error(error);
      });
  }
  getAllBatches(year: number, quarter: number): Promise<Batch[]> {
    console.log('Batch Sevice: getAllBatches');
    return axios
      .get(this.URI + '/batchesall', {
        params: { year: year, quarter: quarter },
      })
      .then((result) => result.data)
      .catch((error) => {
        console.error(error);
      });
  }
}

const batchService = new BatchService();
export default batchService;
