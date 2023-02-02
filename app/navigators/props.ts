import { StackScreenProps } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

export type AppStackParamList = {
  Welcome: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
