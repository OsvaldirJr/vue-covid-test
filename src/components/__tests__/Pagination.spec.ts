import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from "../../components/Pagination.vue";
import store from "../../stores/dataStore";
describe('Pagination', () => {
    it('O component deve ser criado', () => {
      const wrapper = mount(Pagination,{
        global: {
            plugins: [store],
          },
      })
      expect(wrapper).not.toBeNull()
    })
})