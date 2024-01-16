export type typeProduct = {
  _id: string;
  title: string;
  price: number;
  description: string;
  categoryId: any;
  image: string;
};

export type typeProductValue = Omit<typeProduct, '_id'>;
