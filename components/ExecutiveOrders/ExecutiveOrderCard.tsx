import { Card, LinkButton } from "components/shared";
import { format } from "date-fns/format";
import { TbFileTypePdf } from "@preact-icons/tb";
import type { ExecutiveOrder } from "types";
import { dateFormatString } from "../../constants.tsx";

const ExecutiveOrderCard = ({
  document_number,
  agencies,
  title,
  publication_date,
  pdf_url,
}: ExecutiveOrder) => {
  const actionChildren = [];
  if (pdf_url) {
    actionChildren.push(
      <LinkButton
        label="Download PDF"
        className="mt-7"
        href={pdf_url.toString()}
        target="_blank"
        key={`${document_number}-pdfLink`}
      >
        <TbFileTypePdf class="w-8 h-8" />
      </LinkButton>,
    );
  }

  return (
    <Card
      key={`${document_number}-card`}
      headerText={`${agencies[0].name} | ${document_number}`}
      actionChildren={actionChildren}
    >
      <blockquote class="dark:prose-invert line-clamp-6 text-pretty">
        {title}
      </blockquote>
      <p class="text-gray-800 dark:text-gray-400 clear-left text-pretty">
        Publication Date:{" "}
        <span class="text-nowrap">
          {format(publication_date, dateFormatString)}
        </span>
      </p>
    </Card>
  );
};

export { ExecutiveOrderCard };
