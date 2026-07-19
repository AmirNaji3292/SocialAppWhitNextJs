import ProfileCard from "./ProfileCard";
import Link from "next/link";
import Image from "next/image";
import Ad from "./Ad";

function LeftMenue({ type }: { type: "home" | "profile" }) {
  const menuItems = [
    { icon: "posts.png", title: "My Posts" },
    { icon: "activity.png", title: "Activity" },
    { icon: "market.png", title: "Market" },
    { icon: "events.png", title: "Events" },
    { icon: "albums.png", title: "Albums" },
    { icon: "videos.png", title: "Videos" },
    { icon: "news.png", title: "News" },
    { icon: "courses.png", title: "Courses" },
    { icon: "lists.png", title: "Lists" },
    { icon: "settings.png", title: "Settings" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}

      <div className="p-4 bg-white shadow-md text-sm rounded-lg text-gray-500 flex flex-col gap-2">
        {menuItems.map((item) => (
          <div key={item.title}>
            <Link
              href="/"
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
            >
              <Image
                src={`/${item.icon}`}
                alt={item.title}
                width={20}
                height={20}
              />

              <span>{item.title}</span>
            </Link>

            <hr className="border-t border-gray-100 w-36 self-center" />
          </div>
        ))}
      </div>

      <Ad size="sm" />
    </div>
  );
}

export default LeftMenue;