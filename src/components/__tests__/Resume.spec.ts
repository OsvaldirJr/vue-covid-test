import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResumeComponent from "../../views/Resume.vue";
describe('Resume', () => {
    it('O component deve ser criado', () => {
      const wrapper = mount(ResumeComponent)
      expect(wrapper).not.toBeNull()
    })
})