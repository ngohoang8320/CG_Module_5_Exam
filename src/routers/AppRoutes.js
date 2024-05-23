import { Route, Routes } from 'react-router-dom';
import ListOrder from '../components/ListOrder';


function AppRouters() {
    return (
        <Routes>
            <Route path="/" element={<ListOrder />} />
        </Routes>
    )
}

export default AppRouters;
