import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCompressFile } from '@/lib/hooks/useFile';
import Spinner from '../shared/elements/spinner';

const formSchema = z.object({
	percent: z.coerce
		.string({
			invalid_type_error: 'Percent must be a number',
		})
		.refine(
			(value) => {
				const numValue = Number(value);
				return !isNaN(numValue) && numValue >= 1;
			},
			{
				message: 'Width must be a positive',
			},
		)
		.transform((value) => {
			const numValue = Number(value);
			return !isNaN(numValue) ? numValue : undefined;
		}),
});
type CompressProps = {
	fileId: string;
};
const FileCompress: FC<CompressProps> = ({ fileId }) => {
	const { mutate: compressFile, isPending } = useCompressFile(fileId);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			percent: 0,
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		compressFile({
			percent: values.percent as number,
		});
	}

	return (
		<div>
			<Popover>
				<PopoverTrigger asChild>
					<Button className="p-0 h-auto badge-success">
						Compress
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-56 absolute -left-11 bg-black-light border-0">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="percent"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="field-label-sm !text-white">
											Width(px)
										</FormLabel>
										<FormControl>
											<Input
												className="input-field-sm"
												{...field}
											/>
										</FormControl>
										<FormMessage className="form-error" />
									</FormItem>
								)}
							/>

							<Button
								disabled={isPending}
								type="submit"
								className="bg-primary-gold text-[12px] font-poppins text-white mt-2"
							>
								{isPending && (
									<Spinner className="w-[20px] h-[20px] stroke-white" />
								)}
								Apply
							</Button>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default FileCompress;
