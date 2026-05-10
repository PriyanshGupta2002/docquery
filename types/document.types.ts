export type doc = {
  id: string;
  docUrl: string;
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
