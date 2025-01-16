"use client";

import { createContextFactory } from "@/lib/context";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { IconButton } from "../ui/icon-button";

type PaginationContextValue = {
  page: number;
  onChange: (page: number) => void;
};

const [PaginationContext, usePaginationContext] =
  createContextFactory<PaginationContextValue>("Pagination");

interface PaginationProps extends Omit<ComponentPropsWithoutRef<"nav">, "onChange"> {
  page: number;
  onChange: (page: number) => void;
  total: number;
}

export const Pagination = ({ className, page, onChange, total, ...props }: PaginationProps) => {
  const currentPage = page;

  const renderPages = () => {
    if (total <= 10) {
      return Array(total)
        .fill(0)
        .map((_, index) => <PaginationItem key={index} page={index + 1} />);
    }

    if (page <= 5) {
      return (
        <>
          <PaginationItem page={1} />
          <PaginationItem page={2} />
          <PaginationItem page={3} />
          <PaginationItem page={4} />
          <PaginationItem page={5} />
          <PaginationItem page={6} />
          <PaginationEllipsis />
          <PaginationItem page={total - 1} />
          <PaginationItem page={total} />
        </>
      );
    }

    if (page >= 6 && page <= total - 5) {
      return (
        <>
          <PaginationItem page={1} />
          <PaginationItem page={2} />
          <PaginationEllipsis />
          <PaginationItem page={currentPage - 1} />
          <PaginationItem page={currentPage} />
          <PaginationItem page={currentPage + 1} />
          <PaginationEllipsis />

          <PaginationItem page={total - 1} />
          <PaginationItem page={total} />
        </>
      );
    }

    return (
      <>
        <PaginationItem page={1} />
        <PaginationItem page={2} />
        <PaginationEllipsis />
        <PaginationItem page={total - 5} />
        <PaginationItem page={total - 4} />
        <PaginationItem page={total - 3} />
        <PaginationItem page={total - 2} />
        <PaginationItem page={total - 1} />
        <PaginationItem page={total} />
      </>
    );
  };

  const value = {
    page,
    onChange,
  };

  if (total === 0) return null;

  return (
    <PaginationContext.Provider value={value}>
      <nav className={cn("flex items-center gap-1", className)} {...props}>
        <IconButton
          size="xsmall"
          variant="ghost"
          aria-label="처음 페이지로 이동"
          onClick={() => onChange(1)}
          disabled={page === 1}
        >
          <ChevronsLeftIcon size={16} />
        </IconButton>
        <IconButton
          size="xsmall"
          variant="ghost"
          aria-label="이전 페이지로 이동"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeftIcon size={16} />
        </IconButton>
        {renderPages()}
        <IconButton
          size="xsmall"
          variant="ghost"
          aria-label="다음 페이지로 이동"
          onClick={() => onChange(page + 1)}
          disabled={page === total}
        >
          <ChevronRightIcon size={16} />
        </IconButton>
        <IconButton
          size="xsmall"
          variant="ghost"
          aria-label="마지막 페이지로 이동"
          onClick={() => onChange(total)}
          disabled={page === total}
        >
          <ChevronsRightIcon size={16} />
        </IconButton>
      </nav>
    </PaginationContext.Provider>
  );
};

interface PaginationItem extends ComponentPropsWithoutRef<"button"> {
  page: number;
}

const PaginationItem = ({ page, ...props }: PaginationItem) => {
  const { page: currentPage, onChange } = usePaginationContext();

  const isActive = page === currentPage;

  const onClick = () => {
    onChange(page);
  };

  return (
    <IconButton
      size="xsmall"
      variant={isActive ? "primary" : "outlined"}
      aria-label="페이지 이동"
      onClick={onClick}
      title={isActive ? "선택됨" : ""}
      {...props}
    >
      {page}
    </IconButton>
  );
};

const PaginationEllipsis = () => {
  return <p className="flex size-7 justify-center">...</p>;
};
