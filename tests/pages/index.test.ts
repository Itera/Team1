import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'
import IndexPage from '~/pages/index.vue'

vi.mock('~/composables/useMotivator')

import { useMotivator } from '~/composables/useMotivator'

const mockUseMotivator = vi.mocked(useMotivator)

/** Mount the index page with a controlled composable state. */
function mountPage(overrides: Partial<ReturnType<typeof useMotivator>> = {}) {
  const defaults: ReturnType<typeof useMotivator> = {
    task: ref(''),
    selectedMotivator: ref(null),
    result: ref(null),
    loading: ref(false),
    error: ref(null),
    canSubmit: computed(() => false),
    submit: vi.fn(),
  }

  mockUseMotivator.mockReturnValue({ ...defaults, ...overrides })

  return mount(IndexPage, {
    global: {
      stubs: {
        MotivatorPicker: { template: '<div data-testid="motivator-picker" />' },
        MotivatorCard: { template: '<div data-testid="motivator-card" />' },
      },
    },
  })
}

describe('index page flow', () => {
  beforeEach(() => {
    mockUseMotivator.mockReset()
  })

  // Case 10a: submit button disabled when canSubmit is false
  it('disables submit button when canSubmit is false', () => {
    const wrapper = mountPage({ canSubmit: computed(() => false) })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  // Case 10b: submit button enabled when canSubmit is true
  it('enables submit button when canSubmit is true', () => {
    const wrapper = mountPage({ canSubmit: computed(() => true) })
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  // Case 11a: button label shows loading state
  it('shows "Laster..." on the button while loading', () => {
    const wrapper = mountPage({ loading: ref(true) })
    expect(wrapper.find('button').text()).toBe('Laster...')
  })

  // Case 11b: button label shows default text when not loading
  it('shows the default motivate label when not loading', () => {
    const wrapper = mountPage({ loading: ref(false) })
    expect(wrapper.find('button').text()).toContain('Motiver meg!')
  })

  // Case 12a: result card is hidden when result is null
  it('does not render MotivatorCard when there is no result', () => {
    const wrapper = mountPage({ result: ref(null) })
    expect(wrapper.find('[data-testid="motivator-card"]').exists()).toBe(false)
  })

  // Case 12b: result card appears after a successful response
  it('renders MotivatorCard once a result is available', () => {
    const wrapper = mountPage({
      result: ref({ motivationalMessage: 'You did it!' }),
    })
    expect(wrapper.find('[data-testid="motivator-card"]').exists()).toBe(true)
  })
})
