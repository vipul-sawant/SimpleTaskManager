import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, replace } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    
    const { isLoggedIn=false } = useSelector(state=>state?.auth || {});

    const navigate = useNavigate();
    const location = useLocation();
    
    const { pathname="" } = location;

    useEffect(()=>{
        if (!isLoggedIn) {
            
           navigate("/user/login", replace);
           return;
        }
    }, [isLoggedIn, pathname, navigate]);

    return children;
};

export default ProtectedRoutes;