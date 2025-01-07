import  axios  from 'axios';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const useCategory= ()=>{
    const [category,setCategory] = useState([]);
const getCategory =async()=>{

    try {
        const {data} = await axios.get('https://shopify-x-backend.onrender.com/api/v1/category/allcategory');
        if(data.success){
            setCategory(data.category);
        }else{
            toast.error(data.message);
        }
        
    } catch (error) {
        toast.error(error.message);
    }
}

useEffect(()=>{
    getCategory()
},[])

  return category;

}

export default useCategory;