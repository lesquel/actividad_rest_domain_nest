export interface TableSeedData {
  id: string;
  sectionId: string;
  tableNumber: number;
  capacity: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  imageId: string | null;
}

export const tablesSeedData: TableSeedData[] = [
  {
    id: 'table-001',
    sectionId: 'sec-001',
    tableNumber: 1,
    capacity: 4,
    positionX: 50,
    positionY: 50,
    width: 80,
    height: 80,
    imageId: null,
  },
  {
    id: 'table-002',
    sectionId: 'sec-001',
    tableNumber: 2,
    capacity: 4,
    positionX: 150,
    positionY: 50,
    width: 80,
    height: 80,
    imageId: null,
  },
  {
    id: 'table-003',
    sectionId: 'sec-001',
    tableNumber: 3,
    capacity: 6,
    positionX: 50,
    positionY: 150,
    width: 100,
    height: 100,
    imageId: null,
  },
  {
    id: 'table-004',
    sectionId: 'sec-002',
    tableNumber: 4,
    capacity: 2,
    positionX: 30,
    positionY: 30,
    width: 60,
    height: 60,
    imageId: null,
  },
  {
    id: 'table-005',
    sectionId: 'sec-002',
    tableNumber: 5,
    capacity: 2,
    positionX: 120,
    positionY: 30,
    width: 60,
    height: 60,
    imageId: null,
  },
  {
    id: 'table-006',
    sectionId: 'sec-003',
    tableNumber: 1,
    capacity: 2,
    positionX: 40,
    positionY: 20,
    width: 50,
    height: 50,
    imageId: null,
  },
  {
    id: 'table-007',
    sectionId: 'sec-004',
    tableNumber: 2,
    capacity: 8,
    positionX: 80,
    positionY: 80,
    width: 150,
    height: 120,
    imageId: null,
  },
  {
    id: 'table-008',
    sectionId: 'sec-005',
    tableNumber: 1,
    capacity: 4,
    positionX: 60,
    positionY: 60,
    width: 80,
    height: 80,
    imageId: null,
  },
  {
    id: 'table-009',
    sectionId: 'sec-006',
    tableNumber: 10,
    capacity: 6,
    positionX: 100,
    positionY: 100,
    width: 100,
    height: 100,
    imageId: 'img-006',
  },
];
