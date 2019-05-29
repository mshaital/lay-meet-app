/**
 * Created by Administrator on 2018/11/26.
 */
import loginRegister from '@/views/loginRegister/LoginRegister'
import Register from '@/views/loginRegister/Register'
import Login from '@/views/loginRegister/Login'

export default {

  path: '/loginRegister',
  name: 'loginRegister',
  component: loginRegister,
  children: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]

}
