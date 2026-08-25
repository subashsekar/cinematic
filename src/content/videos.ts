import { asset } from '../lib/asset'

export const siteVideos = [
  {
    id: 'moment-1',
    src: asset('video/video-1.mp4'),
    title: 'A moment',
    caption: 'Kept just for us',
  },
  {
    id: 'moment-2',
    src: asset('video/video2.mp4'),
    title: 'Another moment',
    caption: 'Still close',
  },
  {
    id: 'moment-3',
    src: asset('video/video3.mp4'),
    title: 'A shared glance',
    caption: 'Soft and real',
  },
  {
    id: 'moment-4',
    src: asset('video/video4.mp4'),
    title: 'One more memory',
    caption: 'Held in motion',
  },
  {
    id: 'final',
    src: asset('video/final.mp4'),
    title: 'The gift',
    caption: 'Open when you are ready',
    isGift: true,
  },
] as const
