"use client";

import Link from "next/link";
import MobileMenu from "../MobileMenu";
import Image from "next/image";
import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

function Navbar() {
  const { userId, isLoaded } = useAuth();

  return (
    <div className="h-24 flex items-center justify-between">
      <div className="hidden md:block font-bold text-2xl w-[20%] text-blue-500">
        <Link href="/">AMIRSOCIAL</Link>
      </div>

      <div className="hidden sm:flex w-[50%] text-sm">
        <div className="flex text-gray-600 gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              width={16}
              height={16}
              alt="Homepage"
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Friends.png"
              width={16}
              height={16}
              alt="Friends"
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Stories.png"
              width={16}
              height={16}
              alt="Stories"
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-8 xl:justify-end">
        {!isLoaded ? (
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-current border-e-transparent"
            role="status"
          />
        ) : userId ? (
          <UserButton />
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-md bg-green-500 text-white">
                Sign Up
              </button>
            </SignUpButton>
          </>
        )}

        <MobileMenu />
      </div>
    </div>
  );
}

export default Navbar;