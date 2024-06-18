import { connect } from "react-redux";
import { Navigate,Outlet } from 'react-router-dom';

const PreventRegContinue = ({ userData}) => {
    return userData&& userData.firstName&& userData.lastName&& userData.email? <Outlet/>:<Navigate to="/register"/> ;
};

const mapStateToProps = (state) => ({
    userData: state.register.userData,
});

export default connect(mapStateToProps)(PreventRegContinue);
