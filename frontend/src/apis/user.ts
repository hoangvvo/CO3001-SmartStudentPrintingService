import { api } from "./api";
import { UserLoginRequest, UserSignUpRequest } from "./openapi";

export const userApi = {
  login(variables: UserLoginRequest) {
    return api.userLogin({
      userLoginRequest: variables,
    });
  },
  register(variables: UserSignUpRequest) {
    return api.userSignUp({
      userSignUpRequest: variables,
    });
  },
  getCurrentUser() {
    return api.getCurrentUser();
  },
  logout() {
    return api.userLogout();
  },
};
