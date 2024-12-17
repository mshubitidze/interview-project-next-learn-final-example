import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {
  fetchInvoiceById,
  fetchCustomers,
  fetchInvoiceStatusLogs,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { formatDateToLocal } from "@/app/lib/utils";
import InvoiceStatus from "@/app/ui/invoices/status";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { SubmitButton } from "@/app/ui/invoices/submit-button";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers, logs] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
    fetchInvoiceStatusLogs(id),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
      <div className="flex flex-col gap-2 border rounded-md p-10 mt-6">
        {logs.length > 0
          ? logs.map((log, idx) => (
              <div
                key={log.id}
                className="bg-blue-100 px-4 py-2 rounded flex items-center justify-between gap-4"
              >
                <p>
                  {formatDateToLocal(log.date)} -{" "}
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {log.email}
                  </span>{" "}
                  changed the status to{" "}
                  <InvoiceStatus status={log.new_status} />
                </p>
                {idx === 0 ? (
                  <SubmitButton
                    id={id}
                    status={log.new_status}
                    className="size-fit hover:bg-gray-100 p-2 rounded-md bg-white text-gray-600"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </SubmitButton>
                ) : null}
              </div>
            ))
          : "No Logs Found"}
      </div>
    </main>
  );
}
