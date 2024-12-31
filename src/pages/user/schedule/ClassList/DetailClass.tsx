import { Select } from "antd"

const DetailClass: React.FC = () => {
  return (
    <div className="w-[50px]">
      <Select
        mode="multiple"
        placeholder="Please select student code"
        options={[
          { value: 1, label: "Toán cao cấpfdjfaslkfjasdlkfjasdlkfjsa;flk" },
          { value: 2, label: "Toán rơi ra" },
          { value: 3, label: "Toán cao cấp 21231" },
        ]}
        // style={{ minWidth: 100, maxWidth: 200 }}
      />
    </div>
  )
}

export default DetailClass
