import {
  AntDesignOutlined,
  BookOutlined,
  CloseOutlined,
  DockerOutlined,
  FileSearchOutlined,
  GithubOutlined,
  GlobalOutlined,
  LinkOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OpenAIOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Avatar, Drawer, Grid, Layout, Menu, Popconfirm, Tooltip } from "antd"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import kmaone from "../assets/images/kmaone.png"
import logoKMA from "../assets/images/logoKMA.png"
import { UsePath } from "../context/PathProvider"
import { generateToken } from "../firebase/user/firebase"
import { getAuthToken } from "../utils/handleStorage"

const ModalInfo = React.lazy(() => import("../components/common/ModalInfo"))

const { Content, Sider, Header } = Layout

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

interface Props {
  children: React.ReactNode
}
const { useBreakpoint } = Grid

const LayoutBasic: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const { t, i18n } = useTranslation([
    "layoutBasic_user",
    "layoutBasic_admin",
    "notification",
  ])
  const [studentModalState, setStudentModalState] = useState<{
    isOpen: boolean
    studentId: number | null
  }>({
    isOpen: false,
    studentId: null,
  })
  const { xs } = useBreakpoint()
  const { pathname } = UsePath()
  const { authPermission, authId } = getAuthToken()
  const nagivate = useNavigate()

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
    localStorage.setItem("i18n", i18n.language === "vi" ? "vi" : "en")
  }

  useEffect(() => {
    generateToken()
    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload)
    // })
  }, [])

  // const queryStudentInfo = useQuery({
  //   queryKey: ["student", authId],
  //   queryFn: async () => apiService("get", `/student/${authId}`),
  //   staleTime: Infinity,
  // })

  // queryStudentInfo.isSuccess && console.log(queryStudentInfo.data)

  const userSiderMenu: MenuItem[] = [
    getItem(t("sider.schedule"), 1, <ScheduleOutlined />, [
      getItem(
        <Link to={"/schedule/my-schedule"}>{t("sider.scheduleItem1")}</Link>,
        "my-schedule",
        <ScheduleOutlined />,
      ),
      getItem(
        <Link to={"/schedule/class-list/find-class"}>
          {t("sider.scheduleItem2")}
        </Link>,
        "class-list",
        <TeamOutlined />,
      ),
      getItem(
        <Link to={"/schedule/exam-schedule"}>{t("sider.scheduleItem3")}</Link>,
        "exam-schedule",
        <ProfileOutlined />,
      ),
    ]),
    getItem(
      <Link to={"/scores"}>{t("sider.lookUpScores")}</Link>,
      "scores",
      <FileSearchOutlined />,
    ),
    getItem(
      <Link to={"/chat-ai"}>{t("layoutBasic_user:sider.Q&A")}</Link>,
      "chat-ai",
      <OpenAIOutlined />,
    ),
  ]

  const drawerMenu: MenuItem[] = [
    getItem(
      <button
        onClick={() => {
          setStudentModalState({ isOpen: true, studentId: authId })
          setOpenDrawer(false)
        }}
      >
        {t("layoutBasic_user:drawer.information")}
      </button>,
      "information",
      <UserOutlined />,
    ),
    getItem(t("layoutBasic_user:drawer.source"), "source", <LinkOutlined />, [
      getItem(
        t("layoutBasic_user:drawer.sourceFrontend"),
        "link1",
        <GithubOutlined />,
      ),
      getItem(
        t("layoutBasic_user:drawer.sourceBackend"),
        "link2",
        <GithubOutlined />,
      ),
      getItem(
        t("layoutBasic_user:drawer.sourceDocker"),
        "link3",
        <DockerOutlined />,
      ),
    ]),
    getItem(
      <button
        onClick={() => {
          changeLanguage()
          setOpenDrawer(false)
        }}
      >
        {t("layoutBasic_user:drawer.changeLanguage")}
      </button>,
      "change-language",
      <GlobalOutlined />,
    ),

    getItem(t("layoutBasic_user:drawer.about"), "about", <AntDesignOutlined />),
    getItem(
      <Popconfirm
        onConfirm={() => {
          localStorage.removeItem("token")
          // window.location.reload()
          nagivate("/login")
        }}
        title={t("notification:logout.title")}
        okText={t("notification:logout.buttonConfirm")}
        cancelText={t("notification:logout.buttonCancel")}
        description={t("notification:logout.content")}
        placement="bottom"
      >
        <button>{t("layoutBasic_user:drawer.logout")}</button>
      </Popconfirm>,
      "logout",
      <LogoutOutlined />,
    ),
  ]
  if (authPermission === "admin") {
    drawerMenu.splice(0, 1)
  }

  const adminSiderMenu: MenuItem[] = [
    getItem(
      <Link to="/student-management">
        {t("layoutBasic_admin:sider.student")}
      </Link>,
      "student-management",
      <TeamOutlined />,
    ),
    getItem(
      <Link to="/course-management">
        {t("layoutBasic_admin:sider.course")}
      </Link>,
      "course-management",
      <BookOutlined />,
    ),
    getItem(
      <Link to="/score-management">{t("layoutBasic_admin:sider.score")}</Link>,
      "score-management",
      <FileSearchOutlined />,
    ),
  ]
  return (
    <>
      <Layout className="overflow-hidden">
        <Sider
          collapsedWidth={collapsed ? (xs ? 0 : 50) : 200}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className={`!max-w-none bg-white sm:!max-w-[200px] ${!collapsed ? "!flex-0-0-100vw sm:!flex-0-0-50px" : "!flex-0-0-0px"}`}
        >
          <div
            className={`flex items-center gap-2 border-r bg-white sm:justify-between ${collapsed ? "!justify-center" : "px-[15px]"} py-[15px]`}
          >
            <img src={logoKMA} className="h-[34px]" />
            <img
              src={kmaone}
              className={`h-[18px] ${collapsed ? "hidden" : ""}`}
            />
            <div
              className={`flex-auto text-end sm:hidden ${collapsed && "hidden"}`}
            >
              <CloseOutlined
                className="cursor-pointer text-[20px]"
                onClick={() => setCollapsed(true)}
              />
            </div>
          </div>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={authPermission === "user" ? userSiderMenu : adminSiderMenu}
            selectedKeys={[...pathname.split("/")]}
            className="text-[15px]"
          />
        </Sider>
        <Layout className="h-screen">
          <Header className={`flex items-center justify-between bg-white px-4`}>
            <div
              className="inline-block"
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? (
                <MenuFoldOutlined className="cursor-pointer text-2xl" />
              ) : (
                <MenuUnfoldOutlined className="cursor-pointer text-2xl" />
              )}
            </div>
            <Tooltip title={""} placement="left">
              <Avatar
                size={40}
                className={"cursor-pointer"}
                onClick={() => setOpenDrawer(true)}
              >
                H
              </Avatar>
            </Tooltip>
            <Drawer
              title={
                <div className="flex items-center">
                  <Avatar size={40}>H</Avatar>
                  <div className="ml-5">
                    <h2>Nguyễn Ngọc Tuyền</h2>
                    <p className="font-normal">CT060145</p>
                  </div>
                </div>
              }
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              closable={false}
              width={300}
            >
              <Menu
                className="text-[15px]"
                items={drawerMenu}
                selectedKeys={[pathname.split("/")[2]]}
                mode="inline"
              />
            </Drawer>
          </Header>
          <Content
            className={`overflow-auto p-3 ${xs ? !collapsed && "" : ""}`}
          >
            {children}
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>

      <ModalInfo
        open={studentModalState.isOpen}
        setStudentModalState={setStudentModalState}
        permission="user"
        studentId={studentModalState.studentId}
        // initialValue={initialModalForm}
      />
    </>
  )
}

export default LayoutBasic
