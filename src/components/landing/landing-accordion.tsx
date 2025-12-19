"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" {...props} />;
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex h-17 flex-1 items-center justify-between gap-4 rounded-3xl bg-slate-100/80 px-6 py-4 text-left text-xl font-bold transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>div]:-rotate-90",
          className,
        )}
        {...props}
      >
        {children}
        <div className="size-6">
          <img src={"/landing/faq-section/alt-arrow.svg"} alt="alt arrow"/>
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("p-6 text-base", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion as LandingAccordion,
  AccordionItem as LandingAccordionItem,
  AccordionTrigger as LandingAccordionTrigger,
  AccordionContent as LandingAccordionContent,
};
