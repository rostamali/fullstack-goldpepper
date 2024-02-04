import UserForm from '@/components/forms/user-form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const UserCreate = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn-primary-lg">Add User</Button>
			</DialogTrigger>
			<DialogContent className="bg-black-dark md:max-w-[450px] max-w-[85%] border border-primary-gray border-opacity-30">
				<DialogHeader>
					<DialogTitle className="heading-4 text-primary-white">
						Create New User
					</DialogTitle>
					<DialogDescription className="text-base-2 text-gray-light">
						Create a brand new user and add them to this site.
					</DialogDescription>
				</DialogHeader>
				<UserForm
					defaultValues={{
						firstName: '',
						lastName: '',
						email: '',
						role: '',
						password: '',
						status: '',
						type: 'CREATE',
						sendMessage: false,
					}}
					id={''}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UserCreate;
