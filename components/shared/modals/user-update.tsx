import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useUserDetails } from '@/lib/hooks/useAuth';
import UserForm from '@/components/forms/user-form';
import UserFormScreen from '../loading/user-form-screen';
type UpdateUser = {
	id: string;
	onChange: (value: string | null) => void;
};
const UserUpdate: FC<UpdateUser> = ({ id, onChange }) => {
	const { data, isLoading } = useUserDetails(id);
	return (
		<Dialog open={id ? true : false} onOpenChange={() => onChange(null)}>
			<DialogContent className="bg-black-dark md:max-w-[450px] max-w-[85%] border border-primary-gray border-opacity-30">
				{isLoading || !data ? (
					<UserFormScreen />
				) : (
					<>
						<DialogHeader>
							<DialogTitle className="heading-4 text-primary-white">
								Update User
							</DialogTitle>
							<DialogDescription className="text-base-2 text-gray-light">
								Update user info and change the password.
							</DialogDescription>
						</DialogHeader>
						<UserForm
							defaultValues={{
								firstName: data.firstName,
								lastName: data.lastName ? data.lastName : '',
								email: data.email,
								role: data.role,
								password: null,
								status: data.status,
								type: 'UPDATE',
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

export default UserUpdate;
