import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { Link, Outlet } from 'react-router-dom';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import {
	HomeIcon,
	LineChartIcon,
	Package2Icon,
	PackageIcon,
	PanelLeftIcon,
	SearchIcon,
	SettingsIcon,
	ShoppingCartIcon,
	UsersIcon,
} from 'lucide-react';

function App() {
	return (
		<>
			<div className='flex min-h-screen w-full flex-col bg-muted/40'>
				<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
					<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
						<TooltipProvider>
							<Link
								to='#'
								className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
							>
								<Package2Icon className='h-4 w-4 transition-all group-hover:scale-110' />
								<span className='sr-only'>Acme Inc</span>
							</Link>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to='#'
										className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
									>
										<HomeIcon className='h-5 w-5' />
										<span className='sr-only'>
											Dashboard
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>
									Dashboard
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to='#'
										className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
									>
										<ShoppingCartIcon className='h-5 w-5' />
										<span className='sr-only'>Orders</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>
									Orders
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to='#'
										className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
									>
										<PackageIcon className='h-5 w-5' />
										<span className='sr-only'>
											Products
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>
									Products
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to='#'
										className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
									>
										<UsersIcon className='h-5 w-5' />
										<span className='sr-only'>
											Customers
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>
									Customers
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to='#'
										className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
									>
										<LineChartIcon className='h-5 w-5' />
										<span className='sr-only'>
											Analytics
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>
									Analytics
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</nav>
					<nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to='#'
										className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
									>
										<SettingsIcon className='h-5 w-5' />
										<span className='sr-only'>
											Settings
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right'>
									Settings
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</nav>
				</aside>
				<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
					<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
						<Sheet>
							<SheetTrigger asChild>
								<Button
									size='icon'
									variant='outline'
									className='sm:hidden'
								>
									<PanelLeftIcon className='h-5 w-5' />
									<span className='sr-only'>Toggle Menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side='left'
								className='sm:max-w-xs'
							>
								<nav className='grid gap-6 text-lg font-medium'>
									<Link
										to='#'
										className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
									>
										<Package2Icon className='h-5 w-5 transition-all group-hover:scale-110' />
										<span className='sr-only'>
											Acme Inc
										</span>
									</Link>
									<Link
										to='/'
										className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
									>
										<HomeIcon className='h-5 w-5' />
										Dashboard
									</Link>
									<Link
										to='#'
										className='flex items-center gap-4 px-2.5 text-foreground'
									>
										<ShoppingCartIcon className='h-5 w-5' />
										Orders
									</Link>
									<Link
										to='#'
										className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
									>
										<PackageIcon className='h-5 w-5' />
										Products
									</Link>
									<Link
										to='#'
										className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
									>
										<UsersIcon className='h-5 w-5' />
										Customers
									</Link>
									<Link
										to='#'
										className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
									>
										<LineChartIcon className='h-5 w-5' />
										Analytics
									</Link>
									<Link
										to='#'
										className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
									>
										<SettingsIcon className='h-5 w-5' />
										Settings
									</Link>
								</nav>
							</SheetContent>
						</Sheet>
						<Breadcrumb className='hidden md:flex'>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link to='/'>Dashboard</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>Overview</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<div className='relative ml-auto flex-1 md:grow-0'>
							<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								type='search'
								placeholder='Search...'
								className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
							/>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									size='icon'
									className='overflow-hidden rounded-full'
								>
									<img
										src='/placeholder.svg'
										width={36}
										height={36}
										alt='Avatar'
										className='overflow-hidden rounded-full'
										style={{
											aspectRatio: '36/36',
											objectFit: 'cover',
										}}
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link to='profile'>Configuración</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>
					<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
						<div className='absolute inset-0 -z-10 h-full w-full bg-inherit bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'></div>
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
