export type AppRole = "admin" | "farmer" | "driver" | "user";

export type User = {
  iin: string;
  name: string;
  role: AppRole;
  phone: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  farmer: { iin: string; name: string };
  driver: { iin: string; name: string };
  organization: string;
  product: { name: string; description: string; totalBoxes: number };
  status: string;
  createdAt: string;
};

export type NotificationItem = {
  id: string;
  type: string;
  message: { ru: string; kz: string };
  isRead: boolean;
  createdAt: string;
};

export const MOCK_USERS: User[] = [
  { iin: "880512300001", name: "Сейткали Нурланов", role: "admin", phone: "+77011110001" },
  { iin: "900823400002", name: "Айгерим Бекова", role: "admin", phone: "+77011110002" },
  { iin: "750610500003", name: "Дмитрий Власов", role: "admin", phone: "+77011110003" },
  { iin: "850315600004", name: "Ерлан Сапаров", role: "farmer", phone: "+77022220001" },
  { iin: "920728700005", name: "Нагима Джаксыбекова", role: "farmer", phone: "+77022220002" },
  { iin: "780903800006", name: "Пётр Колесников", role: "farmer", phone: "+77022220003" },
  { iin: "950214900007", name: "Асхат Муратов", role: "driver", phone: "+77033330001" },
  { iin: "870620100008", name: "Руслан Темиров", role: "driver", phone: "+77033330002" },
  { iin: "910405200009", name: "Владимир Сидоров", role: "driver", phone: "+77033330003" },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "order-001",
    orderNumber: "SKO-2024-0001",
    farmer: { iin: "850315600004", name: "Ерлан Сапаров" },
    driver: { iin: "950214900007", name: "Асхат Муратов" },
    organization: "АО «КазАгро»",
    product: { name: "Минеральные удобрения", description: "Азофоска NPK 16-16-16", totalBoxes: 4 },
    status: "in_transit",
    createdAt: "2024-11-01",
  },
  {
    id: "order-002",
    orderNumber: "SKO-2024-0002",
    farmer: { iin: "920728700005", name: "Нагима Джаксыбекова" },
    driver: { iin: "870620100008", name: "Руслан Темиров" },
    organization: "ТОО «СеверАгроСнаб»",
    product: { name: "Семена пшеницы", description: "Сорт Астана-2, элита", totalBoxes: 2 },
    status: "pending",
    createdAt: "2024-11-02",
  },
  {
    id: "order-003",
    orderNumber: "SKO-2024-0003",
    farmer: { iin: "780903800006", name: "Пётр Колесников" },
    driver: { iin: "910405200009", name: "Владимир Сидоров" },
    organization: "РГП «Агро-Север»",
    product: { name: "Средства защиты растений", description: "Гербицид Примадонна", totalBoxes: 3 },
    status: "delivered",
    createdAt: "2024-10-28",
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", type: "order_assigned", message: { ru: "Вам назначен заказ №SKO-2024-0001", kz: "Сізге SKO-2024-0001 тапсырысы тағайындалды" }, isRead: false, createdAt: "2024-11-01" },
  { id: "n2", type: "driver_arrived", message: { ru: "Водитель прибыл. Отсканируйте QR-код.", kz: "Жүргізуші келді. QR-кодты сканерлеңіз." }, isRead: false, createdAt: "2024-11-01" },
  { id: "n3", type: "delivery_confirmed", message: { ru: "Доставка по заказу №SKO-2024-0003 подтверждена", kz: "SKO-2024-0003 тапсырысы бойынша жеткізу расталды" }, isRead: true, createdAt: "2024-10-29" },
];
