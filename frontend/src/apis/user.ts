import { api } from "./api";
import { handleResponseError } from "./error";
import { UserLoginRequest, UserSignUpRequest } from "./openapi";

export const userApi = {
  login(variables: UserLoginRequest) {
    return api
      .userLogin({
        userLoginRequest: variables,
      })
      .catch(handleResponseError);
  },
  register(variables: UserSignUpRequest) {
    return api
      .userSignUp({
        userSignUpRequest: variables,
      })
      .catch(handleResponseError);
  },
  getCurrentUser() {
    return api.getCurrentUser().catch(handleResponseError);
  },
  logout() {
    return api.userLogout().catch(handleResponseError);
  },
};
