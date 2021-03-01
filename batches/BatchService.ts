import axios from 'axios';
import Batch from './Batch';

interface TrainerBatchResp {
	batches: Batch[];
	validYears: string[];
}

class BatchService {
	private URI: string;
	constructor() {
		this.URI =
			/*process.env.CALIBER_URI*/ 'https://aosczl5fvf.execute-api.us-west-2.amazonaws.com/default';
	}

	getValidYears(): Promise<[]> {
		console.log('Batch Service: getValidYears');
		return axios
			.get(this.URI + '/batch2', { params: { query: 'validYears' } })
			.then((result) => result.data)
			.catch((error) => {
				console.error(error);
			});
	}
	getBatchesByTrainerEmail(trainerEmail: string): Promise<TrainerBatchResp> {
		console.log('Batch Service: getBatchesByTrainerEmail');
		return axios
			.get(this.URI + '/batch2', { params: { trainerEmail: trainerEmail } })
			.then((result) => result.data)
			.catch((error) => {
				console.error(error);
			});
	}
	getAllBatches(year: number): Promise<Batch[]> {
		console.log('Batch Sevice: getAllBatches');
		return axios
			.get(this.URI + '/batch2', {
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
