import {createContext, useState, useContext, useEffect} from 'react'

const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {
  
  const [watchList, setWatchList] = useState(
    
    localStorage.getItem("watchList")?.split(",") ||
    ["GOOGL","MSFT","AMZN"]
  )    

  useEffect(()=>{
    localStorage.setItem("watchList", (watchList))
  
  }, [watchList])
  
const addStock = (stock) =>{
  if(watchList.indexOf(stock)===-1){
    setWatchList([...watchList, stock])  
  }
}

const deleteStock = (stock) =>{
  let result = watchList.filter((element) =>
    {
      return element!== stock
    })
  setWatchList(result) 
}

  
  return <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
    {props.children}
    </WatchListContext.Provider>
}



export const useGlobalContext = () => {
  return useContext(WatchListContext)
}