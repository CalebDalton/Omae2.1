/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';  /* Populated by react-webpack-redux:reducer */
import filterTable from '../reducers/filterTable.js';
const reducers = {
  priorityTable: require('../reducers/priorityTable.js'),
  selectMetatype: require('../reducers/selectMetatype.js'),
  attributes: require('../reducers/attributes.js'),
  selectMagRes: require('../reducers/selectMagRes.js'),
  settingSkills: require('../reducers/settingSkills.js'),
  appControl: require('../reducers/appControl.js'),
  spellSelect: require('../reducers/spellSelect.js'),
  quality: require('../reducers/quality.js'),
  karma: require('../reducers/karma.js'),
  modalToggle: require('../reducers/modalToggle.js'),
  purchaseGear: require('../reducers/gear/purchaseGear.js'),
  filterTable
};
module.exports = combineReducers(reducers);
