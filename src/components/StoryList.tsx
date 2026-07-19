"use client";

import { startTransition, useOptimistic, useState } from "react";
import { addStory } from "@/lib/action";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import StoryViewer from "./StoryViewer";

type StoryWithUser = Story & {
  user: User;
};

const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>(null);
  const [selectedStory, setSelectedStory] =
    useState<StoryWithUser | null>(null);

  const { user } = useUser();


  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );


  const add = async () => {
    if (!img?.secure_url) return;


    const optimisticStory: StoryWithUser = {
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId,

      user: {
        id: userId,
        username: "Sending...",
        avatar: user?.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(),
      },
    };


    startTransition(() => {
      addOptimisticStory(optimisticStory);
    });


    try {

      const createdStory = await addStory(img.secure_url);


      if (createdStory) {
        setStoryList((prev) => [
          createdStory,
          ...prev,
        ]);
      }


      setImg(null);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>

      {/* ADD STORY */}
      <CldUploadWidget
        uploadPreset="socialApp"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => (
          <div className="flex flex-col items-center gap-2 cursor-pointer relative">

            <Image
              src={
                img?.secure_url ||
                user?.imageUrl ||
                "/noAvatar.png"
              }
              alt=""
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2 object-cover"
              onClick={() => open()}
            />


            {img ? (
              <button
                onClick={add}
                className="
                text-xs
                bg-blue-500
                p-1
                rounded-md
                text-white
                "
              >
                Send
              </button>
            ) : (
              <span className="font-medium">
                Add a Story
              </span>
            )}


            <div className="
              absolute
              top-1
              text-6xl
              text-gray-200
              pointer-events-none
            ">
              +
            </div>


          </div>
        )}
      </CldUploadWidget>



      {/* STORIES */}
      <div className="flex gap-4">

        {optimisticStories.map((story) => (

          <div
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="
            flex
            flex-col
            items-center
            gap-2
            cursor-pointer
            "
          >

            <Image
              src={
                story.user.avatar ||
                "/noAvatar.png"
              }
              alt=""
              width={80}
              height={80}
              className="
              w-20
              h-20
              rounded-full
              ring-2
              object-cover
              "
            />


            <span className="font-medium">
              {story.user.name ||
                story.user.username}
            </span>


          </div>

        ))}

      </div>



      {/* STORY VIEWER */}

      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          close={() => setSelectedStory(null)}
        />
      )}


    </>
  );
};


export default StoryList;