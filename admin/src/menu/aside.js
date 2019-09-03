// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '后台管理',
    icon: 'folder-o',
    children: [
      { path: '/usermanage', title: '用户管理' },
	
     
    ]
  },
  {
    title: '前台管理',
    icon: 'folder-o',
    children: [
      { path: '/daohang', title: '导航管理' },
     
    ]
  }
]
