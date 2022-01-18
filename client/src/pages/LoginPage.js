import { useMediaQuery } from "@material-ui/core";
import { Fragment } from "react";
import AuthLayout from "../layouts/AuthLayout";
import AuthLayoutMobile from "../layouts/AuthLayoutMobile";
import Login from "../Login";

const LoginPage = () => {
  const isMobile = useMediaQuery("(max-width:880px)");
  return (
    <Fragment>
      {isMobile ? (
        <AuthLayoutMobile>
          <Login isMobile={isMobile} />
        </AuthLayoutMobile>
      ) : (
        <AuthLayout>
          <Login isMobile={isMobile} />
        </AuthLayout>
      )}
    </Fragment>
  );
};
export default LoginPage;
