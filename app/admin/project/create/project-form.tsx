'use client';
import { ProjectFormSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectField from '@/components/shared/elements/select-field';
import { ProjectStatus } from '@/constants';
import DatePicker from '@/components/shared/elements/date-picker';
import ProjectFormTab from './project-form-tab';
import SelectThumbnail from '../../../../components/shared/elements/select-thumbnail';
import { useCreateProject, useUpdateProject } from '@/lib/hooks/useProject';
import ContentEditor from '@/components/forms/content-editor';
import Spinner from '@/components/shared/elements/spinner';

type FormProps = {
	defaultValues: z.infer<typeof ProjectFormSchema>;
	id?: string;
};

const ProjectForm: FC<FormProps> = ({ defaultValues, id }) => {
	const { mutate: createProject, isPending: isCreate } = useCreateProject();
	const { mutate: updateProject, isPending: isUpdate } = useUpdateProject();
	const form = useForm<z.infer<typeof ProjectFormSchema>>({
		resolver: zodResolver(ProjectFormSchema),
		defaultValues,
	});

	const handleProjectSubmit = async (
		data: z.infer<typeof ProjectFormSchema>,
	) => {
		if (form.watch('type') === 'CREATE') {
			createProject(data);
		} else {
			updateProject({
				values: data,
				id: id as string,
			});
		}
	};

	return (
		<Form {...form}>
			<form
				className="space-y-6"
				onSubmit={form.handleSubmit(handleProjectSubmit)}
			>
				<div className="grid lg:grid-cols-[1fr,300px] gap-[25px]">
					<div className="form-flex-space">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-lg">
										Project Name
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="input-field-sm"
										/>
									</FormControl>

									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<ProjectFormTab form={form} />
					</div>
					<div className="form-sidebar form-flex-space">
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Project status
									</FormLabel>
									<FormControl>
										<SelectField
											triggerClass={
												'input-field-sm bg-primary-white'
											}
											placeholder={'Select status...'}
											defaultValue={field.value}
											onChange={field.onChange}
											options={ProjectStatus}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="closeDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Close date
									</FormLabel>
									<FormControl>
										<DatePicker
											triggerClass={
												'input-field-sm bg-primary-white'
											}
											onChange={field.onChange}
											defaultValue={field.value}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="thumbnail"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="field-label-sm">
										Thumbnail
									</FormLabel>
									<FormControl>
										<SelectThumbnail
											trigger={
												<div className="text-base-2 text-gray-muted">
													Choose Thumbnail
												</div>
											}
											modalTitle={'Select Thumbnail'}
											onChange={field.onChange}
											frameClass="w-full h-[160px] bg-white rounded-md"
											thumbClass="overflow-hidden rounded-md"
											iconClass="text-black-dark text-opacity-50"
											selected={
												field.value ? field.value : null
											}
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="max-lg:mt-[30px]">
							<FormLabel className="field-label-sm">
								Description
							</FormLabel>
							<FormControl>
								<ContentEditor
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					{form.watch('type') === 'CREATE' ? (
						<Button className="btn-primary-lg" disabled={isCreate}>
							{isCreate && (
								<Spinner className="w-[20px] h-[20px] stroke-white" />
							)}
							Save Changes
						</Button>
					) : (
						<Button className="btn-primary-lg" disabled={isUpdate}>
							{isUpdate && (
								<Spinner className="w-[20px] h-[20px] stroke-white" />
							)}
							Save Changes
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
};

export default ProjectForm;
