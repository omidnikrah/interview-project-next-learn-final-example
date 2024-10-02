'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {StatusFilters} from "@/app/lib/definitions";

interface Tab {
    id: string,
    title: string,
}

interface InvoicesFilterTabProps {
    tabs: Tab[],
    activeTab: StatusFilters
}

export default function InvoicesFilterTab({ tabs, activeTab }: InvoicesFilterTabProps) {
    const router = useRouter();


    const handleTabClick = (tab: Tab) => {
        router.push(`?status=${tab.id}`);
        document.cookie = `activeStatusFilter=${tab.id}; path=/;`
    }

    return (
        <div className="flex border-b border-gray-200 mt-3">
            {tabs.map((tab, index) => (
                <button
                    key={tab.id}
                    type='button'
                    onClick={() => handleTabClick(tab)}
                    className={clsx('p-2 px-3', {
                        'text-blue-400 border-b border-blue-400': activeTab === tab.id,
                    })}
                >
                  {tab.title}
                </button>
            ))}
        </div>
    )
}
