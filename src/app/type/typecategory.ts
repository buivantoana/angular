export type typeCategory = {
  _id: string;
  name: string;
};
export type typeCategoryValue = Omit<typeCategory, '_id'>;

export type typeResponseCategory = {
  status: number;
  message: string;
  data: typeCategory;
};
