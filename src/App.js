import Home from './pages/Home';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/:orderList" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
