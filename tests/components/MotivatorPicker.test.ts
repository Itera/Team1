import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MotivatorPicker from '~/components/MotivatorPicker.vue'

describe('MotivatorPicker', () => {
  it('emits update:modelValue with the clicked motivator id', async () => {
    const wrapper = mount(MotivatorPicker, {
      props: { modelValue: null },
    })

    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['oystein'])
  })

  it('applies selected style to the currently selected motivator', () => {
    const wrapper = mount(MotivatorPicker, {
      props: { modelValue: 'jon' },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).not.toContain('border-blue-500')
    expect(buttons[1].classes()).toContain('border-blue-500')
  })
})
