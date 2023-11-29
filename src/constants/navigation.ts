export const MainMenu = {
  manufacture: "manufacture",
  quality: "quality",
  device: "device",
  transpot: "transpot",
};

export const NavigationMenu = [
  {
    key: "manufacture_output",
    path: "/manufacture_output",
    pageName: "Đầu vào sản xuất",
    menu: MainMenu.manufacture,
  },
  {
    key: "pqc_external",
    path: "/pqc_external",
    pageName: "PQC - Ngoại quan",
    menu: MainMenu.quality,
  },
  {
    key: "device",
    path: "/device",
    pageName: "Thiết bị",
    menu: MainMenu.device,
  },
  {
    key: "enter_product",
    path: "/enter_product",
    pageName: "Nhập kho thành phẩm",
    menu: MainMenu.transpot,
  },
];

export const Navigation = [
  {
    key: "home",
    path: "/",
    pageName: "Công ty điện tử Việt Nhật",
  },
  {
    key: "server_configuration",
    path: "/server_configuration",
    pageName: "Cấu hình",
  },
  {
    key: "device",
    path: "/device",
    pageName: "Thiết bị - ép nhựa",
    menu: MainMenu.device,
  },
  {
    key: "manufacture_input",
    path: "/manufacture_input",
    pageName: "Đầu vào sản xuất - ép nhựa",
    menu: MainMenu.manufacture,
  },
  {
    key: "manufacture_output",
    path: "/manufacture_output",
    pageName: "Đầu ra sản xuất - ép nhựa",
    menu: MainMenu.manufacture,
  },
  {
    key: "find_mold",
    path: "/find_mold",
    pageName: "Tìm khuôn",
    menu: MainMenu.manufacture,
  },

  {
    key: "manufacture_plastic",
    path: "/manufacture_plastic",
    pageName: "Sản xuất ép nhựa",
    menu: MainMenu.manufacture,
  },
  {
    key: "inventory_management",
    path: "/inventory_management",
    pageName: "Nhập kho",
    menu: MainMenu.transpot,
  },
  {
    key: "warehouse_output",
    path: "/warehouse_output",
    pageName: "Xuất kho",
    menu: MainMenu.transpot,
  },
  {
    key: "enter_product",
    path: "/enter_product",
    pageName: "Nhập kho thành phẩm",
    menu: MainMenu.transpot,
  },
  {
    key: "oqc",
    path: "/oqc",
    pageName: "OQC",
    menu: MainMenu.quality,
  },
  {
    key: "pqc_external",
    path: "/pqc_external",
    pageName: "PQC - ÉP NHỰA",
    menu: MainMenu.quality,
  },
];
