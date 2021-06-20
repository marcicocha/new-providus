import {
  SET_ACCOUNT_CATEGORY,
  GET_BVN_INFORMATION,
  POST_PERSONAL_INFORMATION,
  POST_CONTACT_INFORMATION,
  POST_KINS_INFORMATION,
  SAVE_ACCOUNT_NUMBER,
  UPLOAD_ID_INFORMATION,
  UPLOAD_UTILITY,
  UPLOAD_SIGNATURE,
} from '@/utils/mutation-types'
export default {
  [SET_ACCOUNT_CATEGORY](state, payload) {
    state.accountCategory = payload
  },
  [GET_BVN_INFORMATION](state, payload) {
    state.bvnDetails = payload
  },
  [POST_PERSONAL_INFORMATION](state, payload) {
    state.personalInfoObj = payload
  },
  [POST_CONTACT_INFORMATION](state, payload) {
    state.contactInfoObj = payload
  },
  [POST_KINS_INFORMATION](state, payload) {
    state.kinObjInfo = payload
  },
  [SAVE_ACCOUNT_NUMBER](state, payload) {
    state.accountNumber = payload
  },
  [UPLOAD_ID_INFORMATION](state, payload) {
    state.idObject = payload
  },
  [UPLOAD_UTILITY](state, payload) {
    state.utilityFile = payload
  },
  [UPLOAD_SIGNATURE](state, payload) {
    state.signatureFile = payload
  },
}
