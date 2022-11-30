import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutComponent from "../../views/About.vue";
describe('About', () => {
    it('O component deve ser criado', () => {
      const wrapper = mount(AboutComponent)
      expect(wrapper).not.toBeNull()
    })
})