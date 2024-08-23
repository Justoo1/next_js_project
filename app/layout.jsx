import '@styles/globals.css';

import Nav from '@components/Nav';
import Prodivder from '@components/Prodivder';

export const metadata = {
    title: "Promptopia",
    description: "Discover & share"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Prodivder>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Prodivder>
        </body>
    </html>
  )
}

export default RootLayout