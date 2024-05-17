export interface ErrorResponse extends StatusTypes {
  errors: Error[];
  message: string;
}

export interface StatusTypes {
  ok: boolean;
  statusCode: number;
}

interface Error {
  message: string;
  field: string;
}
