export default class AppResponse<T> {
  data: T;
  success: boolean;
  limit?: number;
  offset?: number;
  currentPage?: number;
  pages?: number;
  amount?: number;
  total?: number;

  constructor(
    data: T,
    limit?: number,
    offset?: number,
    currentPage?: number,
    pages?: number,
    amount?: number,
    total?: number
  ) {
    this.data = data;
    this.success = !(data instanceof Error);

    if (data instanceof Array) {
      this.limit = limit ? Number(limit) : 10;
      this.offset = offset ? Number(limit) : 0;
      this.currentPage = currentPage;
      this.pages = pages;
      this.amount = amount;
      this.total = total;
    }
  }
}
