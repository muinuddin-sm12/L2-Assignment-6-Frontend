'use client';
// import { usePathname } from 'next/navigation';
import { useEffect } from 'react'

const ScrollRestoration = () => {
    // const pathname = usePathname();
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])
  return null;
}

export default ScrollRestoration