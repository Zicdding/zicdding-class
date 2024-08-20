"use client"

import { Tabs } from "@zicdding-web/ui/Tabs";


export default function OrderByTabs() {
    return (
        <Tabs
            items={[
                { title: '인기순', value: 'popular' },
                { title: '최신순', value: 'recent' },
            ]}
            onChange={() => { }}
        />
    )
}