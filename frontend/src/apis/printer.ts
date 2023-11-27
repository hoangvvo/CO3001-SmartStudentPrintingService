import { api } from "./api";
import { handleResponseError } from "./error";
import { CreatePrinterRequest, UpdatePrinterRequest } from "./openapi";

export const printerApi = {
  getPrinter(id: number) {
    return api
      .getPrinter({
        id,
      })
      .catch(handleResponseError);
  },
  listPrinters() {
    return api.listPrinters().catch(handleResponseError);
  },
  createPrinter(variables: CreatePrinterRequest) {
    return api
      .createPrinter({
        createPrinterRequest: variables,
      })
      .catch(handleResponseError);
  },
  updatePrinter({ id, ...variables }: { id: number } & UpdatePrinterRequest) {
    return api
      .updatePrinter({
        id,
        updatePrinterRequest: variables,
      })
      .catch(handleResponseError);
  },
  deletePrinter(id: number) {
    return api
      .deletePrinter({
        id,
      })
      .catch(handleResponseError);
  },
};
