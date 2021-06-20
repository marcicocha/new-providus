import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      pageFlag: '',
      accountCategory: 'individual',
      bvnDetails: {},
      personalInfoObj: {},
      contactInfoObj: {},
      kinObjInfo: {},
      accountNumber: '',
      idObject: {},
      signatureFile: '',
      utilityFile: '',
    }),
    getters,
    mutations,
    actions,
    modules: {},
  })
}
export default createStore
