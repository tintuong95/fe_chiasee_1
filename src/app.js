import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoutes} from 'react-router-dom';
import {routers} from './routers';
import {validateToken} from './stores/actions/auth';
import {Spin} from 'antd';

export default function AppRouter() {
	const dispatch = useDispatch();

	const {isLogin} = useSelector((state) => state.auth);
	let routes = useRoutes(routers);

	useEffect(() => {
		if (!isLogin) {
			dispatch(validateToken());
		}
	}, [isLogin]);

	return <>{routes}</>;
}
