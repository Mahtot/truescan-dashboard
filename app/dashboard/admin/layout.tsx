

import { useEffect, useState } from "react"
import NavBar from "@/components/ui/dashboard/NavBar"

const ManufacturerDashboard = ({ children }: { children: React.ReactNode }) => {
    const items = [
        { name: "Dashboard", to: "admin" },
        { name: "View Manufacturers", to: "admin/manufacturers" },
        { name: "View products", to: "admin/products" },
    ]

    return (
        <div className="flex gap-2 overflow-y-auto w-full overflow-x-hidden">
            <NavBar items={items} />
            <div className="flex flex-col mx-auto min-h-screen  flex-1 pt-20 p-5 relative   bg-white border">
                {children}
            </div>
        </div>
    )
}

export default ManufacturerDashboard
