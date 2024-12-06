import { createContext, useContext } from "react"
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"

export interface PathContextType {
  history: NavigateFunction
  pathname: string
  searchPath: any
}

const PathContext: React.Context<PathContextType> =
  createContext<PathContextType>({
    history: () => {},
    pathname: "",
    searchPath: {},
  })

interface Props {
  children: React.ReactNode
}

const PathProvider: React.FC<Props> = ({ children }) => {
  const history = useNavigate()
  const { pathname, search } = useLocation()

  const searchPath = queryString.parse(search)

  const valueContext: PathContextType = { history, pathname, searchPath }

  return (
    <PathContext.Provider value={valueContext}>{children}</PathContext.Provider>
  )
}
export const UsePath = (): PathContextType => {
  return useContext(PathContext)
}
export const UseSearch = (
  history: NavigateFunction,
  baseUrl: string,
  query: any,
) => {
  return history(
    baseUrl +
      "?" +
      queryString.stringify(query, { skipNull: true, skipEmptyString: true }),
  )
}

export default PathProvider
