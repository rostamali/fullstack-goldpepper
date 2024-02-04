'use client';
import { ResponsivePie } from '@nivo/pie';
import { FC } from 'react';
type GraphProps = {
	data: { id: string; label: string; value: number }[];
	title: string;
};
const DirstributePieGraph: FC<GraphProps> = ({ data, title }) => {
	return (
		<div className="bg-primary-white rounded-md p-4">
			<h5 className="heading-5 border-l-[4px] pl-4 border-black-light leading-[1.2em]">
				{title}
			</h5>
			<div className="h-[300px] !font-poppins">
				<ResponsivePie
					data={data}
					margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
					innerRadius={0.5}
					padAngle={0.7}
					cornerRadius={3}
					activeOuterRadiusOffset={8}
					borderWidth={1}
					borderColor={{
						from: 'color',
						modifiers: [['darker', 0.2]],
					}}
					enableArcLinkLabels={false}
					defs={[
						{
							id: 'dots',
							type: 'patternDots',
							background: 'inherit',
							color: 'rgba(255, 255, 255, 0.3)',
							size: 4,
							padding: 1,
							stagger: true,
						},
						{
							id: 'lines',
							type: 'patternLines',
							background: 'inherit',
							color: 'rgba(255, 255, 255, 0.3)',
							rotation: -45,
							lineWidth: 6,
							spacing: 10,
						},
					]}
					legends={[
						{
							anchor: 'bottom',
							direction: 'row',
							justify: false,
							translateX: 0,
							translateY: 30,
							itemsSpacing: 0,
							itemWidth: 80,
							itemHeight: 18,
							itemTextColor: '#999',
							itemDirection: 'left-to-right',
							itemOpacity: 1,
							symbolSize: 12,
							symbolShape: 'circle',
							effects: [
								{
									on: 'hover',
									style: {
										itemTextColor: '#000',
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

export default DirstributePieGraph;
