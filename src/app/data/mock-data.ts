import { Route } from '../types/route';

export const routes: Route[] = [
  {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    address: '192.168.1.100',
    mask: '24',
    gateway: '192.168.1.1',
    interface: 'Домашняя сеть',
  },
  {
    uuid: '234f5678-f9ab-23c4-b567-537725285001',
    address: '10.0.0.200',
    mask: '24',
    gateway: '10.0.0.1',
    interface: 'Wi-Fi',
  },
  {
    uuid: '345g6789-g0ab-34d5-c678-648836396002',
    address: '172.16.2.50',
    mask: '8',
    gateway: '172.16.2.1',
    interface: 'Внутренний',
  },
  {
    uuid: '345g6789-g0ab-34d5-c678-648836396002',
    address: '172.16.2.10',
    mask: '0',
    gateway: '172.16.2.1',
    interface: 'Внутренний',
  },
  {
    uuid: '456h789a-h1bc-45e6-d789-759947407003',
    address: '192.168.2.10',
    mask: '24',
    gateway: '192.168.2.1',
    interface: 'Домашняя сеть',
  },
  {
    uuid: '567i89ab-i2cd-56ef-9abc-86aa58518004',
    address: '10.0.0.50',
    mask: '32',
    gateway: '10.10.10.1',
    interface: 'Публичная сеть',
  },
  {
    uuid: '678j9abc-j3de-67fg-abcd-97bb69629005',
    address: '172.16.3.200',
    mask: '24',
    gateway: '172.16.3.1',
    interface: 'Резервной канал',
  },
  {
    uuid: '789kabcd-k4ef-78gh-bcde-a8cc7873a006',
    address: '192.168.3.50',
    mask: '8',
    gateway: '192.168.3.1',
    interface: 'Wi-Fi',
  },
];
