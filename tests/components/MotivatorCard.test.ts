import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MotivatorCard from '~/components/MotivatorCard.vue'

describe('MotivatorCard', () => {
  // Case 8: renders required motivational message
  it('renders the motivational message', () => {
    const wrapper = mount(MotivatorCard, {
      props: {
        data: { motivationalMessage: 'You can do it!' },
      },
    })

    expect(wrapper.text()).toContain('You can do it!')
  })

  // Case 9a: renders all optional sections when all fields are provided
  it('renders all optional sections when full data is provided', () => {
    const wrapper = mount(MotivatorCard, {
      props: {
        data: {
          motivationalMessage: 'Go!',
          funFact: 'An interesting fact',
          tip: 'A useful tip',
          quote: { content: 'Be bold', author: 'Someone' },
          gifUrl: 'https://example.com/motivate.gif',
        },
      },
    })

    expect(wrapper.text()).toContain('An interesting fact')
    expect(wrapper.text()).toContain('A useful tip')
    expect(wrapper.text()).toContain('Be bold')
    expect(wrapper.text()).toContain('Someone')
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/motivate.gif')
  })

  // Case 9b: optional sections are hidden when fields are not provided
  it('hides optional sections when only the message is provided', () => {
    const wrapper = mount(MotivatorCard, {
      props: {
        data: { motivationalMessage: 'Minimal card' },
      },
    })

    expect(wrapper.text()).not.toContain('An interesting fact')
    expect(wrapper.find('img').exists()).toBe(false)
  })
})
