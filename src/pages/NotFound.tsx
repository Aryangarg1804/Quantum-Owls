
// import { useLocation, Link } from "react-router-dom";
// import { useEffect } from "react";
// import { Button } from "@/components/ui/button";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "404 Error: User attempted to access non-existent route:",
//       location.pathname
//     );
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
//       <div className="text-center max-w-md">
//         <h1 className="saheli-title mb-4">404</h1>
//         <p className="saheli-subtitle mb-8">
//           Oops! The page you're looking for doesn't exist.
//         </p>
//         <Button asChild className="saheli-btn">
//           <Link to="/">Return to Home</Link>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default NotFound;




import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: Redirecting to home page...");
    navigate("/", { replace: true }); // Redirects instantly
  }, [navigate]);

  return null; // Nothing is displayed, just redirects
};

export default NotFound;
