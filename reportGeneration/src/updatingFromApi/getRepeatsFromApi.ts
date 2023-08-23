import { ApiRepeat } from "../Repeat.ts";
import {
  getRepeatsFromRawRepeats,
} from "../repeatsSerialization/getRepeatsFromRawRepeats.ts";
import { addCalculatedPropertiesToRepeats } from "../repeatsSerialization/addCalculatedPropertiesToRepeats.ts";

const getFetchParams = (bearer: string) => ({
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,en-GB;q=0.8,fr;q=0.7",
    authorization: `Bearer ${bearer}`,
    "sec-ch-ua":
      '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-aisessionid": "yvX1/",
    "x-aiuserid": "X+QLB",
    "x-clientid": "pkce_patientaccess_web",
    "x-patientid": "e841b501-309f-4950-8f95-419a04d08964",
    "x-selfpatientid": "e841b501-309f-4950-8f95-419a04d08964",
    "x-useragent": "PA_WEB:~:Desktop:~:Windows 10 / Chrome 115.0.0.0",
  },
  ReferrerPolicy: "no-referrer",
  method: "GET",
});

export const getRepeatsFromApi = async (bearer: string) => {
  const res = await fetch(
    "https://api.patientaccess.com/api/Prescribing/prescriptions",
    getFetchParams(bearer),
  );

  const repeatsInfo = await res.json();

  const repeatsWithErrorsList = repeatsInfo.repeats.map((x: ApiRepeat) => ({
    ...x,
    errors: [],
  }));

  return addCalculatedPropertiesToRepeats(
    getRepeatsFromRawRepeats(repeatsWithErrorsList),
  );
};
