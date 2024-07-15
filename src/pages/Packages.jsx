import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { cacheApiResponse, getApiCache, getImageURL } from "../utils/API";
import { loaderRefAtom } from "../atoms/General";
import { useAtomValue } from 'jotai';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import ButtonWrap from "../components/ButtonWrap";
import { MdOutlineShoppingCart } from "react-icons/md";

export function Package({ p }) {
    return (
        <div className="h-96 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${getImageURL(p.image)})` }}>
            <div className="rounded-xl justify-between w-full h-full flex flex-col items-center p-4 bg-[#00000099] text-white">
                <div className="text-4xl mt-4">{p.name}</div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <FaCheck className="text-xl text-green-500" />
                        <div>{p.express_interest} Express Interests</div>
                    </div>
                    <div className="flex gap-2">
                        <FaCheck className="text-xl text-green-500" />
                        <div>{p.photo_gallery} Gallery Photo Upload</div>
                    </div>
                    <div className="flex gap-2">
                        <FaCheck className="text-xl text-green-500" />
                        <div>{p.contact} Contact View</div>
                    </div>
                    <div className="flex gap-2">
                        {p.auto_profile_match ? <><FaCheck className="text-xl text-green-500" />
                            <div>Show Auto Profile Match</div></> :
                            <><IoMdClose className="text-2xl text-red-600" /><strike>Show Auto Profile Match</strike></>
                        }
                    </div>
                </div>
                <div className="pb-10">
                    <ButtonWrap className='flex w-44 mx-auto h-12 mt-6 items-center gd-right rounded-full text-white justify-center gap-2'>
                        <div className='text-3xl'>
                            <MdOutlineShoppingCart />
                        </div>
                        <div>
                            Purchase
                        </div>
                    </ButtonWrap>
                </div>
            </div>
        </div>
    )
}
export default function Packages() {
    const loaderRef = useAtomValue(loaderRefAtom);
    const [packages, setPackages] = useState(getApiCache('packages'));
    useEffect(() => {
        async function initialize() {
            loaderRef.current.continuousStart();
            const d = await cacheApiResponse('packages');
            if (packages != d) setPackages(d);
            loaderRef.current.complete();
            console.log(d);
        }
        initialize();
    }, [])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="">
            <div className="text-3xl text-center mt-8 mb-8 tp">
                Packages
            </div>
            <div className="w-full">
                <Slider {...settings}>
                    {
                        packages && packages.data.map((x, id) =>
                            <Package key={id} p={x} />
                        )
                    }
                </Slider>
            </div>
        </div>
    );
}