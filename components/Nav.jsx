'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut, signIn, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [ providers, setProviders ] = useState(null);
  const [toggleDropDwon, setToggleDropDwon] = useState(false)

  useEffect(() => {
    const setProvidersHandler = async () => {
      const response = await getProviders();
      setProviders(response)
    }

    setProvidersHandler();
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg"  alt="promptopia logo" width={30} height={30} className="object-contain" />
      </Link>
      <p className="logo_text">Promptopia</p>

      {/* DESKTOP NAVIGATION */} 
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image src={session?.user.image} width={37} height={37} alt="profile" className="rounded-full" />
            </Link>
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* MOBIEL NAVIGATION */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user.image} width={37} height={37} alt="profile" className="rounded-full" onClick={() => setToggleDropDwon((prev) => !prev)}/>
            {toggleDropDwon && (
              <div className="dropdown">
                <Link href="/profile" className="dropdwon_link" onClick={() => setToggleDropDwon(false)}>
                  My Profile
                </Link>

                <Link href="/create-prompt" className="dropdwon_link" onClick={() => setToggleDropDwon(false)}>
                  Create Prompt
                </Link>
                <button type="button" className="mt-5 w-full black_btn" onClick={() => {
                  setToggleDropDwon(false);
                  signOut();
                }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav