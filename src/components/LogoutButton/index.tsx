import { useDeleteRequest } from '@/hooks/reactQuery';
import { useResponsiveScales } from '@/hooks/reactResponsive';
import { userDataRStateAtom } from '@/state/userState';
import { API_URLS } from '@/utils/constants';
import { reactQueryKeys } from '@/utils/constants/reactQuery';
import {
	clearAuthDataFromLocalStorage,
	getTestingAttribute,
} from '@/utils/helpers';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/helpers/reactToastify';
import { elementTestSelector } from '@/utils/constants/testingSelectors';
import { Button } from '@radix-ui/themes';
import { useSetRecoilState } from 'recoil';

const LogoutButton: React.FC = () => {
	const { isMobile, isTablet } = useResponsiveScales();
	const setUserDataRState = useSetRecoilState(userDataRStateAtom);
	const { mutateAsync: logoutUser } = useDeleteRequest(
		reactQueryKeys.mutation.logout
	);

	const onLogout = async () => {
		try {
			await logoutUser({
				url: API_URLS.logout,
				isAuthenticatedRequest: true,
			});

			await clearAuthDataFromLocalStorage();
			showSuccessNotification();
			setUserDataRState(null);
		} catch (error) {
			showErrorNotification();
		}
	};

	return (
		<Button
			onClick={onLogout}
			size={isTablet ? '3' : '2'}
			color='red'
			mb={isMobile ? '2' : '0'}
			{...getTestingAttribute(elementTestSelector.components.logout)}
		>
			Logout
		</Button>
	);
};
export default LogoutButton;
