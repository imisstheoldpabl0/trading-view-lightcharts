import './App.css'
import MainComponent from './components/MainComponent/MainComponent'
import nvidiaSampleData from './data/nvidiaSampleData'

function App() {
  return (
    <>
      <h1>NVIDIA Stock Price Chart</h1>
      <MainComponent data={nvidiaSampleData} />
    </>
  )
}

export default App
