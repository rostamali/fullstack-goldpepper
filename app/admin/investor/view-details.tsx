import InvestorForm from '@/components/forms/investor-form';
import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useInvestorDetails } from '@/lib/hooks/useInvest';
type DetailProps = {
	id: string;
	onChange: (val: string | null) => void;
};

const ViewDetails: FC<DetailProps> = ({ id, onChange }) => {
	const { data, isLoading } = useInvestorDetails(id);

	return (
		<Dialog open={id ? true : false} onOpenChange={() => onChange(null)}>
			<DialogContent className="bg-black-dark md:max-w-[450px] max-w-[85%] border border-primary-gray border-opacity-30">
				{isLoading || !data ? (
					'Loading'
				) : (
					<>
						<DialogHeader>
							<DialogTitle className="heading-4 text-primary-white">
								Investor details
							</DialogTitle>
							<DialogDescription className="text-base-2 text-gray-light">
								Check investor details and update the
								information
							</DialogDescription>
						</DialogHeader>
						<InvestorForm
							defaultValues={{
								name: data?.name,
								email: data?.email,
								status: data.status,
								phone: data.phoneNumber || '',
								type: 'CREATE',
								sendMessage: false,
							}}
							id={id}
						/>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ViewDetails;
