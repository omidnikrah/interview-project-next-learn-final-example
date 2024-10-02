'use client';

import { AuditLog } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import { restoreLog } from "@/app/lib/actions";

interface AuditLogsProps {
    data: AuditLog[]
}

export default function AuditLogs({ data }: AuditLogsProps) {
    const handleRestoreStatus = async (auditLog: AuditLog) => {
        await restoreLog(auditLog);
    }

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {data?.map((auditLog) => (
                            <div
                                key={auditLog.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <span className="text-sm text-gray-500">{auditLog.user_name}</span>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <span className='flex'>
                                            Previous Status: {auditLog.prev_status}
                                        </span>
                                        <span className='flex'>Current Status: {auditLog.new_status}</span>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" onClick={() => handleRestoreStatus(auditLog)}>Restore</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Changer user
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Previous Status
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Current Status
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data?.map((auditLog) => (
                                <tr
                                    key={auditLog.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {auditLog.user_name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {auditLog.prev_status}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {auditLog.new_status}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <Button type="button" onClick={() => handleRestoreStatus(auditLog)}>Restore</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
