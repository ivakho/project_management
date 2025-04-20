import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Issues } from "./components/Issues";
import { Header } from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { Boards } from "./components/Boards";
import { BoardPage } from "./components/BoardPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/issues" replace />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:id" element={<BoardPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
