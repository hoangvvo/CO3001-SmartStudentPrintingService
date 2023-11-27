import { api } from "./api";
import { UpdateSystemConfigurationRequest } from "./openapi";

export const systemConfigurationApi = {
  getSystemConfiguration: () => {
    return api.getSystemConfiguration();
  },
  updateSystemConfiguration: async (
    variables: UpdateSystemConfigurationRequest,
  ) => {
    return api.updateSystemConfiguration({
      updateSystemConfigurationRequest: variables,
    });
  },
};
