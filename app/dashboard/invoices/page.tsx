import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { tabs } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    tab?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const currentTab = searchParams?.tab || "all";

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <div className="flex items-center gap-4 mt-8">
        {tabs.map((tab) => (
          <Link
            className={clsx("px-4 py-2 rounded-md", {
              "bg-gray-800 text-white": tab === currentTab,
            })}
            href={{
              query: {
                tab,
              },
            }}
          >
            {tab[0].toUpperCase() + tab.slice(1)}
          </Link>
        ))}
      </div>
      <Suspense
        key={query + currentPage + currentTab}
        fallback={<InvoicesTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} tab={currentTab} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
