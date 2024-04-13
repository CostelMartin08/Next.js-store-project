'use client'

import { useSearchParams } from "next/navigation";
import Image from "next/image";
//import PhotoViewer from 'photoviewer';



const PhotoProduct: React.FC<any> = (props) => {

    const searchParams = useSearchParams()

    const param = searchParams.get('q1')

    const items = [
        {
            src: props.data?.photo[0],
            category: param,
            id: props.data?.id,
            title: props.data?.title
        }
    ];

    const openPhotoViewer = (index: number) => {
        const options = {
            index,
            positionFixed: true,
        }

        //new PhotoViewer(items, options);

    }


    return (

        <section className="flex flex-col justify-center items-center gap-8">

            <div className="w-3/5">
                {items.map((item, index) => (
                    <Image
                        width={900}
                        height={900}
                        style={{ cursor: 'pointer', maxWidth: '100%' }}
                        key={index}
                        src={`/products/${item.category}/${item.id}/${item.src}`}
                        alt={item.title}
                    ></Image>
                ))}
            </div>

            <div className="w-3/5 flex gap-5 justify-center mx-auto">
      
                <div className="w-1/4 "><Image width={80} height={80} className="rounded" src={`/products/${param}/${props.data.id}/${props.data.photo[1]}`} alt="work" /></div>
                <div className="w-1/4 "><Image width={80} height={80} className="rounded" src={`/products/${param}/${props.data.id}/${props.data.photo[2]}`} alt="work" /></div>
                <div className="w-1/4 "><Image width={80} height={80} className="rounded" src={`/products/${param}/${props.data.id}/${props.data.photo[3]}`} alt="work" /></div>
                <div className="w-1/4 "><Image width={80} height={80} className="rounded" src={`/products/${param}/${props.data.id}/${props.data.photo[4]}`} alt="work" /></div>
            </div>

        </section>

    )

}

export default PhotoProduct;