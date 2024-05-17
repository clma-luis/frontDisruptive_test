export const errorMessages: Record<number, string> = {
  200: "La operación se realizó con éxito.",
  400: "La solicitud no se puede procesar.",
  401: "Usuario no autorizado.",
  403: "Acceso prohibido.",
  404: "No se encontró el recurso solicitado.",
  500: "Ocurrió un error en el servidor",
};

export const genericErrorMessage = "Ups! ha ocurrido un error, intentalo mas tarde";

//==================================================
//==================CLIENT STATUS===================
//==================================================

export const OK_STATUS = 200;
export const CREATED_STATUS = 201;

export const BAD_REQUEST_STATUS = 400;
export const UNAUTHORIZED_STATUS = 401;
export const NOT_FOUND = 404;
//==================================================
//==================SERVER STATUS===================
//==================================================

export const INTERNAL_SERVER_ERROR_STATUS = 500;
