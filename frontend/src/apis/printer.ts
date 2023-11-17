import { api } from "./api";
import { CreatePrinterRequest, UpdatePrinterRequest } from "./openapi";

export const printerApi = {
  getPrinter(id: number) {
    return api.getPrinter({
      id,
    });
  },
  listPrinters() {
    return api.listPrinters();
  },
  createPrinter(variables: CreatePrinterRequest) {
    return api.createPrinter({
      createPrinterRequest: variables,
    });
  },
  updatePrinter({ id, ...variables }: { id: number } & UpdatePrinterRequest) {
    return api.updatePrinter({
      id,
      updatePrinterRequest: variables,
    });
  },
  deletePrinter(id: number) {
    return api.deletePrinter({
      id,
    });
  },
};
