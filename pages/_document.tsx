import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <nav>
          <p className="text-3xl font-bold underline">
            Nav here with tailwind
          </p>
        </nav>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
