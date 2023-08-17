import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const apiKey = publicRuntimeConfig.apiKey;

const baseUrl = "https://api.weatherapi.com/v1/";
const currentUrl = `${baseUrl}current.json?key=${apiKey}&`;
const searchUrl = `${baseUrl}search.json?key=${apiKey}&`;

const fetchRequest = async ({
  url = "",
  method = "GET",
  data = {},
  headers = { "Content-Type": "application/json" },
}: {
  url: string;
  method?: string;
  data?: any;
  headers?: any;
}) => {
  const requestOptions = {
    method: method,
    headers: headers,
  };
  if (method !== "GET") {
    requestOptions.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, requestOptions);
    // if (!response.ok) {
    //   throw new Error(`Request failed with status: ${response.status}`);
    // }
    return await response.json();
  } catch (error) {
    throw new Error(`AN ERROR OCCURED::${error}`);
  }
};

/* -------------------------------------------------------------------------- */
/*                         FETCH SEARCHED CITY WEATHER                        */
/* -------------------------------------------------------------------------- */
export const fetchByCity = (data: string) => {
  const response = fetchRequest({
    url: `${searchUrl}q=${data}`,
  });
  return response;
};

export const fetchWeatherOfRequestedCity = (cityName: string) => {
  const response = fetchRequest({
    url: `${currentUrl}q=${cityName}`,
  });
  return response;
};
