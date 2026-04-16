export type Language = 'no' | 'en'

export type ContentType = 'humor' | 'facts' | 'quotes'

export interface MotivateRequest {
  task: string
  motivator: string
  language: Language
  contentTypes: ContentType[]
}

export interface Quote {
  content: string
  author: string
}

export interface MotivateResponse {
  motivationalMessage: string
  funFact?: string
  tip?: string
  quote?: Quote
  gifUrl?: string
}

export interface MotivatorProfile {
  id: string
  name: string
  tone: {
    no: string
    en: string
  }
  tipPrefix: {
    no: string
    en: string
  }
  gifUrl: string
}