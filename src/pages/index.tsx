import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { TbMapSearch } from "react-icons/tb";
import { useDispatch, Provider } from "react-redux";
import store from "@/redux/store";
import LastSeenCities from "@/components/last_seen_cities";

import SearchBar from "@/components/custom_searchBar";
import { useState } from "react";
import { fetchByCity, fetchWeatherOfRequestedCity } from "./api/requests";
import Swal from "sweetalert2";
import { addCity } from "@/redux/reducers/cityReducer";

export default function Home() {
  const dispatch = useDispatch();
  const [searchedName, setSearchedName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingWeather, setIsGettingWeather] = useState(false);
  const [searchedList, setSearchedList] = useState([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedCityWeather, setSelectedCityWeather] = useState<any>(null);

  const selectedCityHandler = (city: any) => {
    setSelectedCity(city);
    setSearchedName("");
    setSearchedList([]);
    dispatch(addCity(city));
    setIsGettingWeather(true);
    fetchWeatherOfRequestedCity(city?.name)
      .then((res) => {
        if (res?.current && res?.location) {
          setSelectedCityWeather(res);
        } else {
          throw new Error(res?.error?.message);
        }
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e,
        })
      )
      .finally(() => setIsGettingWeather(false));
  };

  const handleValueChanged = (e: any) => {
    if (searchedName.length >= 3) {
      //Call The API Here
      setSearchedName(e.target.value);
      setIsLoading(true);
      fetchByCity(searchedName)
        .then((res) => {
          if (res?.length > 0) {
            setSearchedList(res);
          } else {
            throw new Error(res?.error?.message);
          }
        })
        .catch((e) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: e,
          })
        )
        .finally(() => setIsLoading(false));
    } else {
      setSearchedList([]);
      setSearchedName(e.target.value);
    }
  };

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/weather.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.card}>
            <h2>Weather App</h2>
            <LastSeenCities onClick={selectedCityHandler} />
            {/* <p>Please Enter City Name to Search the City and check the weather status</p> */}
            <SearchBar
              label="Search"
              placeholder="Enter City Name Here"
              value={searchedName}
              onHandleChange={(e) => handleValueChanged(e)}
              isLoading={isLoading}
              className="position-relative dropdown"
              clearValue={() => {
                setSearchedName("");
                setSearchedList([]);
              }}
            />
            <ul
              className={`dropdown-menu ${
                searchedList.length > 0 ? "d-block" : ""
              } position-absolute p-2 mt-1 overflow-auto bg-white`}
              style={{
                maxHeight: "25vh",
                maxWidth: "25vw",
              }}
            >
              {searchedList.map((item: any, index: number) => (
                <li
                  key={index}
                  className="dropdown-item"
                  role="button"
                  onClick={() => selectedCityHandler(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          {selectedCity !== null ? (
            <div className={styles.card}>
              <h5>COUNTRY: {selectedCity?.country}</h5>
              <p>REGION: {selectedCity?.region}</p>
              <p>CITY: {selectedCity?.name}</p>
              <p>LATITUDE: {selectedCity?.lat}</p>
              <p>LONGITUDE: {selectedCity?.lon}</p>
            </div>
          ) : (
            <div className={styles.card}>
              <h4>No City Selected</h4>
            </div>
          )}
          {isGettingWeather && (
            <div
              className={"text-primary text-opacity-75 spinner-border "}
              role="status"
            />
          )}
          {selectedCityWeather !== null && (
            <div
              className={`${styles.card} d-flex flex-column align-items-center justify-content-center`}
            >
              <h2>{selectedCity?.name}</h2>
              <h5>{selectedCityWeather?.current?.condition?.text}</h5>
              <Image
                src={`https:${selectedCityWeather.current?.condition?.icon}`}
                alt={selectedCityWeather.current?.condition?.code}
                height={100}
                width={100}
              />
              <p>
                <b>C/F:</b> {selectedCityWeather?.current?.temp_c}/
                {selectedCityWeather?.current?.temp_f}
              </p>
              <p>
                <b>feels like C/F:</b>{" "}
                {selectedCityWeather?.current?.feelslike_c}/
                {selectedCityWeather?.current?.feelslike_f}
              </p>
              <p>
                <b>Wind:</b>
                {selectedCityWeather?.current?.wind_kph} k/h <b>Direction:</b>{" "}
                {selectedCityWeather?.current?.wind_dir}
              </p>
              <p>
                <b>humidity:</b> {selectedCityWeather?.current?.humidity}
              </p>
              <p>
                <b>visibility(km):</b> {selectedCityWeather?.current?.vis_km}
              </p>
              <p>
                <b>last updated:</b>{" "}
                {selectedCityWeather?.current?.last_updated}
              </p>
            </div>
          )}
        </main>
      </Provider>
    </>
  );
}
