import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tasks from "./pages/Tasks";
import TaskList from "./components/TaskList";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks-list" element={<TaskList />} />
          <Route path="/tasks-list/:id" element={<TaskList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
