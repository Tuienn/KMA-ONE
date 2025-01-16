import { CameraOutlined, EditOutlined } from "@ant-design/icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  App,
  Avatar,
  Button,
  Form,
  Image,
  Modal,
  Popconfirm,
  Radio,
} from "antd"
import dayjs from "dayjs"

import _ from "lodash"
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import {
  apiGetDistricts,
  apiGetProvinces,
  apiGetWards,
} from "../../api/apiProvince"
import apiService from "../../api/APIService"
import backgroundInfo from "../../assets/images/background.png"
import { formatDateToString, getFirstLetterName } from "../../utils/common"
import {
  formatOptionsAddress,
  formatStudentData,
} from "../../utils/formatValue"
import FormItemCommon from "./formItemCustom/FormItemCommon"

export interface DataStudentType {
  id: string | number
  background?: string
  avatar?: string
  name?: string
  code?: string
  birth?: string
  gender?: number
  address?: string
  phone?: string
  status?: boolean | true
  gpa?: number | null
}

interface Props {
  open: boolean
  setStudentModalState: Dispatch<
    SetStateAction<{
      isOpen: boolean
      studentId: number | null
    }>
  >
  permission: "admin" | "user" | "guest"
  studentId: number | null
  refetchFilter: () => void
}

const ModalInfo: React.FC<Props> = ({
  open,
  setStudentModalState,
  permission,
  studentId,
  refetchFilter,
}) => {
  const { t } = useTranslation(["modalInfo", "notification"])
  const isCreateMode = studentId ? false : true
  const isUser = permission === "user"
  const isAdmin = permission === "admin"
  const isGuest = permission === "guest"
  const [editMode, setEditMode] = useState<boolean>(false)
  const [form] = Form.useForm()
  const provinceValue = Form.useWatch(["address", "province"], form)
  const districtValue = Form.useWatch(["address", "district"], form)
  const { notification } = App.useApp()

  const [dataForm, setDataForm] = useState<DataStudentType>(
    {} as DataStudentType,
  )

  useEffect(() => {
    if (open) {
      form.resetFields()
      setEditMode(false)
      if (studentId) {
        apiService("get", `student/${studentId}`).then((res) => {
          setDataForm(formatStudentData(res))

          form.setFieldsValue({
            ...formatStudentData(res),
            birth: dayjs(res?.birth ?? "0000/00/00", "YYYY/MM/DD"),
            address: {
              province: res?.address?.split(", ")[0],
              district: res?.address?.split(", ")[1],
              ward: res?.address?.split(", ")[2],
            },
          })
        })
      }
    }
  }, [open])

  const handleMutationSuccess = (type: "create" | "update" | "delete") => {
    notification.success({
      message: t("notification:api.title"),
      description: t(`notification:api.${type}.success`),
    })
    refetchFilter()
    setStudentModalState({
      isOpen: false,
      studentId: null,
    })
  }
  const handleMutationError = (type: "create" | "update" | "delete") => {
    notification.error({
      message: t("notification:api.title"),
      description: t(`notification:api.${type}.error`),
    })
  }

  const mutationDeleteStudent = useMutation({
    mutationKey: ["DELETE", studentId],
    mutationFn: async () => apiService("delete", `/student/${studentId}`),
    onSuccess: () => handleMutationSuccess("delete"),
    onError: () => handleMutationError("delete"),
  })

  const mutationUpdateStudent = useMutation({
    mutationKey: ["PUT", studentId],
    mutationFn: async (data: any) =>
      apiService("put", `/student/${studentId}`, {}, data),
    onSuccess: () => handleMutationSuccess("update"),
    onError: () => handleMutationError("update"),
  })

  const mutationCreateStudent = useMutation({
    mutationKey: ["POST", "student"],
    mutationFn: async (data: any) => apiService("post", "/student", {}, data),
    onSuccess: () => handleMutationSuccess("create"),
    onError: () => handleMutationError("create"),
  })

  const profileForm = [
    {
      name: t("information.studentCode"),
      value: dataForm.code || "",
    },
    { name: t("information.name"), value: dataForm.name },
    {
      name: t("information.birth"),
      value: dataForm.birth ?? (
        <p className="text-[14px] italic text-gray-500">
          {t("information.noData")}
        </p>
      ),
    },
    {
      name: t("information.gender"),
      value:
        dataForm.gender !== null ? (
          dataForm.gender === 0 ? (
            t("information.genderMale")
          ) : (
            t("information.genderFemale")
          )
        ) : (
          <p className="text-[14px] italic text-gray-500">
            {t("information.noData")}
          </p>
        ),
    },
    {
      name: t("information.phone"),
      value: dataForm.phone ?? (
        <p className="text-[14px] italic text-gray-500">
          {t("information.noData")}
        </p>
      ),
    },
    {
      name: t("information.address"),
      value: dataForm.address ?? (
        <p className="text-[14px] italic text-gray-500">
          {t("information.noData")}
        </p>
      ),
    },
  ]

  const queryProvinces = useQuery({
    queryKey: ["provinces"],
    queryFn: apiGetProvinces,
    enabled: open,
    staleTime: Infinity,
  })

  const queryDistricts = useQuery({
    queryKey: ["districts", provinceValue],
    queryFn: () => apiGetDistricts(provinceValue),
    enabled:
      !!provinceValue &&
      !queryProvinces.isLoading &&
      !isNaN(Number(provinceValue)),
  })

  const queryWards = useQuery({
    queryKey: ["wards", districtValue],
    queryFn: () => apiGetWards(districtValue),
    enabled:
      !!districtValue &&
      !queryDistricts.isLoading &&
      !isNaN(Number(districtValue)),
  })

  useEffect(() => {
    if (!isNaN(Number(provinceValue))) {
      form.setFieldValue(["address", "district"], undefined)
      form.setFieldValue(["address", "ward"], undefined)
    }
  }, [provinceValue])

  useEffect(() => {
    if (!isNaN(Number(districtValue))) {
      form.setFieldValue(["address", "ward"], undefined)
    }
  }, [districtValue])

  const handleSubmitForm = (value: any) => {
    const formatAddress = (address: {
      province: string | undefined
      district: string | undefined
      ward: string | undefined
    }) => {
      const province = address.province
        ? isNaN(Number(address.province))
          ? address.province
          : queryProvinces.data?.find(
              (province: any) => province.id === address.province,
            )?.name
        : ""
      const district = address.district
        ? isNaN(Number(address.district))
          ? address.district
          : queryDistricts.data?.find(
              (district: any) => district.id === address.district,
            )?.name
        : ""
      const ward = address.ward
        ? isNaN(Number(address.ward))
          ? address.ward
          : queryWards.data?.find((ward: any) => ward.id === address.ward)?.name
        : ""
      return `${province}, ${district}, ${ward}`
    }

    const formatData = {
      ...value,
      birth: value.birth && formatDateToString(value.birth),
      address: formatAddress(value.address),
    }

    if (isCreateMode) {
      mutationCreateStudent.mutate(formatStudentData(formatData, false))
    } else {
      mutationUpdateStudent.mutate(formatStudentData(formatData, false))
    }
  }

  return (
    <Modal
      centered
      title={
        <h2>
          {editMode
            ? t("modalInfo.titleEditMode")
            : t("modalInfo.informationTitle")}
        </h2>
      }
      open={open}
      onCancel={() => {
        setStudentModalState({
          isOpen: false,
          studentId: null,
        })
        setEditMode(false)
        setDataForm({} as DataStudentType)
      }}
      okText={t("modalInfo.update")}
      cancelText={t("modalInfo.cancelText")}
      classNames={{
        content: "!p-[15px] sm:!p-[24px]",
        body: "overflow-hidden",
      }}
      footer={null}
      loading={_.isEmpty(dataForm) && studentId ? true : false}
    >
      <div
        className={`flex ${isUser ? "w-[200%]" : "w-full"} gap-[1px] transition-transform duration-300 ${editMode && "translate-x-[-50%]"}`}
      >
        {/* Che do xem */}
        {!isAdmin && (
          <div className={`w-full ${editMode && "h-0"}`}>
            <div className="relative">
              <Image
                src={dataForm.background ?? backgroundInfo}
                className="rounded-lg"
              />
              {isUser && (
                <Button
                  className="absolute bottom-3 right-3 p-2 !text-black"
                  icon={<EditOutlined />}
                />
              )}
              <div className="absolute bottom-[-45px] left-[10px] flex items-center gap-3">
                <div className="relative">
                  <Avatar
                    size={60}
                    className={"cursor-pointer bg-gray-400"}
                    src={dataForm.avatar}
                  >
                    {!dataForm.avatar &&
                      !isAdmin &&
                      getFirstLetterName(dataForm.name ?? "")}
                  </Avatar>
                  {isUser && (
                    <div
                      className={`absolute bottom-0 left-[40px] flex h-6 w-6 cursor-pointer items-center justify-center rounded-[50%] bg-gray-200`}
                    >
                      <CameraOutlined className="h-full" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold">{dataForm.name}</h3>
              </div>
            </div>
            {/* Giao dien xem thong tin */}
            <div className="mt-[60px] border-b-2 border-t-4 py-3">
              <h4 className="mb-2 font-medium">
                {t("modalInfo.informationTitle")}
              </h4>

              <ul className="mb-2 w-full">
                {profileForm.map((item: any, index: number) => {
                  return (
                    <li key={index} className="flex">
                      <p className="w-[30%] text-[14px] text-gray-500">
                        {item.name}
                      </p>
                      <div className="w-[70%] text-[14px]">{item.value}</div>
                    </li>
                  )
                })}
              </ul>
              {isUser && (
                <p className="text-sm italic text-gray-500">
                  {t("information.description")}
                </p>
              )}
            </div>

            {isGuest && (
              <div className="mt-2 flex justify-center">
                <Link
                  to={`/scores?studentCode=${dataForm.code}`}
                  className="m-auto text-second"
                >
                  {t("information.viewScore")}
                </Link>
              </div>
            )}

            {/* Footer nut bam */}
            {isUser && (
              <Button
                type="primary"
                className="mt-2 w-full bg-white text-base font-semibold !text-black hover:!bg-gray-300"
                onClick={() => setEditMode(true)}
                icon={<EditOutlined />}
              >
                {t("modalInfo.edit")}
              </Button>
            )}
          </div>
        )}
        {/* Che do edit */}
        {!isGuest && (
          <div className={`w-full ${!editMode && !isAdmin && "h-0"}`}>
            <Form
              form={form}
              colon={false}
              className="border-b-2 border-t-4 py-3"
              layout="vertical"
              onFinish={handleSubmitForm}
            >
              <FormItemCommon
                type="input"
                label={t("information.studentCode")}
                name="code"
                rules={[
                  {
                    required: true,
                    message: t("notification:form.inputRequired"),
                  },
                  {
                    pattern: /^(CT|AT|DT|ct|at|dt)\d{6}$/,
                    message: t("notification:form.inputPattern"),
                  },
                ]}
                className={`${isUser && "hidden"}`}
                placeholder={t("information.studentCodePlaceholder")}
              />
              <FormItemCommon
                type="input"
                name={"name"}
                label={t("information.name")}
                rules={[
                  {
                    required: true,
                    message: t("notification:form.inputRequired"),
                  },
                  {
                    pattern: /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/,
                    message: t("notification:form.inputPattern"),
                  },
                ]}
                placeholder={t("information.namePlaceholder")}
              />
              <FormItemCommon
                type="date_picker"
                name={"birth"}
                label={t("information.birth")}
                placeholder={t("information.birthPlaceholder")}
                dateSetting={{
                  type: "date",
                  minDate: dayjs(
                    `${new Date().getFullYear() - 40}/00/00`,
                    "YYYY/MM/DD",
                  ),
                  maxDate: dayjs(
                    `${new Date().getFullYear() - 18}/00/00`,
                    "YYYY/MM/DD",
                  ),
                }}
              />
              <Form.Item name={"gender"} label={t("information.gender")}>
                <Radio.Group>
                  <Radio value={0} className="mr-7">
                    {t("information.genderMale")}
                  </Radio>
                  <Radio value={1}>{t("information.genderFemale")}</Radio>
                </Radio.Group>
              </Form.Item>
              <div className="pb-2">{t("information.address")}</div>
              <div className="flex flex-col gap-1 sm:flex-row">
                <FormItemCommon
                  type="search_select"
                  name={["address", "province"]}
                  className="flex-1 sm:max-w-[154.5px]"
                  placeholder={t("information.addressProvince")}
                  options={formatOptionsAddress(queryProvinces?.data)}
                  loading={queryProvinces.isLoading}
                  // label={t("information.address")}
                />
                <FormItemCommon
                  type="search_select"
                  name={["address", "district"]}
                  className="flex-1 sm:max-w-[154.5px]"
                  placeholder={t("information.addressDistrict")}
                  options={formatOptionsAddress(queryDistricts?.data)}
                  loading={queryDistricts.isLoading}
                  disabled={!provinceValue}
                />
                <FormItemCommon
                  type="search_select"
                  name={["address", "ward"]}
                  className="flex-1 sm:max-w-[154.5px]"
                  placeholder={t("information.addressWard")}
                  options={formatOptionsAddress(queryWards?.data)}
                  disabled={!districtValue}
                  loading={queryWards?.isLoading}
                />
              </div>
              <FormItemCommon
                type="input"
                name={"phone"}
                label={t("information.phone")}
                rules={[
                  {
                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    message: t("notification:form.inputPattern"),
                  },
                ]}
                placeholder={t("information.phonePlaceholder")}
              />

              {isAdmin && (
                <FormItemCommon
                  type="switch"
                  name={"status"}
                  label="Trạng thái"
                  placeholder={`${t("information.statusActive")}-${t("information.statusInactive")}`}
                />
              )}
            </Form>
            {/* Footer nut bam */}
            <div className="mt-2 flex justify-end gap-3">
              {isUser && (
                <Button
                  onClick={() => {
                    setEditMode(false)
                    // form.resetFields()
                  }}
                >
                  {t("modalInfo.cancelText")}
                </Button>
              )}
              {!isCreateMode && (
                <div className="flex justify-end gap-3">
                  <Popconfirm
                    title={t("modalInfo.remove.popconfirmTitle")}
                    onConfirm={() => mutationDeleteStudent.mutate()}
                    okText={t("modalInfo.remove.popconfirmOk")}
                    cancelText={t("modalInfo.remove.popconfirmCancel")}
                  >
                    <Button
                      danger
                      hidden={!isAdmin}
                      loading={mutationDeleteStudent.isPending}
                    >
                      {t("modalInfo.remove.button")}
                    </Button>
                  </Popconfirm>
                  <Button
                    type="primary"
                    onClick={() => form.submit()}
                    loading={mutationUpdateStudent.isPending}
                  >
                    {t("modalInfo.update")}
                  </Button>
                </div>
              )}
              {isCreateMode && (
                <Button
                  type="primary"
                  loading={mutationCreateStudent.isPending}
                  onClick={() => form.submit()}
                >
                  {t("modalInfo.create")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default memo(ModalInfo)
