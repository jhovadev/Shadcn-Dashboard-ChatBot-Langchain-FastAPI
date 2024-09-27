import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Profile from './routes/Profile.tsx';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				element: <Dashboard />,
				index: true,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={routes} />
	</StrictMode>
);
