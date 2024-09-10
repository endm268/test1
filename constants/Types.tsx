// constants/Types.ts
import { IronSession, SessionOptions } from "iron-session";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isdamin: boolean;
  isLoggedIn: boolean;
}

export type Asset = {
  asset_Name: string;
  asset_Number_class?: string;
  asset_Number_subclass?: string;
  asset_Number_detail?: string;
  asset_Number_id: string;
  asset_Tag?: string;
  asset_State: "مستهلك" | "جيد" | "عاطل";
  asset_place: string;
  asset_Value: number;
  asset_Date_Use: Date;
  asset_reciever: string;
};

export interface NavLink {
  label: string;
  route: string;
  icon: any;
  children?: NavLink[];
}

// Define the type for your options
export type AssetState = {
  id: number;
  label: string;
  value: string;
};

// Define the type for your options
export type AssetNumberClass = {
  id: number;
  label: string;
  value: string;
};

// Define the type for your options
export type AssetNumberSubclass = {
  id: number;
  label: string;
  value: string;
  asset_Number_class: string;
};

// Define the type for your options
export type AssetNumberDetail = {
  id: number;
  label: string;
  value: string;
  asset_Number_class: string;
  asset_Number_subclass: string;
};
