export const getTotalPages = (total: number, perPage: number) => {
  return Math.ceil(total / perPage);
};

export const getPaginatedItems = <T>(items: T[], page: number, perPage: number) => {
  return items.slice((page - 1) * perPage, page * perPage);
};
