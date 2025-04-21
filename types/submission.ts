export interface WaterConnection {
  hasWaterConnection: boolean | null;
  authorizedConnections: number;
  authorizedDiameters: string[];
}

export interface Submission {
  wardNo: string;
  houseNo: string;
  residentName: string;
  mobileNo: string;
  address: string;
  households: number;
  propertyType: string;
  waterConnection: WaterConnection;
  propertyPhoto: File | null;
  pipelinePhoto: File | null;
  waterTaxBill: File | null;
}
