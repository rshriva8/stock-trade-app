import axios from "axios";
import { useState } from "react";
import { tokenToString } from "typescript";

export const isLoggedIn=()=>{
    let data=localStorage.getItem("token")
    if(data==null) return false;
    else return true;
};

export const doLogin=(token: any,next: () => void)=>{
    localStorage.setItem("token",token);
    next();
};

export const doLogout=(next: () => void)=>{
    localStorage.removeItem("token");
    next();
};

// export const getCurrentUserDetail = async (event: React.FormEvent<HTMLFormElement>) => {
//     if (isLoggedIn() && "userData") {
//         return JSON.parse(localStorage.getItem("userData"))?.id;
//     } else {
//         const fetchUserInfo = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/v1/auth/userinfo', {
//                     headers: {
//                         Authorization: `${localStorage.getItem('token')}`
//                     },
//                 });
//                 const jsonString = JSON.stringify(response);
//                 const jsonObject = JSON.parse(jsonString);
//                 const transformedObject = {
//                     firstName: jsonObject.firstName,
//                     lastName: jsonObject.lastName,
//                     Roles: jsonObject.roles,
//                     Id: jsonObject.id
//                   };
//                 const transformedJsonString = JSON.stringify(transformedObject);
//                 localStorage.setItem("userInfo", transformedJsonString);
//             }
//             catch (error) {
//             console.log(error);
//           } 
//         };
//     }}