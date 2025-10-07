export interface Country {
  id: string;
  name: string;
  isoCode: string;
  iso3Code: string;
  phoneCode: string;
  currency: string;
  description: string | null;
  isActive: boolean;
  isDelete: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
