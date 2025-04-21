export interface WaterConnection {
  hasWaterConnection: string | null;
  authorizedConnections: number;
  authorizedDiameters: string[];
}

export interface Submission {
  wardNo: string;
  houseNo: string;
  residentName: string;
  mobileNo: string;
  address: string;
  households: number | null;
  propertyType: string;
  waterConnection: WaterConnection;
  propertyPhoto?: File | null;
  pipelinePhoto?: File | null;
  waterTaxBill?: File | null;
}
