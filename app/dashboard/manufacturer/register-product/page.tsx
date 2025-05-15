'use client'

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { RegisterProductFormData, RegisterProductSchema } from "@/lib/validation/validation"
import { protectedPost } from "@/lib/api";
import { getUserFromToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

const RegisterProduct = () => {
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string | boolean>(false)
    const [qrCode, setQrCode] = useState<string | null>(null)
    const routeTo = useRouter()
    const downloadLinkRef = useRef<HTMLAnchorElement>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterProductFormData>({
        resolver: zodResolver(RegisterProductSchema),
    });

    const submitHandle = async (data: RegisterProductFormData) => {
        const token = localStorage.getItem("token")
        if (!token) {
            routeTo.push("/login")
            return
        }

        const user = getUserFromToken(token)

        const payload = {
            name: data.productName,
            serialNumber: data.serialNumber,
            manufacturerEmail: user?.sub,
            manufacturerCompany: user?.companyName
        }

        setSubmitting(true)
        setError(false)
        setQrCode(null)

        try {
            const res = await protectedPost<any>("/products", payload)
            if (res.qrCode) {
                setQrCode(res.qrCode)
            } else {
                setError("QR Code not returned.")
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.")
            console.log("Registering a product failed: ", err.message)
        } finally {
            setSubmitting(false)
        }
    }

    const downloadQRCode = () => {
        if (!qrCode) return;

        const link = downloadLinkRef.current;
        if (link) {
            link.href = `data:image/png;base64,${qrCode}`
            link.download = "product_qr_code.png"
            link.click()
        }
    }

    return (
        <div className="flex flex-col mx-auto">
            <h1 className="font-bold text-[#0c2f2d] mb-4 text-lg">Register New Product</h1>
            <form onSubmit={handleSubmit(submitHandle)} className="flex flex-col gap-4 md:w-[30vw]">
                <div>
                    <label className="block text-sm font-medium">Product Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        {...register("productName")}
                    />
                    {errors.productName && <p className="text-sm text-red-500">{errors.productName.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Serial Number</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        {...register("serialNumber")}
                    />
                    {errors.serialNumber && <p className="text-sm text-red-500">{errors.serialNumber.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                    type="submit"
                    disabled={submitting}
                    className={`${submitting ? "opacity-40 cursor-not-allowed" : "hover:bg-[#156a64]"} bg-[#0a2826] text-white px-6 py-2 rounded transition w-full font-semibold`}
                >
                    {submitting ? (
                        <div className='flex justify-center items-center gap-2'>
                            <Loader />Generating QR Code
                        </div>
                    ) : "Generate QR Code"}
                </button>
            </form>

            {qrCode && (
                <div className="mt-6 flex flex-col items-center">
                    <h2 className="text-md font-semibold mb-2 text-[#0c2f2d]">QR Code Generated:</h2>
                    <img
                        src={`data:image/png;base64,${qrCode}`}
                        alt="QR Code"
                        className="w-48 h-48 border p-2 rounded shadow"
                    />
                    <button
                        onClick={downloadQRCode}
                        className="mt-3 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                    >
                        Download QR Code
                    </button>
                    <a ref={downloadLinkRef} style={{ display: "none" }}>Hidden Download</a>
                </div>
            )}
        </div>
    )
}

export default RegisterProduct
