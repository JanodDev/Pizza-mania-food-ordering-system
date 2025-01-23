import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DialogDemo from '@/components/ModalDialog';
import AddItemForm from '@/features/items/AddItemForm';

const ItemActionsMenu = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(item._id);
            setIsOpen(false);
          }}
        >
          Copy item ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DialogDemo
          trigger={
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              Edit details
            </DropdownMenuItem>
          }
        >
          {(setDialogOpen) => (
            <AddItemForm
              initialData={item}
              isEditing={true}
              onClose={() => setDialogOpen(false)}
            />
          )}
        </DialogDemo>

        <DropdownMenuItem onClick={() => setIsOpen(false)}>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsOpen(false)}>
          Delete item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ItemActionsMenu;
