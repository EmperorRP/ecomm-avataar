import CarouselComponent from "./CarouselComponent";

export default function Hero() {
    return(
        <div className="flex flex-col justify-center items-center mt-10">
            <div className="text-4xl font-bold">
                Featured Products
            </div>
            <div className="text-lg ">
                Explore and discover a variety of products
            </div>
            <CarouselComponent />
        </div>
    )
}