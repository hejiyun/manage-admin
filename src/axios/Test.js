import {get} from './reuqest'

const getPass = (params) => get('/api/v1/getMore', params)
const getPass1 = (params) => get(`/api/v1/sdfj`, params)

export {getPass, getPass1}