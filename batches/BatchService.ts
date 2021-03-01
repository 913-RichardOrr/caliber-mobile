import axios from 'axios';
import Batch from './Batch';

interface trainerBatchResp {
	batches: Batch[];
	validYears: number[];
}

class BatchService {
	private URI: string;
	constructor() {
		this.URI =
			/*process.env.CALIBER_URI*/ 'https://2j5p3o05c6.execute-api.us-west-2.amazonaws.com/default/batches';
	}

	getValidYears(): Promise<[]> {
		console.log('Batch Service: getValidYears');
		return axios
			.get(this.URI, { params: { query: 'validYears'}})
			.then((result) => result.data)
			.catch((error) => {
				console.error(error);
			});
	}
	getBatchesByTrainerEmail(trainerEmail: string): Promise<trainerBatchResp> {
		console.log('Batch Service: getBatchesByTrainerEmail');
		return axios
			.get(this.URI, { params: { trainerEmail: trainerEmail } })
			.then((result) => result.data)
			.catch((error) => {
				console.error(error);
			});
	}
	getAllBatches(year: number): Promise<Batch[]> {
		console.log('Batch Sevice: getAllBatches');
		return axios
			.get(this.URI, {
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
