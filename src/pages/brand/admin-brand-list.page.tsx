import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";

import TableActionButtons from "../../components/common/table/action-buttons.component";
import { LoadingComponent } from "../../components/common";
import PaginationComponent from "../../components/common/table/pagiantion.component";
const PER_PAGE_LIMIT = 15;

const AdminBrand = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        totalPages: 1,
        currentPage: 1
    });

    const getBrandList = async ({ page = 1, limit = PER_PAGE_LIMIT }) => {
        try {
            setLoading(true);
            const response:any = await axiosInstance.get('/brand', {
                params: {
                    page: page,
                    limit: limit
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            });
            console.log("Brand Response:", response);

            const totalPages = Math.ceil(response.meta.total / response.meta.limit);
            setPagination({
                totalPages: totalPages,
                currentPage: response.meta.page
            });
            setData(response.result);
        } catch (exception) {
            toast.error("Unable to fetch the brand lists ....");
            console.error(exception);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBrandList({ page: 1, limit: PER_PAGE_LIMIT });
    }, []);

    const deleteBrand = async (id: string) => {
        try {
            setLoading(true);
            await axiosInstance.delete('/brand/' + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            });
            toast.success("Brand Deleted Successfully");
            getBrandList({ page: 1, limit: PER_PAGE_LIMIT });
        } catch (exception) {
            toast.error("Brand cannot be deleted at this moment");
            console.error(exception);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
                    <div className="col-span-full lg:col-span-1">
                        <h1 className="text-4xl font-bold text-center lg:text-left">
                            Brand List
                        </h1>
                    </div>
                    <div></div>
                    <div className="col-span-full lg:col-span-1 flex justify-center lg:justify-end">
                        <NavLink className="bg-green-800 mt-3 text-center py-2 px-2 text-white rounded w-[200px]" to="/admin/brand/create">
                            Create Brand
                        </NavLink>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 mt-8">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right bg-black">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Title</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Status</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Image</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Home Section</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5}>
                                            <LoadingComponent />
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((brand:any, index:number) => (
                                        <tr className="odd:bg-gray-50" key={index}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{brand.title}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">{brand.status}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">{brand.image}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">{brand.homeSection}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">
                                                <TableActionButtons
                                                    editUrl={"" + brand._id}
                                                    rowId={brand._id as string}
                                                    deleteAction={deleteBrand}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {!loading && (
                        <PaginationComponent fetchCall={getBrandList} pagination={pagination} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdminBrand;
