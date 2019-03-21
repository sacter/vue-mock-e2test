import { mount } from '@vue/test-utils'
import Login from '../components/login.vue'

describe('Login', () => {
  test('是一个 Login.Vue 实例', () => {
    const wrapper = mount(Login)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})