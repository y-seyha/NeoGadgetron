import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({ open, productName, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Confirm Deletion</DialogTitle></DialogHeader>
        <p className="text-gray-500 mt-2">
          Are you sure you want to delete <strong>{productName}</strong>? This action cannot be undone.
        </p>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}