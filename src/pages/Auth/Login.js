import axios from "axios";
import { useContext, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

import "./Login.css"
import { ProductContext } from "../../contexts/ProductProvider";
function loginReducer(state,action)
{
    switch(action.type)
    {
        case "mail":
            return {...state,email:action.payload};
        case "password":
            return {...state,password:action.payload};
        case "setCred":
            return {...state,email:"test@gmail.com",password:"test@23"}
    }
}
export function Login()
{
    const navigate = useNavigate();
    const location = useLocation();
    const {bookState,dispatch} = useContext(ProductContext);
    const {user,setUser,address,setAddress} = useContext(AuthContext);
    const [userState,reduceFun] = useReducer(loginReducer,{
        email:"",
        password:""
    })
    const testAddress = {
        Name:"testUser",
        HouseNumber:"2/167 G",
        Area:"Ambedkar Nagar, Samathuvapuram",
        City: "Trichengode, Salem",
        PinCode: "Salem - 630006",
        State:"TamilNadu"
    }
    const testLoginHandler = ()=>{
        reduceFun({type:"setCred",payload:null})
        // const address = "2/167 G, Ambedkar Nagar, Samathuvapuram, Trichengode, Salem - 630006, TamilNadu"
        
        setAddress(testAddress);
        // reduceFun()
        // reduceFun({type:"password",payload:"test@23"})

    }
    const loginHandler = async(event)=>{
        event.preventDefault();
        console.log(userState);
        try{
            const response = await axios.post(`/api/auth/login`,{
                email:userState.email,
                password:userState.password
            })
            if(response.status===200)
            {
                console.log(response.data.foundUser);
                localStorage.setItem("user",  JSON.stringify({ user: response.data.foundUser }));
                setUser(response.data.foundUser);
                localStorage.setItem("token", response.data.encodedToken);
                console.log(location);
                (location?.state===null)?navigate("/bookListing"):navigate(location?.state?.from?.pathname);
            }
        }
        catch(error){
            console.error(error);
        }
    }
    return (<div>
        <form className="LoginDetails" onSubmit={(event)=>loginHandler(event)}>
            <label>Email</label>
            <input placeholder="test@gmail.com" className="loginText" type="email" onChange={(event)=>reduceFun({type:"mail",payload:event.target.value})}/>
            <label>Password</label>
            <input placeholder="test@23" className="loginText" type="password" onChange={(event)=>
                reduceFun({type:"password",payload:event.target.value})} />
            <button onClick={testLoginHandler}>Login with test credentials</button>
            <button>Login</button>
            <button onClick={()=>navigate("/signUp")}>SignUp</button>
        </form>
    </div>)
}