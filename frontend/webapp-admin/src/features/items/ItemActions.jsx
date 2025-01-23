// Create a separate ItemActions component
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { memo } from 'react';
import { MoreHorizontal } from 'lucide-react';
import DialogDemo from '@/components/ui/ModalDialog';
import AddItemForm from './AddItemForm';

export const ItemActions = memo(({ item }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(item._id)}
        >
          Copy item ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DialogDemo
          trigger={
            <button
              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              Edit details
            </button>
          }
        >
          {(setOpen) => (
            <AddItemForm
              initialData={item}
              isEditing={true}
              onClose={() => setOpen(false)}
            />
          )}
        </DialogDemo>

        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Delete item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
