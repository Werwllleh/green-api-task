import '../styles/index.scss';
import {useUserStore} from "@/stores/user-store";

export const metadata = {
  title: "Green Api Task",
  description: "HH task",
};


export default async function RootLayout({children}) {


  return (
    <html lang="ru">
    <body className="body">
    {children}
    <div className="body__bg">
      <div className="body__bg-field"></div>
      <div className="body__bg-field"></div>
    </div>
    </body>
    </html>
  );
}
