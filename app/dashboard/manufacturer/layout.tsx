

import { useEffect, useState } from "react"
import NavBar from "@/components/ui/dashboard/NavBar"

const ManufacturerDashboard = ({ children }: { children: React.ReactNode }) => {


    return (
        <div className="flex gap-2 min-h-screen w-full overflow-x-hidden">
            <NavBar />
            <div className="flex flex-col flex-1 left-[6vw] p-5 relative border bg-white">
                {children}
            </div>
        </div>
    )
}

export default ManufacturerDashboard
