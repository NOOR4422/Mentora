import { Navigate,Outlet, useLocation } from 'react-router-dom';
import { User } from "./Context/userContext";
import { useContext } from "react";

const RequireAuth = ({ userData}) => {
    const user =useContext(User);
    const location =useLocation();
    return  user.auth.Token? <Outlet/>:<Navigate  state={{from:location}} replace to="/register"/> ;
};



export default RequireAuth;
