import axios from 'axios';

import QcWeek from '../QcWeek';

export class AddWeekService {
    private URI: string;
    constructor() {
        this.URI = '/weeks';
    }

    addWeek(week: QcWeek): Promise<null> {
        return axios.post(this.URI, week).then(() => null);
    }
}

export default new AddWeekService();