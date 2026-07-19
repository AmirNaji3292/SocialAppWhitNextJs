"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { switchFollow } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserListItem = ({
  user,
  isFollowing,
}: {
  user: User;
  isFollowing: boolean;
}) => {
  const router = useRouter();

  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  const follow = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await switchFollow(user.id);

      setFollowing((prev) => !prev);

      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt={user.username}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <span className="font-semibold">
          {user.username}
        </span>
      </div>

      <button
        onClick={follow}
        disabled={loading}
        className={`px-3 py-1 rounded text-white cursor-pointer disabled:opacity-50 ${
          following ? "bg-gray-500" : "bg-blue-500"
        }`}
      >
        {loading
          ? "Loading..."
          : following
          ? "Following"
          : "Follow"}
      </button>
    </div>
  );
};

export default UserListItem;