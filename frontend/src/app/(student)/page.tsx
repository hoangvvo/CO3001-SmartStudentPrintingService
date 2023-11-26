"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/views/stat-card";
import { FileText, Hash, Wallet } from "lucide-react";
import { PrintHistoryOverview } from "./_components/print-history-overview";
import { PrintRequestList } from "./_components/print-request-list";

export default function Page() {
  return (
    <div className="container space-y-4">
      <div className="flex py-4 justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Home</h2>
          <p className="text-muted-foreground">
            Welcome to Smart Student Printing Service
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Balance"
          Icon={Wallet}
          footer="Number of pages you can print left"
        >
          100
        </StatCard>
        <StatCard
          title="Total Print Request"
          Icon={Hash}
          footer="Number of times you have printed"
        >
          20
        </StatCard>
        <StatCard
          title="Total Pages Printed"
          Icon={FileText}
          footer="Number of pages you have printed"
        >
          100
        </StatCard>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PrintHistoryOverview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Print Requests</CardTitle>
            <CardDescription>
              Your ongoing and past print requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PrintRequestList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
