import { RawAttackDataType } from "./../types/index";
import { DATA_URL, STORAGE_KEY, MAX_DATA_LENGTH } from "@/constants";
import { storageService } from "./storage.service";
import { AttackDataType, RawAttackResponseType } from "@/types";

export const dataService = {
  getInitialAttacksData,
  queryAttacksData,
  saveAttacksData,
};

async function getInitialAttacksData() {
  try {
    let returnedData: AttackDataType[] | undefined =
      storageService.load(STORAGE_KEY);

    if (!returnedData || returnedData.length <= 10) {
      returnedData = await queryAttacksData();
    }

    return returnedData;
  } catch (err) {
    console.error(err);
  }
}

async function saveAttacksData(updatedData: AttackDataType[]) {
  try {
    storageService.save(STORAGE_KEY, updatedData);
  } catch (err) {
    console.error(err);
  }
}

async function queryAttacksData() {
  try {
    const res = await fetch(`${DATA_URL}?since=${Date.now() - 10000}`);
    const data: RawAttackResponseType = await res.json();
    if (!data.attacks.length) {
      console.log("No attack data found, retrying..");
    }

    const normalizedAattackData = _getNormalizedAttackData(data.attacks);
    return normalizedAattackData;
  } catch (err) {
    console.error(err);
  }
}

const _getNormalizedAttackData = (attacks: RawAttackDataType[]) => {
  // Cap data length to MAX_DATA_LENGTH
  if (attacks.length > MAX_DATA_LENGTH) attacks.splice(MAX_DATA_LENGTH, attacks.length);
  return attacks.map((attack: RawAttackDataType) => {
    const {
      city,
      country,
      countryName,
      date,
      destinationPort,
      latitude,
      longitude,
      peerCity,
      peerCountry,
      peerLatitude,
      peerLongitude,
      protocol,
    } = attack;
    const id = crypto.randomUUID();
    return {
      id,
      city,
      country,
      countryName,
      peerCountry,
      peerCity,
      date: new Date(date).toLocaleString(),
      destinationPort,
      protocol,
      initialCoords: [latitude, longitude],
      finalCoords: [peerLatitude, peerLongitude],
      progressTime: 0,
      lineLength: 0,
    };
  });
};
