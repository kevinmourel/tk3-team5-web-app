import user from '../data/user.json'
import { useNavigate } from "react-router-dom";

function Login ({setUser}){

    const navigate = useNavigate();

    if(localStorage.getItem('loggedUser')){
        navigate("/");
    }

    const checkLogin = (payload) => {

        const checkUser = user.data.find(item => item.email === payload.email && 
                                                 item.password === payload.password) 
                        
        if(checkUser != undefined){
            setUser(checkUser)
            localStorage.setItem("loggedUser", checkUser.id)
            navigate('/')
        }else{   
            alert('Email or password incorrect')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        let formObject = Object.fromEntries(data.entries());

        if(formObject.email && formObject.password){
           checkLogin(formObject)     
        }else{
            alert('Email or password empty')
        }

    }

    return(
        <>  
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>CRUD TK3 Team 5</h1>
            <div className="card p-5">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Ex : test@mailinator.com"/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" >Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;