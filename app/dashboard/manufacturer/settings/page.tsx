'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, SettingsData } from "@/lib/validation/validation";
import { useEffect, useState } from "react";
import { protectedGet, put, deleteRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import ViewProduct from "../view-products/page";
import { userAgent } from "next/server";



const Settings = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<SettingsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SettingsData>({
        resolver: zodResolver(settingsSchema),
    });
    const [editting, setEditting] = useState<boolean>(false)


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await protectedGet<SettingsData>("/manufacturer/profile");
                setProfile(res);
            } catch (err: any) {
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, [profile]);



    const handleUpdate = async (data: SettingsData) => {
        setMessage("");
        setError("");
        setEditting(true)

        const payload = {
            email: data.email,
            passowrd: data.password,
            companyName: data.companyName
        }
        try {
            const res = await put<any>("/manufacturer/profile", payload);
            setProfile(res);
            setEditMode(false);
            setMessage("Profile updated successfully.");
        } catch (err: any) {
            setError("Failed to update profile.");
        } finally {
            setEditting(false)
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

        try {
            await deleteRequest("/manufacturer/profile");
            localStorage.removeItem("token");
            router.push("/signup");
        } catch (err: any) {
            setError("Failed to delete account.");
        }
    };

    if (loading) {
        return (
            <div className="flex w-max p-3  mt-10 lg:mt-1 mx-auto items-center justify-center bg-[#0c2f2d] text-white rounded-md">
                <Loader /> Loading...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl px-4 mt-10 lg:mt-1">
            <div className="flex flex-col border border-t-2 border-[#0c2f2d] rounded-sm shadow-md p-5  ">
                <h1 className="text-2xl font-bold mb-6 text-[#0c2f2d]">Settings</h1>

                {error && <p className="text-red-600 mb-4">{error}</p>}
                {message && <p className="text-green-600 mb-4">{message}</p>}

                {!editMode ? (
                    <div className="bg-white p-5 rounded shadow">
                        <p><strong>Company :</strong> {profile?.companyName}</p>
                        <p><strong>Email:</strong> {profile?.email}</p>

                        <div className="mt-4 flex gap-4">
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-[#0c2f2d] text-white px-4 py-2 rounded hover:scale-105 transition-all"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:scale-105 transition-all"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-4  md:w-[30vw]">
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                defaultValue={profile?.email}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"


                                className="w-full border border-gray-300 rounded px-3 py-2"
                                {...register("password")}
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Company Name</label>
                            <input
                                type="text"
                                defaultValue={profile?.companyName}

                                className="w-full border border-gray-300 rounded px-3 py-2"
                                {...register("companyName")}
                            />
                            {errors.companyName && (
                                <p className="text-sm text-red-500">{errors.companyName.message}</p>
                            )}
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <button
                            type="submit"
                            disabled={editting}
                            className={`${editting ? "opacity-40 cursor-not-allowed " : "opacity-100 hover:bg-[#156a64]"} bg-[#0a2826] text-white px-6 py-2 rounded  transition w-full font-semibold`}
                        >
                            {editting ? <div className='flex justify-center items-center gap-2'><Loader /> Saving</div> : "Save Changes"}
                        </button>
                    </form>
                )}
            </div>
            <div className="flex gap-10">
                <ViewProduct />
            </div>

        </div>
    );
};

export default Settings;
