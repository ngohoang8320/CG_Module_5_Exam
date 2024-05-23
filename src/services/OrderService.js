import axios from 'axios';

export const getAll = async () => {
    try {
        return (await axios.get("http://localhost:8080/orders")).data;
    } catch (e) {
        return [];
    }
}  