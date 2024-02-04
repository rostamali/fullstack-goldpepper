'use client';
import { FC } from 'react';
import { ResponsiveLine } from '@nivo/line';
interface CompanyDataPoint {
	x: string;
	y: number;
}

interface CompanyAssetsData {
	id: string;
	data: CompanyDataPoint[];
}

interface CompanyProps {
	companyData: CompanyAssetsData[];
	title: string;
}

const AssetsLineGraph: FC<CompanyProps> = ({ companyData, title }) => {
	return (
		<div className="bg-primary-white rounded-md p-4">
			<h5 className="heading-5 border-l-[4px] pl-4 border-black-light leading-[1.2em]">
				{title}
			</h5>
			<div className="h-[300px] !font-poppins">
				<ResponsiveLine
					data={companyData}
					margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
					xScale={{ type: 'point' }}
					yScale={{
						type: 'linear',
						min: 'auto',
						max: 'auto',
						stacked: true,
						reverse: false,
					}}
					colors={{ scheme: 'category10' }}
					yFormat=" >-.2f"
					curve="monotoneX"
					axisTop={null}
					axisRight={null}
					pointSize={10}
					pointColor={{ theme: 'background' }}
					pointBorderWidth={2}
					pointBorderColor={{ from: 'serieColor', modifiers: [] }}
					pointLabelYOffset={-12}
					useMesh={true}
					legends={[
						{
							anchor: 'top-left',
							direction: 'row',
							justify: false,
							translateX: 0,
							translateY: -30,
							itemsSpacing: 6,
							itemDirection: 'left-to-right',
							itemWidth: 60,
							itemHeight: 13,
							itemOpacity: 0.75,
							symbolSize: 11,
							symbolShape: 'circle',
							symbolBorderColor: 'rgba(0, 0, 0, .5)',
							effects: [
								{
									on: 'hover',
									style: {
										itemBackground: 'rgba(0, 0, 0, .03)',
										itemOpacity: 1,
									},
								},
							],
						},
					]}
				/>
			</div>
		</div>
	);
};

export default AssetsLineGraph;
