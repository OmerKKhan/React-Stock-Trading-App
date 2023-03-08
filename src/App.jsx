import './App.css'
import {StockOverviewPage} from './pages/StockOverviewPage.jsx'
import {StockDetailPage} from './pages/StockDetailPage.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {WatchListContextProvider} from './context/watchListContext'

export default function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage/>}/>
            <Route path="/detail/:symbol" element={<StockDetailPage/>}/>
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  )
}
