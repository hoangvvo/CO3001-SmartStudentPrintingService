import { api } from "./api";
import { CreatePrinterJobRequest } from "./openapi";

export const printerJobApi = {
  getPrinterJob(id: number) {
    return api.getPrinterJob({
      id,
    });
  },

  listPrinterJobs() {
    return api.listPrinterJobs();
  },

  createPrinterJob(variables: CreatePrinterJobRequest) {
    return api.createPrinterJob({
      createPrinterJobRequest: variables,
    });
  },
};
