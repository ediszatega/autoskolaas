export interface News {
  key: string;
  title: string;
  content: string;
  date: Date;
  author: string;
  images: { filepath: string; url: string }[];
}
