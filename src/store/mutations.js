import * as types from './mutation-types'
export default {
	[types.ADD_NUM] (state) {
		state.a ++;
	},
	[types.SUBSTRACT_NUM] (state) {
		state.a --;
	}
}