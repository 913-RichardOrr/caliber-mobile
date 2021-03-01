import axios from "axios";
import { Category } from './Category';

class categoryService {
    private URI: string;
    constructor() {
        this.URI = '';
    }

    // GET function for /categories
    getCategories(queryString?: string): Promise<Category[]> {
        let promise: Promise<Category[]> = new Promise ((resolve) => {
            setTimeout(resolve, 10, new Category());
        })
        return promise;
    }

    // POST function for /categories
    addCategory(skill: string): Promise<Category> {
        let promise: Promise<Category> = new Promise ((resolve) => {
            setTimeout(resolve, 10, new Category());
        })
        return promise;
    }

    // PUT function for /categories/{categoryId}
    // should take in a category object? 
    updateCategory(category: Category): Promise<Category>{ 
        let promise: Promise<Category> = new Promise ((resolve) => {
            setTimeout(resolve, 10, new Category());
        })
        return promise;
    }
}

export default new categoryService();
