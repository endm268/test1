"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AssetOdoo, User } from "@/Types/Types";
import HeaderPage from "@/components/shared/headerPage";
import { DataTable } from "@/components/data-table/data-table";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { useRouter } from "next/navigation";

//delete
import { odooData2 } from "@/lib/data";
import { cookies } from "next/headers";

const columns: ColumnDef<AssetOdoo>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-0.5"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-0.5"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("id");

      if (
        value === null ||
        value === undefined ||
        value === false ||
        value === "false"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            رقم تعريف الاصل غير متوفر
          </div>
        );
      }
      return <div>{value}</div>;
    },
    size: 100,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="اسم الاصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("name");

      if (
        value === null ||
        value === undefined ||
        typeof value === "boolean" ||
        value === "false"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            اسم الاصل غير متوفر
          </div>
        );
      }
      return <div>{value}</div>;
    },
    size: 300,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "asset_tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاغ الاصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("asset_tags");

      if (
        value === null ||
        value === undefined ||
        typeof value === "boolean" ||
        value === "false"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            تاغ الاصل غير متوفر
          </div>
        );
      }
      return <div>{value}</div>;
    },
    size: 300,
  },
  {
    accessorKey: "asset_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="حالة الاصل" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("asset_status");

      // Handle cases where value might be undefined or boolean
      if (
        value === null ||
        value === undefined ||
        typeof value === "boolean" ||
        value === "false"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            حالة الاصل غير متوفر
          </div>
        );
      }

      const status = value.toString(); // Ensure value is treated as a string

      if (status === "damaged") {
        return (
          <div className="text-center p-2 rounded-md bg-rose-700 text-white font-medium">
            عاطل
          </div>
        );
      }
      if (status === "used") {
        return (
          <div className="text-center p-2 rounded-md bg-amber-400 text-white font-medium">
            مستهلك
          </div>
        );
      }
      return (
        <div className="text-center p-2 rounded-md bg-cyan-600 text-white font-medium">
          جيد
        </div>
      );
    },
    size: 200,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "asset_number_1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم تصنيف الاساسي " />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("asset_number_1");

      if (
        value === null ||
        value === undefined ||
        typeof value === "boolean" ||
        value === "false"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            رقم تصنيف الاساسي غير متوفر
          </div>
        );
      }
      return <div>{value}</div>;
    },
    size: 200,
  },

  {
    accessorKey: "asset_number_2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم تصنيف فرعي" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("asset_number_2");

      if (
        value === null ||
        value === undefined ||
        typeof value === "boolean" ||
        value === "false"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            رقم تصنيف فرعي غير متوفر
          </div>
        );
      }
      return <div>{value}</div>;
    },
    size: 200,
  },

  {
    accessorKey: "asset_number_3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم تصنيف تفصيلي" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("asset_number_3");

      if (
        value === null ||
        value === undefined ||
        typeof value === "boolean" ||
        value === "false"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            رقم تصنيف تفصيلي غير متوفر
          </div>
        );
      }
      return <div>{value}</div>;
    },
    size: 200,
  },

  {
    accessorKey: "asset_number_4",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم تعريفي لاصل " />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("asset_number_4");

      if (
        value === null ||
        value === undefined ||
        typeof value === "boolean" ||
        value === "false"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            رقم تعريفي لاصل غير متوفر
          </div>
        );
      }
      return <div>{value}</div>;
    },
    size: 200,
  },
  {
    accessorKey: "asset_combined_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم الاصل" />
    ),
    cell: ({ row }) => {
      const { asset_number_4, asset_number_3, asset_number_2, asset_number_1 } =
        row.original;

      // Handle cases where any of the asset numbers might be null or undefined
      if (
        asset_number_1 === null ||
        asset_number_1 === undefined ||
        typeof asset_number_1 === "boolean" ||
        asset_number_2 === null ||
        asset_number_2 === undefined ||
        typeof asset_number_2 === "boolean" ||
        asset_number_3 === null ||
        asset_number_3 === undefined ||
        typeof asset_number_3 === "boolean" ||
        asset_number_4 === null ||
        asset_number_4 === undefined ||
        typeof asset_number_4 === "boolean"
      ) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            حالة الاصل غير متوفر
          </div>
        );
      }

      // Return the combined asset numbers separated by dashes
      return `${asset_number_4}-${asset_number_3}-${asset_number_2}-${asset_number_1}`;
    },
    size: 200,
  },
  {
    accessorKey: "original_value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="قيمة الأصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("original_value");
      if (value === null || value === undefined || typeof value === "boolean") {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            القيمة غير متوفرة
          </div>
        );
      }
      const amount = parseFloat(value);
      const formatted = new Intl.NumberFormat("ar-LY", {
        style: "currency",
        currency: "LYD",
      }).format(amount);

      if (amount > 100000) {
        return (
          <div className="text-center p-2 rounded-md bg-lime-500 text-white font-medium">
            {formatted}
          </div>
        );
      }

      if (amount > 10000) {
        return (
          <div className="text-center p-2 rounded-md bg-amber-400 text-white font-medium">
            {formatted}
          </div>
        );
      }

      if (amount > 1000) {
        return (
          <div className="text-center p-2 rounded-md bg-cyan-600 text-white font-medium">
            {formatted}
          </div>
        );
      }

      return (
        <div className="text-center p-2 rounded-md bg-slate-100 text-black font-medium">
          {formatted}
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "place_of_asset",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="مكان الأصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("place_of_asset");

      // Handle cases where value might be null, undefined, or a boolean
      if (value === null || value === undefined || typeof value === "boolean") {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium w-[200px]">
            مكان الاصل غير متوفر
          </div>
        );
      }

      // Return the value with a larger width for non-null cases
      return <div className="w-[400px]">{value}</div>;
    },
    size: 200,
  },

  {
    accessorKey: "name_of_recepiet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="اسم مستلم الاصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("name_of_recepiet");

      if (value === null || value === undefined || typeof value === "boolean") {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            اسم المستلم غير متوفر
          </div>
        );
      }

      return <div>{value}</div>;
    },
    size: 200,
  },
  {
    accessorKey: "pin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم الوظيفي " />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("pin");

      if (value === null || value === undefined || typeof value === "boolean") {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            رقم الوظيفي غير متوفر
          </div>
        );
      }

      return <div>{value}</div>;
    },
    size: 200,
  },
  {
    accessorKey: "using_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاريخ استلام الأصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("using_date");

      if (value === null || value === undefined || typeof value === "boolean") {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            تاريخ غير متوفر
          </div>
        );
      }

      // Convert value to a date and format it (e.g., to 'YYYY-MM-DD' format)
      const formattedDate = new Date(value).toLocaleDateString("en-EG", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return <div>{formattedDate}</div>;
    },
    size: 200,
  },
  {
    id: "actions",
    header: "الاجراءات",
    cell: ({ row }) => {
      const value: string = row.getValue("id");
      const router = useRouter();

      const handleView = () => {
        router.push(`/assets/${value}`);
      };

      const handleEdit = () => {
        router.push(`/assets/${value}/update`);
      };

      return (
        <div className="flex items-center gap-2">
          <Button className="bg-sky-500 text-white" onClick={handleView}>
            <Eye />
          </Button>
      
            <Button className="bg-green-500 text-white" onClick={handleEdit}>
              <Edit />
            </Button>
         
          <DeleteConfirmation
            id={value}
            type={"odoo"}
            title={"الاصل من الاودو"}
          />
        </div>
      );
    },
  },
];

const Assetspage = () => {
  const [assets, setAssets] = useState<AssetOdoo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        // const response = await fetch("/api/assets");
        // const data = await response.json();
        // setAssets(data);
        setAssets(odooData2);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div> جار التحميل...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-8 py-2">
      <HeaderPage title={"عرض كل الاصول في الاودو"} disabled={true} />
      <div className="container mx-auto w-full mb-8">
        <DataTable columns={columns} data={assets} />
      </div>
    </div>
  );
};

export default Assetspage;
function fetchSession() {
  throw new Error("Function not implemented.");
}

