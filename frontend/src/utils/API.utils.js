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

export async function isLoggin() {
    try {
        const response = await axios
            .get("http://localhost:3005/isloggedin")
            .then((response) => {
                console.log(response.data);
                return response.data;
            });
    } catch (error) {
        console.error(error);
    }
}

export const authUse = () => {
    window.open("http://localhost:3005/auth/google", "_self");
};

export const logout = () => {
    window.open("http://localhost:3005/logout", "_self");
};

export const isloggedin = () => {
    return isLoggin();
};
