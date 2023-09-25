// Author: Harshil Shah
export const getLoggedInUserType = (): string => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            return userData.user_type;
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }
    return '';
};

export const getLoggedInUserEmail = (): string => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            return userData.user_mail;
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }
    return '';
};
