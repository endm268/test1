import Header from '@/components/shared/header';
import MobileNav from '@/components/shared/mobileNav';
import SkeletonSideBar from '@/components/skeleton/SkeletonSideBar';
import { Separator } from '@/components/ui/separator';
import React from 'react'

const loading = () => {
  return (
    <main className="root">
      <SkeletonSideBar />
      <MobileNav />
      <div className="root-container">
        <Header />
        <Separator className="my-4 hidden lg:flex" />

      </div>
    </main>
  );
}

export default loading