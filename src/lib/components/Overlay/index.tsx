import { SetStateAction, useCallback, useEffect, useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

import { useLocale } from '../../hooks/useLocale'
import { removeConfig, removeConversationUuid, removeIdentifier, removeLang, setConversationUuid, setIdentifier, setLang, setUserUuid } from '../../utils'
import { setConfig } from '../../utils'
import Modal from './Modal'
import SlideOver from './SlideOver'

export interface OverlayProps {
  identifier: string
  status?: 'open' | ''
  setStatus?: (value: SetStateAction<'open' | ''>) => void
  lang?: string
  overlayMode?: 'auto' | 'modal' | 'slide-over'
  userUuid?: string
  conversationUuid?: string
  configuration?: any
}

export default function Index({ status, setStatus, identifier, lang = 'en', overlayMode = 'auto', userUuid = '', conversationUuid = '', configuration = null }: OverlayProps) {
  const i18n = useLocale(lang)

  const isMd = useMediaQuery({ query: '(min-width: 768px)' })

  const cleanup = useCallback(() => {
    removeLang()
    removeConversationUuid()
    removeIdentifier()
    removeConfig()
  }, [])

  if (status && identifier) {
    cleanup()

    setIdentifier(identifier)
    setLang(lang)

    if (userUuid) setUserUuid(userUuid)
    if (conversationUuid) setConversationUuid(conversationUuid)
    if (configuration) setConfig(JSON.stringify(configuration))
  }

  const close = useCallback(() => {
    setStatus?.('')

    cleanup()
  }, [cleanup, setStatus])

  const isShow = useMemo(() => {
    return !!identifier && !!status
  }, [identifier, status])

  const mode = useMemo(() => {
    if (overlayMode !== 'auto') return overlayMode

    if (isMd) {
      return 'modal'
    } else {
      return 'slide-over'
    }
  }, [isMd, overlayMode])

  useEffect(() => {
    window.addEventListener('beforeunload', cleanup)

    return () => {
      window.removeEventListener('beforeunload', cleanup)
    }
  }, [cleanup])

  return (
    <>
      {mode === 'modal' && <Modal isShow={isShow} i18n={i18n} close={setStatus ? close : null} overlayMode={mode} />}
      {mode === 'slide-over' && <SlideOver isShow={isShow} i18n={i18n} close={setStatus ? close : null} overlayMode={mode} />}
    </>
  )
}
