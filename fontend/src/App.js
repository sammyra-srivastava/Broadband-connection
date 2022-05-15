import "./App.css";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/main";
import Home from "./components/main/home";

import AddVendor from "./components/admin/addVendor";
import Admin from "./components/admin";
import AdminDashboard from "./components/admin/dashboard";
import User from "./components/user";
import Dashboard from "./components/user/dashboard";
import AddQuery from "./components/user/addQuery";
import Login from "./components/main/login";
import Signup from "./components/main/signup";
import AddReview from "./components/user/addReview";
import ListReviews from "./components/main/listReviews";
import Aboutus from "./components/main/aboutus";
import Header from "./components/header";
import BrowseSlides from "./components/main/browsSlides";
import UserAuth from "./auth";
import ReviewDetail from "./components/main/reviewDetail";
import ManageReviews from "./components/user/manageReviews";
import ManageQueries from "./components/user/manageQueries";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Main />} path="main">
            <Route element={<Home />} path="home" />
            <Route element={<Signup />} path="signup" />
            <Route element={<BrowseSlides />} path="slidebrowser" />
            <Route element={<Aboutus />} path="aboutus" />

            <Route element={<Login />} path="login" />
            <Route element={<ListReviews />} path="listreviews" />
            <Route element={<ReviewDetail />} path="review/:id" />
          </Route>
          <Route
            element={
              <UserAuth>
                <User />
              </UserAuth>
            }
            path="user"
          >
            <Route element={<AddReview />} path="addreview" />
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<AddQuery />} path="query" />
            <Route element={<ManageReviews />} path="managereviews" />
            <Route element={<ManageQueries />} path="managequeries" />
          </Route>
          <Route element={<Admin />} path="admin">
            <Route element={<AdminDashboard />} path="dashboard" />

            <Route element={<AddVendor />} path="addvendor" />
          </Route>
          <Route element={<Navigate to="/main/home" />} path="" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
