'use client';

import { getUserFromToken } from "@/lib/auth";
import { protectedGet } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Product from "@/components/ui/dashboard/Product";
import Link from "next/link";

type Product = {
    name: string;
    serialNumber: string;
    manufacturerCompany: string;
};

const ViewProduct = () => {
    const routeTo = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchSerial, setSearchSerial] = useState("");
    const [searchResult, setSearchResult] = useState<Product | null>(null);
    const [allProductsSearching, setSearchingForAllProducts] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Load all products by email on mount
    useEffect(() => {

        const fetchProducts = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                routeTo.push("/login");
                return;
            }

            const user = getUserFromToken(token);
            try {
                const res = await protectedGet<Product[]>(`/products?email=${user?.sub}`);
                setProducts(res);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products.");
            } finally {
                setSearchingForAllProducts(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle search by serial number
    const submitHandle = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSearchResult(null);

        try {
            const res = await protectedGet<Product>(`/products/${searchSerial}`);
            setSearchResult(res);
        } catch (err: any) {
            setError(err.message || "Product not found.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col mx-auto max-w-2xl px-4 mt-10">
            <h1 className="font-bold text-[#0c2f2d] mb-4 text-xl text-center">Product Entries</h1>

            <form className="flex gap-2 mb-4" onSubmit={submitHandle}>
                <input
                    type="number"
                    required
                    min={1}
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                    placeholder="Enter Serial Number"
                    value={searchSerial}
                    onChange={(e) => setSearchSerial(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={!searchSerial.trim() || loading}
                    className={`bg-[#0a2826] text-white px-6 py-2 rounded transition font-semibold ${(!searchSerial.trim() || loading) && "opacity-50 cursor-not-allowed"
                        }`}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            {searchResult && (
                <div className="border p-4 mb-4 rounded shadow bg-white">
                    <h2 className="font-bold text-lg mb-2">Search Result</h2>
                    <Product product={searchResult} />

                </div>
            )}

            <h2 className="font-semibold text-lg mb-2">All Products</h2>

            {allProductsSearching ? (
                <div className="bg-[#0c2f2d] p-5 text-white flex gap-2 items-center justify-center"> <Loader /> Loading...</div>
            ) : products.length === 0 ? (
                <p className="text-gray-500">No products found for Your account.
                    <Link href="/dashboard/manufacturer/register-product"
                        className="text-[#0c2f2d] hover:underline"
                    > Register your product?</Link></p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {products.map((prod, idx) => (
                        <Product product={prod} key={idx} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewProduct;
