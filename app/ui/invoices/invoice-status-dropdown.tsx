'use client';

import { useEffect, useRef, useState } from "react";
import InvoiceStatus from "@/app/ui/invoices/status";
import { Invoice } from "@/app/lib/definitions";
import { updateInvoiceStatus } from "@/app/lib/actions";

interface InvoiceStatusDropdownProps {
    invoice: Invoice
}

export default function InvoiceStatusDropdown({ invoice }: InvoiceStatusDropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const INVOICE_STATUS_OPTIONS = ['Pending', 'Paid', 'Canceled'];

    const handleOpenDropdown = () => {
        setIsOpen(true);
    }

    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    const handleStatusOptionClick = async (status: string) => {
        setIsOpen(false);

        const formData = new FormData();
        formData.append('status', status.toLowerCase());

        await updateInvoiceStatus(invoice.id, formData);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={handleOpenDropdown}>
                <InvoiceStatus status={invoice.status} date={invoice.date} />
            </button>
            {isOpen && (
                <div className="absolute bg-white z-10 shadow-lg w-[100px] overflow-hidden border rounded-md mt-1.5">
                    {INVOICE_STATUS_OPTIONS.map((statusOption) => {
                        if (statusOption.toLowerCase() !== invoice.status) {
                            return (
                                <button
                                    key={statusOption}
                                    type='button'
                                    className="w-full flex p-2 hover:bg-gray-100"
                                    onClick={() => handleStatusOptionClick(statusOption)}
                                >
                                    {statusOption}
                                </button>
                            )
                        }

                        return null;
                    })}
                </div>
            )}
        </div>
    )
}
