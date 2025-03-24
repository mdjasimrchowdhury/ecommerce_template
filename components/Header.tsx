"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { Button } from "./ui/button";

function Header() {
  const { user } = useUser();
  console.log("user:", user);
  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="
                            text-2xl
                            font-bold
                            text-blue-500
                            hover:opacity-45
                            cursor-pointer
                            mx-auto
                            sm:mx-0"
        >
          Testing
        </Link>
        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-0q2 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for Product"
            className="
                        bg-gray-100
                        text-gray-800
                        px-4
                        py-2
                        rounded
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:ring-opacity-50
                        border
                        w-full
                        max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative
                                 flex justify-center 
                                 sm:justify-start
                                    sm:flex-none
                                    items-center
                                    space-x-2
                                    bg-blue-500
                                    hover:bg-blue-700
                                    text-white
                                    font-bold
                                    py-2
                                    px-4
                                    rounded"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span>My Basket</span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex-1 relative
                                 flex justify-center 
                                 sm:justify-start
                                    sm:flex-none
                                    items-center
                                    space-x-2
                                    bg-blue-500
                                    hover:bg-blue-700
                                    text-white
                                    font-bold
                                    py-2
                                    px-4
                                    rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-black">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {/* <div>
              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <div className="hidden sm:block text-xs">
                    <p className="text-gray-400">Welcome Back</p>
                    <p className="font-black">{user.fullName}!</p>
                  </div>
                </div>
              ) : (
                <SignOutButton />
              )}
            </div> */}

            <div>
              {user?.passkeys.length === 0 && (
                <button
                  onClick={createClerkPasskey}
                  className="flex-1 relative
                                   flex justify-center 
                                   sm:justify-start
                                      sm:flex-none
                                      items-center
                                      space-x-2
                                      bg-blue-500
                                      hover:bg-blue-700
                                      text-white
                                      font-bold
                                      py-2
                                      px-4
                                      rounded"
                >
                  Create passkey
                </button>
              )}
            </div>
            {/* <div>
              <button onClick={createClerkPasskey}>Create passkey</button>
            </div> */}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
