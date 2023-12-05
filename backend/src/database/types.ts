export enum UserRole {
  Admin = "admin",
  SPSO = "spso",
  User = "user",
}

export interface UserDbObject {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  page_balance: number;
  role: "admin" | "spso" | "student";
}

export interface AppSessionDbObject {
  id: number;
  user_id: number;
  token: string;
  created_at: Date;
  expires_at: Date;
}

export enum PrinterCapability {
  Print = "print",
  Scan = "scan",
  Copy = "copy",
  Fax = "fax",
  Color = "color",
  DoubleSided = "double_sided",
}

export interface PrinterDbObject {
  id: number;
  brand_name: string | null;
  model_name: string | null;
  capabilities: PrinterCapability[];
  location: string | null;
  is_enabled: boolean;
  printer_address: string;
  image_url: string | null;
  paper_sizes: string[];
  paper_count: number;
}

export interface UserFileDbObject {
  id: number;
  user_id: number;
  file_name: string;
  file_size: number;
  file_type: string;
  file_path: string;
  created_at: Date;
}

export enum PrinterJobStatus {
  Pending = "pending",
  Printing = "printing",
  Completed = "completed",
  Failed = "failed",
}

export enum PrintOrientation {
  Portrait = "portrait",
  Landscape = "landscape",
}

export interface PrinterJobDbObject {
  id: number;
  status: PrinterJobStatus;
  printer_id: number;
  user_id: number;
  file_id: number;
  start_time: Date;
  end_time: Date | null;
  page_size: string;
  page_count: number;
  double_side: boolean | null;
  color: boolean | null;
  orientation: PrintOrientation | null;
}

export interface SystemConfigurationsDbObject {
  id: number;
  default_page_balance: number;
  cron_of_default_page_balance_grant: string;
  permitted_file_types: string[];
  max_file_size: number;
}
