import {Route, Routes} from "react-router-dom";
import Form1 from "../pages/Form1";

const Routers = () => {
    return (
        <Routes>
            <Route path="/"
                   element={<Form1/>}
            ></Route>
        </Routes>
    )
}

export default Routers
