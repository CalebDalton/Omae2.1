import React from 'react';
import { shallow } from 'enzyme';

import { WareComponent } from 'components/gear/cyberware/WareComponent';
import WareGradeComponent from 'components/gear/cyberware/WareGradeComponent';
import CyberwareHeader from 'components/gear/cyberware/CyberwareHeader';
import AugmentationRow from 'components/gear/cyberware/AugmentationRowComponent';
import FilterableTable from 'components/FilterableTable';

describe('WareComponent', () => {
	const cyberwareArray = [
		{
			id: '47c48542-48c3-417e-91f0-b5a456183f05',
			name: 'Datajack',
			category: 'Headware',
			ess: '0.1',
			capacity: '0',
			avail: '2',
			cost: '1000',
			source: 'SR5',
			page: '452',
		},
		{
			id: 'eb9e691a-8002-4138-ac8d-d9714d398b1e',
			name: 'Data Lock',
			category: 'Headware',
			ess: '0.1',
			capacity: '[1]',
			avail: 'Rating * 2',
			cost: 'Rating * 1000',
			source: 'SR5',
			page: '452',
			rating: '12',
		},
		{
			id: 'e9136c81-f8d5-4e7f-be2d-3be7ff6d1673',
			name: 'Olfactory Booster',
			category: 'Headware',
			ess: '0.2',
			capacity: '0',
			avail: 'Rating * 3',
			cost: 'Rating * 4000',
			source: 'SR5',
			page: '452',
			rating: '6',
		},
		{
			id: 'ed88f785-7d61-43ec-b4ed-0ebb94736f5e',
			name: 'Simrig',
			category: 'Headware',
			ess: '0.2',
			capacity: '0',
			avail: '12R',
			cost: '4000',
			source: 'SR5',
			page: '452',
		},
		{
			id: '4415180f-c3a0-4bb9-8580-3ed689ab6863',
			name: 'Cyberlimb Customization, Strength (2050)',
			category: 'Bodyware',
			ess: '0',
			capacity: '[0]',
			avail: '+Rating - MinRating',
			cost: '(Rating - MinRating) * 2000',
			source: '2050',
			page: '203',
			forbidden: {
				oneof: {
					metatype: 'Pixie',
				},
			},
			minrating: 'MinimumSTR',
			rating: 'MaximumSTR',
		},
		{
			id: '7d61f860-0637-4214-914d-c68022361d24',
			name: 'Customized Strength',
			category: 'Cyberlimb Enhancement',
			ess: '0',
			capacity: '[0]',
			avail: '+Rating - MinRating',
			cost: '(Rating - MinRating) * 5000',
			source: 'SR5',
			page: '456',
			forbidden: {
				oneof: {
					metatype: 'Pixie',
				},
			},
			minrating: 'MinimumSTR',
			rating: 'MaximumSTR',
		},
	];
	const setup = (wares = cyberwareArray) => {
		const props = {
				wares,
				purchaseWare: () => {},
			},
			cyberwareComponent = shallow(<WareComponent {...props} />);

		return { cyberwareComponent, props };
	};

	it('display a WareGradeComponent', () => {
		const { cyberwareComponent } = setup();

		expect(cyberwareComponent.find(WareGradeComponent).length).to.equal(1);
	});

	describe('table of cyberware', () => {
		it('should have a display table with cyberware header and rows', () => {
			const { cyberwareComponent } = setup();

			expect(cyberwareComponent.find(FilterableTable).props().header).to.deep.equal(<CyberwareHeader />);
		});

		it('should render AugmentationRow for each cyberware passed in, expect for cyberlimb only augs', () => {
			const { cyberwareComponent } = setup();

			expect(cyberwareComponent.find(AugmentationRow)).lengthOf(cyberwareArray.length - 2);
		});

		it('should pass the purchase action in to the cyberwareRow', () => {
			const { cyberwareComponent, props } = setup(),
				firstRow = cyberwareComponent.find(AugmentationRow).get(0);

			expect(firstRow.props.purchase).to.equal(props.purchaseWare);
		});
	});
});
