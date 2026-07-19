"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Story, User } from "@prisma/client";

type StoryWithUser = Story & {
  user: User;
};

const StoryViewer = ({
  story,
  close,
}: {
  story: StoryWithUser;
  close: () => void;
}) => {
  
  // بستن خودکار بعد از 5 ثانیه
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 5000);

    return () => clearTimeout(timer);
  }, [story, close]);


  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/90
      flex
      items-center
      justify-center
      p-4
      "
    >

      {/* Close button */}
      <button
        onClick={close}
        className="
        absolute
        top-5
        right-5
        text-white
        z-50
        "
      >
        <X size={35} />
      </button>


      {/* Story container */}
      <div
        className="
        relative
        w-full
        max-w-[450px]
        h-[90vh]
        max-h-[700px]
        "
      >

        {/* Story image */}
        <Image
          src={story.img}
          fill
          alt="story"
          unoptimized
          className="
          object-cover
          rounded-xl
          "
        />


        {/* Progress bar */}
        <div
          className="
          absolute
          top-0
          left-0
          h-1
          bg-white
          animate-[storyProgress_5s_linear]
          z-20
          "
        />


        {/* User info */}
        <div
          className="
          absolute
          top-5
          left-5
          flex
          items-center
          gap-3
          text-white
          z-20
          "
        >

          <Image
            src={story.user.avatar || "/noAvatar.png"}
            width={45}
            height={45}
            alt="avatar"
            className="
            rounded-full
            object-cover
            "
          />

          <span className="font-medium">
            {story.user.username}
          </span>

        </div>


      </div>

    </div>
  );
};


export default StoryViewer;