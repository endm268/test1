// constants/Types.ts

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  password: string;
  role: boolean;
  isLoggedIn: boolean;
}

export type AssetDetail = {
  place?: string;
  status?: string;
  tag?: string;
  serialNumber?: string;
  fullName?: string;
  asset_Name: string;
  asset_Number_class: string;
  asset_Number_subclass: string;
  asset_Number_detail: string;
  asset_Number_id: string;
  asset_Tag?: string;
  asset_State: "مستهلك" | "جيد" | "عاطل";
  asset_place: string;
  asset_Value: number;
  asset_Date_Use: Date;
  asset_reciever: string;
};

export type AssetDetail2 = {
  t: string;
  name: string;
  tag: string;
  number: string;
  status: string;
  place: string;
  mainValue?: string;
  fullName?: string;
  state?: string;
};

export type NoteDetail = {
  noteLable: string;
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


//ignore 
// Define the type for your options
export interface NavLinkDetail {
  id: number;
  label: string;
  route: string;
  icon: any;
  visible: string[];
}


// Mapping of column IDs to display names
export const columnNamesSearch: Record<string, string> = {
  fullName: "اسم الاصل",
  assetNumber: "تاغ الاصل",
  place: "مكان الاصل",
  dateUse: "تاريخ استلام الاصل",
  reciever: "مكان التسليم الاصل",
};


// Define the type for your options
export type AssetStateDetail = {
  id: number;
  label: string;
  value: string;
};

// Define the type for your options
export type AssetValueDetail = {
  id: number;
  label: string;
  value: string;
};

// Define the type for your options
export type AssetNumberClassDetail = {
  id: number;
  label: string;
  value: string;
};

// Define the type for your options
export type AssetNumberSubclassDetail = {
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






