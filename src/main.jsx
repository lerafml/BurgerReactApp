import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { configStore } from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configStore();

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
);
