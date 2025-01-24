
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import FirstAccess from "./pages/FirstAccess/FirstAccess";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/first-access" element={<FirstAccess />} />
          {/* Adicione outras rotas aqui */}
        </Routes>

      </Router>
    </Provider>
  );
}

export default App;
