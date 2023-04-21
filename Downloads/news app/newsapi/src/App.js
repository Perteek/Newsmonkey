import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import News from "./components/News"
import LoadingBar from 'react-top-loading-bar'
const App =()=> {
  const[progress,setprogress]=useState(50)
  return (
      <div>
        <BrowserRouter>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
       <Route Exact path="/" element={<><News setprogress={setprogress} key="g" pagesize={5}  category="general"/></>}></Route>
       <Route Exact path="/business" element={<><News setprogress={setprogress} key="b" pagesize={20} country="in" category="business"/></>}></Route>
       <Route Exact path="/entertainment" element={<><News setprogress={setprogress} key="e" pagesize={20} country="in" category="entertainment"/></>}></Route>
       <Route Exact path="/science" element={<><News setprogress={setprogress} key="s" pagesize={20} country="in" category="science"/></>}></Route>
       <Route Exact path="/sports" element={<><News setprogress={setprogress} pagesize={20} country="in" category="sports"/></>}></Route>
       <Route Exact path="/technology" element={<><News setprogress={setprogress} key="t" pagesize={20} country="in" category="technology"/></>}></Route>
       <Route Exact path="/health" element={<><News setprogress={setprogress} key="h" pagesize={20} country="in" category="health"/></>}></Route>
       </Routes>
       </BrowserRouter>
      </div>
    )
  }
export default App;

