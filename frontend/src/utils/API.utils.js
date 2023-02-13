import axios from "axios";

async function getUser() {
    try {
        const response = await axios
            .get("http://localhost:3005/assessment")
            .then((response) => {
                console.error(response.data.data, "lolo");
                return response.data.data;
            });
    } catch (error) {
        console.error(error);
    }
}

export const getUsr = () => {
    getUser();
};
