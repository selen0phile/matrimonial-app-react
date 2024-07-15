import { MdMenu } from "react-icons/md";
import { IconButton } from "@mui/material";
import { useAtom } from 'jotai';
import { sidebarOpenAtom } from '../atoms/General';

export default function AppBar() {
  const [open, setOpen] = useAtom(sidebarOpenAtom);
  return (
    <div className="sticky shadow-md shadow-gray-400 top-0 z-20 w-full h-14 flex items-center gd-right text-white">
      <div className="mx-2">
        <IconButton onClick={() => setOpen(true)}>
          <MdMenu className="text-white text-2xl" />
        </IconButton>
      </div>
      <div>
        MEETNMARRY
      </div>
    </div>
  )
}
