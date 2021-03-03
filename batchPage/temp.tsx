import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Text } from "react-native";
import CategoryService from "../categoriesFeature/CategoryService";
import { ReducerState } from '../store/store';


export default function temp() {

    const user = useSelector((state: ReducerState) => state.weekReducer.user);

    useEffect(() => {
        CategoryService.getCategories(user.token, true).then((result) => {
            console.log(result);
        });
    })

    return (
        <Text>Hi</Text>
    );
}