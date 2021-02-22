import axios from 'axios';

import Batch from './Batch';

class BatchService {
	private URI: string;
	constructor() {
		this.URI =
			/*process.env.CALIBER_URI*/ 'https://aosczl5fvf.execute-api.us-west-2.amazonaws.com/default' +
			'/batches';
	}

	getBatchesByTrainerEmail(trainerEmail: string): Promise<Batch[]> {
		console.log('Batch Service: getBatchesByTrainerEmail');
		return axios
			.get(this.URI, { params: { trainerEmail: trainerEmail } })
			.then((result) => result.data)
			.catch((error) => {
				console.error(error);
			});
	}
	getAllBatches(year: number, quarter: number): Promise<Batch[]> {
		return axios
			.get(this.URI, { params: { year: year, quarter: quarter } })
			.then((result) => result.data)
			.catch((error) => {
				console.error(error);
			});
	}
}

const batchService = new BatchService();
export default batchService;
