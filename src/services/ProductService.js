import axios from 'axios';

export const getAllProduct = async () => {
    try {
        return (await axios.get("http://localhost:8080/products")).data;
    } catch (e) {
        return [];
    }
}
