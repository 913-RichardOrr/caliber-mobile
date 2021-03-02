import axios from 'axios';

class BatchPageService {
  private URI: string;
  constructor() {
    // URL of the API server that stores our Lambdas.
    this.URI = 'https://d3e1hb8u20.execute-api.us-east-1.amazonaws.com/default';
  }

  async getAssociates(batchID: string, token: string): Promise<[]> {
    return axios
      .get(`${this.URI}/qc/batches/${batchID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => result.data)
      .catch((err) => {
        console.error(err);
      });
  }
}

export default new BatchPageService();
