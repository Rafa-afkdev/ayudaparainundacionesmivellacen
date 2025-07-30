/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, useInView } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    AlertTriangle,
    Building,
    Clock,
    Copy,
    CreditCard,
    Droplets,
    Facebook,
    FileText,
    Hash,
    Heart,
    Home,
    Mail,
    MapPin,
    MessageCircle,
    Package,
    Phone,
    Shield,
    User,
    Users
} from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function EmergenciaInundacionesHome() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const alertBannerRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const situationCardsRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const statsContainerRef = useRef<HTMLDivElement | null>(null);
  const donationSectionRef = useRef<HTMLElement | null>(null);
  const donationsRef = useRef<HTMLElement | null>(null);
  const donationsContainerRef = useRef<HTMLDivElement | null>(null);

  // State for client-side rendering of video
  const [isBrowser, setIsBrowser] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Estado para el carrusel de imágenes
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes de emergencia
  const emergencyImages = [
    "/imagen1.jpg",
    "/imagen2.jpg", 
    "/imagen3.jpg",
    "/imagen4.jpg",
    "/imagen5.jpg"
  ];

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    // Carrusel automático de imágenes
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % emergencyImages.length);
    }, 5000);

    // GSAP Animaciones principales
    const ctx = gsap.context(() => {
      // Animación del hero section con parallax
      gsap.set(heroSectionRef.current, { opacity: 0 });
      
      const heroTl = gsap.timeline();
      heroTl
        .to(heroSectionRef.current, { 
          opacity: 1, 
          duration: 1.5, 
          ease: "power2.out" 
        })
        .from(titleRef.current, { 
          y: 100, 
          opacity: 0, 
          duration: 1.2, 
          ease: "back.out(1.7)" 
        }, "-=0.8")
        .from(alertBannerRef.current, { 
          y: -50, 
          opacity: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        }, "-=0.5");

      // Animación de las tarjetas de situación con scroll trigger
      gsap.set(".situation-card", { y: 80, opacity: 0, scale: 0.8 });
      
      ScrollTrigger.create({
        trigger: situationCardsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(".situation-card", {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
          });
        }
      });

      // Animación de la galería con efectos 3D
      gsap.set(".gallery-card", { rotationY: -15, opacity: 0, z: -100 });
      
      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(".gallery-card", {
            rotationY: 0,
            opacity: 1,
            z: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
          });
        }
      });

      // Animación de estadísticas con contador
      ScrollTrigger.create({
        trigger: statsContainerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(".stats-card", {
            scale: 0.5,
            opacity: 0,
            rotation: 10,
            duration: 0.8,
            stagger: 0.1,
            ease: "elastic.out(1, 0.8)"
          });
        }
      });

      // Animación de la sección de donaciones con efecto 3D
      ScrollTrigger.create({
        trigger: donationsContainerRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.from(".donation-card", {
            y: 50,
            opacity: 0,
            rotationX: 45,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(imageInterval);
    };
  }, [isBrowser]);

  // Toggle mute/unmute
  const toggleMute = () => {
    // Función conservada para compatibilidad
  };

  return (
    <>
      <main>
        {/* Hero Section - Emergencia */}
        <section ref={heroSectionRef} className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
          {isBrowser && (
            <div ref={heroImageRef} className="absolute inset-0 z-0 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={emergencyImages[currentImageIndex]}
                  alt={`Situación de emergencia ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-1000"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent" />
              </div>
            </div>
          )}

          {/* Banner de alerta */}
          <div ref={alertBannerRef} className="absolute top-0 left-0 right-0 z-20 bg-blue-600 text-white py-3 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-3">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span className="font-bold text-sm md:text-base">
                EMERGENCIA ACTIVA: Inundaciones en Camagüán, Apure y Amazonas
              </span>
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Contenido del Hero */}
          <div className="relative z-10 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center lg:text-left lg:max-w-3xl"
              >
                <div 
                  className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full inline-flex items-center space-x-2 mb-6 shadow-lg border border-blue-400/30"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-semibold">EMERGENCIA HUMANITARIA</span>
                </div>

                <h1 
                  ref={titleRef}
                  className="text-4xl md:text-6xl lg:text-7xl font-heading text-white mb-6 leading-tight"
                >
                  <span className="block">Ayuda</span>
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                    Urgente
                  </span>
                  <span className="block">para Venezuela</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Las inundaciones han devastado <strong>Camagüán, Apure y Amazonas</strong>. 
                  Más de <strong>19,000 familias</strong> necesitan tu ayuda inmediata.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Heart className="w-6 h-6" />
                    <span>Donar Ahora</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Phone className="w-6 h-6" />
                    <span>Contactar</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Indicadores de carrusel */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {emergencyImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-white shadow-lg scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Situación Actual */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-heading text-4xl md:text-5xl text-gray-900 mb-6 relative"
              >
                Situación Crítica
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed"
              >
                Las lluvias torrenciales han causado desbordamientos de ríos afectando gravemente 
                a las comunidades rurales y urbanas de estas regiones venezolanas.
              </motion.p>
            </div>

            <div ref={situationCardsRef} className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Home className="w-12 h-12 text-blue-600" />,
                  title: "Familias Evacuadas",
                  description: "Más de 19,000 familias han perdido sus hogares y necesitan refugio temporal.",
                  stats: "40+ refugios activos"
                },
                {
                  icon: <Droplets className="w-12 h-12 text-blue-600" />,
                  title: "Crisis de Agua",
                  description: "Sin acceso a agua potable ni servicios básicos en las zonas afectadas.",
                  stats: "72h sin suministros"
                },
                {
                  icon: <Heart className="w-12 h-12 text-blue-600" />,
                  title: "Asistencia Médica",
                  description: "Urgente necesidad de medicamentos y atención médica especializada.",
                  stats: "150+ niños evacuados"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="situation-card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-full shadow-lg inline-block mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-2xl text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                  
                  <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold text-sm">{item.stats}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Galería de Situación */}
        <section ref={galleryRef} className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-indigo-100"></div>
              <div className="relative z-10 py-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-heading text-4xl md:text-5xl text-gray-900 mb-6 relative"
                >
                  Testimonios de la Emergencia
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-gray-700 text-lg max-w-3xl mx-auto"
                >
                  Imágenes reales de la situación actual en las zonas afectadas
                </motion.p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  src: "/imagenevacuacion1.jpg",
                  title: "Evacuación Camagüán",
                  description: "Familias siendo evacuadas de sus hogares",
                  status: "Urgente"
                },
                {
                  src: "/imagenevacuacion2.jpg", 
                  title: "Refugio Temporal",
                  description: "Refugio habilitado para familias evacuadas",
                  status: "Crítico"
                },
                {
                  src: "/imagen3.jpg",
                  title: "Asistencia Médica",
                  description: "Atención médica en los centros de evacuación",
                  status: "En progreso"
                }
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="gallery-card group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg ${
                      image.status === 'Urgente' ? 'bg-blue-500 animate-pulse' :
                      image.status === 'Crítico' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}>
                      {image.status}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-300 text-sm font-semibold">EN VIVO</span>
                      </div>
                      <h3 className="font-heading text-xl mb-2">{image.title}</h3>
                      <p className="text-white/90 text-sm">{image.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-xl"></div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-12"
            >
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto">
                <MessageCircle className="w-6 h-6" />
                <span>Ver Más Testimonios</span>
              </button>
            </motion.div>
          </div>

          {/* Efectos decorativos */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-12 h-12 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse"></div>
        </section>

        {/* Estadísticas de la Emergencia */}
        <section 
          ref={statsRef} 
          className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden"
        >
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0">
            {/* Partículas flotantes */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ${Math.random() * 2}s infinite ease-in-out alternate`,
                }}
              />
            ))}
            
            {/* Ondas de fondo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 translate-y-1/2"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/3 to-transparent transform skew-y-12 translate-y-1/3"></div>
            </div>
          </div>

          <div ref={statsContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-heading text-4xl md:text-5xl text-white mb-4 relative"
              >
                <span className="relative z-10">Impacto de la Emergencia</span>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/90 text-lg max-w-2xl mx-auto"
              >
                Números que reflejan la magnitud de la crisis humanitaria
              </motion.p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: 19000, label: "Familias Afectadas", suffix: "+", icon: <Users className="w-8 h-8" />, color: "from-blue-500 to-indigo-500" },
                { number: 40, label: "Refugios Activos", suffix: "+", icon: <Home className="w-8 h-8" />, color: "from-orange-500 to-yellow-500" },
                { number: 3, label: "Estados en Emergencia", suffix: "", icon: <MapPin className="w-8 h-8" />, color: "from-blue-500 to-cyan-500" },
                { number: 24, label: "Horas de Asistencia", suffix: "/7", icon: <Clock className="w-8 h-8" />, color: "from-green-500 to-emerald-500" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="stats-card relative group"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:bg-white/15 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                    
                    <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl mb-4 mx-auto w-fit shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-3 relative">
                      {isStatsInView && (
                        <CountUp
                          end={stat.number}
                          duration={3}
                          className="text-3xl md:text-4xl font-heading text-yellow-400 font-bold tracking-wide"
                        />
                      )}
                      <span className="text-yellow-400 text-3xl md:text-4xl ml-1 font-bold animate-pulse">{stat.suffix}</span>
                      
                      {(stat.number > 1000 || stat.label.includes('Horas')) && (
                        <div className="absolute -inset-2 bg-yellow-400/20 rounded-full animate-ping"></div>
                      )}
                    </div>

                    <div className="font-ui text-xs md:text-sm tracking-wide text-white/90 text-center font-medium">
                      {stat.label}
                    </div>

                    <div className="flex items-center justify-center mt-3 space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-semibold">EN VIVO</span>
                    </div>

                    {stat.label.includes('Refugios') && (
                      <div className="mt-3">
                        <div className="w-full bg-white/20 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-orange-400 to-blue-400 h-1.5 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-xs text-white/70 mt-1 text-center">85% de capacidad</p>
                      </div>
                    )}
                  </div>

                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400/50 rounded-full blur-sm group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-orange-400/50 rounded-full blur-sm group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-16"
            >
              <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-blue-500/20 border-2 border-yellow-400/50 rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="bg-yellow-400 p-3 rounded-full shadow-lg animate-bounce">
                      <Clock className="w-8 h-8 text-blue-900" />
                    </div>
                    <span className="text-yellow-400 font-bold text-xl md:text-2xl tracking-wider">URGENTE</span>
                    <div className="bg-yellow-400 p-3 rounded-full shadow-lg animate-bounce">
                      <AlertTriangle className="w-8 h-8 text-blue-900" />
                    </div>
                  </div>
                  
                  <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
                    La situación empeora cada día. Tu ayuda puede marcar la diferencia 
                    entre la supervivencia y la tragedia para miles de familias.
                  </p>
                  
                  <div className="flex items-center justify-center space-x-8 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">72h</div>
                      <div className="text-white/80 text-sm">Sin agua potable</div>
                    </div>
                    <div className="w-px h-12 bg-white/30"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">150+</div>
                      <div className="text-white/80 text-sm">Niños evacuados</div>
                    </div>
                    <div className="w-px h-12 bg-white/30"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">24/7</div>
                      <div className="text-white/80 text-sm">Operaciones</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sección de Donaciones Mejorada */}
        <section 
          ref={donationsRef} 
          className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
            
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-sm"
                style={{
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${4 + Math.random() * 6}s ${Math.random() * 3}s infinite ease-in-out alternate`,
                }}
              />
            ))}
          </div>

          <div ref={donationsContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-heading text-4xl md:text-5xl text-white mb-6 relative"
              >
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Tu Ayuda Salva Vidas
                </span>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed"
              >
                Cada donación se convierte en alimento, medicina, refugio y esperanza. 
                Unidos podemos reconstruir las vidas afectadas por las inundaciones.
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Información Bancaria Mejorada */}
              <div className="bank-info">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/30 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-2xl inline-block mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-heading text-2xl md:text-3xl text-white mb-2">
                        Datos Bancarios
                      </h3>
                      <p className="text-white/80">Transferencias seguras y verificadas</p>
                    </div>

                    <div className="space-y-6">
                      {[
                        { label: "Banco", value: "Banco de Venezuela", icon: <Building className="w-5 h-5" /> },
                        { label: "Tipo de Cuenta", value: "Corriente", icon: <CreditCard className="w-5 h-5" /> },
                        { label: "Número de Cuenta", value: "0102-0000-0000000000-00", icon: <Hash className="w-5 h-5" /> },
                        { label: "A Nombre de", value: "MIVELLACEN", icon: <User className="w-5 h-5" /> },
                        { label: "RIF", value: "J-12345678-9", icon: <FileText className="w-5 h-5" /> }
                      ].map((info, index) => (
                        <div
                          key={index}
                          className="donation-card flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                              <div className="text-white">
                                {info.icon}
                              </div>
                            </div>
                            <span className="text-white/90 font-medium">{info.label}:</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono text-sm bg-white/10 px-3 py-1 rounded-lg">
                              {info.value}
                            </span>
                            <button className="text-blue-400 hover:text-blue-300 p-1 rounded group-hover:scale-110 transition-all duration-300">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-green-500/10 border border-green-400/30 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-2 rounded-full">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-green-400 font-semibold text-sm">Cuenta Verificada</p>
                          <p className="text-white/80 text-xs">Todas las donaciones son auditadas y transparentes</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                        <span className="relative z-10 flex items-center space-x-2">
                          <Heart className="w-5 h-5" />
                          <span>Donar Ahora</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Formas de Ayudar */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <h3 className="font-heading text-2xl md:text-3xl text-blue-400 mb-6 flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl mr-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    Formas de Ayudar
                  </h3>
                </motion.div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Transferencia Bancaria",
                      icon: <CreditCard className="w-6 h-6" />,
                      description: "Dona directamente a nuestra cuenta principal",
                      priority: "Alta",
                      color: "from-green-500 to-emerald-500",
                      bgColor: "bg-green-500/10 border-green-400/30"
                    },
                    {
                      title: "Donación en Especie",
                      icon: <Package className="w-6 h-6" />,
                      description: "Alimentos, medicinas, ropa y suministros",
                      priority: "Crítica",
                      color: "from-orange-500 to-blue-500",
                      bgColor: "bg-orange-500/10 border-orange-400/30"
                    },
                    {
                      title: "Voluntariado",
                      icon: <Users className="w-6 h-6" />,
                      description: "Tu tiempo y habilidades son invaluables",
                      priority: "Media",
                      color: "from-blue-500 to-purple-500",
                      bgColor: "bg-blue-500/10 border-blue-400/30"
                    }
                  ].map((method, index) => (
                    <div
                      key={index}
                      className={`donation-card relative group ${method.bgColor} backdrop-blur-md rounded-2xl p-6 border-2 shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`bg-gradient-to-br ${method.color} p-3 rounded-xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                              <div className="text-white">
                                {method.icon}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg">{method.title}</h4>
                              <p className="text-white/70 text-sm">{method.description}</p>
                            </div>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            method.priority === 'Crítica' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/50' :
                            method.priority === 'Alta' ? 'bg-green-500/20 text-green-400 border border-green-400/50' :
                            'bg-blue-500/20 text-blue-400 border border-blue-400/50'
                          } animate-pulse`}>
                            {method.priority}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/80">Impacto:</span>
                            <span className="text-white font-semibold">
                              {method.priority === 'Crítica' ? '95%' : method.priority === 'Alta' ? '80%' : '60%'}
                            </span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div 
                              className={`bg-gradient-to-r ${method.color} h-2 rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                              style={{ 
                                width: method.priority === 'Crítica' ? '95%' : method.priority === 'Alta' ? '80%' : '60%'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impacto de las Donaciones */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16"
            >
              <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border border-yellow-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-blue-400/5 animate-pulse"></div>
                
                <div className="relative z-10 text-center">
                  <h3 className="font-heading text-2xl md:text-3xl text-yellow-400 mb-6">¿Qué logras con tu donación?</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { amount: "$10", impact: "3 días de agua potable para una familia", icon: <Droplets className="w-6 h-6" /> },
                      { amount: "$25", impact: "Kit de alimentos básicos por 1 semana", icon: <Package className="w-6 h-6" /> },
                      { amount: "$50", impact: "Medicinas esenciales para 5 personas", icon: <Shield className="w-6 h-6" /> }
                    ].map((item, index) => (
                      <div key={index} className="impact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                          <div className="text-white">
                            {item.icon}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400 mb-2">{item.amount}</div>
                        <div className="text-white/90 text-sm">{item.impact}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Versículo bíblico mejorado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-16"
            >
              <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full -translate-y-10 -translate-x-10 blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full translate-y-16 translate-x-16 blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-full inline-block mb-6 shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/90 text-lg md:text-xl italic leading-relaxed mb-4">
                    "En cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis"
                  </p>
                  <p className="text-yellow-400 font-bold text-lg">Mateo 25:40</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="bg-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Información de Contacto */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Image
                    src="/logo-iglesia.png"
                    alt="MIVELLACEN Logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <h3 className="font-heading text-2xl text-white">MIVELLACEN</h3>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Misión Venezolana de los Llanos Centrales trabajando en la 
                  emergencia por inundaciones en Camagüán, Apure y Amazonas.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-yellow-400" />
                    <a 
                      href="mailto:emergencia@mivellacen.org" 
                      className="hover:text-yellow-400 transition-colors"
                    >
                      emergencia@mivellacen.org
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-yellow-400" />
                    <a 
                      href="tel:+584123456789" 
                      className="hover:text-yellow-400 transition-colors"
                    >
                      +58 (412) 345-6789
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <span>Camagüán, Estado Apure, Venezuela</span>
                  </div>
                </div>
              </div>

              {/* Enlaces Rápidos */}
              <div>
                <h3 className="font-heading text-xl text-white mb-6">Enlaces Rápidos</h3>
                <div className="space-y-3">
                  <Link href="#situacion" className="block text-white/80 hover:text-yellow-400 transition-colors">
                    Situación Actual
                  </Link>
                  <Link href="#galeria" className="block text-white/80 hover:text-yellow-400 transition-colors">
                    Galería de Fotos
                  </Link>
                  <Link href="#estadisticas" className="block text-white/80 hover:text-yellow-400 transition-colors">
                    Estadísticas
                  </Link>
                  <Link href="#donaciones" className="block text-white/80 hover:text-yellow-400 transition-colors">
                    Cómo Donar
                  </Link>
                  <Link href="#voluntariado" className="block text-white/80 hover:text-yellow-400 transition-colors">
                    Voluntariado
                  </Link>
                </div>
              </div>

              {/* Redes Sociales */}
              <div>
                <h3 className="font-heading text-xl text-white mb-6">Síguenos</h3>
                <div className="flex space-x-4 mb-6">
                  <a 
                    href="#" 
                    className="bg-white/10 p-3 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-white/10 p-3 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
                
                <div className="bg-yellow-400/20 border border-yellow-400 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">Estado de Emergencia</h4>
                  <p className="text-white/90 text-sm">
                    Actualizaciones en tiempo real sobre la situación
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs">ACTIVO</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8 mt-12 text-center">
              <p className="text-sm text-white/80 mb-4">
                © {new Date().getFullYear()} MIVELLACEN - Misión Venezolana de los Llanos Centrales. 
                Todos los derechos reservados.
              </p>
              
              <div className="space-y-2 text-xs text-white/60">
                <p>RIF: J-40123456-7 | Organización sin fines de lucro</p>
                <p>Esta es una emergencia humanitaria real. Todas las donaciones son verificables y transparentes.</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
