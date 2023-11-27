"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/views/page-header";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SelectFile } from "./_views/select-file";
import { SelectPrinter } from "./_views/select-printer";
import { SelectProperties } from "./_views/select-properties";

export default function PrintPage() {
  const router = useRouter();
  const readOnlySearchParams = useSearchParams();

  const printer_id = readOnlySearchParams.get("printer_id");
  const file_id = readOnlySearchParams.get("file_id");

  const [step, setStep] = useState(() => {
    if (!printer_id) return "select-printer";
    if (!file_id) return "select-file";
    return "select-properties";
  });

  const onSelectedPrinter = (printer_id: number) => {
    const searchParams = new URLSearchParams(readOnlySearchParams.toString());
    searchParams.set("printer_id", String(printer_id));

    router.push(`/print?${searchParams.toString()}`);

    setStep("select-file");
  };

  const onSelectedFile = (file_id: number, confirmed = false) => {
    const searchParams = new URLSearchParams(readOnlySearchParams.toString());
    searchParams.set("file_id", String(file_id));

    router.push(`/print?${searchParams.toString()}`);

    if (confirmed) {
      setStep("select-properties");
    }
  };
  const onCanceledSelectedFile = () => {
    const searchParams = new URLSearchParams(readOnlySearchParams.toString());
    searchParams.delete("file_id");

    router.push(`/print?${searchParams.toString()}`);
  };

  const onBack = () => {
    const searchParams = new URLSearchParams(readOnlySearchParams.toString());
    if (step === "select-file") {
      setStep("select-printer");
    } else if (step === "select-properties") {
      setStep("select-file");
    }

    router.push(`/print?${searchParams.toString()}`);
  };

  const onNext = () => {
    if (step === "select-printer") {
      setStep("select-file");
    } else if (step === "select-file") {
      setStep("select-properties");
    }
  };

  const canGoNext = (() => {
    if (step === "select-printer") return Boolean(printer_id);
    if (step === "select-file") return Boolean(file_id);
    return false;
  })();

  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="container h-96 max-h-full flex flex-col items-center justify-center gap-8">
        <Check className="w-24 h-24 text-primary" />
        <p className="text-2xl font-bold text-secondary-foreground">
          Print job submitted successfully
        </p>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              setIsSuccess(false);
              router.replace("/print");
            }}
            variant="secondary"
          >
            Print another
          </Button>
          <Button onClick={() => router.push("/history")}>View jobs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <PageHeader title="New Print Job" />
      <div className="flex justify-between mb-2">
        <Button
          onClick={onBack}
          variant="outline"
          disabled={step === "select-printer"}
        >
          <ChevronLeft />
          Back
        </Button>
        <Button onClick={onNext} variant="outline" disabled={!canGoNext}>
          Next
          <ChevronRight />
        </Button>
      </div>
      {step === "select-printer" && (
        <SelectPrinter
          onSelected={onSelectedPrinter}
          selectedPrinterId={printer_id ? Number(printer_id) : undefined}
        />
      )}
      {step === "select-file" && (
        <SelectFile
          onSelected={onSelectedFile}
          onCanceled={onCanceledSelectedFile}
          onConfirm={(fileId) => onSelectedFile(fileId, true)}
          fileId={file_id ? Number(file_id) : undefined}
        />
      )}
      {Boolean(step === "select-properties" && printer_id && file_id) && (
        <SelectProperties
          printer_id={Number(printer_id)}
          file_id={Number(file_id)}
          setStep={setStep}
          setIsSuccess={setIsSuccess}
        />
      )}
    </div>
  );
}
