import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useItems from './useItems';
import { EllipsisVertical } from 'lucide-react';

const invoices = [
  {
    invoice: '1',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: '1',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
];

export default function ItemsTable() {
  const { isLoading, data, error } = useItems();
  console.log(isLoading);
  return (
    <Table>
      <TableCaption>A list of your recent items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data.map((item, count) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{count + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description || 'N/A'}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell className="text-right">
                {<EllipsisVertical></EllipsisVertical>}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
