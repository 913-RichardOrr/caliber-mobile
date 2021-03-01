import axios from 'axios';
import weekCategoryService from '../../WeekCategories/WeekCategoryService';

// Change Data at will please
describe('tests for adding, deleting, and retrieving categories for a week', async () => {

    test('that deleteCategory returns a promise with data in it when the function is passed incorrect data', async () => {

        let returnValues;
        let obj = {data: []};
        axios.delete = jest.fn().mockResolvedValue(obj);
        await weekCategoryService.deleteCategory().then((returendMSG: any) => {
            returnValues = returendMSG;
        });
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(true);
        expect(axios.delete).toHaveBeenCalledWith('enter url');
    });
    test('that deleteCategory returns an error when the function is passed incorrect data', async () => {

        let returnValues;
        let err = new(Error);
        axios.delete = jest.fn().mockResolvedValue(err);
        await weekCategoryService.deleteCategory().then((returendMSG: any) => {
            returnValues = returendMSG;
        });
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(false);
        expect(axios.delete).toHaveBeenCalledWith('enter url');
    });

    //Note: getCategories either returns an empty array or an array with categories inside of
    test('that getCategories returns a promise with data in it', async () => {
        let returnValues;
        let obj = { data: [] };
        axios.get = jest.fn().mockReturnValue(obj);
        await weekCategoryService.getCategories().then((arr: any) => {
            returnValues = arr;
        });
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(obj.data);
        expect(axios.get).toHaveBeenCalledWith('enter url');
    });


    test('that addCategory returns a promise with data in it when the function is passed correct data', async () => {
        let returnValues;
        let skill = 'skill'
        let active = true;
        let obj = {data: []};
        axios.post = jest.fn().mockResolvedValue(obj);
        await weekCategoryService.addCategory(skill, active).then((result:any)=>{
            returnValues = result;
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(true);

    });

    test('that addCategory returns an error when the function is passed incorrect data', async () => {
        let returnValues;
        let skill = 'skill'
        let active = true;
        let err = new Error();
        axios.post = jest.fn().mockResolvedValue(err);
        await weekCategoryService.addCategory(skill, active).then((result:any)=>{
            returnValues = result;
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(returnValues).toBe(false);

    });
});