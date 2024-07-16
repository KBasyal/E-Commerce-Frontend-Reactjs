import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";
import TableActionButtons from "../../components/common/table/action-buttons.component";
import { LoadingComponent } from "../../components/common";
import PaginationComponent from "../../components/common/table/pagiantion.component";

const PER_PAGE_LIMIT = 15;

const AdminProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        totalPages: 1,
        currentPage: 1
    });

    const getProductList = async ({ page = 1, limit = PER_PAGE_LIMIT }) => {
        try {
            setLoading(true);
            const response:any = await axiosInstance.get('/product', {
                params: {
                    page: page,
                    limit: limit
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            });
            const totalPages = Math.ceil(response.meta.total / response.meta.limit);
            setPagination({
                totalPages: totalPages,
                currentPage: response.meta.page
            });
            setData(response.result);
            console.log(response)
        } catch (exception) {
            toast.error("Unable to fetch the product lists ....");
            console.error(exception);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductList({ page: 1, limit: PER_PAGE_LIMIT });
    }, []);

    const deleteProduct = async (id: string) => {
        try {
            setLoading(true);
            await axiosInstance.delete('/product/' + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            });
            toast.success("Product Deleted Successfully");
            getProductList({ page: 1, limit: PER_PAGE_LIMIT });
        } catch (exception) {
            toast.error("Product cannot be deleted at this moment");
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
                            Product List
                        </h1>
                    </div>
                    <div></div>
                    <div className="col-span-full lg:col-span-1 flex justify-center lg:justify-end">
                        <NavLink className="bg-green-800 mt-3 text-center py-2 px-2 text-white rounded w-[200px]" to="/admin/product/create">
                            Create Product
                        </NavLink>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 mt-8">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right bg-black">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Title</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Price</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Discount</th>
                                    {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Brand</th> */}
                                    {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Categories</th> */}
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Images</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Status</th>
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
                                    data.map((product: any, index: number) => (
                                        <tr className="odd:bg-gray-50" key={index}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.title}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">{product.price}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">{product.discount}</td>
                                            {/* <td className="whitespace-nowrap px-4 py-2 font-medium">{product.brand}</td> */}
                                            {/* <td className="whitespace-nowrap px-4 py-2 font-medium">{product.categories}</td> */}
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">{product.images}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">{product.status}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">
                                                <TableActionButtons
                                                    editUrl={"" + product._id}
                                                    rowId={product._id as string}
                                                    deleteAction={deleteProduct}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {!loading && (
                        <PaginationComponent fetchCall={getProductList} pagination={pagination} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdminProduct;
