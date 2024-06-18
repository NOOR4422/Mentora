import {React,useState,useEffect} from 'react';
import { useNavigate } from 'react-router';
import './LoadingPage.css';
import LogoWithBackground from '../../assets/LogoWithBackground.svg'
function LoadingPage() {
const [LoadingComplete,setLoadingComplete] =useState(false);
const Navigate =useNavigate();
useEffect(()=>{
const timeOut= setTimeout(() => {
  setLoadingComplete(true);
}, 3500);
return ()=>clearTimeout(timeOut);
},[])
if(LoadingComplete){
  Navigate('/welcomePage',{replace:true});
 }
  return (
    <div className="loading-container">
      <div className="rotating-circle">
        <img src={LogoWithBackground} alt="Logo" className="logo" />
        <p>entora</p>
      </div>
    </div>
  )
}

export default LoadingPage
