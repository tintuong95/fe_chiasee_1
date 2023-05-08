import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/root.css';
import 'antd/dist/reset.css';
import './pintura/pintura.css';
// import {BrowserRouter} from 'react-router-dom';
// import { router } from './routes';
import './boostrap';
// import AppRouter from './App';
// import {Provider} from 'react-redux';
// import {store} from './stores';

// import {MittProvider} from 'react-mitt';
// import {ErrorBoundary} from './pages/error/ErrorBoundary';
// import {ConfigProvider} from 'antd';
// import { CustomRouter, history } from './routes/history';



import {CustomRouter, history} from './utils/history';
import {Provider} from 'react-redux';
import {MittProvider} from 'react-mitt';
import {ErrorBoundary} from './pages/error';
import {store} from './stores';
import AppRouter from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<CustomRouter history={history}>
		<Provider store={store}>
			<MittProvider>
				<ErrorBoundary>
					<AppRouter />
				</ErrorBoundary>
			</MittProvider>
		</Provider>
	</CustomRouter>
);
