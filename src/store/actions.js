import * as types from './mutation-types'
export default {
	addNum ({commit}) {
		commit(types.ADD_NUM);
	},
	substractNum ({commit}) {
		commit(types.SUBSTRACT_NUM)
	}
}