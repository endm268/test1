import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      classNamber: string;
      subClassNamber: string;
      deatilNumber: string;
    };
  }
) {
  console.log(params.classNamber);
  console.log(params.subClassNamber);
  console.log(params.deatilNumber);
   try {
     const response = await axios.get(
       `http://10.10.10.74:5000/odoo/assets/search/max/asset_number_4/?asset_number_1=${params.classNamber}&asset_number_2=${params.subClassNamber}&asset_number_3=${params.deatilNumber}`
     );

     if (response.data) {
       return NextResponse.json({
         success: true,
         data: response.data,
       });
     }

     return NextResponse.json({
       success: false,
       message: "Asset not found",
     });
   } catch (error) {
     return NextResponse.json({
       success: false,
       message: "Error fetching asset data",
     });
   }
}
