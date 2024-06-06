import { Box, Button, Flex, Link, Text } from '@radix-ui/themes';
import './styles.css';
import { developerDetails } from '@/utils/constants';
import { LinkTarget } from '@/enums';
import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

const Footer: React.FC = () => {
	const links = useMemo(() => {
		return [
			{
				url: developerDetails.linkedinProfile,
				label: 'Linkedin Profile',
			},
			{
				url: developerDetails.githubProfile,
				label: 'Github Profile',
			},
			{
				url: developerDetails.updatedResume,
				label: 'Updated Resume',
			},
			{
				url: developerDetails.updatedCV,
				label: 'Updated CV',
			},
		];
	}, []);
	const isMobile = useMediaQuery({
		maxWidth: '700px',
	});
	return (
		<>
			<Box
				className='footer-con'
				py='2'
			>
				<Box className='footer-content'>
					<Flex
						justify={isMobile ? 'center' : 'between'}
						align='center'
						direction={isMobile ? 'column' : 'row'}
					>
						<Text align={isMobile ? 'center' : 'left'}>All rights reserved © {new Date().getFullYear()}</Text>
						<Text align={isMobile ? 'center' : 'left'}>
							Developed by{' '}
							<Link
								href={developerDetails.portfolioWebsite}
								target={LinkTarget.blank}
							>
								Ahsan Mahmood
							</Link>{' '}
							with ♡
						</Text>
					</Flex>
					<Flex
						justify='center'
						align='center'
						mt={isMobile ? '2': '1'}
						wrap='wrap'
					>
						{links.map((el) => {
							return (
								<Button
									size='1'
									asChild
									mr='2'
									mb={isMobile ? '2': '0'}
								>
									<Link
										href={el.url}
										target={LinkTarget.blank}
									>
										{el.label}
									</Link>
								</Button>
							);
						})}
					</Flex>
				</Box>
			</Box>
		</>
	);
};
export default Footer;
