import { IShortUrl } from "@/tanstack/types/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";
import { Copy } from "lucide-react";

interface IShortUrlItemProps {
  item: IShortUrl;
  disabledCTA?: boolean;
  onUpdateClick: (item: IShortUrl) => void;
  onDelete: (id: string) => void;
  onCopyUrl: (url: string) => void;
}
function ShortUrlItem({
  item,
  disabledCTA = false,
  onUpdateClick,
  onDelete,
  onCopyUrl
}: IShortUrlItemProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <FormattedMessage
            id="shortUrl.item.title"
            values={{ from: item.from }}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-2 flex flex-col">
        <div className="flex gap-1">
          <FormattedMessage id="shortUrl.item.from" />
          <span>{item.from}</span>
        </div>
        <div className="flex gap-1">
          <FormattedMessage id="shortUrl.item.to" />
          <span>{item.to}</span>
        </div>
        <div className="flex gap-1">
          <FormattedMessage id="shortUrl.item.visits" />
          <span>{item.visits}</span>
        </div>
        <div className="flex gap-1 items-center">
          <FormattedMessage id="shortUrl.item.result" />
          <a href={item.shortenedURL} className="truncate" target="_blank">{item.shortenedURL}</a>
          <span>
            <Copy
              className="w-4 h-4 cursor-pointer"
              onClick={() => onCopyUrl(item.shortenedURL)}
            />
          </span>
        </div>
        <div className="flex gap-2">
          <Button disabled={disabledCTA} onClick={() => onUpdateClick(item)}>
            Update
          </Button>
          <Button disabled={disabledCTA} onClick={() => onDelete(item.public_id)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShortUrlItem;
