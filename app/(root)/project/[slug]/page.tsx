import EmptyError from '@/components/shared/elements/empty-error';
import { Button } from '@/components/ui/button';
import { fetchProjectBySlug } from '@/server/actions/project.action';
import ProjectGallery from './project-gallery';
import SubmitInterested from './submit-interested';
import edjsHTML from 'editorjs-html';
import Link from 'next/link';
import DownloadFile from '@/components/shared/elements/download-file';
type SearchParams = {
	params: {
		slug: string;
	};
};
export const metadata = {
	title: 'Detailed Project Insights',
	description: `Dive into the details of our investment project, unveiling the potential for success. Gain in-depth insights, understand the risks, and make informed decisions for a prosperous investment.`,
};

const ProjectDetails = async ({ params }: SearchParams) => {
	const result = await fetchProjectBySlug({
		slug: params.slug ? params.slug : null,
	});
	const edjsParser = edjsHTML();

	return (
		<main>
			<section id="gallery" className="py-[80px] bg-primary-gray">
				<div className="container">
					{result ? (
						<div className="flex flex-col gap-[60px]">
							<div className="project__header">
								<div className="grid md:grid-cols-2 grid-cols-1 gap-[40px] items-center">
									<div>
										<ProjectGallery
											gallery={result.gallery}
											alt={result.name}
										/>
									</div>
									<div className="flex flex-col gap-[35px]">
										<div className="flex flex-col gap-[15px]">
											<h3 className="heading-3 text-gray-muted">
												{result.name}
											</h3>
										</div>
										<div className="grid lg:grid-cols-3 grid-cols-2 gap-[20px]">
											{result.terms.map((item, index) => (
												<div
													key={index}
													className="space-y-2"
												>
													<h6 className="heading-6 text-gray-muted">
														{item.label}
													</h6>
													<p className="text-base-2 text-white">
														{item.value}
													</p>
												</div>
											))}
										</div>
										{result.isInvested ? (
											<div className="bg-black-light p-4 rounded-md space-y-2">
												<h5 className="heading-5 text-gray-muted">
													Thanks for your interest!
												</h5>
												<p className="text-base-2 text-gray-light">
													We already received your
													interest! One of our support
													team will contact you soon.
												</p>
											</div>
										) : (
											<div className="flex flex-col gap-[15px] items-start">
												<div>
													<h4 className="heading-4 text-gray-dark">
														Want to invest to this
														project?
													</h4>
													<span className="text-base-1 text-gray-dark">
														Send us your interest
													</span>
												</div>
												<SubmitInterested
													projectId={result.id}
												/>
											</div>
										)}
									</div>
								</div>
							</div>
							{result.description && (
								<div
									className="project-description"
									dangerouslySetInnerHTML={{
										__html: edjsParser.parse(
											result.description,
										),
									}}
								></div>
							)}

							{result.documents &&
								result.documents.length > 0 && (
									<div className="space-y-6">
										<h5 className="heading-5 border-l-[4px] pl-4 border-gray-light leading-[1.2em] text-gray-light">
											Documents
										</h5>
										<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[40px] gap-[25px]">
											{result.documents.map(
												(item, index) => (
													<DownloadFile
														key={index}
														data={{
															name: item.name,
															description:
																item.description ||
																'',
															status: item.status,
															file:
																item.file.url ||
																null,
															fileId:
																item.file.id ||
																null,
														}}
													/>
												),
											)}
										</div>
									</div>
								)}
						</div>
					) : (
						<EmptyError
							contentClass={
								'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
							}
							title={'There are no project to show'}
							description={`Whoa! It looks like the project is not exist you are looking for. Go back to the project page and try again.`}
							Links={
								<Link href="/project">
									<Button className="btn-primary-lg">
										Go Back
									</Button>
								</Link>
							}
						/>
					)}
				</div>
			</section>
		</main>
	);
};

export default ProjectDetails;
