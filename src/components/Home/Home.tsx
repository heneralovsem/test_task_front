import React, { FC, useState, useRef } from "react";
import styled from "styled-components";
import homeImg from "../../images/homeimg.jpg";
import { buildingsAPI } from "../../services/BuildingsService";
import BuildingItem from "../BuildingItem/BuildingItem";
import { IconButton, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


const StyledHomeWrapper = styled.div`
  background-image: url(${homeImg});
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  height: calc(100vh - 80px);
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #172234;
    opacity: 0.6;
  }
`;
const StyledHomeContentWrapper = styled.div`
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 20px;
`;
const StyledContentTitle = styled.h1`
  font-family: "Merriweather", serif;
  font-size: 64px;
  line-height: 80px;
  color: #ffffff;
  text-align: center;
`;
const StyledContentDescription = styled.h2`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  width: 80%;
  color: #ffffff;
  margin: 0 auto;
`;
const StyledContentButton = styled.button`
  width: 160px;
  padding: 24px 10px;
  border: 1px solid #ffffff;
  border-radius: 8px;
  background-color: transparent;
  font-family: "Merriweather", serif;
  color: #ffffff;
  font-size: 20px;
  line-height: 34px;
  cursor: pointer;
  margin: 0 auto;
`;
const StyledDealsWrapper = styled.div`
width:1280px;
margin: 0 auto;
padding-top: 40px;
padding-bottom: 20px;
`
const StyledDealsTitle = styled.h2`
font-family: "Merriweather", serif;
font-size: 28px;
line-height: 34px;
color: #B29F7E;
padding-bottom: 30px;
`
const StyledDealsContent = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap:20px;
`
const StyledIconWrapper = styled.div`
width: 630px;
text-align: center;
`
const StyledModalContainer = styled.div`
    background: whitesmoke;
    padding: 40px 20px;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    text-align: center;
`
const StyledModalInput = styled.input`
width: 350px;
padding: 13px 20px;
line-height: 22px;
border: 2px solid #e0e0e0;
border-radius: 5px;
background-color: #e0e0e0;

&:focus {
  outline-color: #e0e0e0;
}
`
const StyledModalButton = styled.button`
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
`

const Home: FC = () => {
  const {data: buildings} = buildingsAPI.useFetchAllBuildingsQuery('')
  const [createBuilding, {}] = buildingsAPI.useCreateBuildingMutation()
  const dealsRef = useRef<HTMLDivElement | null>(null)
  const [modal, setModal] = useState<boolean>(false)
  const [buildingFile, setBuildingFile] = useState<File | null | undefined>(null);
  const [buildingName, setBuildingName] = useState<string>('')
  const [daysLeft, setDaysLeft] = useState<string>('')
  const [buildingYield, setBuildingYield] = useState<string>('')
  const [buildingDhs, setBuildingDhs] = useState<string>('')
  const [tiketDhs, setTiketDhs] = useState<string>('')
  const [soldPercent, setSoldPercent] = useState<string>('')

  const scrollToDeals = () => {
    dealsRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
  
  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingFile(e.target.files?.[0]);
  };
  const addBuilding = () => {
    const formData = new FormData();
    formData.append("name", buildingName);
    formData.append("dhs", buildingDhs);
    formData.append("tiketDhs", tiketDhs);
    formData.append("yield", buildingYield);
    formData.append("daysLeft", daysLeft);
    formData.append("soldPercent", soldPercent);
    if (buildingFile) {
      formData.append("img", buildingFile);
    }
    createBuilding(formData)
    setModal(false)

 }

  return (
    <div>
      <StyledHomeWrapper>
        <StyledHomeContentWrapper>
          <StyledContentTitle>
            The chemical negatively charged
          </StyledContentTitle>
          <StyledContentDescription>
            Numerous calculations predict, and experiments confirm, that the
            force field reflects the beam, while the mass defect is not formed.
            The chemical compound is negatively charged. Twhile the mass defect
            is
          </StyledContentDescription>
            <StyledContentButton onClick={scrollToDeals}>Get Started</StyledContentButton>
        </StyledHomeContentWrapper>
      </StyledHomeWrapper>
      <StyledDealsWrapper ref={dealsRef}>
      <StyledDealsTitle>
        Open Deals
      </StyledDealsTitle>
      <StyledDealsContent>
      {buildings?.map((building) => (
        <BuildingItem key={building.id} building={building} />
      ))}
        <StyledIconWrapper>
          <IconButton onClick={openModal}><AddIcon/></IconButton>
          </StyledIconWrapper>
      </StyledDealsContent>
      <Modal open={modal} onClose={closeModal}>
        <StyledModalContainer>
        <StyledModalInput type="text" value={buildingName} placeholder="Name..." onChange={(e) => setBuildingName(e.target.value)}/>
        <StyledModalInput type="text" value={buildingDhs} placeholder="Dhs..." onChange={(e) => setBuildingDhs(e.target.value)}/>
        <StyledModalInput type="text" value={tiketDhs} placeholder="Tiket Dhs..." onChange={(e) => setTiketDhs(e.target.value)}/>
        <StyledModalInput type="text" value={buildingYield} placeholder="Yield..." onChange={(e) => setBuildingYield(e.target.value)}/>
        <StyledModalInput type="text" value={daysLeft} placeholder="Days left..." onChange={(e) => setDaysLeft(e.target.value)}/>
        <StyledModalInput type="text" value={soldPercent} placeholder="Sold..." onChange={(e) => setSoldPercent(e.target.value)}/>
        <StyledModalInput
              type="file"
              placeholder="File..."
              onChange={handleFileChange}
            />
            <StyledModalButton onClick={addBuilding}>Create</StyledModalButton>
        </StyledModalContainer>
      </Modal>
      </StyledDealsWrapper>
    </div>
  );
};

export default Home;
