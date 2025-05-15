"use client";

import { deleteRequest, put } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../Modal";

type ProductProps = {
    product: {
        name: string;
        serialNumber: string;
        manufacturerCompany: string;
    };
};

const Product = ({ product }: ProductProps) => {
    const { name, serialNumber, manufacturerCompany } = product;

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [updatedName, setUpdatedName] = useState(name);

    const [deleteRes, setDeleteRes] = useState<string>("");
    const [deleteError, setDeleteError] = useState<string>("");

    const [updateRes, setUpdateRes] = useState<string>("");
    const [updateError, setUpdateError] = useState<string>("");

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const router = useRouter();

    const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            const res = await deleteRequest<string>(`/products/${serialNumber}`);
            setDeleteRes(res);
            alert("Product deleted successfully!")
        } catch (err: any) {
            setDeleteError(err.message || "Error while deleting the product.");
        } finally {
            setLoadingDelete(false);
            setDeleteModalOpen(false);
        }
    };

    const handleUpdate = async () => {
        setLoadingUpdate(true);
        try {
            await put(`/products/${serialNumber}`, { name: updatedName });
            alert("Product updated successfully!")

        } catch (err: any) {
            setUpdateError(err.message || "Update failed.");
        } finally {
            setLoadingUpdate(false);
            setUpdateModalOpen(false);
        }
    };

    return (
        <div className="rounded-md shadow-md lg:w-[17vw] w-full bg-white border border-gray-400 mx-auto  flex flex-col pb-5 justify-center ml-2">
            <h1 className="font-semibold p-3 px-5 rounded-md text-lg text-white  bg-[#0c2f2d]">Product {name}</h1>
            <p className="text-[#0c2f2d] p-3 py-1 font-mono">Serial: {serialNumber}</p>
            <p className="text-sm p-3 py-1 text-gray-600">Company: {manufacturerCompany}</p>

            <div className="flex p-3 py-1 flex-col md:flex-row gap-2 mt-4 text-sm">
                <button
                    className="border  text-black px-3 py-1 rounded disabled:opacity-60 hover:scale-105 transition-all duration-300"
                    onClick={() => setUpdateModalOpen(true)}
                    disabled={loadingDelete}
                >
                    Update
                </button>

                <button
                    className={`${loadingUpdate ? "cursor-not-allowed opacity-60" : ""} border text-red-600 px-3 py-1 rounded disabled:opacity-60 hover:scale-105 transition-all duration-300`}
                    onClick={() => setDeleteModalOpen(true)}
                    disabled={loadingUpdate}
                >
                    {loadingDelete ? "Deleting..." : "Delete"}
                </button>
            </div>

            {updateRes && <p className="text-green-600 mt-2">{updateRes}</p>}
            {updateError && <p className="text-red-600 mt-2">{updateError}</p>}

            {
                deleteModalOpen && (
                    <Modal
                        handleCancel={() => setDeleteModalOpen(false)}
                        handleClick={handleDelete}
                    >
                        <div>Are you sure you want to delete this product?</div>
                    </Modal>
                )
            }

            {
                updateModalOpen && (
                    <Modal handleCancel={() => setUpdateModalOpen(false)}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate();
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Product Name</label>
                                <input
                                    type="text"
                                    className="border px-3 py-2 rounded"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    required
                                />
                                <label className="text-sm font-semibold">Serial Number</label>
                                <input
                                    type="text"
                                    value={serialNumber}
                                    className="border px-3 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                                    disabled
                                />
                                <button
                                    type="submit"
                                    className="bg-[#0a2826] text-white px-4 py-2 mt-3 rounded disabled:opacity-60"
                                    disabled={loadingUpdate}
                                >
                                    {loadingUpdate ? "Updating..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </Modal>
                )
            }
        </div >
    );
};

export default Product;
