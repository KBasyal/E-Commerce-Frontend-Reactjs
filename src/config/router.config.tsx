import { Suspense, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import LandingPage from "../pages/landing/landing.page";
import LoginPage from "../pages/auth/login";

import RegisterPage from '../pages/auth/register';

import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import AdminDashboard from "../pages/dashboard/admin-dashboard.page";
import AdminLayout from "../pages/layouts/admin";

// const AdminLayout = lazy(() =>import("../pages/layouts/admin"))
// const AdminDashboard = lazy(()=> import ("../pages/dashboard/admin-dashboard.page"))

import PermissionConfig from "./permission.config";
import AuthContext from "../context/auth.context";
import axiosInstance from "./axios.config";
import HomeLayout from "../pages/layouts";
import { LoadingComponent } from "../components/common";
import { AdminBanner, AdminBannerCreate, AdminBannerEdit} from "../pages/banner";
import { AdminBrand, AdminBrandCreate, AdminBrandEdit } from "../pages/brand";
import { AdminCategory, AdminCategoryCreate, AdminCategoryEdit } from "../pages/category";
import { AdminProduct, AdminProductCreate } from "../pages/product";


//login 
// register

const RoutingConfig = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [loading, setLoading] = useState(true);
    const getLoggedInUser = async () => {
        try {
            const token = localStorage.getItem("accessToken") || null;
            const response:any = await axiosInstance.get(
                "auth/me",
                {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                }
            );
            setLoggedInUser(response.result)
        } catch (exception) {
            // handle exception

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("accessToken") || null
        if (token) {
            getLoggedInUser()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <>
            {
                loading ? <>
                    <LoadingComponent />

                </> : <>
                    <AuthContext.Provider value={{ loggedInUser: loggedInUser }} >
                        <ToastContainer
                            theme="colored"
                        />

                        <Routes>
                            <Route path="/" element={<HomeLayout />}>
                                <Route index element={<LandingPage />} />
                                <Route path="login" element={<LoginPage />} />
                                {/* <Route path="socket" element={<SocketExample/>}/> */}
                                <Route path="register" element={<RegisterPage />} />

                                <Route path="*" element={<>Error Page</>} />
                            </Route>
                            <Route path="/admin" element={<PermissionConfig allowAccess={"admin"}>
                                <AdminLayout />
                            </PermissionConfig>}>
                                <Route index element={
                                    <Suspense fallback={<LoadingComponent />}>
                                        <AdminDashboard />
                                    </Suspense>
                                }></Route>
                                <Route path="banner" element={<Suspense fallback={<LoadingComponent />}>
                                    <AdminBanner />
                                </Suspense>}></Route>
                                <Route path="banner/create" element={<Suspense fallback={<LoadingComponent />}>
                                    <AdminBannerCreate />
                                </Suspense>} />
                                <Route path="banner/:id" element={<Suspense fallback={<LoadingComponent />}>
                                    <AdminBannerEdit />
                                </Suspense>} />
                                <Route path="brand/create" element ={<Suspense fallback={<LoadingComponent />}>
                                    <AdminBrandCreate />

                                </Suspense>}/>
                                <Route path="brand" element={<Suspense fallback={<LoadingComponent />}>
                                    <AdminBrand />
                                </Suspense>}></Route>
                                <Route path="brand/:id" element={<Suspense fallback={<LoadingComponent />}>
                                    
                                    <AdminBrandEdit />
                                </Suspense>} />

                                <Route path="category/create" element ={<Suspense fallback={<LoadingComponent />}>
                                    
                                    <AdminCategoryCreate/>

                                </Suspense>}/>
                                <Route path="category" element={<Suspense fallback={<LoadingComponent />}>
                                    
                                    <AdminCategory/>
                                </Suspense>}></Route>
                                <Route path="category/:id" element={<Suspense fallback={<LoadingComponent />}>
                                    <AdminCategoryEdit/>
                                </Suspense>} />
                                <Route path="product/create" element ={<Suspense fallback={<LoadingComponent />}>
                                    
                                    
                                    <AdminProductCreate/>

                                </Suspense>}/>
                                <Route path="product" element={<Suspense fallback={<LoadingComponent />}>
                                    <AdminProduct/>
                                    
                                </Suspense>}></Route>
                                <Route path="product/:id" element={<Suspense fallback={<LoadingComponent />}>
                                    <AdminCategoryEdit/>
                                </Suspense>} />




                                <Route path="*" element={<>Error Page</>}></Route>




                            </Route>


                        </Routes>
                    </AuthContext.Provider>
                </>
            }



        </>)
}
export default RoutingConfig;