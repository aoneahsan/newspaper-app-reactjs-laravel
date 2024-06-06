import { Box, Flex } from '@radix-ui/themes';
import IMAGES from '@/assets/images';
import './styles.css';
import { APP_ROUTES } from '@/utils/constants';
import { useMemo } from 'react';
import NavigationLink from '../NavigationLink';
import { useRecoilValue } from 'recoil';
import { userIsAuthenticatedRStateSelector } from '@/state/userState';
import LogoutButton from '../LogoutButton';
import { useMediaQuery } from 'react-responsive';

const Header: React.FC = () => {
	const links = useMemo(() => {
		return [
			{
				path: APP_ROUTES.home,
				isAuthenticated: true,
				label: 'Search Articles',
			},
			{
				path: APP_ROUTES.userFeed,
				isAuthenticated: true,
				label: 'News Feed',
			},
			{
				path: APP_ROUTES.myAccount,
				isAuthenticated: true,
				label: 'My Account',
			},
			{
				path: APP_ROUTES.login,
				isAuthenticated: false,
				label: 'Login',
			},
			{
				path: APP_ROUTES.register,
				isAuthenticated: false,
				label: 'Register',
			},
		];
	}, []);
	const userIsAuthenticatedRState = useRecoilValue(
		userIsAuthenticatedRStateSelector
	);
	const isMobile = useMediaQuery({
		maxWidth: '700px',
	});

	return (
		<>
			<Box className='header-con'>
				<Box
					className='header-content'
					py='3'
				>
					<Flex
						justify={isMobile ? 'center' : 'between'}
						align='center'
						direction={isMobile ? 'column' : 'row'}
					>
						<img
							src={IMAGES.NewsPaperAppIcon}
							width={60}
						/>
						<Flex
							justify={isMobile ? 'center' : 'start'}
							align='center'
							mt={isMobile ? '4' : '0'}
							wrap='wrap'
						>
							{links.map((el, index) => (
								<NavigationLink
									isAuthenticated={el.isAuthenticated}
									label={el.label}
									path={el.path}
									key={`${el.path}-${el.label}-${index}`}
								/>
							))}
							{userIsAuthenticatedRState ? <LogoutButton /> : null}
						</Flex>
					</Flex>
				</Box>
			</Box>
		</>
	);
};
export default Header;
