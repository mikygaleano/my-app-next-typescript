import type { Metadata } from "next";
import "./globals.css";
import LinkNavigator from "@/components/LinkNavigator";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: React.ReactNode;
}

const navigator:{name: string, links: string}[] = [
  {
    name: 'Home',
    links: '/'
  },
  {
    name: 'PokeDex',
    links: '/pokeDex'
  }
]

export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
      <body >
        <header>
          {
            navigator.map(({links, name}, index) => (
              <div key={index}>
                <LinkNavigator links={links} name={name}/>
              </div>
              ))
          }
        </header>
         {children}
      </body>
    </html>
  );
}
