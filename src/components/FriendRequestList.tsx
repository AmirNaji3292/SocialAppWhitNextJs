'use client';

import { useEffect, useState } from "react";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/action";

type RequestWithUser = FollowRequest & {
  sender: User;
};

function FriendRequestList({ requests }: { requests: RequestWithUser[] }) {
  const [requestState, setRequestState] = useState(requests);

  // اگر requests از Server Component تغییر کرد، state هم به‌روز شود
  useEffect(() => {
    setRequestState(requests);
  }, [requests]);

  const accept = async (requestId: number, userId: string) => {
    try {
      await acceptFollowRequest(userId);

      setRequestState((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const decline = async (requestId: number, userId: string) => {
    try {
      await declineFollowRequest(userId);

      setRequestState((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {requestState.map((request) => (
        <div
          key={request.id}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />

            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? `${request.sender.name} ${request.sender.surname}`
                : request.sender.username}
            </span>
          </div>

          <div className="flex gap-5">
            <button
              onClick={() => accept(request.id, request.sender.id)}
            >
              <Image
                src="/accept.png"
                alt="accept"
                width={20}
                height={20}
              />
            </button>

            <button
              onClick={() => decline(request.id, request.sender.id)}
            >
              <Image
                src="/reject.png"
                alt="reject"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendRequestList;