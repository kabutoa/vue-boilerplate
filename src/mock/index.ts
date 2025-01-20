import Mock from 'mockjs'

// 设置全局响应时间
Mock.setup({
  timeout: '100-2000',
})

// 登录接口
Mock.mock('/api/auth/login', 'post', {
  success: true,
  code: 200,
  message: '登录成功',
  data: {
    token: '1234567890',
  },
})

// 退出登录
Mock.mock('/api/auth/logout', 'post', {
  success: true,
  code: 200,
  message: '退出成功',
})

// 获取用户信息
Mock.mock('/api/user/info', 'get', {
  success: true,
  code: 200,
  message: '获取用户信息成功',
  data: {
    name: '张三',
  },
})
