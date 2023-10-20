import React, { FC, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { buildingsAPI } from "../../services/BuildingsService";
import BuildingItem from "../BuildingItem/BuildingItem";

const Deals: FC = () => {
  const {data: buildings} = buildingsAPI.useFetchAllBuildingsQuery('')
  return (
    <div>
      {buildings?.map((building) => (
        <BuildingItem key={building.id} building={building} />
      ))}
    </div>
  );
};

export default Deals;