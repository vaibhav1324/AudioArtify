import React from "react"

import { useFonts } from "expo-font"

import "i18n"
import "utils/ignoreWarnings"

import { customFontsToLoad } from "theme"
import { useInitialRootStore } from "models"

import { setupReactotron } from "services/reactotron"

import Config from "config"

import { AppNavigator } from "navigators"

import { ErrorBoundary } from "screens/ErrorScreen/ErrorBoundary"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: "localhost",
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
})

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props

  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => {
    setTimeout(hideSplashScreen, 500)
  })

  if (!rehydrated || !areFontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppNavigator />
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App
