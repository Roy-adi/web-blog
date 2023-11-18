import { createContext, useState } from "react";


export const myContext = createContext();

const AppContext = ({children})=>{

    const [ categories , setCategories ] =useState()
    const [ blogs , setBlogs ] = useState()
    const [ tags , setTags ] = useState()
  return(
    <myContext.Provider value={{ categories , setCategories , blogs, setBlogs,tags, setTags }} >
     {children}
    </myContext.Provider>
  )
}

export default AppContext;