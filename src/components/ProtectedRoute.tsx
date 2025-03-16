
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isAllawed: boolean;
    children?: React.ReactNode;
}

export const ProtectedRoute = ({ isAllawed, children }: Props) => {
    if (!isAllawed) return <Navigate to="/" />;

    return children ? children : <Outlet />;
}