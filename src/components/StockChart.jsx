import {useState} from 'react'
import Chart from 'react-apexcharts'

export const StockChart = ({chartData, symbol} ) =>{
  const {day, week, year} = chartData
  const [dateFormat, setDateFormat] = useState("24h")

  const renderButtonSelect = (button) =>
  {
    if (dateFormat === button) {
      return 'btn m-1 btn-primary'
    }
    else{
      return 'btn m-1 btn-outline-primary'
    }
  }
  
  const determineDateFormat = () => {
    switch(dateFormat){
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
      default:
        return day
    }
  }
  const chartParams = { 
    options: {
      title:{
        text:symbol,
        align:"center"
      },
      chart: {
        id: "stock data",
        animations: {
          speed:1300
        }
      },
      xaxis: {
        type:"datetime",
        labels:{
          datetimeUTC:false
        }
      },
      tooltip:{
        x:{
          format: "MMM dd HH:MM"
        }
      }
    },
    
     series : [ 
      {
        name: symbol,
        data: determineDateFormat()
      }
    ]
  }

    return (
    <div className="mt-5 p-4 shadow-sm bg-white">
       <Chart
          options={chartParams.options}
          series={chartParams.series}
          type="area"
          width="100%"
        />
      <div>
        <button className= { renderButtonSelect("24h") }
          onClick= { ()=>setDateFormat("24h") }>24h</button>
        <button className= { renderButtonSelect("7d") } 
          onClick= { ()=>setDateFormat("7d") }>7d</button>
        <button className= { renderButtonSelect("1y") }
          onClick= { ()=>setDateFormat("1y") }>1y</button>
      </div>
    </div>
  )
}