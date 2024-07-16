
import { useForm } from "react-hook-form";
import { SelectComponent, TextInputField } from "../../../components/common/form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axiosInstance from "../../../config/axios.config";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../../context/auth.context";


const RegisterPage = () => {
    const auth = useContext(AuthContext)
    const rules = Yup.object({
        name: Yup.string().min(2).max(40).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Confirm password and password does not match"),
        role: Yup.string().matches(/^(seller|customer)$/).required(),
        image:Yup.mixed()



    })
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(rules)
    });
    const navigate = useNavigate()
    const submitEvent = async(data: any) => {
        try{
            const response: any = await axiosInstance.post("/auth/register", data, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            toast.success(response.message)
            navigate("/")

        }catch(exception){
            console.log("RegistrationException:", exception)
           toast.error("Cannot register at this moment")

        }
    }
    useEffect(()=>{
        if(auth.loggedInUser){
            toast.info("You are already logged in")
            navigate("/"+auth.loggedInUser.role)
        }
    }, [auth])

    return (
        <>
            <div className="mx-auto">
                <section className="bg-white">
                    <div className="lg:grid lg:grid-cols-12">
                        <main
                            className="flex items-center justify-center px-8 sm:px-12 lg:col-span-12 lg:px-16 lg:py-12 xl:col-span-12"
                        >
                            <div className="max-w-xl lg:max-w-3xl">


                                <form onSubmit={handleSubmit(submitEvent)} className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 ">
                                        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <TextInputField
                                            control={control}
                                            name="name"
                                            type="name"
                                            errMsg={errors?.name?.message as string}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                                        <TextInputField
                                            control={control}
                                            name="email"
                                            type="email"
                                            errMsg={errors?.email?.message as string}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                        <TextInputField
                                            control={control}
                                            name="password"
                                            type="password"
                                            errMsg={errors?.password?.message as string}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                            Password Confirmation
                                        </label>

                                        <TextInputField
                                            control={control}
                                            name="confirmPassword"
                                            type="password"
                                            errMsg={errors?.confirmPassword?.message as string}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-span-6 ">
                                        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                            Role
                                        </label>
                                        <SelectComponent
                                            options={[{ label: "Seller", value: "seller" }, { label: "Buyer", value: "customer" }]}
                                            name="role"
                                            control={control}
                                            errMsg={errors?.role?.message}
                                        />
                                    </div>
                                    <div className="col-span-6 ">
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                            Image
                                        </label>

                                        <input 
                                            className=""
                                            id="file_input"
                                            type="file"
                                            onChange={(e:any) =>{
                                                const uploaded = e.target.files['0']
                                                setValue('image',uploaded)
                                            }}
                                            
                                        />

                                    </div>

                                    <div className="col-span-6">
                                        <p className="text-sm text-gray-500">
                                            By creating an account, you agree to our
                                            <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                            and
                                            <a href="#" className="text-gray-700 underline">privacy policy</a>.
                                        </p>
                                    </div>




                                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                        <button
                                            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                        >
                                            Create an account
                                        </button>

                                        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                            Already have an account?
                                            <a href="#" className="text-gray-700 underline">Log in</a>.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </main>
                    </div>
                </section>
            </div>

        </>
    )
}
export default RegisterPage;