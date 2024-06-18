import React from 'react';
// import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingPage from "./Components/LoadingPage/LoadingPage";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Register from "./Components/Register/Register";
import RegisterContinue from "./Components/RegisterContinue/RegisterContinue";
import Home from "./Components/Home/Home";
import Community from "./Components/Community/Community";
import RequireAuth from "./Components/RequireAuth";
import { UserProfile } from './Components/Profiles/UserProfile/UserProfile';
import LoginPage from './Components/login/Login';
import PreventRegContinue from './Components/preventRegContinue';
import ForgetPasswordPage from './Components/forget password/ForgetPassword';
import VerificationPage from './Components/forget password/VerificationPage';
import CreateNewPasswordPage from './Components/CreateNewPassword/CreateNewPasswordPage';
import Chats from './Components/Chats_/Chats';
import AboutUs from './Components/About us/AboutUs';
import ContactUs from './Components/contact us/ContactUs';
import VerifyRegister from './Components/VerifyRegister/VerifyRegister';
import Carer from './Components/Carrer/Carrer'
import Schedule from './Components/Schedule/main-schedule'
import RequestMentor from "./Components/RequestMentor/RequestMentor";
import Bookmarks from "./Components/Book marks/BookMarks";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PreventRegContinue />}>
          <Route path="/registerContinue" element={<RegisterContinue />} />
          <Route path="/verifyRegister" element={<VerifyRegister />} />
        </Route>
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/createNewPassword" element={<CreateNewPasswordPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/chat" element={<Chats />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/contact us" element={<ContactUs />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/career" element={<Carer />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/request mentor" element={<RequestMentor />} />
        <Route path="/book marks" element={<Bookmarks />} />

        <Route element={<RequireAuth />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
