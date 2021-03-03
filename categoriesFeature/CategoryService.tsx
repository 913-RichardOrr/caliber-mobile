import axios from 'axios';
import { Category } from './Category';

class categoryService {
  private URI: string;
  constructor() {
    this.URI = 'https://d3e1hb8u20.execute-api.us-east-1.amazonaws.com/default';
  }

  // GET function for /categories
  getCategories(token: string, queryString?: boolean): Promise<any> {
    return axios
      .get(`${this.URI}/categories`, {
        params: { active: queryString },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(`Error getting categories: ${err}`);
        return null;
      });
  }

  // POST function for /categories
  addCategory(token: string, skill: string): Promise<any> {
    return axios
      .post(`${this.URI}/categories`, skill, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(`Error getting category: ${err}`);
        return null;
      });
  }

  // PUT function for /categories/{categoryId}
  updateCategory(token: string, category: Category): Promise<any> {
    console.log('category for put: ', category);
    return axios
      .put(`${this.URI}/categories` + `/${category.categoryid}`, category, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(`Error getting category: ${err}`);
        return null;
      });
  }
}

export default new categoryService();
