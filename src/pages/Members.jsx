import Slider from "react-slick";
import { BsPersonFill } from "react-icons/bs"
import { useAtomValue } from 'jotai';
import { getApiResponse, getImageURL } from "../utils/API"
import { MdBlock, MdFavoriteBorder, MdPlace } from "react-icons/md"
import ButtonWrap from "../components/ButtonWrap"
import { IconButton } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaCrown } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { loaderRefAtom } from "../atoms/General";

function MemberCard({ index, photo, name, memberId, age, height, location, isPremium, interestStat, shortlistStat, userId, slickRef }) {
  return (
    <div className="h-[80vh] relative m-4 border rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${getImageURL(photo)})` }}>
      <div className="text-white w-full rounded-b-2xl bg-[#00000099] bottom-0 absolute p-4">
        <div className="font-bold text flex items-center gap-1">
          {name}{isPremium ? <FaCrown color="orange" /> : <></>}
        </div>
        <div className="text-xs">Member Id:  &nbsp;
          <span className="font-bold">{memberId}</span>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="">
            <div className="flex gap-1 items-center text-xs">
              <BsPersonFill />
              <div>{age} years, {height}</div>
            </div>
            <div className="flex gap-1 items-center text-xs">
              <MdPlace />
              <div>{location}</div>
            </div>
          </div>
          <div>
            <ButtonWrap className='flex w-24 mx-auto h-8 items-center gd-right rounded-full text-white text-xs font-bold justify-center gap-2'>
              <div>
                Full Profile
              </div>
            </ButtonWrap>
          </div>
        </div>
        <div className="w-full flex justify-evenly mt-4">
          <IconButton onClick={() => slickRef.current.slickGoTo(index - 1)} style={{ background: '#80808033' }}><IoIosArrowBack color='white' /></IconButton>

          <IconButton className="gd-bottom"><MdBlock color='white' /></IconButton>

          <IconButton className="gd-bottom"><MdFavoriteBorder color='white' /></IconButton>

          <IconButton className="gd-bottom"><AiOutlineUserAdd color='white' /></IconButton>

          <IconButton onClick={() => slickRef.current.slickGoTo(index + 1)} style={{ background: '#80808033' }}><IoIosArrowForward color='white' /></IconButton>
        </div>
      </div>
    </div>
  )
}
export default function Members() {
  const [members, setMembers] = useState([]);
  const loaderRef = useAtomValue(loaderRefAtom);
  useEffect(() => {
    async function initialize() {
      loaderRef.current.continuousStart();
      const d = await getApiResponse('memberListing');
      setMembers(d.data.members);
      loaderRef.current.complete();
    }
    initialize();
  }, [])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const slickRef = useRef();
  return (
    <div>
      <Slider {...settings} ref={slickRef}>
        {
          members && members.length > 0 &&
          members.map((member, i) =>
            <MemberCard
              key={i}
              index={i}
              slickRef={slickRef}
              name={member.first_name + " " + member.last_name}
              userId={member.user_id}
              photo={member.photo}
              memberId={member.code}
              age={member.age}
              height={member.height}
              location={member.country}
              isPremium={true}
              interestStat={0}
              shortlistStat={0}
            />
          )
        }
      </Slider>

    </div>
  )
}
