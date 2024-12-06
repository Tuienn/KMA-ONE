import { CameraOutlined, EditOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Avatar, Button, Form, Image, Modal, Radio } from "antd"
import dayjs from "dayjs"
import { memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  apiGetDistricts,
  apiGetProvinces,
  apiGetWards,
} from "../../api/apiProvince"
import backgroundInfo from "../../assets/images/backgroundInfo.jpg"
import { formatDateToString, getFirstLetterName } from "../../utils/common"
import { formatOptionsAddress } from "../../utils/formatValue"
import FormItemCommon from "./formItemCustom/FormItemCommon"

export interface DataFormType {
  background?: string | null
  avatar?: string | null
  name: string
  code: string
  birth: string | null
  gender: number | null
  address: string | null
  phone: string | null
}

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  permission: "admin" | "user" | "guest"
  initialValue?: DataFormType
  adminCreateMode?: boolean
}

const ModalInfo: React.FC<Props> = ({
  open,
  setOpen,
  permission,
  initialValue,
  adminCreateMode = false,
}) => {
  const { t } = useTranslation(["modalInfo", "notification"])

  const isUser = permission === "user"
  const isAdmin = permission === "admin"
  const isGuest = permission === "guest"

  const [dataForm, setDataForm] = useState<DataFormType>(
    (initialValue as DataFormType) ?? {},
  )

  const [editMode, setEditMode] = useState<boolean>(false)
  const [form] = Form.useForm()
  const provinceValue = Form.useWatch(["address", "province"], form)
  const districtValue = Form.useWatch(["address", "district"], form)

  const profileForm = [
    {
      name: t("information.student code"),
      value: dataForm.code || "",
    },
    { name: t("information.name"), value: dataForm.name },
    {
      name: t("information.birth"),
      value: dataForm.birth ?? (
        <p className="text-[14px] italic text-gray-500">
          {t("information.no data")}
        </p>
      ),
    },
    {
      name: t("information.gender"),
      value:
        dataForm.gender !== null ? (
          dataForm.gender === 0 ? (
            t("information.gender male")
          ) : (
            t("information.gender female")
          )
        ) : (
          <p className="text-[14px] italic text-gray-500">
            {t("information.no data")}
          </p>
        ),
    },
    {
      name: t("information.phone"),
      value: dataForm.phone ?? (
        <p className="text-[14px] italic text-gray-500">
          {t("information.no data")}
        </p>
      ),
    },
    {
      name: t("information.address"),
      value: dataForm.address ?? (
        <p className="text-[14px] italic text-gray-500">
          {t("information.no data")}
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
      const province = isNaN(Number(address.province))
        ? address.province
        : queryProvinces.data?.find(
            (province: any) => province.id === address.province,
          )?.name
      const district = isNaN(Number(address.district))
        ? address.district
        : queryDistricts.data?.find(
            (district: any) => district.id === address.district,
          )?.name
      const ward = isNaN(Number(address.ward))
        ? address.ward
        : queryWards.data?.find((ward: any) => ward.id === address.ward)?.name
      return `${province}, ${district}, ${ward}`
    }
    const formatData = {
      ...value,
      birth: formatDateToString(value.birth),
      address: formatAddress(value.address),
    }
    setDataForm(formatData)
    // console.log(formatData)

    if (adminCreateMode) {
    } else {
    }
  }

  return (
    <Modal
      centered
      title={
        <h2>
          {editMode
            ? t("modalInfo.title edit mode")
            : t("modalInfo.information title")}
        </h2>
      }
      open={open}
      onCancel={() => {
        setOpen(false)
        setEditMode(false)
      }}
      okText={t("modalInfo.okText")}
      cancelText={t("modalInfo.cancelText")}
      classNames={{
        content: "!p-[15px] sm:!p-[24px]",
        body: "overflow-hidden",
      }}
      footer={null}
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
                    {dataForm.avatar ? "" : getFirstLetterName(dataForm.name)}
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
                {t("modalInfo.information title")}
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
              initialValues={{
                ...initialValue,
                birth: dayjs(initialValue?.birth ?? "0000/00/00", "YYYY/MM/DD"),
                address: {
                  province: initialValue?.address?.split(", ")[0],
                  district: initialValue?.address?.split(", ")[1],
                  ward: initialValue?.address?.split(", ")[2],
                },
              }}
            >
              <FormItemCommon
                type="input"
                label={t("information.student code")}
                name="code"
                rules={[
                  {
                    required: true,
                    message: t("notification:form.input required"),
                  },
                  {
                    pattern: /^(CT|AT|DT|ct|at|dt)\d{6}$/,
                    message: t("notification:form.input pattern"),
                  },
                ]}
                className={`${isUser && "hidden"}`}
              />
              <FormItemCommon
                type="input"
                name={"name"}
                label={t("information.name")}
                rules={[
                  {
                    required: true,
                    message: t("notification:form.input required"),
                  },
                  {
                    pattern: /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/,
                    message: t("notification:form.input pattern"),
                  },
                ]}
              />
              <FormItemCommon
                type="date_picker"
                name={"birth"}
                label={t("information.birth")}
                placeholder={t("information.birth placeholder")}
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
                    {t("information.gender male")}
                  </Radio>
                  <Radio value={1}>{t("information.gender female")}</Radio>
                </Radio.Group>
              </Form.Item>
              <div className="pb-2">{t("information.address")}</div>
              <div className="flex flex-col gap-1 sm:flex-row">
                <FormItemCommon
                  type="search_select"
                  name={["address", "province"]}
                  className="flex-1 sm:max-w-[154.5px]"
                  placeholder={t("information.address province")}
                  options={formatOptionsAddress(queryProvinces?.data)}
                  loading={queryProvinces.isLoading}
                  // label={t("information.address")}
                />
                <FormItemCommon
                  type="search_select"
                  name={["address", "district"]}
                  className="flex-1 sm:max-w-[154.5px]"
                  placeholder={t("information.address district")}
                  options={formatOptionsAddress(queryDistricts?.data)}
                  loading={queryDistricts.isLoading}
                  disabled={!provinceValue}
                />
                <FormItemCommon
                  type="search_select"
                  name={["address", "ward"]}
                  className="flex-1 sm:max-w-[154.5px]"
                  placeholder={t("information.address ward")}
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
                    message: t("notification:form.input pattern"),
                  },
                ]}
              />
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
              {!adminCreateMode && (
                <Button type="primary" onClick={() => form.submit()}>
                  {t("modalInfo.okText")}
                </Button>
              )}
              {adminCreateMode && (
                <Button type="primary" onClick={() => form.submit()}>
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
