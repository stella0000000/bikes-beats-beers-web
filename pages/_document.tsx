import { getBrew } from '@utils/getBrew'
import { Html, Head, Main, NextScript } from 'next/document'
import { useRef } from 'react'

export default function Document() {
  const brew = useRef<string>()

  if (!brew.current) {
    const date = new Date()
    const hour = date.getHours()
    brew.current = getBrew(hour)
  }

  return (
    <Html>
      <Head />
        <body data-theme={brew.current}>
          <Main />
          <NextScript />
        </body>
    </Html>
  )
}