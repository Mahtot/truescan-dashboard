"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getUserFromToken } from "@/lib/auth";
import { protectedGet } from "@/lib/api";

import Loader from "@/components/ui/Loader";
import Product from "@/components/ui/dashboard/Product";
import RegisterProduct from "./register-product/page";
import useAuthGuard from "@/hooks/useAuthGuard";

type Product = {
    name: string;
    serialNumber: string;
    manufacturerCompany: string;
};

const ManufacturerDashboard = () => {
    useAuthGuard("Manufacturer");

    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem("token");

            setUser(getUserFromToken(token!))

            if (!token) {
                router.push("/login");
                return;
            }

            const user = getUserFromToken(token);
            try {
                const res = await protectedGet<Product[]>(`/products?email=${user?.sub}`);
                setProducts(res);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products.");
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, [products]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    const totalProducts = products.length;
    const lastProduct = products[products.length - 1];

    return (
        <>
            {loadingProducts ? (
                <div className="flex w-max p-3  mt-10 mx-auto items-center justify-center bg-[#0c2f2d] text-white rounded-md">
                    <Loader /> Loading...
                </div>
            ) : (
                <div className="mx-auto max-w-6xl px-10 py-10 lg:py-0 flex flex-col ">
                    <h1 className="text-3xl font-bold text-center text-[#0c2f2d] mb-10">Manufacturer Dashboard</h1>

                    {/* Stats Section */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 ">
                        <div className=" p-6 py-3 flex flex-col justify-center  rounded-md shadow-sm border border-l-2 border-[#0c2f2d]">
                            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                            <p className="text-2xl font-semibold text-[#0c2f2d]">{totalProducts}</p>
                        </div>
                        <div className=" p-6 py-3 flex flex-col justify-center  rounded-md shadow-sm border border-l-2 border-[#0c2f2d]">
                            <h3 className="text-sm font-medium text-gray-500">Last Registered Product</h3>
                            <p className="text-lg font-semibold text-[#0c2f2d]">
                                {lastProduct?.name || "Non"}
                            </p>
                        </div>
                        <div className=" p-6 py-3 flex flex-col justify-center  rounded-md shadow-sm border border-l-2 border-[#0c2f2d]">
                            <h3 className="text-sm font-medium text-gray-500">Manufacturer Company</h3>
                            <p className="text-lg font-semibold text-[#0c2f2d]">
                                {user?.companyName}
                            </p>
                        </div>
                    </section>

                    {/* Product Entries Section */}
                    <section className="mb-12">
                        <h2 className="text-xl font-semibold mb-4 text-[#0c2f2d]">Your Recent Products</h2>

                        {error ? (
                            <p className="text-red-600">{error}</p>
                        ) : totalProducts === 0 ? (
                            <p className="text-gray-600">
                                No products found.{" "}
                                <Link
                                    href="/dashboard/manufacturer/register-product"
                                    className="text-[#0c2f2d] font-medium hover:underline"
                                >
                                    Register your first product?
                                </Link>
                            </p>
                        ) : (
                            <>
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {products.slice(0, 3).map((prod, idx) => (
                                        <Product key={idx} product={prod} />
                                    ))}
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href="/dashboard/manufacturer/view-products"
                                        className="text-sm text-[#0c2f2d] hover:underline font-medium"
                                    >
                                        View all products →
                                    </Link>
                                </div>
                            </>
                        )}
                    </section>

                    {/* Register New Product Section */}
                    <section >
                        <RegisterProduct />
                    </section>
                </div>
            )}
        </>
    );
};

export default ManufacturerDashboard;
