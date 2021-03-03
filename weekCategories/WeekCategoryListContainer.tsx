import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '../categoriesFeature/Category';
import {
	addWeekCategory,
	categoriesMenuOptions,
	getWeekCategories,
} from '../store/actions';
import { WeekCategory } from './WeekCategory';
import { WeekCategoryList } from '../weekCategories/weekCategoryList';
import weekCategoryService from '../weekCategories/WeekCategoryService';
import { ReducerState } from '../store/store';
import categoryService from '../categoriesFeature/CategoryService';

/**
 * Get all information that weekCategoryList will display then call weekCategoryList
 *
 *
 */
export default function WeekCategoryListContainer() {
	const weekCatSelector = (state: ReducerState) =>
		state.WeekCategoryReducer.weekCategories;
	const weekCategories = useSelector(weekCatSelector);
	const weekIDSelector = (state: ReducerState) =>
		state.weekReducer.selectedWeek;
	const weekId = useSelector(weekIDSelector);
	// authorizer state
	const currentUser = useSelector(
		(state: ReducerState) => state.userReducer.user
	);
	const token = currentUser.token;
	const dispatch = useDispatch();

	/**
	 * Create a list of categories that are already in this week
	 *
	 * @return an array of type Category[]
	 */
	function createCatList() {
		let weekCategoriesAsCategoryTemp: Category[];
		weekCategoryService.getCategory(weekId.qcWeekId).then((results) => {
			if (results == []) {
				return [];
			} else {
				categoryService.getCategories(token).then((allCats: Category[]) => {
					let thisWeekCats: Category[] = [];
					allCats.forEach((allCatElement) => {
						results.forEach((catid) => {
							if (allCatElement.categoryid == catid.categoryId) {
								thisWeekCats.push(allCatElement);
							}
						});
						weekCategoriesAsCategoryTemp = thisWeekCats;
						dispatch(getWeekCategories(thisWeekCats));
						return weekCategoriesAsCategoryTemp;
					});
				});
			}
		});
		return [];
	}

	/**
	 * Create a list of categories that are active and not already in the week
	 *
	 * @return an array of type Category[]
	 */
	function createActiveList() {
		categoryService.getCategories(token, true).then((results) => {
			let availableCats: Category[] = [];
			if (results != availableCats) {
				results.forEach((element: Category) => {
					if (weekCategories.includes(element) == false) {
						availableCats.push(element);
					}
				});
			}
			dispatch(categoriesMenuOptions(availableCats));
			return availableCats;
		});
		return [];
	}

	/**
	 * Add a category to the database and update the store
	 *
	 * @param {Category} newCat - The category to be added to the week
	 * qcWeek is what was passed to weekCategoryList function
	 */
	function addCategory(newCat: Category) {
		if (newCat.categoryid != -1) {
			let weekCat: WeekCategory = {
				categoryId: newCat.categoryid,
				qcWeekId: weekId.qcWeekId,
			};
			weekCategoryService.addCategory(weekCat).then(() => {
				dispatch(addWeekCategory(weekCat));
			});
		}
	}

	let weekCategoriesAsCategory: Category[] = createCatList();
	let activeCategoriesList: Category[] = createActiveList();

	return (
		<View>
			<WeekCategoryList
				weekId={weekId.qcWeekId}
				weekCategoriesAsCategory={weekCategoriesAsCategory}
				addCategory={addCategory}
				activeCategories={activeCategoriesList}
			/>
		</View>
	);
}
