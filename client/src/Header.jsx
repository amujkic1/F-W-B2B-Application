import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from './components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from './components/ui/dropdown-menu'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from './components/ui/sheet'

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('token')
        setIsLoggedIn(Boolean(token))
    }, [location.pathname])

    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('email')
        Cookies.remove('company')
        setIsLoggedIn(false)
        setIsMobileOpen(false)
        navigate('/login')
    }

    const navLinkClass = (path) => {
        const isActive = location.pathname === path
        return [
            'rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors',
            isActive ? 'bg-white/20 text-white' : 'text-slate-200 hover:bg-white/10 hover:text-white',
        ].join(' ')
    }

    const b2bActive = ['/b2b', '/companies', '/agenda'].includes(location.pathname)
    const b2bLabelClass = [
        'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors',
        b2bActive ? 'bg-white/20 text-white' : 'text-slate-200 hover:bg-white/10 hover:text-white',
    ].join(' ')

    const closeMobileMenu = () => setIsMobileOpen(false)

    const MobileNavLink = ({ to, children }) => (
        <SheetClose asChild>
            <Link to={to} className={navLinkClass(to)} onClick={closeMobileMenu}>
                {children}
            </Link>
        </SheetClose>
    )

    return (
        <header className='fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-[#37517e]/95 backdrop-blur'>
            <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
                <Link
                    to='/'
                    className='text-2xl font-bold tracking-tight text-white no-underline transition-opacity hover:opacity-85'
                    onClick={closeMobileMenu}
                >
                    SABAU
                </Link>

                <nav className='hidden items-center gap-2 lg:flex'>
                    <Link to='/' className={navLinkClass('/')}>Naslovna</Link>
                    <Link to='/services' className={navLinkClass('/services')}>Izlagaci</Link>
                    <Link to='/portfolio' className={navLinkClass('/portfolio')}>Galerija</Link>
                    <Link to='/team' className={navLinkClass('/team')}>Govornici</Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={b2bLabelClass}>
                                B2B
                                <ChevronDown size={14} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link to='/companies' className='w-full no-underline'>Baza kompanija</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to='/b2b' className='w-full no-underline'>Zakazite sastanak</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to='/agenda' className='w-full no-underline'>Agenda</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link to='/contact' className={navLinkClass('/contact')}>Kontakt</Link>

                    {isLoggedIn && <Link to='/profile' className={navLinkClass('/profile')}>Moj Profil</Link>}

                    {isLoggedIn && (
                        <Button variant='secondary' size='sm' onClick={handleLogout} className='ml-2'>
                            Odjavite se
                        </Button>
                    )}
                </nav>

                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant='ghost'
                            size='sm'
                            className='text-white hover:bg-white/10 hover:text-white lg:hidden'
                            aria-label={isMobileOpen ? 'Zatvori meni' : 'Otvori meni'}
                        >
                            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </SheetTrigger>

                    <SheetContent side='right'>
                        <SheetHeader>
                            <SheetTitle>Navigacija</SheetTitle>
                            <SheetDescription>Brzi pristup svim stranicama</SheetDescription>
                        </SheetHeader>

                        <div className='mt-6 flex flex-col gap-1'>
                            <MobileNavLink to='/'>Naslovna</MobileNavLink>
                            <MobileNavLink to='/services'>Izlagaci</MobileNavLink>
                            <MobileNavLink to='/portfolio'>Galerija</MobileNavLink>
                            <MobileNavLink to='/team'>Govornici</MobileNavLink>
                            <MobileNavLink to='/companies'>Baza kompanija</MobileNavLink>
                            <MobileNavLink to='/b2b'>Zakazite sastanak</MobileNavLink>
                            <MobileNavLink to='/agenda'>Agenda</MobileNavLink>
                            <MobileNavLink to='/contact'>Kontakt</MobileNavLink>

                            {isLoggedIn && (
                                <>
                                    <MobileNavLink to='/profile'>Moj Profil</MobileNavLink>
                                    <Button variant='secondary' size='sm' onClick={handleLogout} className='mt-2 w-full'>
                                        Odjavite se
                                    </Button>
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default Header