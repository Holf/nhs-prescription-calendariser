import { Repeat } from "@src/Repeat.ts";

import accessTokenJson from "@accessTokenRetrieval/accessToken.json" assert {
  type: "json",
};
import { getRepeatsFromApi } from "./getRepeatsFromApi.ts";
import { getRepeatsFromStorage } from "@src/persistence/getRepeatsFromStorage.ts";
import { persistRepeatsToStorage } from "@src/persistence/persistRepeatsToStorage.ts";

const { accessToken } = accessTokenJson;

// const logAddedAndDroppedMedications = (
//   repeatsFromApi: Repeat[],
//   repeatsFromStorage: Repeat[],
// ) => {
//   const uniqueMedicationsFromApi = new Set(
//     repeatsFromApi.map((x) => x.drug.name).sort(),
//   );
//   const uniqueMedicationsFromStorage = new Set(
//     repeatsFromStorage.map((x) => x.drug.name).sort(),
//   );

//   const addedMedications = [...uniqueMedicationsFromApi].filter((x) =>
//     !uniqueMedicationsFromStorage.has(x)
//   );

//   // const droppedMedications =
// };

const addNewRepeatsFromApiToStorageRepeats = (
  repeatsFromApi: Repeat[],
  repeatsFromStorage: Repeat[],
) => {
  const newRepeatsForStoring: Repeat[] = [];

  repeatsFromApi.forEach((apiRepeat) => {
    const possibleStoreRepeat = repeatsFromStorage.find((storedRepeat) =>
      storedRepeat.drug.name === apiRepeat.drug.name &&
      storedRepeat.dateLastIssued.getTime() ===
        apiRepeat.dateLastIssued.getTime()
    );

    if (possibleStoreRepeat === undefined) {
      console.log(`Found new entry for:
  - Medicine: ${apiRepeat.drug.name}
  - Date Issued: ${apiRepeat.dateLastIssued}
`);

      newRepeatsForStoring.push(apiRepeat);
    }
  });

  if (newRepeatsForStoring.length) {
    console.log(`Adding ${newRepeatsForStoring.length} entries to storage.`);
    repeatsFromStorage.push(...newRepeatsForStoring);
  } else {
    console.log("No new entries found.");
  }
};

export const updateRepeatsDataStore = async () => {
  console.log("Updating data store with new Repeat Prescriptions info...\n");

  const repeatsFromApi: Repeat[] = await getRepeatsFromApi(accessToken);
  const repeatsFromStorage = await getRepeatsFromStorage();

  addNewRepeatsFromApiToStorageRepeats(repeatsFromApi, repeatsFromStorage);

  persistRepeatsToStorage(repeatsFromStorage);
};

console.log(accessToken);

await updateRepeatsDataStore();
