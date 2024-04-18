import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StatusProductProps } from "./statusProduct"
import { ChangeEvent, useState } from "react";
import { modifyStock } from "@/app/actions/modifyProducts";


export const StockProduct: React.FC<StatusProductProps> = ({ data }) => {

    const { product, index } = data;

    const [state, setState] = useState<number>(product.stock);
    const [visible, setVisble] = useState(false);
    const [feedback, setFeedback] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVisble(true)
        const value = event.target.value;
        setState(Number(value));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        modifyStock(product, state)
            .then((data) => {
                if (data.success) {
                    setFeedback(data.success);
                    feedbackExpires();

                }

                setVisble(false);
            })
            .catch((error) => {
                console.log(`Error fetching products ${error}`);
            });
    };

    function feedbackExpires() {

        setTimeout(() => {
            setFeedback(false);
        }, 3000);

    }

    return (
        <>

            <form onSubmit={handleSubmit} className="flex md:gap-2 h-24 items-center  justify-center " key={index}>

                <input
                    className="w-8 text-center bg-transparent text-[10px] md:text-base cursor-pointer"
                    type="number"
                    min={0}
                    max={50}
                    name="state"
                    value={state}
                    onChange={handleChange}
                />

                {
                    visible &&
                    <button className=" text-sm bg-green-100 rounded-lg" type="submit">
                        <FontAwesomeIcon
                            className="text-xs p-1 pb-0 cursor-pointer"
                            icon={faArrowRightLong}
                        />
                    </button>
                }

            </form>

            {
                feedback &&
                <p
                    style={{ bottom: '5px', left: '50%', transform: 'translateX(-50%)' }}
                    className="w-3/4 absolute p-1 rounded  bg-green-100 text-[9px]"
                >Stock updated!
                </p>
            }

        </>
    )
}