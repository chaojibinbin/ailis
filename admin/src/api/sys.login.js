import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: 'https://www.easy-mock.com/mock/5d6dd30e733ef524c5ff6ce4/example/login',
    method: 'post',
    data
  })
}
