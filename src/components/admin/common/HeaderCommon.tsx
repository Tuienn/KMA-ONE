interface Props {
  title: string
  extra?: React.ReactNode
}

const HeaderCommon: React.FC<Props> = ({ title, extra }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-medium">{title}</h2>
      <div>{extra && extra}</div>
    </div>
  )
}

export default HeaderCommon
