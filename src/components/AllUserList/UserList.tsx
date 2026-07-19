import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import UserListItem from "./UserListItem";

const UserList = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    include: {
      followers: {
        where: {
          followerId: userId,
        },
      },
    },
  });

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          isFollowing={user.followers.length > 0}
        />
      ))}
    </div>
  );
};

export default UserList;