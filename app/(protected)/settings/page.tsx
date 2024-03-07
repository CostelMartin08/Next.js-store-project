'use client'

import { settings } from "@/app/actions/settings"
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import * as Switch from '@radix-ui/react-switch';
import '@/app/(protected)/settings/style.css';
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SettingPage = () => {

    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const user = useCurrentUser();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [name, setName] = useState<string>(user?.name || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState<boolean>(user?.isTwoFactorEnabled || false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        startTransition(() => {
            const dataToUpdate: Record<string, string | boolean> = {};

            if (name) {
                dataToUpdate.name = name;
            }
            if (email) {
                dataToUpdate.email = email;
            }
            if (password && newPassword) {
                dataToUpdate.password = password;
                dataToUpdate.newPassword = newPassword;
            }
            if (isTwoFactorEnabled) {
                dataToUpdate.isTwoFactorEnabled = isTwoFactorEnabled
            }

            settings(
                dataToUpdate
            )
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }

                    if (data.success) {
                        update();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong!"));

        });

    }

    return (
        <div className="w-screen container ">

            <div className="flex items-center justify-center space-x-3">
                <h3 className=" text-center  text-[25px] ">Settings</h3>
                <FontAwesomeIcon className="text-[25px]" icon={faGear} />
            </div>

            <div className="w-3/4 md:w-2/4 mx-auto">

                <form
                    className="mt-10"
                    onSubmit={handleSubmit}>
                    <div className="space-y-4 text-md">
                        <div className="flex flex-col">
                            <label className="py-1">
                                Name:
                            </label>
                            <input
                                className="bg-[#ffffff] border-2 border-[#3e3e3e] rounded-lg text-black px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        {user?.isOAuth === false &&

                            <>
                                <div className="flex flex-col">
                                    <label className="py-1">
                                        Email:
                                    </label>
                                    <input
                                        autoComplete="off"
                                        className="bg-[#ffffff] border-2 border-[#3e3e3e] rounded-lg text-black px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                </div>
                                <div className="flex flex-col">
                                    <label className="py-1">
                                        Password:
                                    </label>
                                    <input
                                        autoComplete="off"
                                        placeholder="Enter your password"
                                        className="bg-[#ffffff] border-2 border-[#3e3e3e] rounded-lg text-black px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                </div>
                                <div className="flex flex-col">
                                    <label className="py-1">
                                        NewPassword:
                                    </label>
                                    <input
                                        autoComplete="off"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter your new password"
                                        className="bg-[#ffffff] border-2 border-[#3e3e3e] rounded-lg text-black px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
                                        type="password"
                                    />

                                </div>

                                <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                                    <label className="py-1">
                                        Two Factor Auth:
                                    </label>
                                    <Switch.Root
                                        className="SwitchRoot cursor-pointer"
                                        defaultChecked={isTwoFactorEnabled}
                                        onCheckedChange={(value) => setIsTwoFactorEnabled(value)}>
                                        <Switch.Thumb className="SwitchThumb" />
                                    </Switch.Root>

                                </div>

                            </>
                        }

                    </div>
                    <div>
                        {error && (
                            <div className="bg-red-500 text-white w-2/4 text-sm py-1 px-3 rounded-md mt-4">
                                {error}</div>

                        )}
                        {success && (
                            <div className="bg-green-500 text-white w-2/4 text-sm py-3 px-3 rounded-md mt-4">
                                {success}</div>

                        )}
                    </div>
                    <div className="mt-6 w-[150px] h-[50px]">
                        <button
                            disabled={isPending}
                            className="submit w-52"
                            type="submit">
                            Submit
                        </button>
                    </div>


                </form>

            </div>

        </div>
    )
}

export default SettingPage;

