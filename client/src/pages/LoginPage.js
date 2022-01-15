import { useMediaQuery } from "@material-ui/core";
import { Fragment } from "react";
import AuthLayout from "../layouts/AuthLayout";
import AuthLayoutMobile from "../layouts/AuthLayoutMobile";
import Login from "../Login";

const LoginPage = () => {
  const isMobile = useMediaQuery("(max-width:880px)");
  return (
    <Fragment>
      {isMobile && (
        <AuthLayoutMobile>
          <Login />
        </AuthLayoutMobile>
      )}
      {!isMobile && (
        <AuthLayout>
          <Login />
        </AuthLayout>
      )}
    </Fragment>
  );
};
export default LoginPage;
