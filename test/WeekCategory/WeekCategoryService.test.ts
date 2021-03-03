import axios from 'axios';
import { weekCategory } from '../../weekCategories/weekCategory';
import weekCategoryService from '../../weekCategories/WeekCategoryService';

// Change Data at will please
describe('tests for adding, deleting, and retrieving categories for a week',  () => {

    test('that deleteCategory returns a promise with data in it when the function is passed incorrect data', async () => {

        let returnValues;
        let obj = {data: []};
        axios.delete = jest.fn().mockResolvedValue(obj);
        await weekCategoryService.deleteCategory('0').then((returendMSG: any) => {
            returnValues = returendMSG;
        });
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(null);
        expect(axios.delete).toHaveBeenCalledWith('enter url');
    });
    test('that deleteCategory returns an error when the function is passed incorrect data', async () => {

        let returnValues;
        let err = new(Error);
        axios.delete = jest.fn().mockResolvedValue(err);
        await weekCategoryService.deleteCategory('0').then((returendMSG: any) => {
            returnValues = returendMSG;
        });
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(null);
        expect(axios.delete).toHaveBeenCalledWith('enter url');
    });

    //Note: getCategories either returns an empty array or an array with categories inside of
    test('that getCategories returns a promise with data in it', async () => {
        let returnValues;
        let obj = { data: [] };
        axios.get = jest.fn().mockReturnValue(obj);
        await weekCategoryService.getCategory(0).then((arr: any) => {
            returnValues = arr;
        });
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(obj.data);
        expect(axios.get).toHaveBeenCalledWith('enter url');
    });


    test('that addCategory returns a promise with data in it when the function is passed correct data', async () => {
        let returnValues;
        let item:weekCategory={qcWeekId:0, categoryId:0}
        let obj = {data: []};
        axios.post = jest.fn().mockResolvedValue(obj);
        await weekCategoryService.addCategory(item).then((result:any)=>{
            returnValues = result;
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(returnValues).toStrictEqual([]);

    });

    test('that addCategory returns an error when the function is passed incorrect data', async () => {
        let returnValues;
        let item:weekCategory={qcWeekId:0, categoryId:0}
        let err = new Error();
        axios.post = jest.fn().mockResolvedValue(err);
        await weekCategoryService.addCategory(item).then((result:any)=>{
            returnValues = result;
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(undefined);

    });
});