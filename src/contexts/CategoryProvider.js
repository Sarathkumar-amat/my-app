import {createContext,useState,useEffect,useReducer} from "react";
import {initialState,reducerFunc} from "../Reducer/BookReducer.js";

export const CategoryContext = createContext();
export function CategoryProvider( {children} )
{
    const [bookState,dispatch]=useReducer(reducerFunc,initialState);
    const getCategory = async()=>{
        const res = await fetch("/api/categories");
        const responseJson = await res.json();
        const categories = responseJson?.categories;
        const catNames = categories.map(({categoryName})=>categoryName)
        dispatch({type:"setCategory",payload:catNames});
    }
    console.log(bookState?.categories);
    useEffect(()=>{getCategory()},[]);
    return (<div>
        <CategoryContext.Provider value={{bookState,dispatch}}>
            {children}
        </CategoryContext.Provider>
    </div>)
}