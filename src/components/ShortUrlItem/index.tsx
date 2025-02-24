import { IShortUrl } from "@/tanstack/types/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";

interface IShortUrlItemProps {
  item: IShortUrl;
  onUpdateClick: (item: IShortUrl) => void;
  onDelete: (id: string) => void;
}
function ShortUrlItem({
  item,
  onUpdateClick,
  onDelete
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
      <CardContent>
        <div className="flex gap-1">
          <span>From:</span>
          <span>{item.from}</span>
        </div>
        <div className="flex gap-1">
          <span>To:</span>
          <span>{item.to}</span>
        </div>
        <div className="flex gap-1">
          <span>Visits:</span>
          <span>{item.visits}</span>
        </div>
        <div className="flex gap-1">
          <span>Result:</span>
          <a href={item.shortenedURL} target="_blank">{item.shortenedURL}</a>
        </div>
        <div>
          <Button onClick={() => onUpdateClick(item)}>
            Update
          </Button>
          <Button onClick={() => onDelete(item.public_id)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShortUrlItem;
