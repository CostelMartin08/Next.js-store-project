'use client'

import { useRef, useState } from "react";

export const PhotoMenu = () => {

    const [file, setFile] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!file) return setError('You must upload a photo to continue!');

        try {
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })

            if (!res.ok) throw new Error(await res.text())

            const value = await res.json();

            setSuccess(value.success);
            setError(value.error);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (e: any) {

            console.error(e);
        }
    }

    return (
        <div className=" space-y-4 w-3/4 md:w-2/4 mt-5 ">


            <h3>Change your profile photo:</h3>

            <form onSubmit={onSubmit} className="grid  items-center gap-3 relative">

                <input
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files?.[0])}
                    id="picture"
                    type="file"
                    className="bg-[#ffffff] border-2 border-[#3e3e3e] rounded-lg text-black px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition" />

                <button
                    style={{ right: 0 }}
                    className="absolute py-3 bg-emerald-950 text-white px-3 h-full rounded-r-lg"
                    type="submit">Apply</button>

            </form>

            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}</div>

            )}
            {success && (
                <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {success}</div>

            )}

        </div>
    )
}