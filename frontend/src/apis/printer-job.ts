import { api } from "./api";
import { handleResponseError } from "./error";
import { CreatePrinterJobRequest } from "./openapi";

export const printerJobApi = {
  getPrinterJob(id: number) {
    return api
      .getPrinterJob({
        id,
      })
      .catch(handleResponseError);
  },

  listPrinterJobs() {
    return api.listPrinterJobs().catch(handleResponseError);
  },

  createPrinterJob(variables: CreatePrinterJobRequest) {
    return api
      .createPrinterJob({
        createPrinterJobRequest: variables,
      })
      .catch(handleResponseError);
  },
};
