import request from '@/plugin/axios'

export function getuser(data) {
  return request({
    url: 'api/getuserlist',
    method: 'post',
    data
  })
}
export function creatuser(data) {
  return request({
    url: 'api/signup',
    method: 'post',
    data
  })
}
export function edituser(data) {
  return request({
    url: 'api/edituser',
    method: 'post',
    data
  })
}
export function deleteuserapi(data) {
  return request({
    url: 'api/deleteuser',
    method: 'post',
    data
  })
}
