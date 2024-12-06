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
import "../assets/styles/common/inputFormAnimation.css"
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
    mutationFn: async (data: any) => apiService("post", "login", {}, data),
  })

  useEffect(() => {
    if (mutationLogin.isSuccess) {
      api.success({
        message: "Đăng nhập thành công",
        duration: 1,
        onClose: () => {
          saveDataStorage("token", {
            // authPermission: "admin",
            authPermission: "user",
            authId: 1,
            expiredTime: new Date().getTime(),
            authStudentCode: "CT060016",
          })
          // Hard field
          window.location.reload()
        },
      })
    } else if (mutationLogin.isError) {
      api.error({
        message: "Đăng nhập thất bại",
        description: "Lỗi hệ thống",
        duration: 1,
      })
    }
  }, [mutationLogin.isSuccess, mutationLogin.isError, api])

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
              label="Mã sinh viên"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập mã sinh viên" },
                {
                  pattern: /^(CT|AT|DT|ct|at|dt)\d{6}$/,
                  message: "Vui lòng nhập đúng định dạng",
                },
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
