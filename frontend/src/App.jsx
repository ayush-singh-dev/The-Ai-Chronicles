import { Route, Routes } from "react-router-dom";
import AuthNavbar from "./components/AuthNavbar";
import Home from "./pages/Home";
import AiCreators from "./pages/AiCreators";
import AiStories from "./pages/AiStories";

function App() {
  return (
    <>
      <AuthNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AiCreators" element={<AiCreators />} />
        <Route path="/AiStories" element={<AiStories />} />
      </Routes>
    </>
  );
}

export default App;
