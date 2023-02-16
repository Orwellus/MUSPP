import axios from "axios";

async function getUser() {
    try {
        const response = await axios
            .get("http://localhost:3005/api/getAllGrades")
            .then((response) => {
                return response.data.data;
            });
    } catch (error) {
        console.error(error);
    }
}

export const getUsr = () => {
    getUser();
};
