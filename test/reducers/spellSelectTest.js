const reducer = require('../../src/reducers/spellSelect');

describe('spellSelect', () => {
	const state = {
		spells: [
			{
				id: '87cb3685-22e8-46fa-890f-f3cfef10a71f',
				name: 'Toxic Wave',
				descriptor: 'Indirect, Elemental, Area',
				category: 'Combat',
				type: 'P',
				range: 'LOS (A)',
				damage: 'P',
				duration: 'I',
				dv: 'F-1',
				source: 'SR5',
				page: '283',
			},
		],
		powers: [
			{
				id: '39224ecf-f3d0-40b6-95a6-2f047f95d736',
				name: 'Astral Perception',
				points: '1',
				adeptway: '.5',
				levels: 'no',
				limit: '1',
				source: 'SR5',
				page: '309',
			},
			{
				id: 'ddcca815-d6fe-41ed-b174-2e7255320f17',
				name: 'Attribute Boost',
				points: '.25',
				adeptway: '0',
				levels: 2,
				limit: '1',
				bonus: {
					selectattribute: {
						attribute: [
							'AGI',
							'BOD',
							'REA',
							'STR',
						],
					},
				},
				source: 'SR5',
				page: '309',
			},
		],
		powerPointsSpent: 1.5,
		powerPointsKarma: 10,
		complexforms: [
			{
				id: '33e75cd6-cad7-43dd-87ac-9838c83eccb5',
				name: 'Diffusion of [Matrix Attribute]',
				target: 'Device',
				duration: 'S',
				fv: 'L+1',
				bonus: {

				},
				source: 'SR5',
				page: '252',
			},
			{
				id: '6b4ed8d5-75c8-4415-9578-15afa4ac8494',
				name: 'Editor',
				target: 'File',
				duration: 'P',
				fv: 'L+2',
				source: 'SR5',
				page: '252',
			},
			{
				id: 'dbb1d719-c829-4c45-9a53-9ff538865c14',
				name: 'Static Veil',
				target: 'Persona',
				duration: 'S',
				fv: 'L-1',
				source: 'SR5',
				page: '252',
			},
		],
	};

	it('should not change the passed state', (done) => {
		const state = Object.freeze({});
		reducer(state, { type: 'INVALID' });

		done();
	});

	describe('ADD_SPELL', () => {
		it('should add a spell to the state.spells', () => {
			const newSpell = {
					id: 'c78d91cc-fa02-48c3-a243-28823a2038ef',
					name: 'Acid Stream',
					descriptor: 'Indirect, Elemental',
					category: 'Combat',
					type: 'P',
					range: 'LOS',
					damage: 'P',
					duration: 'I',
					dv: 'F-3',
					source: 'SR5',
					page: '283',
				},
				newState = reducer(state, { type: 'ADD_SPELL', parameter: { newSpell } });

			expect(newState.spells[newState.spells.length - 1]).to.eql(newSpell);
			expect(newState.spells.length).to.eql(state.spells.length + 1);
		});

		it('should return state if the spell is already in the spells state', () => {
			const newSpell = {
					id: '87cb3685-22e8-46fa-890f-f3cfef10a71f',
					name: 'Toxic Wave',
					descriptor: 'Indirect, Elemental, Area',
					category: 'Combat',
					type: 'P',
					range: 'LOS (A)',
					damage: 'P',
					duration: 'I',
					dv: 'F-1',
					source: 'SR5',
					page: '283',
				},
				newState = reducer(state, { type: 'ADD_SPELL', parameter: { newSpell } });

			expect(newState).to.eql(state);
		});
	});

	describe('REMOVE_SPELL', () => {
		it('should remove spells from the state.spells', () => {
			const newState = reducer(state, { type: 'REMOVE_SPELL', parameter: { spellIndex: 0 } });

			expect(newState.spells[0]).to.not.eql(state.spells[0]);
			expect(newState.spells.length).to.equal(state.spells.length - 1);
		});
	});

	describe('ADD_COMPLEXFORM', () => {
		it('should add a complexform to the state.complexforms', () => {
			const newSpell = {
					id: '373638b9-4334-4645-99f5-c3673e4f809b',
					name: 'Cleaner',
					target: 'Persona',
					duration: 'P',
					fv: 'L+1',
					source: 'SR5',
					page: '252',
				},
				newState = reducer(state, { type: 'ADD_COMPLEXFORM', parameter: { newSpell } });

			expect(newState.complexforms[newState.complexforms.length - 1]).to.eql(newSpell);
			expect(newState.complexforms.length).to.equal(state.complexforms.length + 1);
		});
	});

	describe('REMOVE_COMPLEXFORM', () => {
		it('should remove complexform from the state.complexforms', () => {
			const newState = reducer(state, { type: 'REMOVE_COMPLEXFORM', parameter: { spellIndex: 1 } });

			expect(newState.complexforms[1]).to.not.eql(state.complexforms[1]);
			expect(newState.complexforms.length).to.equal(state.complexforms.length - 1);
		});
	});

	describe('ADD_POWER', () => {
		it('should add a power to the state.powers', () => {
			const newSpell = {
					id: '8caaadf4-75b4-4535-928a-5648d395c13a',
					name: 'Adrenaline Boost',
					points: '.25',
					adeptway: '0',
					levels: 'yes',
					limit: '1',
					source: 'SR5',
					page: '309',
				},
				newState = reducer(state, { type: 'ADD_POWER', parameter: { newSpell } });

			expect(newState.powers[newState.powers.length - 1]).to.eql(newSpell);
			expect(newState.powers.length).to.equal(state.powers.length + 1);
			expect(newState.powerPointsKarma).to.equal(10);

			expect(newState.powerPointsSpent).to.equal(1.75);
			expect(state.powerPointsKarma).to.equal(10);
			expect(state.powerPointsSpent).to.equal(1.5);
		});

		describe('Mystic Adepts', () => {
			it('should keep powerPowerKarma the same if the power points do not go to the next whole number', () => {
				const newSpell = {
						id: '8caaadf4-75b4-4535-928a-5648d395c13a',
						name: 'Adrenaline Boost',
						points: '.25',
						adeptway: '0',
						levels: 'yes',
						limit: '1',
						source: 'SR5',
						page: '309',
					},
					newState = reducer(state, { type: 'ADD_POWER', parameter: { newSpell, isMystic: true } });

				expect(newState.powers[newState.powers.length - 1]).to.eql(newSpell);
				expect(newState.powers.length).to.equal(state.powers.length + 1);
				expect(newState.powerPointsKarma).to.equal(10);

				expect(newState.powerPointsSpent).to.equal(1.75);
				expect(state.powerPointsSpent).to.equal(1.5);
				expect(state.powerPointsKarma).to.equal(10);
			});

			it('should increase the powerPowerKarma by 5 if the power points does go above the next whole number', () => {
				const newSpell = {
						id: '3f3fcdbc-c046-4a95-bd46-511a76d75b56',
						name: 'Traceless Walk',
						points: '1',
						adeptway: '.5',
						levels: 'no',
						limit: '1',
						source: 'SR5',
						page: '311',
					},
					newState = reducer(state, { type: 'ADD_POWER', parameter: { newSpell, isMystic: true } });

				expect(newState.powers[newState.powers.length - 1]).to.eql(newSpell);
				expect(newState.powers.length).to.equal(state.powers.length + 1);
				expect(newState.powerPointsKarma).to.equal(15);

				expect(newState.powerPointsSpent).to.equal(2.5);
				expect(state.powerPointsSpent).to.equal(1.5);
				expect(state.powerPointsKarma).to.equal(10);
			});
		});
	});

	describe('REMOVE_POWER', () => {
		it('should remove power from the state.powers', () => {
			const newState = reducer(state, { type: 'REMOVE_POWER', parameter: { powerIndex: 1, isMystic: true } });

			expect(newState.powers[1]).to.not.eql(state.powers[1]);
			expect(newState.powers.length).to.equal(state.powers.length - 1);

			expect(newState.powerPointsSpent).to.equal(1);
			expect(state.powerPointsSpent).to.equal(1.5);
		});

		describe('Mystic Adepts', () => {
			it('should not reduce the powerPowerKarma if the power points do not drop a whole point', () => {
				const testState = Object.assign({}, state, { powers: state.powers.slice(0), powerPointsSpent: 1.75 });
				testState.powers.push({
					id: '8caaadf4-75b4-4535-928a-5648d395c13a',
					name: 'Adrenaline Boost',
					points: '.25',
					adeptway: '0',
					levels: 'yes',
					limit: '1',
					source: 'SR5',
					page: '309',
				});
				const newState = reducer(testState, { type: 'REMOVE_POWER', parameter: { powerIndex: 2, isMystic: true } });

				expect(newState.powers[2]).to.not.eql(testState.powers[2]);
				expect(newState.powers.length).to.equal(testState.powers.length - 1);

				expect(newState.powerPointsSpent).to.equal(1.5);
				expect(testState.powerPointsSpent).to.equal(1.75);
				expect(newState.powerPointsKarma).to.equal(10);
				expect(testState.powerPointsKarma).to.equal(10);
			});

			it('should reduce the powerPowerKarma if the power points does drop a whole point', () => {
				const newState = reducer(state, { type: 'REMOVE_POWER', parameter: { powerIndex: 0, isMystic: true } });

				expect(newState.powers[0]).to.not.eql(state.powers[0]);
				expect(newState.powers.length).to.equal(state.powers.length - 1);

				expect(newState.powerPointsSpent).to.equal(0.5);
				expect(state.powerPointsSpent).to.equal(1.5);
				expect(newState.powerPointsKarma).to.equal(5);
				expect(state.powerPointsKarma).to.equal(10);
			});
		});
	});


	describe('RAISE_POWER', () => {
		it('should raise a power[powerIndex].levels by one when RAISE_POWER is called', () => {
			const newState = reducer(state, { type: 'RAISE_POWER', parameter: { powerIndex: 1 } });

			expect(newState.powers[1].levels).to.equal(3);
			expect(state.powers[1].levels).to.equal(2);
		});

		describe('Mystic Adept', () => {
			it('should raise the powerPowerKarma if the power points is raised to a whole point', () => {
				const testState = Object.assign({}, state, {
					powers: state.powers.slice(0),
					powerPointsSpent: 2,
					powerPointsKarma: 10,
				});

				testState.powers.push({
					id: '8caaadf4-75b4-4535-928a-5648d395c13a',
					name: 'Adrenaline Boost',
					points: '.25',
					adeptway: '0',
					levels: 2,
					limit: '1',
					source: 'SR5',
					page: '309',
				});

				const newState = reducer(testState, { type: 'RAISE_POWER', parameter: { powerIndex: 1, isMystic: true } });
				expect(newState.powerPointsKarma).to.equal(15);
				expect(testState.powerPointsKarma).to.equal(10);

				expect(newState.powers[1].levels).to.equal(3);
				expect(testState.powers[1].levels).to.equal(2);
			});
		});
	});

	describe('LOWER_POWER', () => {
		it('should lower a power[spellIndex].levels by one when LOWER_POWER is called', () => {
			const newState = reducer(state, { type: 'LOWER_POWER', parameter: { powerIndex: 1 } });

			expect(newState.powers[1].levels).to.equal(1);
			expect(state.powers[1].levels).to.equal(2);
		});

		describe('Mystic Adept', () => {
			it('should lower the powerPowerKarma if the power points is lowered to a whole point', () => {
				const testState = Object.assign({}, state, {
					powers: state.powers.slice(0),
					powerPointsSpent: 2.25,
					powerPointsKarma: 15,
				});

				testState.powers.push({
					id: '8caaadf4-75b4-4535-928a-5648d395c13a',
					name: 'Adrenaline Boost',
					points: '.25',
					adeptway: '0',
					levels: 3,
					limit: '1',
					source: 'SR5',
					page: '309',
				});

				const newState = reducer(testState, { type: 'LOWER_POWER', parameter: { powerIndex: 1, isMystic: true } });
				expect(newState.powerPointsKarma).to.equal(10);
				expect(testState.powerPointsKarma).to.equal(15);

				expect(newState.powers[1].levels).to.equal(1);
				expect(testState.powers[1].levels).to.equal(2);
			});
		});
	});

	describe('RESET_ABILITY', () => {
		it('should reset spells when called with spells', () => {
			const newState = reducer(state, { type: 'RESET_ABILITY', parameter: { ability: 'spells' } });

			expect(newState.spells).to.eql([]);
			expect(state.spells.length).to.equal(1);
		});

		it('should reset comeplxforms when called with complexforms', () => {
			const newState = reducer(state, { type: 'RESET_ABILITY', parameter: { ability: 'complexforms' } });

			expect(newState.complexforms).to.eql([]);
			expect(state.complexforms.length).to.equal(3);
		});

		it('should reset powers when called with powers, and set powerPointsSpent to 0', () => {
			const newState = reducer(state, { type: 'RESET_ABILITY', parameter: { ability: 'powers' } });

			expect(newState.powers).to.eql([]);
			expect(state.powers.length).to.equal(2);

			expect(newState.powerPointsSpent).to.eql(0);
			expect(state.powerPointsSpent).to.equal(1.5);
		});

		it('should return state when the ability is empty', () => {
			state.spells = [];
			const newState = reducer(state, { type: 'RESET_ABILITY', parameter: { ability: 'spells' } });

			expect(newState).to.equal(state);
		});
	});
});
