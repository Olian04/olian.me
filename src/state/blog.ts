import { createSignal } from 'solid-js';
import addDays from 'date-fns/addDays';

import { BlogPost } from '~/types/BlogPost';

export const blog = {
  posts: createSignal<BlogPost[]>([]),
};

// TODO: Remove demo data
const [_, setPosts] = blog.posts;
setPosts(() => [
  {
    created: new Date(),
    title: 'Finished bachelors degree!',
    content:
      "That's right, you read that correctly! I finished my bachelors degree in computer science in the summer of 2022.",
  },
  {
    created: addDays(new Date(), -10),
    title: '200 thousand downloads on NPM',
    content:
      'My nodejs library better-logging has just surpassed 200 thousand total downloads. With the release of version 5.0 the library got a rather significant boost in weekly downloads, and currently sits at 7000 weekly downloads.',
  },
  {
    created: addDays(new Date(), -350),
    title: 'Bachelors dissertation published',
    content:
      'As part of my bachelors degree I just published a dissertation on the strategy synthesis of real-world problems modeled as single-player games of imperfect information. The full paper is publicly available for free through the schools academic portal.',
  },
  {
    created: addDays(new Date(), -4000),
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Curabitur sit amet aliquam est, in suscipit quam. Nulla vestibulum justo ac luctus consequat. Quisque imperdiet tempor erat vitae auctor. Donec quis varius justo. Donec accumsan sagittis imperdiet. Cras in magna blandit velit pulvinar pharetra vel id ipsum. Ut at urna ac purus pharetra accumsan sed a sem. Quisque nisi erat, auctor semper eleifend sit amet, blandit ut augue. Sed interdum hendrerit urna in elementum. Vivamus lobortis aliquam porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eleifend tellus a urna tempor, eu ultricies lorem sollicitudin. Integer ut rutrum massa.',
  },
  {
    created: addDays(new Date(), -4000),
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Curabitur sit amet aliquam est, in suscipit quam. Nulla vestibulum justo ac luctus consequat. Quisque imperdiet tempor erat vitae auctor. Donec quis varius justo. Donec accumsan sagittis imperdiet. Cras in magna blandit velit pulvinar pharetra vel id ipsum. Ut at urna ac purus pharetra accumsan sed a sem. Quisque nisi erat, auctor semper eleifend sit amet, blandit ut augue. Sed interdum hendrerit urna in elementum. Vivamus lobortis aliquam porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eleifend tellus a urna tempor, eu ultricies lorem sollicitudin. Integer ut rutrum massa.',
  },
  {
    created: addDays(new Date(), -4000),
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Curabitur sit amet aliquam est, in suscipit quam. Nulla vestibulum justo ac luctus consequat. Quisque imperdiet tempor erat vitae auctor. Donec quis varius justo. Donec accumsan sagittis imperdiet. Cras in magna blandit velit pulvinar pharetra vel id ipsum. Ut at urna ac purus pharetra accumsan sed a sem. Quisque nisi erat, auctor semper eleifend sit amet, blandit ut augue. Sed interdum hendrerit urna in elementum. Vivamus lobortis aliquam porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eleifend tellus a urna tempor, eu ultricies lorem sollicitudin. Integer ut rutrum massa.',
  },
  {
    created: addDays(new Date(), -4000),
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Curabitur sit amet aliquam est, in suscipit quam. Nulla vestibulum justo ac luctus consequat. Quisque imperdiet tempor erat vitae auctor. Donec quis varius justo. Donec accumsan sagittis imperdiet. Cras in magna blandit velit pulvinar pharetra vel id ipsum. Ut at urna ac purus pharetra accumsan sed a sem. Quisque nisi erat, auctor semper eleifend sit amet, blandit ut augue. Sed interdum hendrerit urna in elementum. Vivamus lobortis aliquam porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eleifend tellus a urna tempor, eu ultricies lorem sollicitudin. Integer ut rutrum massa.',
  },
  {
    created: addDays(new Date(), -4000),
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Curabitur sit amet aliquam est, in suscipit quam. Nulla vestibulum justo ac luctus consequat. Quisque imperdiet tempor erat vitae auctor. Donec quis varius justo. Donec accumsan sagittis imperdiet. Cras in magna blandit velit pulvinar pharetra vel id ipsum. Ut at urna ac purus pharetra accumsan sed a sem. Quisque nisi erat, auctor semper eleifend sit amet, blandit ut augue. Sed interdum hendrerit urna in elementum. Vivamus lobortis aliquam porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eleifend tellus a urna tempor, eu ultricies lorem sollicitudin. Integer ut rutrum massa.',
  },
  {
    created: addDays(new Date(), -4000),
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Curabitur sit amet aliquam est, in suscipit quam. Nulla vestibulum justo ac luctus consequat. Quisque imperdiet tempor erat vitae auctor. Donec quis varius justo. Donec accumsan sagittis imperdiet. Cras in magna blandit velit pulvinar pharetra vel id ipsum. Ut at urna ac purus pharetra accumsan sed a sem. Quisque nisi erat, auctor semper eleifend sit amet, blandit ut augue. Sed interdum hendrerit urna in elementum. Vivamus lobortis aliquam porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eleifend tellus a urna tempor, eu ultricies lorem sollicitudin. Integer ut rutrum massa.',
  },
]);
