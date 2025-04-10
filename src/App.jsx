import { useContext } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import UrlDetails from "./components/UrlDetails/UrlDetails";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route
          path="/url/:shortUrl"
          element={user ? <UrlDetails /> : <Landing />}
        />
      </Routes>
    </>
  );
};

export default App;
