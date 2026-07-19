"use client";

import { switchLike } from "@/lib/action";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

function PostInterAction({
  postId,
  commentNumber,
  likes,
}: {
  postId: number;
  commentNumber: number;
  likes: string[];
}) {
  const { userId, isLoaded } = useAuth();

  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLike: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state) => {
      return {
        likeCount: state.isLike
          ? state.likeCount - 1
          : state.likeCount + 1,
        isLike: !state.isLike,
      };
    }
  );

  const likeAction = async () => {
    if (!userId || !isLoaded) return;

    switchOptimisticLike("");

    try {
      await switchLike(postId);

      setLikeState((state) => ({
        likeCount: state.isLike
          ? state.likeCount - 1
          : state.likeCount + 1,
        isLike: !state.isLike,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex bg-gray-100 p-1 rounded-2xl gap-3">
          <div className="flex gap-2 justify-center items-center">
            <form action={likeAction}>
              <button type="submit">
                <Image
                  src={optimisticLike.isLike ? "/liked.png" : "/like.png"}
                  alt="like"
                  width={20}
                  height={20}
                />
              </button>
            </form>

            <span className="text-gray-400">
              Like | {optimisticLike.likeCount}
            </span>
          </div>

          <div className="bg-gray-100 p-1 rounded-2xl">
            <div className="flex gap-2 justify-center items-center">
              <Image
                src="/comment.png"
                alt="comment"
                width={20}
                height={20}
              />

              <span className="text-gray-400">
                Comments | {commentNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 bg-gray-100 rounded-2xl px-2 justify-center items-center">
          <Image
            src="/share.png"
            alt="share"
            width={18}
            height={18}
          />

          <span className="text-gray-400">
            Share | 200
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostInterAction;