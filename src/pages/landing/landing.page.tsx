import { ReactNode, useEffect, useState } from "react";
import "./landing.page.css"

import  HomeBannerComponent  from "../../components/banner/home-banner.component";

import {SingleProductGrid,
HomeSectionTitle
} from "../../components/common";
import HomeProductComponent from "../../components/product/home-product.component";



const LandingPage = (): ReactNode => {


    return (

        <>
            <HomeBannerComponent />
            <div className="bg-lime-50 my-10">
                <HomeSectionTitle>
                    Brand Choice
                </HomeSectionTitle>
            </div>
            <div className="bg-lime-50">
                <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
                    <HomeSectionTitle>Customer's Choice</HomeSectionTitle>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <HomeProductComponent/>
       

                    </div>
                </div>
            </div>



        </>
    );
};

export default LandingPage;
