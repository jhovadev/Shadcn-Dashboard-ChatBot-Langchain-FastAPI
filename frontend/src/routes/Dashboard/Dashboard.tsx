import { Button } from '@/components/ui/button';
import Chat from '@/components/Chat';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig: ChartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
	CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
('use client');

import { Payment, columns } from './columns';
import { DataTable } from './data-table';
import { useState } from 'react';

export default function Dashboard() {
	const [data, setData] = useState<Payment[]>([
		{
			id: '728ed52f',
			amount: 100,
			status: 'pending',
			email: 'me@example.com',
		},
		{
			id: '728ed52f',
			amount: 100,
			status: 'pending',
			email: 'ma@example.com',
		},
		{
			id: '728ed52f',
			amount: 200,
			status: 'processing',
			email: 'mi@example.com',
		},
		{
			id: '728ed52f',
			amount: 300,
			status: 'success',
			email: 'm@example.com',
		},
	]);
	return (
		<>
			<div className='grid auto-rows-max items-start gap-4 md:gap-8'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					Dashboard
				</h1>
				<DataTable
					columns={columns}
					data={data}
				/>

				<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
					<Card
						className='sm:col-span-2'
						x-chunk='dashboard-05-chunk-0'
					>
						<CardHeader className='pb-3'>
							<CardTitle>Overview</CardTitle>
							<CardDescription className='max-w-lg text-balance leading-relaxed'>
								Get a high-level view of your business
								performance.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button>View Details</Button>
						</CardFooter>
					</Card>
					<Card x-chunk='dashboard-05-chunk-1'>
						<CardHeader className='pb-2'>
							<CardDescription>This Week</CardDescription>
							<CardTitle className='text-4xl'>$1,329</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-xs text-muted-foreground'>
								+25% from last week
							</div>
						</CardContent>
						<CardFooter>
							<Progress
								value={25}
								aria-label='25% increase'
							/>
						</CardFooter>
					</Card>
					<Card x-chunk='dashboard-05-chunk-2'>
						<CardHeader className='pb-2'>
							<CardDescription>This Month</CardDescription>
							<CardTitle className='text-4xl'>$5,329</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-xs text-muted-foreground'>
								+10% from last month
							</div>
						</CardContent>
						<CardFooter>
							<Progress
								value={12}
								aria-label='12% increase'
							/>
						</CardFooter>
					</Card>
					<Card x-chunk='dashboard-05-chunk-3'>
						<CardHeader className='pb-2'>
							<CardDescription>New Customers</CardDescription>
							<CardTitle className='text-4xl'>+125</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-xs text-muted-foreground'>
								+15% from last month
							</div>
						</CardContent>
						<CardFooter>
							<Progress
								value={15}
								aria-label='15% increase'
							/>
						</CardFooter>
					</Card>
					<Chat className='sm:col-span-2' />
				</div>
			</div>
		</>
	);
}
