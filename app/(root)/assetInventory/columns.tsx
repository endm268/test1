import { DataTableColumnHeader } from "@/components/shared/data-table-column-header";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Asset } from "@/constants/Types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Pen, Trash, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const assetInventoryColumn: ColumnDef<Asset>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 10,
    cell: (info) => {
      return info.row.index + 1;
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="اسم الأصل" />
    ),
    size: 300,
  },
  {
    accessorKey: "assetNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاغ الأصل" />
    ),
    size: 150,
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
      const value: any = row.getValue("assetNumber");
      const router = useRouter();

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
