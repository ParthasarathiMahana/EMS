import { ModeToggle } from "./components/mode-toggle"
import { Outlet } from "react-router-dom"

export default function PublicLayout() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* <div className="absolute top-4 right-4"> */}
        <ModeToggle classNames="mt-2 absolute top-[10px] right-3 z-[2] "/>
      {/* </div> */}
      <Outlet />
    </div>
  )
}
