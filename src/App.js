import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import TodoPage from "./Pages/TodoPage/TodoPage";
import WeatherPage from "./Pages/WeatherPage/WeatherPage";
import MainLayout from "./Components/MainLayout/MainLayout";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Counter from "./Pages/CounterPage/Counter";

function App() {
  return (
    <div className="app">
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/todo" element={<TodoPage />}></Route>
          <Route path="/weather" element={<WeatherPage />}></Route>
          <Route path="/counter" element={<Counter />}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
