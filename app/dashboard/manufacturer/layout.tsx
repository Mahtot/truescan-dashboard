

import { useEffect, useState } from "react"
import NavBar from "@/components/ui/dashboard/NavBar"

const ManufacturerDashboard = ({ children }: { children: React.ReactNode }) => {


    return (
        <div className="flex gap-2 overflow-y-auto w-full overflow-x-hidden">
            <NavBar />
            <div className="flex flex-col min-h-screen  flex-1 pt-20 p-5 relative   bg-white border">
                {children}
            </div>
        </div>
    )
}

export default ManufacturerDashboard
