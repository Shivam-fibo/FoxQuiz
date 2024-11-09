import React from 'react';
import { Navbar, Container, Button } from '@material-tailwind/react';
import { useState } from 'react';
import IconButton from '@material-tailwind/react';
// import { Bars3Icon } from '@heroicons/react/solid'; 


const MobileNavLinks = () => {
    const [open, setOpen] = useState(false);
  
    return (
      <ul className="flex flex-col py-4">
        {open ? (
            <div>

          <li><a href="#" className="text-white">Link 1</a></li>
          <li><a href="#" className="text-white">Link 2</a></li>
            </div>
        ) : null}
      </ul>
    );
  };

export const Header = () => {
    const [open, setOpen] = useState(false);
  return (
    <Navbar variant="dark" className="bg-gray-800">
      <Container>
        <Button variant="text" className="text-white">
          Logo
        </Button>
        <nav className="flex justify-end">
          {/* Mobile nav links */}
          <ul className="hidden sm:flex">
            <li><a href="#" className="text-white">Link 1</a></li>
            <li><a href="#" className="text-white">Link 2</a></li>
          </ul>
          {/* Hamburger menu */}
          <IconButton aria-label="Toggle navigation" className="sm:hidden" onClick={() => setOpen(!open)}>
           {/* <Bars3Icon /> */}
          </IconButton>
          {open && <MobileNavLinks />}
        </nav>
      </Container>
    </Navbar>
  );
};

