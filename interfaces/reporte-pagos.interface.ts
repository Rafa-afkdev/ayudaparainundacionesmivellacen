import { Timestamp } from "firebase/firestore";

export interface ReportePago {
  id?: string;  
  nombre: string;
  fecha_pago: Timestamp;
    monto: number;
    moneda: string;
    imagen_pago: ImagenPago;
} 

export interface ImagenPago {
    path: string;
    url: string;
}