export type searchDataContextType = {
  searchData: stellarObjectResultType[];
  dataLoaded: boolean;
};

export type stellarObjectResultType = {
  id: string;
  name: string;
  location: string;
};

export type horizonResultType = {
  id: string;
  name: string;
};
