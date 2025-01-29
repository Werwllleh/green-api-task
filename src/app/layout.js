import '../styles/index.scss';

export const metadata = {
  title: "Green Api Task",
  description: "HH task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
