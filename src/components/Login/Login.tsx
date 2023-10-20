import React, { FC, useContext, useState } from "react";
import { registration } from "../../http/userAPI";
import { login } from "../../http/userAPI";
import { useLocation, Link } from "react-router-dom";
import { userSlice } from "../../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUser } from "../../types/types";
import loginImg from "../../images/loginimg.jpg";
import styled from "styled-components";
const StyledImg = styled.img`
  width: 60%;
  height: 100%;
`;
const StyledWrapper = styled.div`
  height: calc(100vh - 80px);
  display: flex;
`;
const StyledLoginWrapper = styled.div`
  width: 40%;
  align-self: center;
`;
const StyledLoginForm = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const StyledLoginTitle = styled.h2`
  font-family: "Merriweather", serif;
  font-size: 28px;
  line-height: 34px;
  color: #172234;
`;
const StyledInput = styled.input`
  width: 350px;
  padding: 13px 20px;
  line-height: 22px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  background-color: #e0e0e0;

  &:focus {
    outline-color: #e0e0e0;
  }
`;
const StyledLabel = styled.label`
  font-family: "Merriweather", serif;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  padding-top: 25px;
`;
const StyledLink = styled.a`
  font-family: "Lato", sans-serif;
  font-size: 14px;
  line-height: 22px;
  color: #b29f7e;
  padding-top: 10px;
  text-align: right;
`;
const StyledRouterLink = styled(Link)`
  font-family: "Lato", sans-serif;
  font-size: 14px;
  line-height: 22px;
  color: #b29f7e;
  padding-top: 10px;
  text-align: right;
  padding-bottom: 25px;
  text-decoration: none;
`;
const StyledButton = styled.button`
  width: 350px;
  border-radius: 5px;
  border-color: transparent;
  background-color: #b29f7e;
  font-family: "Merriweather", serif;
  color: #ffffff;
  line-height: 22px;
  font-size: 16px;
  padding: 11px 0px;
  cursor: pointer;
  margin-top: 25px
`;
const StyledSpan = styled.span`
  text-align: center;
  font-family: "Lato", sans-serif;
  font-size: 14px;
  line-height: 22px;
  padding-top: 10px;
`;


const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user } = useAppSelector((state) => state.userReducer);
  console.log(user);
  const { setIsAuth } = userSlice.actions;
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const signIn = async () => {
    try {
      const data = await registration(email, password);
      dispatch(setUser(data as IUser[]));
      dispatch(setIsAuth(true));
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };
  const logIn = async () => {
    try {
      const data = await login(email, password);
      dispatch(setUser(data as IUser[]));
      dispatch(setIsAuth(true));
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };
  // };
  return (
    <StyledWrapper>
      <StyledImg src={loginImg} alt="loginImg" />
      <StyledLoginWrapper>
        <StyledLoginForm>
          {isLogin ? (
            <StyledLoginTitle>Login</StyledLoginTitle>
          ) : (
            <StyledLoginTitle>Registration</StyledLoginTitle>
          )}
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            value={email}
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledLabel htmlFor="pass">Password</StyledLabel>
          <StyledInput
            value={password}
            placeholder="Password"
            id="pass"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLogin && <StyledLink>Forgot password?</StyledLink>}
          {isLogin ? (
            <StyledButton onClick={logIn}>Sign In</StyledButton>
          ) : (
            <StyledButton onClick={signIn}>Registration</StyledButton>
          )}

          {isLogin ? (
            <StyledSpan>
              Don't have account?{" "}
              <StyledRouterLink to={"/registration"}>Sign Up</StyledRouterLink>
            </StyledSpan>
          ) : (
            <StyledSpan>
              Already have account?{" "}
              <StyledRouterLink to={"/login"}>Log in</StyledRouterLink>
            </StyledSpan>
          )}
        </StyledLoginForm>
      </StyledLoginWrapper>
    </StyledWrapper>
  );
};

export default Login;
