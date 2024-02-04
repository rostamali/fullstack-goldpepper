import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectFormSchema } from '@/lib/form-validation';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import TermFields from './term-fields';
import DocumentFields from './document-fields';
import SelectGallery from '../../../../components/shared/elements/select-gallery';

type TabProps = {
	form: UseFormReturn<z.infer<typeof ProjectFormSchema>>;
};

const ProjectFormTab: FC<TabProps> = ({ form }) => {
	return (
		<div>
			<Tabs defaultValue="terms" className="w-full font-poppins">
				<TabsList>
					<div className="flex items-center gap-2 bg-white p-1.5 rounded-md flex-wrap">
						{['terms', 'documents', 'gallery'].map(
							(item, index) => (
								<TabsTrigger
									key={index}
									value={item}
									className="border-transparent data-[state=active]:bg-gray-muted data-[state=active]:shadow-none capitalize rounded-md"
								>
									{item}
								</TabsTrigger>
							),
						)}
					</div>
				</TabsList>
				<div className="mt-[40px]">
					<TabsContent value="terms">
						<TermFields form={form} />
					</TabsContent>
					<TabsContent value="documents">
						<DocumentFields form={form} />
					</TabsContent>
					<TabsContent value="gallery">
						<FormField
							control={form.control}
							name="gallery"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<SelectGallery
											onChange={field.onChange}
											frameClass="grid lg:grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-[15px]"
											thumbClass="h-[100px] rounded-md border border-gray-light border-opacity-20 text-white"
											iconClass="text-black-dark text-opacity-50"
											selected={
												field.value ? field.value : null
											}
											defaultTrigger="h-[200px] rounded-md bg-white w-[200px]"
										/>
									</FormControl>
									<FormMessage className="form-error" />
								</FormItem>
							)}
						/>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default ProjectFormTab;
