'use client'

import Header from "../components/top&bottom/Header"
import HeaderBanner from "../components/top&bottom/headerBanner"
import Image from "next/image";
import SvgGG from '../../public/appPhoto/GadgetGrid.svg';
import Auth from '../../public/appPhoto/auth.png';
import Admin from '../../public/appPhoto/admin-user.png';

import poster from '../../public/appPhoto/poster1.png';

export default function UsStory() {



    return (

        <>
            <HeaderBanner />
            <div style={{ backgroundColor: 'rgb(233 233 233)' }} className="sticky top-0 z-20">
                <Header />
            </div>


            <section className="container mt-5">

                <div className="px-6">

                    <div style={{ backgroundColor: '#1B2123' }} className="flex  items-center rounded-md justify-center">

                        <Image
                            width={800}
                            height={600}
                            alt='logo'
                            src={SvgGG}>
                        </Image>


                    </div>


                    <div className='bg-white p-8 md:p-14 text-left md:text-center flex flex-col items-center gap-8 rounded-md mt-10'>

                        <h4 className="text-4xl font-black">What is GadgetGrid?</h4>
                        <p className="md:w-[45rem] text-sm md:text-lg">
                            GadgetGrid is a web application that I created entirely in two months,
                            using the Next.js framework and TypeScript. This project gave me the
                            opportunity to familiarize myself with and learn these technologies.
                        </p>
                        <p className="md:w-[45rem] text-sm md:text-lg">
                            For over a year now, I decided to venture into the world of web development,
                            during which time I have created presentation websites and web applications,
                            evolving from simple HTML/CSS projects to full-stack web applications.
                        </p>
                        <p className="md:w-[45rem] text-sm md:text-lg">
                            Both with other applications and with GadgetGrid, my satisfaction lies in
                            publishing these projects. It gives me immense pleasure to open a browser
                            on a phone or tablet and see something I created.
                        </p>
                        <p className="md:w-[45rem] text-sm md:text-lg">
                            GadgetGrid is a portfolio project, but I have tried to offer an experience as close as
                            possible to that of an online store. There are still many details to resolve, but I believe
                            I now have a decent production version.
                        </p>

                    </div>


                    <div className="flex flex-col items-center md:place-items-start md:flex-row gap-8 bg-white p-8 md:p-14 rounded-md mt-10">

                        <Image
                            className="rounded-md"
                            src={Auth}
                            height={300}
                            width={300}
                            alt='auth.js'>

                        </Image>

                        <div className="text-left md:text-lg space-y-10 text-left md:text-justify">

                            <p>
                                Auth.js is a JavaScript library for authentication and authorization,
                                which facilitates the implementation of authentication functionalities
                                in web applications. Within this project, we have opted for both
                                credential-based login and integration with GitHub, considering
                                the target audience of this application.
                            </p>

                            <p>
                                GadgetGrid offers a straightforward authentication experience.
                                From email address verification to two-factor authentication
                                and password reset.
                            </p>

                            <p>
                                I would like to mention that GadgetGrid is a demonstrative application
                                without any economic purpose. The collected data, specifically email
                                addresses and profile photos, are deleted upon request.
                            </p>

                        </div>
                    </div>


                    <div className="bg-white flex flex-col-reverse justify-center items-center md:flex-row gap-8 rounded-md mt-10 p-8 md:p-14 ">

                        <div className="text-left md:text-lg space-y-8 text-left md:text-justify">

                            <p>
                                Inspired by the e-commerce platform Shopify, we have developed a similar
                                system for managing products, aiming to provide an efficient and intuitive
                                experience to users.
                            </p>
                            <p>
                                Through this system, users with administrator roles
                                are empowered to add new products to the catalog and modify existing ones.
                            </p>
                            <p>
                                This functionality enables flexible management of the entire inventory,
                                including updating descriptions, enhancing images, and adjusting prices
                                to meet the ever-changing market demands and preferences.
                            </p>


                        </div>

                        <Image
                            quality={100}
                            className="rounded-md"
                            src={Admin}
                            width={300}
                            height={300}
                            alt="code">

                        </Image>

                    </div>


                    <div className="bg-white rounded-md mt-10">

                        <video 
                        className="rounded-md w-full" 
                
                        poster='https://gadgetgrid.ro/poster/poster1.png' controls>
                            <source src="https://gadgetgrid.ro/video/video1.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                    </div>




            </div>


        </section >

        </>

    )

}