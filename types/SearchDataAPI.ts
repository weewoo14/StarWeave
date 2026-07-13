export type searchDataContextType = {
  searchData: stellarObjectResultType[];
  dataLoaded: boolean;
};

export type stellarObjectResultType = {
  name: string;
  location: string;
};

export type horizonResultType = {
  name: string;
};
