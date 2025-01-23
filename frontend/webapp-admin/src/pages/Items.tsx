import AddItemForm from '@/features/items/AddItemForm';
import ItemsTable from '@/features/items/ItemsTable';
import DialogDemo from '@/components/ModalDialog';
import { ItemsDataTable } from '@/features/items/CustomTable';

export default function Items() {
  return (
    <div className="m-4">
      {/* <ItemsTable></ItemsTable> */}
      <h2 className="mb-6 text-center text-3xl font-bold">Items</h2>
      <ItemsDataTable></ItemsDataTable>
      <DialogDemo>
        {(setOpen) => <AddItemForm onClose={() => setOpen(false)} />}
      </DialogDemo>
    </div>
  );
}
