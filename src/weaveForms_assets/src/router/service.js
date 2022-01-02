import { AuthClient } from "@dfinity/auth-client"; 



const isAuthenticated = async () => {

    const authClient = await AuthClient.create();

    return await authClient.isAuthenticated();
};

export default {
    isAuthenticated
}