'use client';

import { useEffect, useState } from 'react';
import { protectedGet, deleteRequest } from "@/lib/api"
import { Download, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Loader from '@/components/ui/Loader';

interface Product {
    serialNumber: string;
    name: string;
    manufacturerEmail: string;
    manufacturerCompany: string;
    authentic: boolean;

}

interface Manufacturer {
    companyName: string;
    email: string;
    enabled: boolean;
}

const AdminDashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsData, manufacturersData] = await Promise.all([
                protectedGet('/admin/products') as Promise<Product[]>,
                protectedGet('/admin/manufacturers') as Promise<Manufacturer[]>,

            ]);
            console.log(productsData, manufacturersData)
            setProducts(productsData.filter(data => data.authentic));
            setManufacturers(manufacturersData.filter(data => !data.enabled));
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteProduct = async (serial: string) => {
        try {
            await deleteRequest(`/admin/product/${serial}`);
            fetchData();
        } catch (error) {
            alert('Failed to delete product');
        }
    };

    const handleDeleteManufacturer = async (email: string) => {
        try {
            await deleteRequest(`/admin/manufacturer/${email}`);
            fetchData();
        } catch (error) {
            alert('Failed to delete manufacturer');
        }
    };

    const downloadData = (data: any, filename: string) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    return (
        <div className="p-6 space-y-6 mx-auto">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            {loading ? (
                <div className="flex w-max p-3  mt-10 mx-auto items-center justify-center bg-[#0c2f2d] text-white rounded-md">
                    <Loader /> Loading...
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold">Total Products</h2>
                                <p className="text-4xl mt-2">{products.length}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold">Total Manufacturers</h2>
                                <p className="text-4xl mt-2">{manufacturers.length}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <h2 className="text-xl font-semibold">Products</h2>
                        <Button onClick={() => downloadData(products, 'products.json')}><Download className="mr-2" size={18} />Download</Button>
                    </div>
                    <div className="overflow-auto border rounded-lg">
                        <table className="min-w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Serial</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Manufacturer</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.serialNumber} className="border-t">
                                        <td className="p-2">{product.serialNumber}</td>
                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">{product.manufacturerCompany}</td>
                                        <td className="p-2">
                                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.serialNumber)}>
                                                <Trash size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <h2 className="text-xl font-semibold">Manufacturers</h2>
                        <Button onClick={() => downloadData(manufacturers, 'manufacturers.json')}><Download className="mr-2" size={18} />Download</Button>
                    </div>
                    <div className="overflow-auto border rounded-lg">
                        <table className="min-w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Company Name</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manufacturers.map((user) => (
                                    <tr key={user.email} className="border-t">
                                        <td className="p-2">{user.companyName}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">
                                            <Button variant="destructive" size="sm" onClick={() => handleDeleteManufacturer(user.email)}>
                                                <Trash size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
