'use client'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import AppSidebar from './sidebar'

interface MobileSidebarProps {
  className?: string;
  apiCount: number;
  credits: number;
}

const MobileSidebar = ({ className, apiCount, credits  }: MobileSidebarProps) => {
  return (
    <div className={cn('flex justify-start', className)}>
      <Sheet>
        <SheetTrigger className='md:hidden shadow-sm shadow-white/50 m-4 p-2 border-b border-white/20 bg-white/10 rounded-xl text-white' aria-label='Open menu'>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left' className='p-0 border-r border-white/20 bg-white/10 rounded-r-2xl'>
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          <AppSidebar userApiUses={apiCount} userCreditsAmount={credits} />
          <SheetDescription>Mobile Sidebar</SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileSidebar
