import React, { FC, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background-color: #172234;
`;
const StyledNav = styled.nav`
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: right;
  margin: 0 auto;
  align-items: right;
`;
const StyledAuthWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledLogInButton = styled.button`
  width: 160px;
  padding: 11px 0px 11px 0px;
  color: #b29f7e;
  border: 1px solid #b29f7e;
  border-radius: 5px;
  background-color: transparent;
  color: #b29f7e;
  font-family: "Merriweather", serif;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
`;
const StyledSignUpButton = styled.button`
  width: 160px;
  padding: 11px 0px 11px 0px;
  color: #ffffff;
  background-color: #b29f7e;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-family: "Merriweather", serif;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
`;

const Navbar: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { setIsAuth } = userSlice.actions;
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  const location = useLocation()
  const isHome = location.pathname === "/home"
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser([{}]));
    dispatch(setIsAuth(false));
    window.location.reload();
  };
  return (
    <StyledWrapper>
      <StyledNav>
        {!isAuth && isHome ? (
          <StyledAuthWrapper>
            <Link to="/login">
              <StyledLogInButton>Log in</StyledLogInButton>
            </Link>
            <Link to="/registration">
              <StyledSignUpButton>Sign Up</StyledSignUpButton>
            </Link>
          </StyledAuthWrapper>
        )  : isHome && (
          <StyledAuthWrapper>
          <StyledSignUpButton onClick={logout}>Log out</StyledSignUpButton>
          </StyledAuthWrapper>
        )}
      </StyledNav>
    </StyledWrapper>
  );
};

export default Navbar;
