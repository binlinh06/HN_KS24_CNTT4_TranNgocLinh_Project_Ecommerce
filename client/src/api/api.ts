import axios from "axios"
import type { Category } from "../utils/types"

export const API_GETALL_CATEGORY ="http://localhost:8080/categories"

export const API_ADD_CATEGORY = async (new_category:Category)=>{
    const res = await axios.post("http://localhost:8080/categories",new_category)
    return res.data
}