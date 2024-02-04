'use client';
import { FC } from 'react';
import { ResponsiveBar } from '@nivo/bar';
type GraphProps = {
	data: {
		date: string;
		profit: number;
		equity: number;
	}[];
};

const ProfitEquityGraph: FC<GraphProps> = ({ data }) => {
	return (
		<div className="bg-primary-white rounded-md p-4">
			<h5 className="heading-5 border-l-[4px] pl-4 border-black-light leading-[1.2em]">
				Profit vs Equity
			</h5>
			<div className="h-[300px]">
				<ResponsiveBar
					data={data}
					keys={['profit', 'equity']}
					indexBy="date"
					margin={{ top: 50, right: 50, bottom: 30, left: 60 }}
					padding={0.3}
					groupMode="grouped"
					valueScale={{ type: 'linear' }}
					indexScale={{ type: 'band', round: true }}
					colors={{ scheme: 'nivo' }}
					defs={[
						{
							id: 'dots',
							type: 'patternDots',
							background: 'inherit',
							color: '#38bcb2',
							size: 4,
							padding: 1,
							stagger: true,
						},
						{
							id: 'lines',
							type: 'patternLines',
							background: 'inherit',
							color: '#eed312',
							rotation: -45,
							lineWidth: 6,
							spacing: 10,
						},
					]}
					borderColor={{
						from: 'color',
						modifiers: [['darker', 1.6]],
					}}
					axisTop={null}
					axisRight={null}
					labelSkipWidth={12}
					labelSkipHeight={12}
					labelTextColor={{
						from: 'color',
						modifiers: [['darker', 1.6]],
					}}
					legends={[
						{
							dataFrom: 'keys',
							anchor: 'top-right',
							direction: 'row',
							justify: false,
							translateX: 0,
							translateY: -40,
							itemsSpacing: 2,
							itemWidth: 100,
							itemHeight: 20,
							itemDirection: 'left-to-right',
							itemOpacity: 0.85,
							symbolSize: 20,
							effects: [
								{
									on: 'hover',
									style: {
										itemOpacity: 1,
									},
								},
							],
						},
					]}
					role="application"
					ariaLabel="Nivo bar chart demo"
				/>
			</div>
		</div>
	);
};

export default ProfitEquityGraph;
