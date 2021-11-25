import { IsNotEmpty } from "helpers";

// Prepare data for sending i.e. add the '+' to international phonenumbers.
export const prepareData = (data) => {
  // Remove the terms and conditions value as it is not needed
  // in the api request.
  delete data.terms;
  Object.keys(data).map((key) => {
    // Attach the '+' to the beginning of the phone number
    // if its not there already.
    if (key === "phone") {
      if (!data["phone"].includes("+")) {
        data["phone"] = "+" + data["phone"];
      }
    }

    // Remove the space from the full name value.
    data["username"] = data["fullName"].replace(/ /g, "");

    return null;
  });
  return data;
};

export const cleanInitialValues = (data, key = null) => {
  const obj = {
    key: data.reduce((acc, ind) => {
      acc.push({ value: ind.id, label: ind.name });
      return acc;
    }, []),
  };
  return obj;
};

export const cleanIndustries = (data) => {
  return data.reduce((arr, b) => {
    arr.push({
      value: b.id,
      label: b.name,
    });
    return arr;
  }, []);
};

export const getIndustries = (industriesData, values) => {
  let industries = [];
  if (IsNotEmpty(industriesData.data)) {
    industries = cleanIndustries(industriesData.data.allIndustries);
  }
  let initialValues = values;
  // eslint-disable-next-line
  initialValues = cleanInitialValues(industries, industries);
  return industries;
};
