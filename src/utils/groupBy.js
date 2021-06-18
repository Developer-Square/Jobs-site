export function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export function nestGroupsBy(arr, properties) {
  properties = Array.from(properties);
  if (properties.length === 1) {
    return groupBy(arr, properties[0]);
  }
  const property = properties.shift();
  const grouped = groupBy(arr, property);
  for (const key in grouped) {
    // if (Object.hasOwnProperty.call(grouped, key)) {
    //   const element = grouped[key];
    // }
    grouped[key] = nestGroupsBy(grouped[key], Array.from(properties));
  }
  return grouped;
}

export const assign = (obj, keyPath, value, type) => {
  const lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; i++) {
    const key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = type === Array ? [] : {};
    }
    obj = obj[key];
  }
  if (type === Array) {
    obj[keyPath[lastKeyIndex]].push(value);
  } else {
    obj[keyPath[lastKeyIndex]] = value;
  }
};

export const dfs = (obj, targetData, targetRef) => {
  if (obj.id === targetData) {
    return obj;
  }
  if (obj.children) {
    for (const item of obj.children) {
      let check = dfs(item, targetData);
      if (check) {
        return check;
      }
    }
  }
  return null;
};

export const findPath = (a, obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (a === obj[key]) {
        return key;
      } else if (obj[key] && typeof obj[key] === "object") {
        var path = findPath(a, obj[key]);
        if (path) {
          return key + "." + path;
        }
      }
    }
  }
};
