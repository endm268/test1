import { DataTableColumnHeader } from "@/components/shared/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Asset } from "@/constants/Types";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export const Assetcolumns: ColumnDef<Asset>[] = [
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
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="حالة الأصل" />
    ),
    cell: ({ row }) => {
      const stats = row.getValue("state")?.toString();
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
    accessorKey: "mainValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="قيمة الأصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("mainValue");
      if (value === null || value === undefined) {
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
    accessorKey: "dateUse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاريخ استلام الأصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("dateUse");

      if (value === null || value === undefined) {
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
    accessorKey: "reciever",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="مكان استلام الأصل" />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue("reciever");

      if (value === null || value === undefined) {
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
    id: "actions",
    header: "الاجراءات",
    cell: ({ row }) => {
      const value: any = row.getValue("assetNumber");
      const router = useRouter();

      const handleView = () => {
        router.push(`/assets/${value}`);
      };

      const handleEdit = () => {
        router.push(`/assets/edit/${value}`);
      };
      return (
        <div className="flex justify-between items-center gap-2">
          <Button className="bg-sky-500 text-white" onClick={handleView}>
            <Eye />
          </Button>
        </div>
      );
    },
  },
];
