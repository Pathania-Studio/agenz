
import { DeviceType, SectionData } from './types';

export const SECTIONS: SectionData[] = [
  {
    id: 'section-1',
    title: 'Experience in your pocket',
    subtitle: 'Ultra Mobile',
    description: 'The world\'s most powerful interface, designed to fit perfectly in your hand. Fast, fluid, and always with you.',
    device: DeviceType.MOBILE,
    image: 'https://picsum.photos/id/1/800/1200'
  },
  {
    id: 'section-2',
    title: 'Precision Meets Scale',
    subtitle: 'The Canvas',
    description: 'Transition seamlessly to a larger canvas. Our tablet mode provides the space you need to create, explore, and collaborate without boundaries.',
    device: DeviceType.TABLET,
    image: 'https://picsum.photos/id/2/1200/800'
  },
  {
    id: 'section-3',
    title: 'Unleash Full Productivity',
    subtitle: 'Desktop Power',
    description: 'Transform into a full-scale workstation. Complex tasks, multiple windows, and professional performance, all in one sleek frame.',
    device: DeviceType.LAPTOP,
    image: 'https://picsum.photos/id/3/1600/900'
  }
];
