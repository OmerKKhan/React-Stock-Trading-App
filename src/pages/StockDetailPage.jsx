import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import finnHub from '../apis/finnHub'
import { StockChart } from '../components/StockChart'
import {StockData} from '../components/StockData'
const formatData = (data) => {
  return data.t.map((el, i) => {
    return {
      x: el * 1000,
      y: data.c[i].toFixed(2)
    }
  })
}

export const StockDetailPage = () => {
  const { symbol } = useParams()
  const [chartData, setChartData] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      const currentTime = Math.floor(date.getTime() / 1000)
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60
      }
      else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60
      }
      else {
        oneDay = currentTime - 24 * 60 * 60
      }

      const oneWeek = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60

      const responses = await Promise.all([finnHub.get('/stock/candle', {
        params: {
          symbol,
          resolution: 30,
          from: oneDay,
          to: currentTime
        }
      }),
      finnHub.get('/stock/candle', {
        params: {
          symbol,
          resolution: "60",
          from: oneWeek,
          to: currentTime
        }
      }),
      finnHub.get('/stock/candle', {
        params: {
          symbol,
          resolution: "W",
          from: oneYear,
          to: currentTime
        }
      })
      ])
      setChartData({
        day: formatData(responses[0].data),
        week: formatData(responses[1].data),
        year: formatData(responses[2].data)
      })
      console.log(chartData)
    }
    fetchData()
  }, [symbol])

  return <div>
    {chartData &&
      <div>
        <StockChart chartData={chartData} symbol={symbol} />
        <StockData symbol={symbol}/>
      </div>
    }
  </div>
}