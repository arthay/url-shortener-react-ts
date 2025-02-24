import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(err: unknown): string {
  if (
    err instanceof Error
    && err.cause
    && typeof err.cause === 'object'
    && 'error' in err.cause
  ) {
    return err.cause.error as string;
  }
  return '';
}
