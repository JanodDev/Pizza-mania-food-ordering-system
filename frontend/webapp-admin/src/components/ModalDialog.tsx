import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function DialogDemo({ children, trigger }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Add Item</Button>}
        {/* <DropdownMenuItem>View details</DropdownMenuItem> */}
      </DialogTrigger>
      <DialogContent className="left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border bg-background p-0 shadow-lg">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-semibold">
            Add new food item
          </DialogTitle>
          <DialogDescription>
            Fill the form to add new item to the shop.
          </DialogDescription>
        </DialogHeader>
        <div className="scrollbar-thin mb-4 max-h-[60vh] overflow-y-auto px-6">
          {typeof children === 'function' ? children(setOpen) : children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
