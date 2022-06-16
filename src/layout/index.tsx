import { Layout as AntdLayout } from 'antd'

import classes from './layout.module.css'

type Props = {
  children?: JSX.Element | JSX.Element[]
}

const { Header, Content } = AntdLayout

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <AntdLayout className={classes.layout}>
      <Header>React Template</Header>
      <Content>{children}</Content>
    </AntdLayout>
  )
}

export default Layout
