import { Outlet } from "react-router-dom"
import { FooterComponent, HeaderComponent } from "../../components/common"

const HomeLayout =()=>{
    return(
        <>
        <HeaderComponent/>
            <Outlet/>
        <FooterComponent/>
        </>
    )
}
export default HomeLayout