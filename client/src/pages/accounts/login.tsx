import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setUser } from "../../store/slices/page";

import NavbarComponent from "../../components/navbar";
import NotificationComponent from "../../components/notifications";

import { LoginResponseData } from "../../../../shared/types/api/accounts";
import { checkLoggedIn } from "../../lib/auth";

// To be later changed to a translate service
const messages = {
    "invalid-credentials": "Invalid email/username or password",
    "requires-tfa": "Two-factor authentication is required",
    "invalid-tfa-code": "Invalid two-factor authentication code",
};

const AccountLogin = () => {
    const user = useSelector((state: RootState) => state.page.currentUser);
    const dispatch = useDispatch();

    const redirect = useNavigate();

    // Notification state
    const [notification, setNotification] = React.useState<{
        state: "showing" | "hidden";
        title: string;
        content: string;
        type: "error" | "success" | "info" | "warning";
    }>({
        state: "hidden",
        title: "",
        content: "",
        type: "info",
    });

    const showNotification = (
        title: string,
        content: string,
        type: "warning" | "info" | "success" | "error"
    ) => {
        setNotification({
            state: "showing",
            title: title,
            content: content,
            type: type,
        });

        setTimeout(() => {
            setNotification({
                state: "hidden",
                title: "",
                content: "",
                type: "info",
            });
        }, 5000);
    };

    const usernameEmailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const login = async () => {
        const emailOrUsername = usernameEmailRef.current!.value;
        const password = passwordRef.current!.value;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_HOST}/api/accounts/login`,
                {
                    emailOrUsername,
                    password,
                    tfaCode: "",
                },
                {
                    withCredentials: true,
                }
            );

            if (response.data.status === "success") {
                showNotification(
                    "Logged in successfully",
                    "You have been logged in successfully",
                    "success"
                );

                const serverUser = await checkLoggedIn();
                if (serverUser) dispatch(setUser(serverUser));
                redirect("/home");
            } else {
                console.log(response.data);

                showNotification(
                    "Failed to login",
                    messages[response.data.status as keyof typeof messages],
                    "error"
                );
            }
        } catch (err) {
            showNotification(
                "Failed to login",
                "Unable to login at the moment. Please try again later.",
                "error"
            );
        }
    };

    // const loginWIthTFA = async (tfaCode: string) => {};

    // Login-protect the page
    React.useEffect(() => {
        (async () => {
            if (!user) {
                const currentUser = await checkLoggedIn();
                if (currentUser) {
                    dispatch(setUser(currentUser));
                    return redirect("/home");
                }
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-gray-800 min-h-screen text-white">
            <NavbarComponent user={null} />

            <NotificationComponent
                content={notification.content}
                title={notification.title}
                state={notification.state}
                type={notification.type}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-md p-4 w-11/12 md:w-4/12">
                <form>
                    <h1 className="text-2xl font-semibold mb-2">
                        Login to DIMLIM
                    </h1>

                    <div className="my-4">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            ref={usernameEmailRef}
                            className="w-full p-2 bg-gray-800 border-2 border-gray-800 outline-none rounded-md transition-all focus:border-blue-400"
                        />
                    </div>

                    <div className="my-4">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            ref={passwordRef}
                            className="w-full p-2 bg-gray-800 border-2 border-gray-800 outline-none rounded-md transition-all focus:border-blue-400"
                        />
                    </div>

                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={login}
                            className="w-full p-2 bg-blue-500 rounded-md"
                        >
                            Login
                        </button>
                    </div>

                    <div className="mt-4">
                        Don't have an account yet?{" "}
                        <Link to="/register" className="text-blue-400">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountLogin;
