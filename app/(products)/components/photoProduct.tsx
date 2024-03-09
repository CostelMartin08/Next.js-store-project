
//import PhotoViewer from 'photoviewer';



const PhotoProduct: React.FC<any> = (props) => {



    const items = [
        {
            src: props.data?.photo,
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


        <div

            className="flex flex-col gap-8">


            <div className="w-4/6 lg:w-4/6 mx-auto my-auto">
                {items.map((item, index) => (
                    <img
                        className='w-full'
                        key={index}
                        src={item.src}
                        alt={item.title}
                        data-title={item.title}
                        //  onClick={() => openPhotoViewer(index)}
                        style={{ cursor: 'pointer', margin: '5px', maxWidth: '500px' }}
                    />
                ))}
            </div>



            <div className="w-4/6 flex gap-5 justify-center mx-auto">

                <div className="w-1/4 "><img className="rounded" src={props.data.photo} alt="work" /></div>
                <div className="w-1/4 "><img className="rounded" src={props.data.photo} alt="work" /></div>
                <div className="w-1/4 "><img className="rounded" src={props.data.photo} alt="work" /></div>
                <div className="w-1/4 "><img className="rounded" src={props.data.photo} alt="work" /></div>

            </div>

        </div>


    )

}

export default PhotoProduct;