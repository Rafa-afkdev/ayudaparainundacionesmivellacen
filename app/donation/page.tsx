'use client';

import { fileToBase64 } from "@/actions/convert-file-to-base64";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportePago } from "@/interfaces/reporte-pagos.interface";
import { addDocument, uploadBase64 } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Camera,
    CheckCircle,
    Copy,
    CreditCard,
    FileText,
    Heart,
    Home,
    MapPin,
    Phone,
    Shield,
    Upload,
    User,
    X
} from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DonationPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const [receiptData, setReceiptData] = useState<ReportePago>({
    nombre: '',
    monto: 0,
    moneda: 'BS',
    fecha_pago: Timestamp.now(),
    imagen_pago: {
      path: '',
      url: ''
    }
  });

  const bankInfo = {
    account: "0102-0117-90-0000050102",
    bank: "Banco de Venezuela - Corriente",
    beneficiary: "MISION VENEZOLANA DE LOS LLANOS CENTRALES",
    rif: "J-311369430"
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64String = await fileToBase64(file);
        setReceiptData({
          ...receiptData,
          imagen_pago: {
            ...receiptData.imagen_pago,
            path: base64String
          }
        });
      } catch (error) {
        console.error('Error converting file to base64:', error);
        alert('Error al procesar la imagen. Por favor intenta de nuevo.');
      }
    }
  };

  const handleCameraCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64String = await fileToBase64(file);
        setReceiptData({
          ...receiptData,
          imagen_pago: {
            ...receiptData.imagen_pago,
            path: base64String
          }
        });
      } catch (error) {
        console.error('Error converting file to base64:', error);
        alert('Error al procesar la imagen. Por favor intenta de nuevo.');
      }
    }
  };

  const handleSubmitReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Subir imagen a Firebase Storage
      const imagePath = `receipts/${Date.now()}_${receiptData.nombre.replace(/\s+/g, '_')}`;
      const imageUrl = await uploadBase64(imagePath, receiptData.imagen_pago.path);

      // Preparar datos para guardar en Firestore usando la interfaz ReportePago
      const reporteToSave: ReportePago = {
        nombre: receiptData.nombre,
        monto: receiptData.monto,
        moneda: receiptData.moneda,
        fecha_pago: receiptData.fecha_pago,
        imagen_pago: {
          path: imagePath,
          url: imageUrl
        }
      };

      await addDocument('donation-receipts', reporteToSave);
      
      setUploadSuccess(true);
      
      // Reset form
      setReceiptData({
        nombre: '',
        monto: 0,
        moneda: 'BS',
        fecha_pago: Timestamp.now(),
        imagen_pago: {
          path: '',
          url: ''
        }
      });

      setTimeout(() => {
        setShowReceiptModal(false);
        setUploadSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error uploading receipt:', error);
      alert('Error al subir el comprobante. Por favor intenta de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/imagen1.jpg"
          alt="Iglesia Centro de Donaciones"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/75 to-indigo-900/80" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-blue-800/50 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Volver al inicio</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Image
                  src="/logo-iglesia.png"
                  alt="MIVELLACEN Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Image
                  src="/logo.png"
                  alt="Proyecto Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Image
                src="/logo-iglesia.png"
                alt="MIVELLACEN Logo"
                width={24}
                height={24}
                className="rounded-full"
              />
              <Heart className="w-6 h-6 text-red-400 animate-pulse" />
              <span className="text-white font-semibold">Tu ayuda marca la diferencia</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Realizar Donación
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Cada contribución ayuda directamente a las familias afectadas por las inundaciones 
              en Camagüán. Tu solidaridad salva vidas.
            </p>
          </motion.div>

          {/* Grid principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información bancaria */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-900" />
                </div>
                <h2 className="text-2xl font-bold text-white">Transferencia Bancaria</h2>
              </div>

              <div className="space-y-4">
                {/* Número de cuenta */}
                <div className="bg-white/20 rounded-lg p-4">
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Número de Cuenta
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono text-lg">{bankInfo.account}</span>
                    <button
                      onClick={() => copyToClipboard(bankInfo.account, 'account')}
                      className="ml-2 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {copiedField === 'account' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-white/70" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Banco */}
                <div className="bg-white/20 rounded-lg p-4">
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Banco
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{bankInfo.bank}</span>
                    <button
                      onClick={() => copyToClipboard(bankInfo.bank, 'bank')}
                      className="ml-2 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {copiedField === 'bank' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-white/70" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Beneficiario */}
                <div className="bg-white/20 rounded-lg p-4">
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Beneficiario
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{bankInfo.beneficiary}</span>
                    <button
                      onClick={() => copyToClipboard(bankInfo.beneficiary, 'beneficiary')}
                      className="ml-2 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {copiedField === 'beneficiary' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-white/70" />
                      )}
                    </button>
                  </div>
                </div>

                {/* RIF */}
                <div className="bg-white/20 rounded-lg p-4">
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    RIF
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono text-lg">{bankInfo.rif}</span>
                    <button
                      onClick={() => copyToClipboard(bankInfo.rif, 'rif')}
                      className="ml-2 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {copiedField === 'rif' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-white/70" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Nota de seguridad */}
              {/* <div className="mt-6 bg-green-500/20 border border-green-400 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold text-sm">Transferencia Segura</span>
                </div>
                <p className="text-white/90 text-xs leading-relaxed">
                  Todos los datos bancarios son oficiales y verificados. 
                  Tu donación llega directamente a las familias necesitadas.
                </p>
              </div> */}

              {/* Botón para subir comprobante */}
              <div className="mt-6">
                <button
                  onClick={() => setShowReceiptModal(true)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl transform hover:scale-105"
                >
                  <Upload className="w-5 h-5" />
                  <span>Subir Comprobante de Pago</span>
                </button>
              </div>
            </motion.div>

            {/* Información adicional */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Centro de donaciones */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Centro de Donaciones</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Iglesia Central de Camagüán</p>
                      <p className="text-white/80 text-sm">Camagüán, Estado Apure, Venezuela</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <a 
                      href="tel:+584243112771" 
                      className="text-white hover:text-blue-200 transition-colors"
                    >
                      +58 (424) 311-2771
                    </a>
                  </div>
                </div>

                <p className="text-white/80 text-sm mt-4 leading-relaxed">
                  También puedes llevar donaciones en especie directamente a nuestra iglesia. 
                  Necesitamos alimentos no perecederos, agua, medicinas y productos de higiene.
                </p>
              </div>

              {/* Impacto de la donación */}
              {/* <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Tu Impacto</h3>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-semibold">
                        <div>50 Bs</div>
                        <div className="text-sm opacity-75">≈ $1.5 USD</div>
                      </div>
                      <span className="text-yellow-400 text-sm">1 comida familiar</span>
                    </div>
                  </div>

                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-semibold">
                        <div>200 Bs</div>
                        <div className="text-sm opacity-75">≈ $6 USD</div>
                      </div>
                      <span className="text-yellow-400 text-sm">Kit de higiene</span>
                    </div>
                  </div>

                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-semibold">
                        <div>500 Bs</div>
                        <div className="text-sm opacity-75">≈ $15 USD</div>
                      </div>
                      <span className="text-yellow-400 text-sm">Refugio semanal</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Transparencia */}
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-yellow-400" />
                  100% Transparente
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Cada donación es registrada y distribuida bajo supervisión pastoral. 
                  Publicamos reportes regulares del uso de los fondos para mantener 
                  total transparencia con nuestros donantes.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Versículo bíblico */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
              <p className="text-white/90 text-lg italic leading-relaxed mb-3">
                &quot;En cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis&quot;
              </p>
              <p className="text-yellow-400 font-bold">Mateo 25:40</p>
            </div>
          </motion.div>

          {/* Botón de regreso */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-white/30"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al sitio principal</span>
            </Link>
          </motion.div> */}
        </div>
      </div>

      {/* Modal para subir comprobante */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo-iglesia.png"
                  alt="MIVELLACEN Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Subir Comprobante
                </h3>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">¡Comprobante Enviado!</h4>
                <p className="text-gray-600">
                  Hemos recibido tu comprobante. Lo verificaremos y nos pondremos en contacto contigo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReceipt} className="space-y-4">
                <div>
                  <Label htmlFor="nombre" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Nombre completo
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    required
                    value={receiptData.nombre}
                    onChange={(e) => setReceiptData({...receiptData, nombre: e.target.value})}
                    placeholder="Tu nombre completo"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="monto" className="text-sm font-medium text-gray-700 mb-2">
                      Monto donado
                    </Label>
                    <Input
                      id="monto"
                      type="number"
                      step="0.01"
                      required
                      value={receiptData.monto || ''}
                      onChange={(e) => setReceiptData({...receiptData, monto: parseFloat(e.target.value) || 0})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="moneda" className="text-sm font-medium text-gray-700 mb-2">
                      Moneda
                    </Label>
                    <Select
                      value={receiptData.moneda}
                      onValueChange={(value) => setReceiptData({...receiptData, moneda: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BS">Bolívares (Bs)</SelectItem>
                        <SelectItem value="USD">Dólares (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="fecha" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Fecha de la transferencia
                  </Label>
                  <Input
                    id="fecha"
                    type="date"
                    required
                    value={receiptData.fecha_pago.toDate().toISOString().split('T')[0]}
                    onChange={(e) => setReceiptData({...receiptData, fecha_pago: Timestamp.fromDate(new Date(e.target.value))})}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Comprobante de pago
                  </Label>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* Subir desde archivo */}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="fileUpload"
                      />
                      <label 
                        htmlFor="fileUpload"
                        className="w-full cursor-pointer bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-3 text-center hover:bg-blue-100 transition-colors flex flex-col items-center justify-center space-y-1"
                      >
                        <Upload className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-blue-600 font-medium">Subir archivo</span>
                      </label>
                    </div>

                    {/* Tomar foto */}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleCameraCapture}
                        className="hidden"
                        id="cameraCapture"
                      />
                      <label 
                        htmlFor="cameraCapture"
                        className="w-full cursor-pointer bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-3 text-center hover:bg-green-100 transition-colors flex flex-col items-center justify-center space-y-1"
                      >
                        <Camera className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">Tomar foto</span>
                      </label>
                    </div>
                  </div>

                  {receiptData.imagen_pago.path && (
                    <div className="mt-2 relative w-full h-32">
                      <Image 
                        src={receiptData.imagen_pago.path} 
                        alt="Preview del comprobante" 
                        fill
                        className="object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowReceiptModal(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Enviar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
}
