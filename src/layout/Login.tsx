import { LoginOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  notification,
} from "antd"
import _ from "lodash"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import apiService from "../api/APIService"
import bgImage from "../assets/images/background.png"
import logoKMA from "../assets/images/logoKMA.png"
import { saveDataStorage } from "../utils/handleStorage"

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  useEffect(() => {
    if (!_.isEmpty(localStorage.getItem("token"))) {
      // console.log("token", getDataFromLocalStorage("token"))
      navigate("/", { replace: true })
    }
  }, [])

  const groupTypeInputPass = ["password", "text"]
  const [typeInputPass, setTypeInputPass] = useState<number>(0)
  const [api, contextHolder] = notification.useNotification()

  const mutationLogin = useMutation({
    mutationKey: ["POST", "login"],
    mutationFn: async (data: any) =>
      apiService("post", "/Auth/login", {}, data),
    onSuccess: (res) => {
      const isAdmin = res.role === "admin"
      api.success({
        message: "Đăng nhập thành công",
        duration: 1,
        description: `Xin chào ${isAdmin ? "quản lý" : "sinh viên"}`,
        onClose: () => {
          if (isAdmin) {
            saveDataStorage("token", {
              authPermission: "admin",
              token: res.token,
              expiredTime: new Date().getTime(),
            })
          } else {
            saveDataStorage("token", {
              authPermission: "user",
              authId: res.studentId,
              expiredTime: new Date().getTime(),
              authStudentCode: res.account,
              token: res.token,
            })
          }
          // // Hard field
          window.location.reload()
        },
      })
    },
    onError: (res: any) => {
      console.log("res")

      api.error({
        message: "Đăng nhập thất bại",
        description: res.response.data.message || "Lỗi hệ thống",
        duration: 1,
      })
    },
  })

  return (
    <div className="h-screen w-screen">
      {contextHolder}
      <div
        className={`h-full w-full bg-cover bg-center`}
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <Modal
        open
        centered
        footer={
          <Button
            className="mt-4"
            type="primary"
            icon={<LoginOutlined />}
            size="large"
            block
            loading={mutationLogin.isPending}
            onClick={() => form.submit()}
          >
            Đăng nhập
          </Button>
        }
        width={370}
        closeIcon={null}
      >
        <Form
          form={form}
          className="form-animation"
          onFinish={(data: any) => mutationLogin.mutate(data)}
        >
          <div className="mb-2 flex w-full items-center justify-center">
            <img src={logoKMA} className="mr-2 h-[40px]" />
            <h1 className="text-3xl font-bold text-primary">KMA ONE</h1>
          </div>
          <h3 className="text-center">Đăng nhập với tài khoản QLDT</h3>
          <Divider className="mb-8 mt-2 border-[1px] border-primary" />
          <div>
            <Form.Item
              label="Tên đăng nhập"
              name="account"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập" },
                // {
                //   pattern: /^(CT|AT|DT|ct|at|dt)\d{6}$/,
                //   message: "Vui lòng nhập đúng định dạng",
                // },
              ]}
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              className="mb-2 mt-8"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input type={groupTypeInputPass[typeInputPass]} placeholder="" />
            </Form.Item>
            <div className="mr-[-8px] text-right">
              <Checkbox
                className="pr-0"
                onChange={() => setTypeInputPass(1 - typeInputPass)}
              >
                Hiện mật khẩu
              </Checkbox>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
export default Login
