import React from "react";

import { useSelector } from "react-redux";
import styles from "../../styles/Home.module.css";

const LastSeenCities = ({onClick}:{onClick:any}) => {
  const data = useSelector((state: any) => state?.city?.value);
  return (
    <div className="d-flex flex-wrap pb-4 ">
        <h1>History</h1>
      {data.length!== 0 && data?.map((city: any, index: number) => (
        <div key={index} className={`${styles.card}`} onClick={()=>onClick(city)}>
          <h5>COUNTRY: {city?.country}</h5>
          <p>REGION: {city?.region}</p>
          <p>CITY: {city?.name}</p>
          <p>LATITUDE: {city?.lat}</p>
          <p>LONGITUDE: {city?.lon}</p>
        </div>
      ))}
    </div>
  );
};
export default LastSeenCities;
