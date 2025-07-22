import React,{useBack, useEffect,useState} from "react";
import ReactDOM from "react-dom/client"
import "./style.css"
import Header from "./Component/Header";
import Body from "./Component/Body";

function Githubprofile(){
return(
    <>
    <Header></Header> {/*header component*/}
    <Body></Body> {/*Body Component */}
    </>
)
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Githubprofile />);