import { Outlet, useLocation, matchPath, Navigate } from "react-router-dom";
import WildCard from "../view/wildCard";

function Layout() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  if (isRootPath) {
    return <Navigate to="/home" replace />;
  }

  const validPaths = [
    "/home",
  ];
  
  const isValidPath = validPaths.includes(location.pathname) || matchPath("/profiles-mobile-users/:id", location.pathname);

  const isLoginPage = ["/login"].includes(location.pathname);

  if (isLoginPage) {
    return (
      <div className="w-full flex relative">
        <Outlet />
      </div>
    );
  }

  if (!isValidPath) {
    return (
      <div className="w-full flex relative">
        <WildCard />
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Outlet />
    </div>
  );
}

export default Layout;
