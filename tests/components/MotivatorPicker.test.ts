import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MotivatorPicker from '~/components/MotivatorPicker.vue'

const motivators = [
  { id: 'alice', name: 'Alice', description: 'Energetic' },
  { id: 'bob', name: 'Bob', description: 'Calm' },
]

describe('MotivatorPicker', () => {
  // Case 6: emits selected motivator on click
  it('emits update:modelValue with the clicked motivator', async () => {
    const wrapper = mount(MotivatorPicker, {
      props: { motivators, modelValue: null },
    })

    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([motivators[0]])
  })

  // Case 7: selected CSS class applied to the active item only
  it('applies selected style to the currently selected motivator', () => {
    const wrapper = mount(MotivatorPicker, {
      props: { motivators, modelValue: motivators[1] },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).not.toContain('border-orange-500')
    expect(buttons[1].classes()).toContain('border-orange-500')
  })
})
