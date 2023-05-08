import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { TRootState } from "../../services/store";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const getUserFromStore = (state: TRootState) => state.userReducer.user;
type TProtectedRoute = {
    element: ReactElement;
    anonymous: boolean;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ element, anonymous }) => {
    const userAuth = useTypedSelector(getUserFromStore);
    const location = useLocation();
    const from = location.state?.from || "/";
    if (anonymous && userAuth) {
        return <Navigate to={from} />;
    }

    if (!anonymous && !userAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return element;
};

export default ProtectedRoute;
