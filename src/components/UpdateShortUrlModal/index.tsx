import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

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
          <DialogTitle>
            <FormattedMessage id="shortUrl.update.title" />
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default UpdateShortUrlModal;
