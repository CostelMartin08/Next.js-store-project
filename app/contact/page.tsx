'use client'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/top&bottom/Header";
import HeaderBanner from "../components/top&bottom/headerBanner";
import { faCircleInfo, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { sendEmail } from "../actions/sendEmail";

export default function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

  
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: { target: { name: any; value: string; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (formData.name && formData.email && formData.phone && formData.message !== undefined) {

            sendEmail(formData.name, formData.email, formData.phone, formData.message)
                .then(() => {

                    setSuccess('The message was successfully sent!')
                    setError('');
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                    });
                })
                .catch((error) => {
                    console.log(`Error: ${error}`);
                });
        }

        setError('All fields are mandatory!');
      
    };


    return (

        <>
            <HeaderBanner />
            <div style={{ backgroundColor: 'rgb(233 233 233)' }} className="sticky top-0 z-20">
                <Header />
            </div>

            <section
                style={{ color: 'rgb(23 23 23)' }}
                className="container space-y-14">

                <div className="sm:mt-10 flex justify-center flex-col items-center gap-8">
                    <h3 className="text-2xl sm:text-7xl text-center font-black pt-10">Contact information</h3>
                    <p className="text-base sm:w-[30rem] text-center">
                        You have our contact details below, if you want to contact us by phone or e-mail.
                        You also have the form further down the page to send us a quick message.
                    </p>
                </div>


                <div className="flex flex-col md:flex-row items-center md:justify-between p-14 gap-10 bg-white rounded-md ">

                    <div className="text-center text-2xl w-52">
                        <FontAwesomeIcon className="text-5xl" icon={faPhone} />
                        <p className="my-2">Phone</p>
                        <span className="text-sm">+40749855707</span>
                    </div>
                    <div className="text-center text-2xl w-52">
                        <FontAwesomeIcon className="text-5xl" icon={faEnvelope} />
                        <p className="my-2">E-mail</p>
                        <span className="text-sm underline">gadgetgridservices@gmail.com</span>
                    </div>
                    <div className="text-center text-2xl w-52">
                        <FontAwesomeIcon className="text-5xl" icon={faCircleInfo} />
                        <p className="my-2">Info</p>
                        <span className="text-sm underline">costelmartinescu2000@gmail.com</span>
                    </div>


                </div>

                <section className="h-[40rem] flex flex-col justify-center bg-white rounded-md space-y-10">

                    <div className="flex flex-col items-center gap-4">
                        <p className="text-3xl sm:text-5xl">Contact Form</p>
                        <p className="text-sm md:text-lg text-center px-5">Leave a message and be sure that we will answer you</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex items-center flex-col gap-6 mx-auto px-5 md:px-0 md:w-[30rem]">

                        <div className="w-full flex gap-3">
                            <input name="name" value={formData.name} onChange={handleChange} className=" w-1/2 p-4 border-2 rounded-md" type='text' placeholder="Name"></input>
                            <input name="email" value={formData.email} onChange={handleChange} className='w-1/2 p-4 border-2 rounded-md' type='text' placeholder="E-mail"></input>
                        </div>

                        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-4 border-2 rounded-md" type='phone' placeholder="Phone number"></input>

                        <textarea name='message' value={formData.message} onChange={handleChange} className="w-full p-4 border-2 rounded-md" placeholder="Message"></textarea>
                        <div className="w-full">
                            {
                                error &&
                                <>
                                    <div className='bg-red-700 h-8 md:w-96 rounded flex items-center text-left'>
                                        <h2 className='text-white px-3'>{error}</h2>
                                    </div>
                                </>
                            }
                            {
                                success &&
                                <>
                                    <div className='bg-green-700 h-8 md:w-96 rounded flex items-center text-left'>
                                        <h2 className='text-white px-3'>{success}</h2>
                                    </div>
                                </>
                            }
                        </div>
                        <button className="w-40 bg-emerald-950 text-white p-4 border-2 rounded-md">Send</button>

                    </form>


                </section>

            </section>


        </>

    );
}
