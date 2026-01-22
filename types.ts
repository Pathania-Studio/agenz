
export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  LAPTOP = 'LAPTOP'
}

export interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  device: DeviceType;
  image: string;
}
