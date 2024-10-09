//Types.ts

export type AssetOdoo = {
  id: number;
  asset_tags: string ;
  name: string;
  place_of_asset: string;
  name_of_recepiet: string;
  pin: string | "false";
  asset_status: "new" | "used" | "damaged" | string; 
  asset_number_1: string;
  asset_number_2: string;
  asset_number_3: string;
  asset_number_4: string;
  plate_number?: string ;
  chassis_no?: string ;
  engine_serial_no?: string ;
  year_of_manufacture?: string ;
  acquisition_date: string;
  using_date?: string;
  original_value: number;
};

export type NavLinkDetail = {
  id: number;
  label: string;
  route: string;
  icon: any;
  visible: string[];
}

// Define the type for your options
export type AssetStateDetail = {
  id: number;
  label: string;
  value: string;
};

// Define the type for your options
export type AssetCategoryDetail = {
  id: number;
  label: string;
  value: string;
};


// Employee type based on API response
export type EmployeeDetail = {
  name: any;
  id: number;
  label: string;
  value: number;
  job_id: string;
};

// Define the type for your options
export type AssetNumberClassDetail = {
  id: number;
  idfex: number;
  label: string;
  value: string;
};

// Define the type for your options
export type AssetNumberSubclassDetail = {
  id: number;
  idfex: number;
  label: string;
  value: string;
  asset_Number_class: string;
};

// Define the type for your options
export type AssetNumberDetail = {
  id: number;
  idfex: number;
  label: string;
  value: string;
  asset_Number_class: string;
  asset_Number_subclass: string;
};



// Define the permissions type
export interface Permissions {
  canOdooDelete: boolean;
  canOdooUpdate: boolean;
  canOdooCreate: boolean;
  canOdooShowlist: boolean;
  canOdooShow: boolean;
}

// Define the user type
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  device: string;
  permissions: Permissions;
}





