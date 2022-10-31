import {Route, Routes} from "react-router-dom";
import Form1 from "../pages/Form1";
import ThankPage from "../pages/ThankPage";

const Routers = () => {
    return (
        <Routes>
            <Route path="/"
                   element={<Form1/>}
            ></Route>
            <Route path="/ThankPage"
                   element={<ThankPage/>}
            ></Route>
        </Routes>
    )
}

export default Routers
