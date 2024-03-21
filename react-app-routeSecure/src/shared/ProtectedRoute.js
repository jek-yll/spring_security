import { Navigate } from "react-router-dom";


const ProtectedRoute = (props) => {

    
    const user = localStorage.getItem('user')

    if(user){
        return (
            <>
                {props.children}
            </>
        )
    } else {
        return <Navigate to={"/login"}></Navigate>
    }
}

export default ProtectedRoute;