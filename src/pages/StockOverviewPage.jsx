import {StockList} from '../components/StockList';
import {AutoComplete} from '../components/AutoComplete';
import {useState, useEffect} from 'react'

export const StockOverviewPage = () =>{
  
  return <div>
    <AutoComplete/>
    <StockList/>
  </div>
}