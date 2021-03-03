import axios from 'axios';
import { WeekCategory } from './WeekCategory';

class WeekCategoryService {
    private URI: string;
    constructor() {
        this.URI = 'https://kx49u9u25h.execute-api.us-east-1.amazonaws.com/default/';
    }

    /**
    * Display a list of current categories for the week and a button to add categories to the week
    * 
    * @param weekCategory the added weekCategory
    * @return the category that was added
    */
    addCategory(weekCategory: WeekCategory, batchId: string, weekId: number ,token:string): Promise<null> {
        return axios
            .post(this.URI + 'qc/batches/' + batchId + '/weeks/' + weekId + '/categories', weekCategory,{headers: { Authorization: `Bearer ${token}`}})
            .then((result) => null)
            .catch(err => err);
    }

    /**
    * Display a list of current categories for the week and a button to add categories to the week
    * 
    * @param number the id of the week
    * @return an array of all categories for a given week
    */
    getCategory(weekId: number, batchId:string, token:string): Promise<WeekCategory[]> {
        return axios
            .get(this.URI + 'qc/batches/' + batchId + '/weeks/' + weekId + '/categories',{headers: { Authorization: `Bearer ${token}`}})
            .then((result) => result.data)
            .catch(err => err);
    }

    /**
    * Remove the given category from a list
    * 
    * @param  string the id of the category
    * @return nothing
    */
    deleteCategory(weekId: number, batchId: string, catId: number, token:string): Promise<null> {

        return axios
            .delete(this.URI + 'qc/batches/' + batchId + '/weeks/' + weekId + '/categories/' + catId,{headers: { Authorization: `Bearer ${token}`}})
            .then((result) => null)
            .catch((err) => err);
    }
}

export default new WeekCategoryService();
