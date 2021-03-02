import axios from "axios";
import { Category } from './Category';

class categoryService {
    private URI: string;
    constructor() {
        this.URI = 'https://l98yeck4nc.execute-api.us-east-1.amazonaws.com/default';
    }

    // GET function for /categories
    getCategories(queryString?: boolean): Promise<any> {
        return axios.get(`${this.URI}/categories`, {params: { active: queryString}}).then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(`Error getting categories: ${err}`);
            return null;
        });
    }

    // POST function for /categories
    addCategory(skill: string): Promise<any> {
        return axios.post(`${this.URI}/categories`, skill).then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(`Error getting category: ${err}`);
            return null;
        });
    }

    // PUT function for /categories/{categoryId}
    updateCategory(category: Category): Promise<any>{ 
        console.log('category for put: ', category);
        return axios.put(`${this.URI}/categories` + `/${category.categoryid}`, category).then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(`Error getting category: ${err}`);
            return null;
        });
    }
}

export default new categoryService();
