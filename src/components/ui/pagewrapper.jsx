import Navbar from "../NavBar";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { SnackbarProvider } from "notistack";

// NAVBAR
const BLACK_LINKS_ROUTES = [
  "/register",
  "/menu",
  "/contact",
  "/admin",
  "/login",
];
const POSITION_BLOCK_ROUTES = [
  "/register",
  "/menu",
  "/admin",
  "/login",
  "/contact",
];

const PageWrapper = ({ children }) => {
  const router = useLocation();

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Navbar
          linkscolor={
            BLACK_LINKS_ROUTES.includes(router.pathname) ? "black" : undefined
          }
          position={
            POSITION_BLOCK_ROUTES.includes(router.pathname)
              ? "block"
              : undefined
          }
        />

        {children}
        <Footer />
      </SnackbarProvider>
    </>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
