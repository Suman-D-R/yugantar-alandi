export interface WaterConnection {
  hasWaterConnection: boolean | null;
  authorizedConnections: number;
  authorizedDiameters: string[];
}

// Payload type with files
export interface SubmissionPayload {
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

// Prisma-compatible type with URLs
export interface Submission {
  wardNo: string;
  houseNo: string;
  residentName: string;
  mobileNo: string;
  address: string;
  households: number;
  propertyType: string;
  waterConnection: WaterConnection;
  propertyPhoto: string | null; // URL
  pipelinePhoto: string | null; // URL
  waterTaxBill: string | null; // URL
}
