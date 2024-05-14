'use client'

import Header from "../components/top&bottom/Header"
import HeaderBanner from "../components/top&bottom/headerBanner"
import Image from "next/image";
import SvgGG from '../../public/appPhoto/GadgetGrid.svg';
import Auth from '../../public/appPhoto/auth.png';

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


                    <div className='bg-white p-14 text-left md:text-center flex flex-col items-center gap-8 rounded-md mt-10'>

                        <h4 className="text-4xl font-black">What is GadgetGrid?</h4>
                        <p className="md:w-[45rem] text-sm md:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus elit, eleifend eu libero in,
                            vulputate mattis arcu. Nam tempor molestie tellus vel rutrum. Praesent sed dapibus arcu. Aenean
                            molestie tristique velit. Duis semper nisi at neque dignissim feugiat.
                            Quisque libero urna, laoreet sed eleifend in, rutrum eu turpis.
                        </p>
                        <p className="md:w-[45rem] text-sm md:text-lg">Curabitur.
                            Curabitur nec dui sed tortor posuere vulputate. Integer ullamcorper euismod dui nec
                            sodales. Quisque sed diam in sapien facilisis congue sit amet vitae libero. Nulla
                            eleifend ligula posuere tellus aliquam, in dapibus turpis efficitur. Mauris aliquam
                            ex eu sodales fermentum. Ut nunc tortor, rutrum at ultrices id, dignissim sed magna.</p>

                    </div>


                    <div className="flex flex-col items-center md:place-items-start md:flex-row gap-8 bg-white p-14 rounded-md mt-10">

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

                </div>


            </section>

        </>

    )

}