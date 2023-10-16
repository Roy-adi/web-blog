import { createContext, useState } from "react";


export const myContext = createContext();

const AppContext = ({children})=>{

    const [ categories , setCategories ] =useState()
  return(
    <myContext.Provider value={{ categories , setCategories }} >
     {children}
    </myContext.Provider>
  )
}

export default AppContext;