import { clone, get, isEmpty } from "lodash";
import { isArray, isEqual, isObject, transform } from "lodash";
import dayjs from "dayjs";
import { Base64 } from "js-base64";
import { addObjectToLocalStorageObject, addArrayToLocalStorage, normalizeErrors } from "helpers";
/**
 * @param  {} data
 * @param  {} errors
 */
export const handleAvatarUpdate = (data, errors) => {
  if (errors) {
    console.log("Server Error kwa login", errors[0].message);
    return errors[0].message;
  }
  const successful = maybe(() => data.userAvatarUpdate.success);

  if (successful) {
    alert.show(
      {
        title: "Avatar Update Successful",
      },
      { type: "success", timeout: 5000 },
    );
  } else {
    const err = maybe(() => data.userAvatarUpdate.errors, []);

    if (err) {
      const nonFieldErr = normalizeErrors(
        maybe(() => data.userAvatarUpdate.errors, []),
      );
      alert.show(
        {
          title: nonFieldErr?.nonFieldErrors,
        },
        { type: "error", timeout: 5000 },
      );
    }
  }
};

/**
 * @param  {} data
 * Store a user's credentials in localstorage or display an error.
 */
export const storeLoginDetails = (successful, history, data, setErrors, setSubmitting, location) => {
    if (successful) {
        localStorage.removeItem("thedb_auth_roles");
        var roles = [];
        if (data.tokenAuth.user.isStaff) {
          roles.push("admin");
        }
        if (data.tokenAuth.user.isSeeker) {
          roles.push("seeker");
        }
        if (data.tokenAuth.user.isEmployer) {
          roles.push("employer");
        }
        if (data.tokenAuth.user.isInstitution) {
          roles.push("institution");
        }
        addArrayToLocalStorage("thedb_auth_roles", roles);
        localStorage.setItem("access_token", data.tokenAuth.token);
        localStorage.setItem(
          "refresh_token",
          data.tokenAuth.refreshToken,
        );
        addObjectToLocalStorageObject("thedb_auth_payload", {
          refreshToken: data.tokenAuth.refreshToken,
          token: data.tokenAuth.token,
        });
        addObjectToLocalStorageObject(
          "thedb_auth_profile",
          data.tokenAuth.user,
        );

        // If the function is being called from the login component
        // then setSubmiting to false and move to the dashboard.
        if (location === 'login') {
            history.push("/dashboard");
            setSubmitting(false);
        }

      } else {
        setErrors(normalizeErrors(data.tokenAuth.errors));
        if (location === 'login') {
            setSubmitting(false);
        }
      }
}

export const getDBIdFromGraphqlId = (graphqlId, schema) => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)/;
  const arr = regexp.exec(rawId);
  if (schema && schema !== arr[1]) {
    throw new Error("Schema is not correct");
  }
  return parseInt(arr[2], 10);
};

export const getGraphqlIdFromDBId = (id, schema) =>
  // This is temporary solution, we will use slugs in the future
  Base64.encode(`${schema}:${id}`);

export const priceToString = (price, locale) => {
  const { amount } = price;
  if (locale) {
    return amount.toLocaleString(locale, {
      currency: price.currency,
      style: "currency",
    });
  }
  return `${price.currency} ${amount.toFixed(2)}`;
};

export const getModalText = (isEditMode, type, t) =>
  isEditMode ? `Edit ${type}` : `Add ${type}`;

export const safetyCheck = (section, path = "items") =>
  !!(section && section.visible === true && !isEmpty(section[path]));

export const isItemVisible = (section) =>
  section && section.isVisible !== false;

// Thought about creating a generic function to filter out non-visible items
export const genericFilter = (key, data) => {
  const clonedData = clone(data);
  clonedData[`${key}`].items = clonedData[`${key}`].items.filter((x) =>
    isItemVisible(x),
  );
  return data;
};

export const handleKeyUp = (event, action) => {
  (event.which === 13 || event.which === 32) && action();
};

export const isFileImage = (file) => {
  const acceptedImageTypes = ["image/jpeg", "image/png"];
  return file && acceptedImageTypes.includes(file.type);
};

export const scaler = (value) => {
  const logMax = 2.5;
  const logMin = 0.6;
  const steps = 20;
  const logRange = logMax / logMin;
  const logStepSize = logRange ** (1 / steps);
  const min = 0;

  return logStepSize ** (value - min) * logMin;
};

export const formatDate = ({ date, language = "en", includeDay = false }) => {
  const template = includeDay ? "DD MMMM YYYY" : "MMMM YYYY";

  return dayjs(date).locale(language.substr(0, 2)).format(template);
};

export const formatDateRange = ({ startDate, endDate, language = "en" }, t) => {
  const start = `${dayjs(startDate)
    .locale(language.substr(0, 2))
    .format("MMMM YYYY")}`;

  const end = dayjs(endDate).isValid()
    ? `${dayjs(endDate).locale(language.substr(0, 2)).format("MMMM YYYY")}`
    : t("shared.forms.present");

  return `${start} - ${end}`;
};

export const getFieldProps = (formik, schema, name) => ({
  touched: get(formik, `touched.${name}`, false),
  error: get(formik, `errors.${name}`, ""),
  isRequired: get(schema, `fields.${name}._exclusive.required`),
  ...formik.getFieldProps(name),
});

export const unsplashPhotoRequestUrl =
  "https://source.unsplash.com/featured/400x600";

export const getUnsplashPhoto = async () => {
  const response = await fetch(unsplashPhotoRequestUrl);
  return response.url;
};

export const hasAddress = (address) =>
  !!address.line1 || !!address.line2 || !!address.city || !!address.pincode;

export const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const objDiff = (originalObject, newObject, exclude) => {
  const ex =
    typeof exlude === "string"
      ? exclude.split(",")
      : typeof exclude === Object
      ? Object.values(exclude)
      : Array.isArray(exclude)
      ? exclude
      : [];
  // console.log(ex);
  const changes = (newObject, originalObject) => {
    let arrayIndexCounter = 0;
    return transform(newObject, (result, value, key) => {
      if (!isEqual(value, originalObject[key])) {
        let resultKey = isArray(originalObject) ? arrayIndexCounter++ : key;
        for (let i = 0; i < ex.length; i++) {
          const r = ex[i];
          if (originalObject[r]) {
            result[r] = originalObject[r];
          }
        }
        result[resultKey] =
          isObject(value) && isObject(originalObject[key])
            ? changes(value, originalObject[key])
            : value;
        // result["id"] =  Object.prototype.valueOf.arguments(originalObject, "id");
      }
    });
  };
  // console.log(changes(newObject, originalObject));
  return changes(newObject, originalObject);
};

export const toFormData = (obj, form, namespace) => {
  console.log(obj);
  let fd = form || new FormData();
  let formKey;

  if (obj && obj.new) {
    let reducedObj;
    if (obj.old) {
      let diff = objDiff(obj.old, obj.new);

      reducedObj = diff;
    } else {
      reducedObj = obj.new;
    }

    for (let property in reducedObj) {
      if (reducedObj.hasOwnProperty(property)) {
        if (namespace) {
          formKey = namespace + "[" + property + "]";
        } else {
          formKey = property;
        }
        if (reducedObj[property] instanceof Date) {
          fd.append(formKey, reducedObj[property].toISOString());
        } else if (
          typeof reducedObj[property] === "object" &&
          !(reducedObj[property] instanceof File)
        ) {
          toFormData(reducedObj[property], fd, formKey);
        } else {
          fd.append(formKey, reducedObj[property]);
        }
      }
    }
  } else {
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          formKey = namespace + "[" + property + "]";
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (
          typeof obj[property] === "object" &&
          !(obj[property] instanceof File)
        ) {
          toFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
  }

  return fd;
};
