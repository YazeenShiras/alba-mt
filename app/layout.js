import { AuthProvider } from "../context/Authcontext";

export const metadata = {
  title: "Mern App - Muhammed Yaseen",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
