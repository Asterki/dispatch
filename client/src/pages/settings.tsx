import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import * as Select from "@radix-ui/react-select";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setUser } from "../store/slices/page";

import * as Switch from "@radix-ui/react-switch";

import NavbarComponent from "../components/navbar";
import { checkLoggedIn } from "../lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SettingsIndex = () => {
    const user = useSelector((state: RootState) => state.page.currentUser);
    const dispatch = useDispatch();

    const redirect = useNavigate();
    React.useEffect(() => {
        (async () => {
            if (!user) {
                const currentUser = await checkLoggedIn();
                if (currentUser) dispatch(setUser(currentUser));
                else return redirect("/login");
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [tab, setTab] = React.useState("tab1");

    const [settings, setSettings] = React.useState({
        general: {
            theme: "light",
            language: "en",
        },
        notifications: {
            showNotifications: true,
            playSound: true,
        },
    });

    return (
        <div className="bg-gray-800 min-h-screen text-white">
            {user && (
                <div>
                    <NavbarComponent user={user} />

                    <div className="pt-20">
                        <div className="text-center flex items-center justify-center">
                            <Tabs.Root
                                className="text-center w-11/12 md:w-8/12 flex justify-center items-center flex-col "
                                defaultValue="tab1"
                                onValueChange={(e) => {
                                    setTab(e);
                                }}
                            >
                                <Tabs.List
                                    className="w-full flex justify-self-center shadow-md border-b-2 border-gray-800"
                                    aria-label="Manage your account"
                                >
                                    <Tabs.Trigger
                                        className={`p-2 rounded-tl-md transition-all w-3/12 md:w-1/4 border-r-2 border-gray-800 ${
                                            tab == "tab1"
                                                ? "bg-purple-400 shadow-2xl z-20"
                                                : "bg-gray-700 hover:brightness-125"
                                        }`}
                                        value="tab1"
                                    >
                                        General
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        className={`p-2 transition-all w-3/12 md:w-1/4 border-r-2 border-gray-800 ${
                                            tab == "tab2"
                                                ? "bg-purple-400 shadow-2xl z-20"
                                                : "bg-gray-700 hover:brightness-125"
                                        }`}
                                        value="tab2"
                                    >
                                        Notifications
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        className={`p-2 transition-all w-3/12 md:w-1/4 ${
                                            tab == "tab3"
                                                ? "bg-purple-400 shadow-2xl z-20"
                                                : "bg-gray-700 hover:brightness-125"
                                        }`}
                                        value="tab3"
                                    >
                                        Privacy
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        className={`p-2 rounded-tr-md transition-all w-3/12 md:w-1/4 border-l-2 border-gray-800 ${
                                            tab == "tab4"
                                                ? "bg-purple-400 shadow-2xl z-20"
                                                : "bg-gray-700 hover:brightness-125"
                                        }`}
                                        value="tab4"
                                    >
                                        Security
                                    </Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content
                                    className="rounded-br-md rounded-bl-md bg-gray-700 w-full text-center p-2 shadow-md"
                                    value="tab1"
                                >
                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-col items-center justify-center">
                                            <h1 className="text-2xl">Theme</h1>

                                            <Select.Root
                                                defaultValue={
                                                    settings.general.theme
                                                }
                                                onValueChange={(val) => {
                                                    setSettings({
                                                        general: {
                                                            ...settings.general,
                                                            theme: val,
                                                        },
                                                    });
                                                }}
                                            >
                                                <Select.Trigger className="bg-gray-800 rounded-md p-2 w-7/12 flex justify-between">
                                                    <Select.Value placeholder="Select a theme" />
                                                    <Select.Icon className="ml-2">
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                        />
                                                    </Select.Icon>
                                                </Select.Trigger>

                                                <Select.Portal>
                                                    <Select.Content
                                                        side="bottom"
                                                        align="end"
                                                        className="z-50 bg-gray-800 shadow-md rounded-md p-2 text-white outline-none"
                                                    >
                                                        <Select.Viewport className="flex flex-col gap-2">
                                                            <Select.Item
                                                                value="light"
                                                                className="hover:bg-gray-700 p-2 rounded-md transition-all cursor-pointer data-[state=checked]:bg-blue-400 outline-none"
                                                            >
                                                                <Select.ItemText>
                                                                    Light Theme
                                                                </Select.ItemText>
                                                            </Select.Item>
                                                            <Select.Item
                                                                value="dark"
                                                                className="data-[state=checked]:bg-blue-400 hover:bg-gray-700 p-2 rounded-md transition-all cursor-pointer outline-none"
                                                            >
                                                                <Select.ItemText>
                                                                    Dark Theme
                                                                </Select.ItemText>
                                                            </Select.Item>
                                                        </Select.Viewport>
                                                    </Select.Content>
                                                </Select.Portal>
                                            </Select.Root>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h1 className="text-2xl">
                                                Language
                                            </h1>

                                            <Select.Root
                                                defaultValue={
                                                    settings.general.language
                                                }
                                                onValueChange={(val) => {
                                                    setSettings({
                                                        general: {
                                                            ...settings.general,
                                                            language: val,
                                                        },
                                                    });
                                                }}
                                            >
                                                <Select.Trigger className="bg-gray-800 rounded-md p-2 w-7/12 flex justify-between">
                                                    <Select.Value placeholder="Select a language" />
                                                    <Select.Icon className="ml-2">
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                        />
                                                    </Select.Icon>
                                                </Select.Trigger>

                                                <Select.Portal>
                                                    <Select.Content
                                                        side="bottom"
                                                        align="end"
                                                        className="z-50 bg-gray-800 shadow-md rounded-md p-2 text-white w-full outline-none"
                                                    >
                                                        <Select.Viewport className="flex flex-col gap-2">
                                                            <Select.Item
                                                                value="en"
                                                                className="hover:bg-gray-700 p-2 rounded-md transition-all cursor-pointer data-[state=checked]:bg-blue-400 outline-none"
                                                            >
                                                                <Select.ItemText>
                                                                    English
                                                                </Select.ItemText>
                                                            </Select.Item>
                                                            <Select.Item
                                                                value="es"
                                                                className="data-[state=checked]:bg-blue-400 hover:bg-gray-700 p-2 rounded-md transition-all cursor-pointer outline-none"
                                                            >
                                                                <Select.ItemText>
                                                                    Spanish
                                                                </Select.ItemText>
                                                            </Select.Item>
                                                        </Select.Viewport>
                                                    </Select.Content>
                                                </Select.Portal>
                                            </Select.Root>
                                        </div>
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content
                                    className="rounded-br-md rounded-bl-md bg-gray-700 w-full text-center p-2 shadow-md"
                                    value="tab2"
                                >
                                    <div className="flex items-center gap-2 my-2">
                                        <Switch.Root
                                            defaultChecked={
                                                settings.notifications
                                                    .showNotifications
                                            }
                                            onCheckedChange={(val) =>
                                                setSettings({
                                                    ...settings,
                                                    notifications: {
                                                        ...settings.notifications,
                                                        showNotifications: val,
                                                    },
                                                })
                                            }
                                            className="w-[42px] h-[25px] rounded-full relative bg-gray-800  data-[state=checked]:bg-blue-400 transition-all outline-none cursor-default"
                                        >
                                            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                                        </Switch.Root>
                                        <h1>Show notifications</h1>
                                    </div>
                                    <div className="flex items-center gap-2 my-2">
                                        <Switch.Root
                                            defaultChecked={
                                                settings.notifications
                                                    .showNotifications
                                            }
                                            onCheckedChange={(val) =>
                                                setSettings({
                                                    ...settings,
                                                    notifications: {
                                                        ...settings.notifications,
                                                        playSound: val,
                                                    },
                                                })
                                            }
                                            className="w-[42px] h-[25px] rounded-full relative bg-gray-800  data-[state=checked]:bg-blue-400 transition-all outline-none cursor-default"
                                        >
                                            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                                        </Switch.Root>
                                        <h1>Play notification sound</h1>
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content
                                    className="rounded-br-md rounded-bl-md bg-gray-700 w-full text-center p-2 shadow-md"
                                    value="tab3"
                                >
                                    ewq
                                </Tabs.Content>
                                <Tabs.Content
                                    className="rounded-br-md rounded-bl-md bg-gray-700 w-full text-center p-2 shadow-md"
                                    value="tab4"
                                >
                                    ewq
                                </Tabs.Content>
                            </Tabs.Root>
                        </div>
                    </div>
                </div>
            )}
            {!user && <div>Loading...</div>}
        </div>
    );
};

export default SettingsIndex;
