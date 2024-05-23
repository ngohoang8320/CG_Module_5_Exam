import { Route, Routes } from 'react-router-dom';
import CreateOrder from '../components/CreateOrder';
import ListOrder from '../components/ListOrder';


function AppRouters() {
    return (
        <Routes>
            <Route path="/" element={<ListOrder />} />
            <Route path="/orders" element={<ListOrder />} />
            <Route path="/orders/create" element={<CreateOrder />} />
        </Routes>
    )
}

export default AppRouters;
