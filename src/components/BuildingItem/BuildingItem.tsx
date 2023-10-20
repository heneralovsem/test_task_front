import React, { FC, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { IBuilding } from "../../types/types";
import styled from 'styled-components'



const StyledBuildingWrapper = styled.div`
width: 630px;
height: 400px;
position: relative;
`
const StyledBuildingImage = styled.img`
width: 630px;
height: 400px;
position: relative;
`
const StyledContentWrapper = styled.div`
position: absolute;
bottom: 5%;
padding-left: 15px
`
const StyledContentColumn = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
const StyledContentRow = styled.div`
width: 100%;
display: flex;
flex-direction: row;
gap: 100px;
`
const StyledContentTitle = styled.h2`
font-family: "Merriweather", serif;
font-size: 20px;
line-height: 34px;
color: #FFFFFF;
`
const StyledContentText = styled.p`
font-family: "Lato", sans-serif;
font-size: 18px;
line-height: 22px;
color: #FFFFFF;
`

interface BuildingItemProps {
    building: IBuilding
}


const BuildingItem: FC<BuildingItemProps> = ({building}) => {
    
  return (
    <StyledBuildingWrapper>
      {process.env.REACT_APP_API_URL && <StyledBuildingImage src={process.env.REACT_APP_API_URL + building.img} alt="building" />}
    <StyledContentWrapper>
        <StyledContentTitle>{building.name}</StyledContentTitle>
        <StyledContentRow>
          <StyledContentColumn>
            <StyledContentText>{building.dhs} Dhs</StyledContentText>
        <StyledContentText>Tiket - {building.tiketDhs} Dhs</StyledContentText>
          </StyledContentColumn>
          <StyledContentColumn>
          <StyledContentText>Yield {building.yield}</StyledContentText> 
        <StyledContentText>Days left {building.daysLeft}</StyledContentText> 
          </StyledContentColumn>
          <StyledContentColumn>
          <StyledContentText>Sold {building.soldPercent}</StyledContentText>
          </StyledContentColumn>
        </StyledContentRow>
    </StyledContentWrapper>
        
    </StyledBuildingWrapper>
  );
};

export default BuildingItem;