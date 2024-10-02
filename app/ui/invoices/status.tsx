import { CheckIcon, ClockIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {isOver14PastDays} from "@/app/lib/utils";

export default function InvoiceStatus({ status, date }: { status: string, date: string }) {
  const isOverdueStatus = status === 'pending' && isOver14PastDays(date);

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
          'bg-red-500 text-white': status === 'canceled',
          'bg-blue-400 text-white': isOverdueStatus,
        },
      )}
    >
      {status === 'pending' && !isOver14PastDays(date) ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {isOverdueStatus ? (
        <>
            Overdue
            <ClockIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'canceled' ? (
        <>
            Canceled
            <ArchiveBoxXMarkIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
