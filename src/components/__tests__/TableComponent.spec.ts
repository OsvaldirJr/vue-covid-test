import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableComponent from "../../components/TableComponent.vue";
import store from "../../stores/dataStore";

describe('TableComponent', () => {
    it('O component deve ser criado', () => {
      const wrapper = mount(TableComponent,{
        global: {
            plugins: [store],
          },
      })
      expect(wrapper).not.toBeNull()
    })

    it('O component deve ter atributos', () => {
      const wrapper = mount(TableComponent,{
        global: {
            plugins: [store],
          }
      })
      expect(wrapper.attributes).not.toBeNull()
    })
    
    it('O component deve ter labels para formar as tags td', () => {
      const wrapper = mount(TableComponent,{
        global: {
            plugins: [store],

          },
          computed:{
            labels() : any[]{
              return ['teste']
            },
            confirmed() : any[]{
              return [1]
            },
            deaths() : any[]{
              return [1]
            }
          }
      })
      expect(wrapper.get('td')).not.toBeNull()
    })
})