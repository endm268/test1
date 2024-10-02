import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { AssetDetail2 } from "@/Types/Types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Pen, Trash, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const assetInventoryColumn: ColumnDef<AssetDetail2>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 10,
    cell: (info) => {
      return info.row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="اسم الأصل" />
    ),
    size: 300,
  },
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم الأصل" />
    ),
    size: 150,
  },
  {
    accessorKey: "tag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاغ الأصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("tag");

      if (value === null || value === undefined) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            تاغ الاصل غير متوفر
          </div>
        );
      }

      return <div>{value}</div>;
    },
    size: 200,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="حالة الأصل" />
    ),
    cell: ({ row }) => {
      const stats = row.getValue("status")?.toString();
      if (stats === "عاطل") {
        return (
          <div className="text-center p-2 rounded-md bg-rose-700 text-white font-medium">
            {stats}
          </div>
        );
      }
      if (stats === "مستهلك") {
        return (
          <div className="text-center p-2 rounded-md bg-amber-400 text-white font-medium">
            {stats}
          </div>
        );
      }
      return (
        <div className="text-center p-2 rounded-md bg-cyan-600 text-white font-medium">
          {stats}
        </div>
      );
    },
    size: 150,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "place",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="مكان الأصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("place");

      if (value === null || value === undefined) {
        return (
          <div className="text-center p-2 rounded-md bg-rose-500 text-white font-medium">
            مكان الاصل غير متوفر
          </div>
        );
      }

      return <div>{value}</div>;
    },
    size: 200,
  },
  
  {
    id: "actions",
    header: "الاجراءات",
    cell: ({ row }) => {
      const value: any = row.getValue("number");
      const router = useRouter();

      console.log("number :" + value);

      const handleView = () => {
        router.push(`/assetInventory/${value}`);
      };

      const handleEdit = () => {
        router.push(`/assetInventory/${value}/edit`);
      };

      return (
        <div className="flex items-center gap-2">
          <Button className="bg-sky-500 text-white" onClick={handleView}>
            <Eye />
          </Button>
          <Button className="bg-green-500 text-white" onClick={handleEdit}>
            <Edit />
          </Button>

          <DeleteConfirmation assetid={value} />
        </div>
      );
    },
  },
];
