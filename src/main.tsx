import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { App, ConfigProvider, ThemeConfig } from "antd"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/styles/common/global.css"
import "./assets/styles/common/inputFormAnimation.css"
import "./index.css"
import "./locales/i18n/i18n.ts"
import Routes from "./routes/Routes.tsx"

const queryClient = new QueryClient()
const theme: ThemeConfig = {
  token: {
    screenXS: 376,
    screenXSMax: 480,
    screenXSMin: 376,

    screenSMMax: 767,
    screenSMMin: 480,
    screenSM: 480,

    screenMDMax: 975,
    screenMDMin: 768,
    screenMD: 768,

    screenLGMax: 1439,
    screenLGMin: 976,
    screenLG: 976,

    screenXLMax: 1599,
    screenXLMin: 1440,
    screenXL: 1440,

    screenXXL: 1600,
    screenXXLMin: 1600,

    colorPrimary: "#4c95fb",
  },
  components: {
    Form: {
      labelHeight: 24,
      itemMarginBottom: 5,
    },
    Table: {
      headerBg: "#E7E1E1",
      rowHoverBg: "#e5e7eb",
    },
    Segmented: {
      itemSelectedBg: "#4c95fb",
      trackBg: "#FFFFFF",
      trackPadding: 0,
      itemSelectedColor: "#FFFFFF",
      // motionDurationSlow: "0.3",
      // motionDurationMid: "0.1",
    },
  },
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <App>
          <Routes />
          {/* <Test /> */}
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
