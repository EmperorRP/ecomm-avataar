"use client"
import { useEffect, useState, useRef } from 'react';
import { MenuIcon, ChevronDownIcon, XIcon, SearchIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Logo from '@/public/Logo.png'

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Electronics', href: '/electronics' },
  { name: 'Books', href: '/books' },
  { name: 'Music', href: '/music' },
  { name: 'Movies', href: '/movies' },
  { name: 'Clothing', href: '/clothing' },
  { name: 'Furniture', href: '/furniture' },
  { name: 'Electronics', href: '/electronics' },
  { name: 'Travel', href: '/travel' },
  { name: 'Botanical', href: '/botanical' },
  { name: 'Category Name', href: '/error' },
];

const Navbar = () => {
  const [visibleItems, setVisibleItems] = useState<NavItem[]>(navItems);
  const [overflowItems, setOverflowItems] = useState<NavItem[]>([]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (navRef.current) {
        const currentWidth = navRef.current.offsetWidth;
        const moreButtonWidth = moreButtonRef.current?.offsetWidth || 0;
        let availableWidth = currentWidth - moreButtonWidth;
        let totalWidth = 0;
        const newVisibleItems: NavItem[] = [];
        const newOverflowItems: NavItem[] = [];

        navItems.forEach(item => {
          const itemWidthEstimate = item.name.length * 15 + 40;
          if (totalWidth + itemWidthEstimate < availableWidth) {
            newVisibleItems.push(item);
            totalWidth += itemWidthEstimate;
          } else {
            newOverflowItems.push(item);
          }
        });

        setVisibleItems(newVisibleItems);
        setOverflowItems(newOverflowItems);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node) &&
        isMoreOpen
      ) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMoreOpen]);

  const toggleMore = () => setIsMoreOpen(!isMoreOpen);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <nav ref={navRef} className="bg-[#2F302C] text-white">
      <div className="flex justify-between items-center px-4 py-2 ">
        <a href="/" className="text-white text-3xl font-bold flex items-center mr-6" style={{ whiteSpace: 'nowrap' }}>
          <Image src={Logo} alt='ecomm logo' width={25} height={25} className='mr-2'/>
          E-COMM
        </a>

        <div className="md:hidden">
          <button onClick={toggleNav}>
            {isNavOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        <div className={`hidden md:flex flex-col md:flex-row items-center space-x-4`}>
          {visibleItems.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-blue-300 py-2">
              {item.name.toUpperCase()}
            </a>
          ))}

          {overflowItems.length > 0 && (
            <div className="relative">
              <button
                ref={moreButtonRef}
                onClick={toggleMore}
                className="hover:text-blue-300 flex items-center"
              >
                MORE <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              
              {isMoreOpen && (
                <div className="absolute right-0 bg-[#2F302C] text-white shadow-md z-10">
                  {overflowItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-[#EEEEEE] hover:text-[#231F20]"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search something"
                className="bg-[#2F302C] p-2 pl-10 w-full"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isNavOpen ? 'block' : 'hidden'}`}>
        {navItems.map((item) => (
          <a key={item.name} href={item.href} className="block py-2 px-4 text-sm hover:bg-blue-300 text-white">
            {item.name}
          </a>
        ))}
        <div className="p-4">
          <input type="text" placeholder="Search something" className="bg-gray-800 p-2 w-full" />
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;