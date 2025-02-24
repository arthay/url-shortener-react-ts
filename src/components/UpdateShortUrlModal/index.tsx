import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface IUpdateShortUrlModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  children: ReactNode;
}

function UpdateShortUrlModal({
  isOpen,
  onOpenChange,
  children
}: IUpdateShortUrlModalProps) {
  return (

    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update short url</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default UpdateShortUrlModal;
