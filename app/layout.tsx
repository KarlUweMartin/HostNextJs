import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Box, Container } from "@mui/material";
import theme from "./theme";
import ClientIntlProvider from "../src/i18n/ClientIntlProvider";
import {getMessages} from 'next-intl/server';


export default async function RootLayout({children}: {children: React.ReactNode}) {
  const messages = await getMessages();
  return (
    <html lang={"en"}>
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ClientIntlProvider initialMessages={messages}>
            {children}
          </ClientIntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
