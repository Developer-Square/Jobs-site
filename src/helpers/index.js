import { useEffect, useState } from "react";
import _ from "lodash";
import CryptoJS from "crypto-js";
import AES from "crypto-js/aes";

export const formTokenConfig = (getState) => {
  // const token = getState().auth.token;
  const token = localStorage.getItem("access_token");
  // Headers
  let data = new FormData();
  const config = {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
export const tokenConfig = (getState) => {
  // const token = getState().auth.token;
  const token = localStorage.getItem("access_token");
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

export const useTimer = (seconds) => {
  const [counter, setCounter] = useState(seconds);
  // Third Attempts
  useEffect(() => {
    const timer =
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return counter;
};

export const normalizeErrors = (errors) => {
  if (typeof errors !== "object") return null;
  return Object.keys(errors).reduce((acc, val) => {
    const oB = (values, number) => {
      if (values || number) {
        const check = values + "[" + number + "].message";
        return check;
      }
      return null;
    };
    acc[val] = _.get(errors, oB(val, 0), null);
    return acc;
  }, {});
};

export const formatError = (error) =>
  error && error[0].toUpperCase() + error.slice(1);

export const makeSecretKey = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const hashPassword = async (secret) => {
  const secretKey = makeSecretKey(20);

  // Encrypt
  var ciphertext = AES.encrypt(secret, secretKey).toString();
  addToLocalStorageObject("thedb_auth_profile", "hash", secretKey);
  addToLocalStorageObject("thedb_auth_profile", "secret", makeSecretKey(8));
  addToLocalStorageObject("thedb_auth_profile", "key", ciphertext);
};
export const unhashPassword = (secret) => {
  if (localStorage.getItem("thedb_auth_profile") === null) {
    var noText = "";
    return noText;
  } else if (
    JSON.parse(localStorage.getItem("thedb_auth_profile")).key !== undefined
  ) {
    const profileData = JSON.parse(localStorage.getItem("thedb_auth_profile"));
    const ciphertext = profileData.key;
    const secretKey = profileData.hash;

    // Decrypt
    var bytes = AES.decrypt(ciphertext, secretKey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    var profile = JSON.parse(localStorage.thedb_auth_profile || {}); //read and convert to object
    var delKey = "key"; //key to remove
    var delHash = "hash"; //key to remove
    var delSecret = "secret"; //key to remove
    if (profile[delKey] || profile[delHash] || profile[delSecret]) {
      //check if key exists
      delete profile[delKey]; //remove the key from object
      delete profile[delHash]; //remove the key from object
      delete profile[delSecret]; //remove the key from object
    }
    localStorage.thedb_auth_profile = JSON.stringify(profile); //save it back
    return originalText;
  } else {
    return noText;
  }
};
/**
 * Add an item to a local storage string
 * @param  {String} name      The localStorage() key
 * @param  {String} value     The localStorage() value
 * @param  {String} delimiter The delimiter to use to separate items
 */
export const addToLocalStorageString = function (name, value, delimiter) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, use the value by itself
  // Otherwise, add the new value to it
  var data = existing ? existing + delimiter + value : value;

  // Save back to localStorage
  localStorage.setItem(name, data);
};

// Example
// addToLocalStorageString('myFavoriteSandwich', 'tuna', ' and ');

/**
 * Add an item to a localStorage() array
 * @param {String} name  The localStorage() key
 * @param {String} value The localStorage() value
 */
export const addToLocalStorageArray = function (name, value) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? existing.split(",") : [];

  // Add new data to localStorage Array
  existing.push(value);

  // Save back to localStorage
  localStorage.setItem(name, [existing.toString()]);
};

/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {String} key   The localStorage() value object key
 * @param {String} value The localStorage() value object value
 */
export const addToLocalStorageObject = function (name, key, value) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? JSON.parse(existing) : {};

  // Add new data to localStorage Array
  existing[key] = value;

  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
};

/**
 * Add an object to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {Object} obj   The localStorage() value object key + value
 */
export const addObjectToLocalStorageObject = function (name, obj) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? JSON.parse(existing) : {};

  // Add new data to localStorage Array
  let profile = {};
  existing = { ...profile, ...obj };
  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
};

export const millisecondsToDaysHoursMinutesSeconds = (milliSeconds) => {
  var milliseconds, days, hours, minutes, seconds;

  if (milliSeconds > 0) {
    milliseconds = milliSeconds;
    days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    if (days < 0) {
      days = 0;
    }
    milliseconds -= days * 24 * 60 * 60 * 1000;

    hours = Math.floor(milliseconds / (60 * 60 * 1000));
    if (hours < 0) {
      hours = 0;
    }
    milliseconds -= hours * 60 * 60 * 1000;

    minutes = Math.floor(milliseconds / (60 * 1000));
    if (minutes < 0) {
      minutes = 0;
    }
    milliseconds -= minutes * 60 * 1000;

    seconds = Math.floor(milliseconds / 1000);
    if (seconds < 0) {
      seconds = 0;
    }
  } else {
    days = hours = minutes = seconds = 0;
  }

  return { days: days, hours: hours, minutes: minutes, seconds: seconds };
};
