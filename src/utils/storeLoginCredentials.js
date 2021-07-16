import { addObjectToLocalStorageObject, addArrayToLocalStorage, normalizeErrors } from "helpers";


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