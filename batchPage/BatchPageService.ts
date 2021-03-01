import axios from 'axios';

class BatchPageService {
  private URI: string;
  constructor() {
    // URL of the API server that stores our Lambdas.
    this.URI = 'https://7tu8pm3exl.execute-api.us-east-1.amazonaws.com/default';
  }

  async getAssociates(batchID: string): Promise<[]> {
    return axios
      .get(`${this.URI}/qc/batches/${batchID}`)
      .then((result) => result.data)
      .catch((err) => {
        console.error(err);
      });
  }
}

export default new BatchPageService();
