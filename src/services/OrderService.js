import axios from 'axios';

export const getAll = async () => {
    try {
        console.log((await axios.get("http://localhost:8080/orders")).data);
        return (await axios.get("http://localhost:8080/orders")).data;
    } catch (e) {
        return [];
    }
}

export const persistOrder = async (order) => {
    try {
        console.log(order);
        await axios.post("http://localhost:8080/orders", order);
    } catch (e) {
        throw e;
    }
}  