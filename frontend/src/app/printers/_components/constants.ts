import { PrinterCapabilitiesEnum } from "@/apis/openapi";

export const CAPABILITIES_LABELS: Record<PrinterCapabilitiesEnum, string> = {
  [PrinterCapabilitiesEnum.Print]: "Print",
  [PrinterCapabilitiesEnum.Scan]: "Scan",
  [PrinterCapabilitiesEnum.Copy]: "Copy",
  [PrinterCapabilitiesEnum.Fax]: "Fax",
  [PrinterCapabilitiesEnum.Color]: "Color",
  [PrinterCapabilitiesEnum.DoubleSided]: "Double Sided",
};

export const PAPER_SIZES = ["A4", "A3", "A2", "A1", "A0"];
