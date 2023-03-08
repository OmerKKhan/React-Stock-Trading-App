import { useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'
import {useGlobalContext} from "../context/watchListContext"

export const AutoComplete = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const { addStock } = useGlobalContext()
  
  const renderDropdown=()=>{
    const dropDownClass = search ? 'show' : null
    return(
      <ul style={{
        height:"500px",
        overflowY:"scroll",
        overflowX:"hidden",
        cursor:"pointer"
      }} className={`dropdown-menu ${dropDownClass}`}>
        {searchResult.map((result) => {
        return (
          <li className="dropdown-item" key={result.symbol} 
            onClick={ ()=> {
                addStock(result.symbol)
                setSearch("")
              } 
            }>
            {result.description}({result.symbol})
          </li>
        )
        })}
      </ul>
    )
  }
  
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search
          }
        })
        console.log(response)
        if(isMounted){
          setSearchResult(response.data.result)
        }
      }
      catch (err) {
      }
    }
    if (search.length > 0) {
      fetchData();
    }
    else{
      setSearchResult([])
    }
    return () => (isMounted=false)
  }, [search])

  return <div className="w-50 p-5 mx-auto">
    <div className="form-floating dropdown">
      <input style={{ backgroundColor: "rgba (145,158,171,0.04)" }} 
        id="search" type="text" className="form-control" placeholder="Search" 
        autoComplete="off" value={search} 
        onChange={(e) => setSearch(e.target.value)}></input>
      
      <label htmlFor="search">Search</label>
      {renderDropdown()}
    </div>
  </div >
}