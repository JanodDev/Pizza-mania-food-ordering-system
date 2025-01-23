'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DialogDemo from '@/components/ModalDialog';
import { Link } from 'react-router-dom';
import useOrders from './useGetOrders';
import { useSocket } from '../../hooks/useSocket';

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  _id: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'delivered';
  createdAt: string;
};

// Dummy data for demonstration
const dummyOrders: Order[] = [
  {
    _id: '67838372bf935e6d6366ac957',
    customer: {
      name: 'Sachin Fernando',
      email: 'nishalkasachin@gmail.com',
      address: '461/6 Nagahawatta Road, Pitipana Uthura, Homagama',
      city: 'Homagama',
      postalCode: '10206',
      phone: '94751681976',
    },
    items: [
      {
        productId: '67829b0690eed6290cbc3386',
        name: 'Hot Garlic Prawns',
        quantity: 1,
        price: 2950,
      },
    ],
    totalAmount: 8870,
    status: 'paid',
    createdAt: '2024-01-12T10:30:00.000Z',
  },
];

export function OrdersDataTable() {
  const socket = useSocket();
  const [orders, setOrders] = useState([]);

  const columns: ColumnDef<Order>[] = [
    {
      id: 'customerName',
      accessorFn: (row) => row.customer.name,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: 'items',
      header: 'Items',
      cell: ({ row }) => {
        const items = row.original.items;
        return (
          <div className="space-y-1">
            {items.map((item, index) => (
              <div key={index} className="text-sm">
                {item.name} x{item.quantity}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return new Date(row.getValue('createdAt')).toLocaleDateString();
      },
    },
    {
      accessorKey: 'totalAmount',
      header: () => <div className="text-right">Total Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('totalAmount'));
        const formatted = new Intl.NumberFormat('en-LK', {
          style: 'currency',
          currency: 'LKR',
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <div
            className={`w-24 rounded-full px-2 py-1 text-center capitalize ${status === 'delivered' ? 'bg-green-100 text-green-800' : ''} ${status === 'paid' ? 'bg-blue-100 text-blue-800' : ''} ${status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''} `}
          >
            {status}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order._id)}
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={`/orders/${order._id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Handle status update to delivered
                  console.log('Mark as delivered:', order._id);
                }}
              >
                Mark as Delivered
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const { isLoading, data, error } = useOrders();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Search customer..."
          value={
            (table.getColumn('customerName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('customerName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          value={
            (table.getColumn('status')?.getFilterValue() as string) ?? 'all'
          }
          onValueChange={(value) =>
            table
              .getColumn('status')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
