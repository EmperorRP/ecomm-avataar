import Carousel from "./Carousel";
import CarouselComponent from "./CarouselComponent";

export default function Hero() {
    return(
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="text-4xl font-bold">
                Featured Products
            </div>
            <div className="text-lg mb-2">
                Explore and discover a variety of products
            </div>
            <Carousel/>
            {/* <CarouselComponent /> */}
        </div>
    )
}