

import { useEffect, useState } from "react"
import NavBar from "@/components/ui/dashboard/NavBar"

const ManufacturerDashboard = ({ children }: { children: React.ReactNode }) => {
    const items = [
        { name: "Dashboard", to: "manufacturer" },
        { name: "Register Product", to: "manufacturer/register-product" },
        { name: "View products", to: "manufacturer/view-products" },
        { name: "Settings", to: "manufacturer/settings" }
    ]

    return (
        <div className="flex gap-2 overflow-y-auto w-full overflow-x-hidden">
            <NavBar items={items} />
            <div className="flex flex-col min-h-screen  flex-1 pt-20 p-5 relative   bg-white border">
                {children}
            </div>
        </div>
    )
}

export default ManufacturerDashboard
