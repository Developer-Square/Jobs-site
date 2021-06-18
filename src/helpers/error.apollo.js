export function findValueInEnum(needle, haystack) {
  const match = Object.entries(haystack).find(([_, value]) => value === needle);
  if (!match) {
    throw new Error(`Value ${needle} not found in enum`);
  }
  return needle;
}
export var JWTError;
(function (JWTError) {
  JWTError["invalid"] = "InvalidTokenError";
  JWTError["invalidSignature"] = "InvalidSignatureError";
  JWTError["expired"] = "ExpiredSignatureError";
})(JWTError || (JWTError = {}));
export function isJwtError(error) {
  let jwtError;
  try {
    jwtError = !!findValueInEnum(error.extensions.exception.code, JWTError);
  } catch (e) {
    jwtError = false;
  }
  return jwtError;
}
export function isTokenExpired(error) {
  return error.extensions.exception.code === JWTError.expired;
}
