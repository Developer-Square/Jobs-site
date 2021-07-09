export function maybe(exp, d) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

export function hasErrors(errorList) {
  return !(
    errorList === undefined ||
    errorList === null ||
    errorList.length === 0
  );
}

export function getMutationState(called, loading, ...errorList) {
  if (loading) {
    return "loading";
  }
  if (called) {
    return errorList.map(hasErrors).reduce((acc, curr) => acc || curr, false)
      ? "error"
      : "success";
  }
  return "default";
}

export function getMutationErrors(data) {
  return Object.values(data).reduce(
    (acc, mut) => [...acc, ...maybe(() => mut.errors, [])],
    [],
  );
}
export function getMutationStatus(opts) {
  const errors = opts.data ? getMutationErrors(opts.data) : [];

  return getMutationState(opts.called, opts.loading, errors);
}
