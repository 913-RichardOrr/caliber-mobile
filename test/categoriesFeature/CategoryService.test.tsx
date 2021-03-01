import axios from 'axios';
import categoryService from '../../categoriesFeature/CategoryService';

describe('categoryService class', () => {
    test('getCategories returns proper data', async () => {
        let returnValues;
        let obj = {data: []};
        axios.get = jest.fn().mockResolvedValue(obj);
        await categoryService.getCategories().then((arr) => {
            returnValues = arr;
        });
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(obj.data);
    });
    
    test('addCategory returns proper data', async () => {
        let returnValues;
        let skill = 'skill'
        let active = true;
        let obj = {data: []};
        axios.post = jest.fn().mockResolvedValue(obj);
        await categoryService.addCategory(skill).then((result)=>{
            returnValues = result;
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(obj.data);
    });

    test('updateCategory returns proper data', async () => {
        let returnValues;
        let id = 1;
        let obj = {data:[]};
        axios.put = jest.fn().mockResolvedValue(obj);
        await categoryService.updateCategory(id).then((result) => {
            returnValues = result;
        });
        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(obj.data);
    });
});



