import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/home/Home';
import Day from './pages/day/Day';
import MyCalendar from './pages/calendar/MyCalendar';
import Sticky from './pages/sticky/Sticky';
import Welcome from './pages/welcome/Welcome';
import Register from './pages/register/Register';
import Login from "./pages/login/Login";
import CategoryPage from "./pages/category/CategoryPage";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import useTags from "./hooks/useTags";
import useTasks from "./hooks/useTasks";

const App = () => {
  const {
    tags,
    loading,
    error,
    handleAddTag,
    handleUpdateTag,
    handleDeleteTag
  } = useTags();

  const { taskList: allTasks } = useTasks();

  const tagProps = {
    tags,
    loading,
    error,
    onAddTag: handleAddTag,
    onUpdateTag: handleUpdateTag,
    onDeleteTag: handleDeleteTag,
  };

  return (
    <Router>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        <Routes>
          <Route path="*" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/home"
              element={<Home {...tagProps} />}
            />
            <Route
              path="/day"
              element={<Day {...tagProps} />}
            />
            <Route
              path="/calendar"
              element={
                <MyCalendar
                  tasks={allTasks}
                  {...tagProps}
                />
              }
            />
            <Route
              path="/sticky"
              element={<Sticky {...tagProps} />}
            />
            <Route
              path="/category/:category"
              element={<CategoryPage {...tagProps} />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;