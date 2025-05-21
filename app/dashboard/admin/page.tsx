'use client';

import { useEffect, useState } from 'react';
import { protectedGet, deleteRequest } from "@/lib/api"
import { Download, Trash, Plus, ShieldAlert, Package, Factory, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/navigation';
import useAuthGuard from '@/hooks/useAuthGuard';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

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
    useAuthGuard("ADMIN");

    const [products, setProducts] = useState<Product[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [loading, setLoading] = useState(true);
    const routeTo = useRouter();
    const [deleteManufacturer, setDeleteManufacturer] = useState<boolean>(false)
    const [deleteProduct, setDeleteProduct] = useState<boolean>(false)

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsData, manufacturersData] = await Promise.all([
                protectedGet('/admin/products') as Promise<Product[]>,
                protectedGet('/admin/manufacturers') as Promise<Manufacturer[]>,
            ]);
            console.log(productsData)
            setProducts(productsData.filter(data => data.authentic && data.manufacturerCompany));
            setManufacturers(manufacturersData.filter(data => data.enabled));
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            routeTo.push('/login');
        } else {
            fetchData();
        }
    }, []);

    const handleDeleteProduct = async (serial: string) => {
        if (!confirm("Are you sure you want to delete this product? This action can not be undone.")) return;

        setDeleteProduct(true);
        console.log(serial)
        try {
            const res = await deleteRequest(`/admin/product/${serial}`);
            console.log('Delete response:', res);  // Check if it returns success

            console.log(res)
            toast.success('Product deleted successfully');
            fetchData();
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete product');
        } finally {
            setDeleteProduct(false)
        }
    };

    const handleDeleteManufacturer = async (email: string) => {
        if (!confirm("Are you sure you want to delete Manufacturer with an email: " + email + " This action can not be undone.")) return;

        setDeleteManufacturer(true)
        try {
            await deleteRequest(`/admin/manufacturer/${email}`);
            toast.success('Manufacturer deleted successfully');
            fetchData();
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete manufacturer');
        } finally {
            setDeleteManufacturer(false)
        }
    };

    const downloadData = (data: any, filename: string) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        toast.success(`Downloaded ${filename}`);
    };

    return (
        <div className="p-4 md:p-8 pt-4 w-[90vw]  lg:ml-[20vw] mx-auto lg:w-[70vw] space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6" /> Admin Dashboard
                </h1>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Loader />
                    <p className="text-muted-foreground">Loading dashboard data...</p>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{products.length}</div>
                                <p className="text-xs text-muted-foreground">
                                    {products.length > 0 ? `${products.length} authentic products` : 'No products yet'}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Manufacturers</CardTitle>
                                <Factory className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{manufacturers.length}</div>
                                <p className="text-xs text-muted-foreground">
                                    {manufacturers.length > 0 ? 'Authentic Manufacturers' : 'No manufacturers '}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2 lg:col-span-1">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-2 flex-col">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadData(products, 'products.json')}
                                    className="flex-1 flex items-center justify-center"
                                >
                                    <Download className="mr-2 h-4 w-4" /> Export Products
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadData(manufacturers, 'manufacturers.json')}
                                    className="flex-1"
                                >
                                    <Download className="mr-2 h-4 w-4" /> Export Manufacturers
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Products Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Package className="w-5 h-5" /> Products
                            </h2>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => fetchData()}>
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Serial Number</TableHead>
                                        <TableHead>Product Name</TableHead>
                                        <TableHead>Manufacturer</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <TableRow key={product.serialNumber}>
                                                <TableCell className="font-medium">{product.serialNumber}</TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.manufacturerCompany}</TableCell>
                                                <TableCell>
                                                    <Badge variant={product.authentic ? 'default' : 'destructive'}>
                                                        {product.authentic ? 'Authentic' : 'Fake'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteProduct(product.serialNumber)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash className="h-4 w-4" />

                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center">
                                                No products found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </section>

                    {/* Manufacturers Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Factory className="w-5 h-5" />  Manufacturers
                            </h2>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => fetchData()}>
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Company Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {manufacturers.length > 0 ? (
                                        manufacturers.map((user) => (
                                            <TableRow key={user.email}>
                                                <TableCell className="font-medium">{user.companyName}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Badge variant={user.enabled ? 'default' : 'secondary'}>
                                                        {user.enabled ? 'Approved' : 'Pending'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteManufacturer(user.email)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash className="h-4 w-4" />

                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No manufacturers
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </section>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;