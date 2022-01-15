import { useMediaQuery } from "@material-ui/core";
import { Fragment } from "react";
import AuthLayout from "../layouts/AuthLayout";
import AuthLayoutMobile from "../layouts/AuthLayoutMobile";
import Signup from "../Signup";

const SignupPage = () => {
  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <Fragment>
      {isMobile && (
        <AuthLayoutMobile>
          <Signup />
        </AuthLayoutMobile>
      )}
      {!isMobile && (
        <AuthLayout>
          <Signup />
        </AuthLayout>
      )}
    </Fragment>
  );
};
export default SignupPage;
