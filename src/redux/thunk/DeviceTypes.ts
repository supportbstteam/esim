// ================= DEVICE =================

export interface Brand {
  id: number;
  name: string;
}

export type DeviceOS =
  | "ANDROID"
  | "IOS"
  | "WINDOWS"
  | "OTHER";

export interface Device {
  id: number;
  name: string;
  model: string;
  os: DeviceOS;
  supportsEsim: boolean;
  isActive: boolean;
  notes?: string | null;

  brand: Brand;

  createdAt: string;
  updatedAt: string;
}

// ================= QUERY =================

export interface UserDeviceQuery {
  page?: number;
  limit?: number;

  q?: string;
  deviceName?: string;
  mobile?: string;
  brand?: string;

  brandId?: number;
  model?: string;
  os?: DeviceOS;
  active?: boolean;
  supportsEsim?: boolean;

  sortBy?: string;
  order?: "ASC" | "DESC";
}

// ================= RESPONSE =================

export interface UserDeviceResponse {
  data: Device[];
  page: number;
  pages: number;
  total: number;
  limit: number;
}
