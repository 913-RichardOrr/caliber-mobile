import axios from 'axios';
import { WeekCategory } from './weekCategory';

class weekCategoryService {
  private URI: string;
  constructor() {
    this.URI = 'https://localhost:3000/';
  }
  // POSt function for /weekCategories
  addCategory(weekcategory: WeekCategory): Promise<WeekCategory> {
    return axios
      .post(this.URI, weekcategory)
      .then((result) => result.data)
      .catch((err) => err);
  }
  // GET function for /weekCategories
  getCategory(weekid: number): Promise<WeekCategory[]> {
    return axios
      .get(this.URI + '/' + weekid)
      .then((result) => result.data)
      .catch((err) => err);
  }
  // DELETE function for /weekCcategories
  deleteCategory(id: string): Promise<null> {
    console.log(id);
    return axios
      .delete(this.URI + '/' + id)
      .then((result) => null)
      .catch((err) => err);
  }
}

export default new weekCategoryService();
