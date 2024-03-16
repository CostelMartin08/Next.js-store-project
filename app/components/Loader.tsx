


const Loader = () => {

    const elements = [];

    for (let i = 0; i < 5; i++) {
        elements.push(
          <div key={i} className="flex flex-col justify-between h-72 md:h-96 bg-neutral-300 h-full pulse rounded-xl p-4 gap-4">
            <div className="bg-neutral-400/50 w-full h-52 pulse rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-400/50 w-1/4 h-4 pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-2/5 h-4 pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-full h-4 pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-2/4 h-4 pulse rounded-md"></div>
            </div>
          </div>
        );
      }


    return (
        <>



            {elements}

          

        </>
    )
}

export default Loader;