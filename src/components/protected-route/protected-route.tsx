import { useSelector } from '@/services/store';
import { getIsAuthChecked, getUser } from '../../services/user/reducer';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedProps {
	onlyUnAuth?: boolean;
	component: React.JSX.Element;
}
const Protected = ({
	onlyUnAuth = false,
	component,
}: ProtectedProps): React.JSX.Element => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUser);
	const location = useLocation();

	if (!isAuthChecked) {
		return <p>Loading...</p>;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
	component,
}: Pick<ProtectedProps, 'component'>) => (
	<Protected onlyUnAuth={true} component={component} />
);
