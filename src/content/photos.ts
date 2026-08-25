import { asset } from '../lib/asset'

export type Photo = {
  src: string
  alt: string
  caption?: string
}

/** First uploaded image — used as the opening hero overlay */
export const HERO_PHOTO: Photo = {
  src: asset('photos/01-hero.png'),
  alt: 'Swetha',
  caption: 'For you',
}

export const storyPhotos: Photo[] = [
  {
    src: asset('photos/02-half-heart.png'),
    alt: 'Swetha forming half a heart',
    caption: 'Waiting for the other half',
  },
  {
    src: asset('photos/03-family.png'),
    alt: 'A warm family moment outdoors',
    caption: 'The life we share',
  },
  {
    src: asset('photos/04-rings.png'),
    alt: 'Matching rings held together',
    caption: 'A quiet promise',
  },
  {
    src: asset('photos/05-hands.png'),
    alt: 'Hands held tightly together',
    caption: 'Never letting go',
  },
  {
    src: asset('photos/06-temple-jasmine.png'),
    alt: 'Together at the temple with jasmine',
    caption: 'Sacred ordinary days',
  },
  {
    src: asset('photos/07-temple-together.png'),
    alt: 'Together with matching tilak',
    caption: 'Side by side',
  },
  {
    src: asset('photos/08-portrait.png'),
    alt: 'Close portrait together',
    caption: 'Near enough to feel forever',
  },
  {
    src: asset('photos/09-bare-feet.png'),
    alt: 'Bare feet standing close',
    caption: 'The little things',
  },
  {
    src: asset('photos/10-collage.png'),
    alt: 'A collection of shared memories',
    caption: 'Chapters of us',
  },
  {
    src: asset('photos/11-embrace.png'),
    alt: 'An embrace together',
    caption: 'Held',
  },
  {
    src: asset('photos/12-horizon.png'),
    alt: 'Together beyond the horizon',
    caption: 'Beyond the horizon',
  },
  {
    src: asset('photos/13-evening.png'),
    alt: 'Evening walk together',
    caption: 'Under the same light',
  },
]

export const FINAL_PHOTO: Photo = {
  src: asset('photos/11-embrace.png'),
  alt: 'Swetha and a lasting embrace',
  caption: 'Always',
}
