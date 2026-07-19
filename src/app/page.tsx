import AddPost from "@/components/AddPost";
import FeedPage from "@/components/FeedPage";

import LeftMenue from "@/components/LeftMenue";
import RightMenue from "@/components/RightMenue";
import Stories from "@/components/Stories";
import Image from "next/image";

export default function Page() {
  
  return (
    <div className="flex gap-4 pt-3">
         <div className="hidden lg:block w-[25%] ">
          <LeftMenue type="home"/></div>
         <div className="w-full sm:w-[60%] bg-gray-100">
           <div className="flex gap-3 flex-col">
            <Stories/>
            <AddPost/>
            <FeedPage/>
           </div>
         </div>
         <div className="hidden sm:block w-[35%]"><RightMenue/></div>
    </div>
  );
}
