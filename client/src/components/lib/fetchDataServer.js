import axios from "axios";

export const fetchDataCovid = async (
  serverUrl,
  genderFilter,
  monthFilter,
  ageFilter,
  yearFilter,
  regionFilter
) => {
  let result = undefined;
  let filter =
    "?gender=" +
    genderFilter +
    "&month=" +
    monthFilter +
    "&age=" +
    ageFilter +
    "&year=" +
    yearFilter +
    "&region=" +
    regionFilter;
  result = await axios.get(serverUrl + "" + filter);

  result.data.forEach((data) => {
    if (data.P_h) {
      data.P_h = parseInt(data.P_h);
    }
    if (data.P_f) {
      data.P_f = parseInt(data.P_f);
    }
    if (data.P) {
      data.P = parseInt(data.P);
      delete data.P_f;
      delete data.P_h;
    }
  });
  return result.data;
};

export const fetchRegions = async (serverUrl) => {
  let queryAllRegions = "/regions";
  const allRegions = await axios.get(serverUrl + "" + queryAllRegions);

  allRegions.data.push("");
  return allRegions.data;
};

export const fetchMonths = async (serverUrl, yearFilter) => {
  let queryAllMonths = "/months/" + yearFilter;
  const allMonths = await axios.get(serverUrl + "" + queryAllMonths);

  allMonths.data.push("");
  return allMonths.data;
};
