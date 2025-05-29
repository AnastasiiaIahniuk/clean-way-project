export const roleNames = {
  admin: 'Адміністратор',
  client: 'Клієнт',
  manager: 'Менеджер',
  cleaner: 'Клінер',
};

export const mockedUsers = [
  {
    userId: 1,
    name: "Леся",
    surname: "Українка",
    role: "client",
    email: "client@example.com"
  },
  {
    userId: 2,
    name: "Іван",
    surname: "Франко",
    role: "manager",
    email: "client@example.com"
  },
  {
    userId: 3,
    name: "Тарас",
    surname: "Шевченко",
    role: "cleaner",
    email: "cleaner@example.com"
  },
];

export const mockedOrdersList = [
  {
    orderId: 1,
    date: '2025-05-12',
    clientId: 1,
    cleanerId: 3,
    city: "Харків",
    address: "вул. Миру, 23б кв. 105",
    name: 'Прибирання "Все включено"',
    status: 'Нове',
    cost: 3200,
    details: "Не використовувати алергенні засоби."
  },
  {
    orderId: 2,
    date: '2024-07-10',
    clientId: 1,
    cleanerId: 3,
    city: "Харків",
    address: "вул. Миру, 23б кв. 105",
    name: 'Прибирання "Стандарт"',
    status: 'В обробці',
    cost: 2300,
    details: "Зварити вегетаріанський борщ."
  },
  {
    orderId: 3,
    date: '2023-03-01',
    clientId: 1,
    cleanerId: 3,
    city: "Пісочин",
    address: "вул. Зелена, 3б, кв. 1",
    name: 'Помити вікна',
    status: 'Виконано',
    cost: 1250,
    details: "Балкон включно."
  },
];

export const clientsList = [
  { userId: 1, fullName: 'Леся Українка' },
  { userId: 4, fullName: 'Марко Вовчок' },
  { userId: 5, fullName: 'Іван Котляревський' },
];

export const cleanersList = [
  { userId: 3, fullName: 'Тарас Шевченко' },
  { userId: 6, fullName: 'Василь Стус' },
  { userId: 7, fullName: 'Павло Тичина' },
];
