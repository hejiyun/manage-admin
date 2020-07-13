import {get, post} from './reuqest'

const getPass = (params) => get('/api/v1/getMore', params)
const getPass1 = (params) => get(`/api/v1/sdfj`, params)
const loginIn = (params) => post(`/api/internal/user/login`, params)

export {getPass, getPass1, loginIn}