import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";

const HomeProductComponent = () => {
    const [data, setData] = useState([] as any);

    const getProductForHomePage = async () => {
        try {
            const response: any = await axiosInstance.get("/product/home-list");
            setData(response.result);
        } catch (exception) {
            console.error(exception);
        }
    };

    useEffect(() => {
        getProductForHomePage();
    }, []);

    return (
        <div className="bg-white">
            <div className="relative isolate">
                {data && data.map((product: any, ind: number) => (
                    <div key={ind} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                src={import.meta.env.VITE_IMAGE_URL + "/products/" + product.image}
                                crossOrigin="anonymous"
                                alt={product.name}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a href={product.link}>
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        {product.name}
                                    </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeProductComponent;
