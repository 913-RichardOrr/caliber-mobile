import axios from 'axios';
import { WeekCategory } from '../../weekCategories/WeekCategory';
import weekCategoryService from '../../weekCategories/WeekCategoryService';

// Change Data at will please
describe('tests for adding, deleting, and retrieving categories for a week',  () => {

    test('that deleteCategory returns a promise with data in it when the function is passed incorrect data', async () => {

        let testToken = 'testToken';
        let testBatchId = 'testBatchId';
        let testWeekId = 0;
        let testCatId = 0;
        let returnValues;
        let obj = {data: []};
        axios.delete = jest.fn().mockResolvedValue(obj);
        await weekCategoryService.deleteCategory(testWeekId,testBatchId,testCatId, testToken).then((returendMSG: any) => {
            returnValues = returendMSG;
        });
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(null);
        expect(axios.delete).toHaveBeenCalledWith(`https://d3e1hb8u20.execute-api.us-east-1.amazonaws.com/default/batches/${testBatchId}/weeks/${testWeekId}/categories/${testCatId}`,{"headers": {"Authorization": `Bearer ${testToken}`}});
    });
    test('that deleteCategory returns an error when the function is passed incorrect data', async () => {
        let testToken = 'testToken';
        let testBatchId = 'testBatchId';
        let testWeekId = 0;
        let testCatId = 0;
        let returnValues;
        let err = new(Error);
        axios.delete = jest.fn().mockResolvedValue(err);
        await weekCategoryService.deleteCategory(testWeekId,testBatchId,testCatId, testToken).then((returendMSG: any) => {
            returnValues = returendMSG;
        });
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(null);
        expect(axios.delete).toHaveBeenCalledWith(`https://d3e1hb8u20.execute-api.us-east-1.amazonaws.com/default/batches/${testBatchId}/weeks/${testWeekId}/categories/${testCatId}`,{"headers": {"Authorization": `Bearer ${testToken}`}});
    });

    //Note: getCategories either returns an empty array or an array with categories inside of
    test('that getCategories returns a promise with data in it', async () => {
        let testToken = 'testToken';
        let testBatchId = 'testBatchId';
        let testWeekId = 0;
        let returnValues;
        let obj = { data: [] };
        axios.get = jest.fn().mockReturnValue(obj);
        await weekCategoryService.getCategory(testWeekId,testBatchId,testToken).then((arr: any) => {
            returnValues = arr;
        });
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(obj.data);
        expect(axios.get).toHaveBeenCalledWith('`https://d3e1hb8u20.execute-api.us-east-1.amazonaws.com/default/batches/${testBatchId}/weeks/${testWeekId}/categories`,{"headers": {"Authorization": `Bearer ${testToken}`}}');
    });


    test('that addCategory returns a promise with data in it when the function is passed correct data', async () => {
        let returnValues;
        let testToken = 'testToken';
        let testBatchId = 'testBatchId';
        let testWeekId = 0;
        let item:WeekCategory={qcWeekId:0, categoryId:0}
        let obj = {data: []};
        axios.post = jest.fn().mockResolvedValue(obj);
        await weekCategoryService.addCategory(item, testBatchId,testWeekId,testToken).then((result:any)=>{
            returnValues = result;
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(returnValues).toStrictEqual(null);

    });

    test('that addCategory returns an error when the function is passed incorrect data', async () => {
        let returnValues;
        let testToken = 'testToken';
        let testBatchId = 'testBatchId';
        let testWeekId = 0;
        let item:WeekCategory={qcWeekId:0, categoryId:0}
        let err = new Error();
        axios.post = jest.fn().mockResolvedValue(err);
        await weekCategoryService.addCategory(item, testBatchId,testWeekId,testToken).then((result:any)=>{
            returnValues = result;
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(null);

    });
});