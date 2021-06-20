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
  [SET_ACCOUNT_CATEGORY]({ commit }, payload) {
    commit(SET_ACCOUNT_CATEGORY, payload)
  },
  [GET_BVN_INFORMATION]({ commit }, payload) {
    commit(GET_BVN_INFORMATION, payload)
  },
  [POST_PERSONAL_INFORMATION]({ commit }, payload) {
    commit(POST_PERSONAL_INFORMATION, payload)
  },
  [POST_CONTACT_INFORMATION]({ commit }, payload) {
    commit(POST_CONTACT_INFORMATION, payload)
  },
  [POST_KINS_INFORMATION]({ commit }, payload) {
    commit(POST_KINS_INFORMATION, payload)
  },
  [SAVE_ACCOUNT_NUMBER]({ commit }, payload) {
    commit(SAVE_ACCOUNT_NUMBER, payload)
  },
  [UPLOAD_ID_INFORMATION]({ commit }, payload) {
    commit(UPLOAD_ID_INFORMATION, payload)
  },
  [UPLOAD_UTILITY]({ commit }, payload) {
    commit(UPLOAD_UTILITY, payload)
  },
  [UPLOAD_SIGNATURE]({ commit }, payload) {
    commit(UPLOAD_SIGNATURE, payload)
  },
}
