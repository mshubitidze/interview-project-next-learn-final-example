import {
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SubmitButton } from "./submit-button";
import { auth } from "@/auth";

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-red-500 text-white": status === "overdue",
          "bg-orange-500 text-white": status === "cancelled",
          "bg-green-500 text-white": status === "paid",
        },
      )}
    >
      {status === "pending" ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "overdue" ? (
        <>
          Overdue
          <ExclamationCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "cancelled" ? (
        <>
          Cancelled
          <XCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "paid" ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}

const statuses = ["pending", "overdue", "paid", "cancelled"];

export function InvoiceStatusDropdown({
  id,
  currentStatus,
  date,
}: {
  id: string;
  currentStatus: string;
  date: string;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <InvoiceStatus
          status={
            currentStatus === "pending" && isOverdue(date)
              ? "overdue"
              : currentStatus
          }
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white p-1 flex flex-col gap-2 border rounded-md">
          {statuses
            .filter(
              (status) =>
                status !==
                (currentStatus === "pending" && isOverdue(date)
                  ? "overdue"
                  : currentStatus),
            )
            .map((status) => {
              return (
                <DropdownMenu.Item key={status}>
                  <SubmitButton id={id} status={status}>
                    <InvoiceStatus status={status} />
                  </SubmitButton>
                </DropdownMenu.Item>
              );
            })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function isOverdue(date: string) {
  const currentDate = new Date();
  const invoiceDate = new Date(date);

  const fourteenDays = 14 * 24 * 60 * 60 * 1000;

  return currentDate.getTime() - invoiceDate.getTime() > fourteenDays;
}
