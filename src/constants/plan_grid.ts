export const columns = [
  {
    dataField: "c1",
    caption: "Dừng\nkhẩn\ncấp",
  },
  {
    dataField: "c2",
    caption: "TG\nkết thúc",
    flex: 1.5,
  },
  {
    dataField: "c3",
    caption: "Máy",
  },
  {
    dataField: "c4",
    caption: "Tên khuôn",
    flex: 2,
  },
  {
    dataField: "c5",
    caption: "Vật liệu",
    flex: 1.5,
  },
  {
    dataField: "c6",
    caption: "Màu sắc",
  },
  {
    dataField: "c7",
    caption: "SL\nkế hoạch",
  },
  {
    dataField: "c8",
    caption: "Mẫu\nok",
  },
  {
    dataField: "c9",
    caption: "Thời\ngian\nthực",
  },
];

const row_data_test = {
  c3: "160T-2",
  c4: "VN017-02-02",
  c5: "ABS",
  c6: "Đen",
  c7: "2000",
  c8: "2",
  c9: "8h30",
};

export const dataSource: any[] = [
  { ...row_data_test, status: "R", c2: "00:30:22" },
  { ...row_data_test, status: "P", c3: "160T-3" },
  { ...row_data_test, status: "R", c3: "160T-4" },
  { ...row_data_test, status: "C", c3: "160T-5" },
  { ...row_data_test, status: "R", c2: "00:20:22", c3: "160T-6" },
  { ...row_data_test, status: "R", c3: "160T-7" },
  { ...row_data_test, status: "R", c3: "160T-8" },
  row_data_test,
  row_data_test,
  row_data_test,
  row_data_test,
];
