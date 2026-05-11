export type doc = {
  id: string;
  doc_url: string;
  status: string;
  name: string;
};

export type DocumentListRequestParams = {
  page: number;
  limit: number;
};

export type FetchDocUrlParams = {
  doc_id: number;
};
