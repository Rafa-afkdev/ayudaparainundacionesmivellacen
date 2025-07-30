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
  Clock,
  Droplets,
  HandHeart,
  Heart,
  Home,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  TrendingUp,
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

  // State for client-side rendering of video
  const [isBrowser, setIsBrowser] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes de emergencia para el carrusel
  const emergencyImages = [
    '/imagenevacuacion1.jpg',
    '/imagenevacuacion2.jpg', 
    '/imagen1.jpg',
    '/imagen2.jpg',
    '/imagen3.jpg',
    '/imagen4.jpg',
    '/imagen5.jpg'
  ];

  useEffect(() => {
    setIsBrowser(true);
    
    // Cambio automático de imágenes cada 4 segundos
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % emergencyImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Efectos GSAP avanzados
  useEffect(() => {
    if (!isBrowser) return;

    // Animación del banner de alerta
    gsap.fromTo(alertBannerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    // Animación del título principal con efecto de escritura
    const titleTimeline = gsap.timeline({ delay: 1 });
    titleTimeline
      .fromTo(titleRef.current,
        { scale: 0.8, opacity: 0, rotationX: -45 },
        { scale: 1, opacity: 1, rotationX: 0, duration: 1.5, ease: "back.out(1.7)" }
      )
      .to(titleRef.current, {
        textShadow: "0 0 20px rgba(255, 193, 7, 0.5)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      }, "-=0.5");

    // Animación parallax para la imagen de fondo
    gsap.to(heroImageRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Animación de las tarjetas de situación
    gsap.fromTo(".situation-card",
      { 
        y: 100, 
        opacity: 0, 
        scale: 0.8,
        rotationY: -15 
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: situationCardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de la galería con efecto magnetico
    gsap.fromTo(".gallery-item",
      { 
        scale: 0.5, 
        opacity: 0,
        rotation: -10
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        stagger: {
          amount: 1.2,
          from: "center"
        },
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de las estadísticas con efecto contador mejorado
    gsap.fromTo(".stats-card",
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de la sección de donaciones con efecto 3D
    gsap.fromTo(donationSectionRef.current,
      { 
        rotationX: 10,
        y: 100,
        opacity: 0
      },
      {
        rotationX: 0,
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: donationSectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de hover para botones
    const buttons = document.querySelectorAll('.gsap-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Animación de pulso para elementos urgentes
    gsap.to(".urgent-pulse", {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isBrowser]);

  // Toggle mute/unmute
  const toggleMute = () => {
    // Función conservada para compatibilidad
  };

  return (
    <main>
      {/* Hero Section - Emergencia */}
      <section ref={heroSectionRef} className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        {isBrowser && (
          <div ref={heroImageRef} className="absolute inset-0 z-0 overflow-hidden">
            <div className="relative w-full h-full">
              <video
                src="/video1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent" />
              <div className="absolute inset-0 bg-black/30" />
              
              {/* Efectos de partículas flotantes */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400/50 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${3 + Math.random() * 4}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Alert Banner */}
        {/* <div ref={alertBannerRef} className="absolute top-0 left-0 right-0 z-20 bg-blue-600 text-white py-3 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-3">
              <AlertTriangle className="w-6 h-6 animate-pulse urgent-pulse" />
              <span className="font-bold text-lg tracking-wider">EMERGENCIA NACIONAL</span>
              <AlertTriangle className="w-6 h-6 animate-pulse urgent-pulse" />
            </div>
          </div>
        </div> */}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center pt-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full inline-flex items-center space-x-2 mb-6 shadow-lg border border-blue-400/30"
            >
              <Droplets className="w-5 h-5 animate-bounce" />
              <span className="font-bold text-sm tracking-wider">INUNDACIONES EN VENEZUELA</span>
            </motion.div>

            <h1 
              ref={titleRef}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 text-white drop-shadow-2xl"
            >
              CAMAGUÁN EN{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                EMERGENCIA
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-body text-lg sm:text-xl text-white/95 mb-6 leading-relaxed drop-shadow-lg"
            >
              Las inundaciones han afectado a más de{' '}
              <span className="font-bold text-yellow-400 animate-pulse">19,000 familias</span> en 
              Camaguán, Estado Guárico. Con más de{' '}
              <span className="font-bold text-yellow-400 animate-pulse">40 refugios ocupados</span>, 
              necesitamos tu ayuda urgente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link 
                href="/donation"
                className="gsap-button px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl transform hover:scale-105"
              >
                <Heart className="w-5 h-5 animate-pulse" />
                <span className="tracking-wide">DONAR AHORA</span>
              </Link>

              {/* <button className="gsap-button px-8 py-4 border-2 border-white/80 backdrop-blur-sm text-white hover:bg-white hover:text-blue-900 font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl">
                <AlertTriangle className="w-5 h-5" />
                <span className="tracking-wide">VER SITUACIÓN</span>
              </button> */}
            </motion.div>

            {/* Organizador */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl"
            >
              <p className="text-white/80 text-sm mb-3 tracking-wide">Organizado por:</p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <Image
                    src="/logo-iglesia.png"
                    alt="MIVELLACEN Logo"
                    width={50}
                    height={50}
                    className="rounded-full shadow-lg ring-2 ring-blue-400/50"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p className="text-white font-bold text-lg tracking-wide">MIVELLACEN</p>
                  <p className="text-white/90 text-sm">Misión Venezolana de los Llanos Centrales</p>
                </div>
              </div>
              
              {/* Logo del proyecto */}
              <div className="flex items-center justify-center pt-4 border-t border-white/20">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/logo.png"
                    alt="Logo del Proyecto"
                    width={40}
                    height={40}
                    className="rounded-lg shadow-md"
                  />
                  <div>
                    <p className="text-white/90 text-sm font-semibold">Proyecto Camagüán</p>
                    <p className="text-white/70 text-xs">Ayuda Humanitaria</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Indicador de scroll animado */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-white/70 text-xs tracking-widest">SCROLL</span>
          </div>
        </div>
      </section>

      {/* Situación Actual */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-4xl md:text-5xl text-gray-900 mb-6 relative"
            >
              <span className="relative z-10">Situación Actual de la Emergencia</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Las fuertes lluvias han causado inundaciones devastadoras en los estados de 
              Camagüán, Apure y Amazonas, dejando a miles de familias sin hogar y necesitando 
              asistencia urgente.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={situationCardsRef} className="space-y-8">
              <div className="situation-card bg-white rounded-xl p-8 shadow-xl border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-full shadow-lg">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl text-gray-900 mb-2">Familias Afectadas</h3>
                    <p className="text-blue-600 font-bold text-4xl md:text-5xl tracking-wider">+19,000</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Miles de familias han perdido sus hogares y pertenencias debido a las inundaciones.
                </p>
                <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-700 text-sm font-semibold">Situación crítica</span>
                  </div>
                </div>
              </div>

              <div className="situation-card bg-white rounded-xl p-8 shadow-xl border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-full shadow-lg">
                    <Home className="w-10 h-10 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl text-gray-900 mb-2">Refugios Activos</h3>
                    <p className="text-orange-600 font-bold text-4xl md:text-5xl tracking-wider">+40</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Refugios temporales habilitados para albergar a las personas damnificadas.
                </p>
                {/* <div className="mt-4 bg-orange-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-700 text-sm font-semibold">Capacidad al límite</span>
                  </div>
                </div> */}
              </div>

              <div className="situation-card bg-white rounded-xl p-8 shadow-xl border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-full shadow-lg">
                    <MapPin className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl text-gray-900 mb-2">Estados Afectados</h3>
                    <p className="text-blue-600 font-bold text-4xl md:text-5xl tracking-wider">3</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Camagüán, Apure y Amazonas enfrentan la mayor crisis por inundaciones.
                </p>
                <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-700 text-sm font-semibold">Área extensa afectada</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500"
              >
                <Image
                  src="/imagenevacuacion1.jpg"
                  alt="Situación de evacuación"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Overlay con información */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <p className="text-white font-bold text-xl mb-3 tracking-wide">
                      Evacuación en Camagüán
                    </p>
                    <p className="text-white/90 leading-relaxed mb-4">
                      Equipos de rescate trabajando para evacuar a las familias afectadas
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-semibold">Operaciones en curso</span>
                    </div>
                  </div>
                </div>

                {/* Indicadores flotantes */}
                <div className="absolute top-6 right-6 bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold tracking-wide">URGENTE</span>
                </div>
              </motion.div>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de la Emergencia */}
      <section ref={galleryRef} className="py-12 md:py-20 bg-white relative overflow-hidden">
        {/* Patrón de fondo dinámico */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-3xl md:text-4xl text-gray-900 mb-3 md:mb-4 relative"
            >
              <span className="relative z-10">Imágenes de la Emergencia</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 md:px-0"
            >
              Documentando la situación actual y los esfuerzos de rescate en las 
              zonas afectadas por las inundaciones.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { src: "/imagenevacuacion1.jpg", title: "Evacuación de familias", status: "Urgente" },
              { src: "/5.jpg", title: "Equipos de rescate", status: "En progreso" },
              { src: "/imagen1.jpg", title: "Zonas inundadas", status: "Crítico" },
              { src: "/3.jpg", title: "Refugios temporales", status: "Operativo" },
              { src: "/1.jpg", title: "Asistencia humanitaria", status: "Activo" },
              { src: "/4.jpg", title: "Comunidades afectadas", status: "Crítico" }
            ].map((image, index) => (
              <div
                key={index}
                className="gallery-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 group relative transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 md:h-60 lg:h-72 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  
                  {/* Overlay con efecto gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Badge de estado */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg transition-all duration-300 ${
                      image.status === 'Urgente' ? 'bg-red-500 text-white animate-pulse' :
                      image.status === 'Crítico' ? 'bg-orange-500 text-white' :
                      image.status === 'En progreso' ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {image.status}
                    </span>
                  </div>

                  {/* Información que aparece en hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl">
                      <p className="font-semibold text-gray-900 mb-1">{image.title}</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-600 text-sm">Actualizado recientemente</span>
                      </div>
                    </div>
                  </div>

                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                </div>

                {/* Información base siempre visible */}
                <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{image.title}</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para ver más */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button className="gsap-button bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto">
              <span>Ver Más Imágenes</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </button>
          </motion.div> */}
        </div>

        {/* Elementos decorativos flotantes */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
      </section>

      {/* Estadísticas de la Emergencia */}
      <section 
        ref={statsRef} 
        className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-4xl text-white mb-4"
            >
              Impacto de la Emergencia
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 19000, label: "Familias Afectadas", suffix: "+" },
              { number: 40, label: "Refugios Activos", suffix: "+" },
              { number: 3, label: "Estados en Emergencia", suffix: "" },
              // { number: 24, label: "Horas de Asistencia", suffix: "/7" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex items-center justify-center mb-3">
                  {isStatsInView && (
                    <CountUp
                      end={stat.number}
                      duration={2.5}
                      className="text-4xl font-heading text-yellow-400"
                    />
                  )}
                  <span className="text-yellow-400 text-4xl ml-1">{stat.suffix}</span>
                </div>
                <div className="font-ui text-sm tracking-wide text-white">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-blue-500/20 border border-blue-400 rounded-lg p-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-blue-400" />
                <span className="text-blue-400 font-bold text-lg">URGENTE</span>
              </div>
              <p className="text-white text-lg">
                La situación empeora cada día. Tu ayuda puede marcar la diferencia 
                entre la supervivencia y la tragedia para miles de familias.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/*
        =======================================================
        ABM Section
        =======================================================
      */}

 




      {/* Cómo Ayudar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-4xl text-gray-900 mb-6"
            >
              Cómo Puedes Ayudar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Cada contribución cuenta. Tu solidaridad puede transformar vidas y brindar 
              esperanza a quienes más lo necesitan en estos momentos difíciles.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12" />,
                title: "Donación Monetaria",
                description: "Contribuye con dinero para comprar alimentos, medicinas y artículos de primera necesidad.",
                color: "red",
                action: "Donar Dinero"
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Artículos de Emergencia",
                description: "Dona ropa, mantas, alimentos no perecederos y productos de higiene personal.",
                color: "blue",
                // action: "Donar Artículos"
              },
              {
                icon: <HandHeart className="w-12 h-12" />,
                title: "Voluntariado",
                description: "Únete como voluntario para ayudar en la distribución de ayudas y asistencia directa.",
                color: "green",
                action: "Ser Voluntario"
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Difunde la Información",
                description: "Comparte esta causa en tus redes sociales para que más personas conozcan la situación.",
                color: "purple",
                action: "Compartir"
              }
            ].map((way, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-gray-200"
              >
                <div className={`text-${way.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {way.icon}
                </div>
                
                <h3 className="font-heading text-xl text-gray-900 mb-4">
                  {way.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {way.description}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-4 bg-${way.color}-600 hover:bg-${way.color}-700 text-white font-semibold rounded-lg transition-colors duration-300`}
                >
                  {way.action}
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <h3 className="font-heading text-2xl text-gray-900">
                  Cada Segundo Cuenta
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                La emergencia en Camaguán, Apure y Amazonas requiere acción inmediata. 
                Miles de familias dependen de la solidaridad de personas como tú.
              </p>
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg"
              >
                ACTUAR AHORA
              </motion.button> */}
            </div>
          </motion.div>
        </div>
      </section>

{/* Sección de Donaciones - Emergencia Camagüán */}
<section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
  {/* Patrón de fondo */}
  <div className="absolute inset-0 opacity-10 z-1">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="100%" 
      height="100%" 
      className="text-white"
    >
      <defs>
        <pattern 
          id="donation-pattern" 
          x="0" 
          y="0" 
          width="100" 
          height="100" 
          patternUnits="userSpaceOnUse"
        >
          <circle cx="50" cy="50" r="25" fill="currentColor" fillOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#donation-pattern)" />
    </svg>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-heading text-4xl md:text-5xl text-white mb-6"
      >
        Tu Donación Salva Vidas
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
      >
        Cada bolívar cuenta. Tu contribución se destina directamente a proporcionar 
        alimentos, agua potable, medicinas y refugio seguro para las familias afectadas.
      </motion.p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Imagen del Lugar de Donaciones - Iglesia */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-1"
      >
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/imagen2.jpg"
            alt="Iglesia - Centro de Donaciones"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Overlay con información */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Centro de Donaciones</h3>
                  <p className="text-white/90 text-sm">Iglesia Central de Camaguán</p>
                </div>
              </div>
              
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Puedes hacer llegar tus donaciones directamente a nuestra iglesia, 
                donde organizamos y distribuimos la ayuda humanitaria a las familias afectadas.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-white/90 text-sm">Camaguán, Estado Apure</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-white/90 text-sm">Lunes a Domingo: 8:00 AM - 6:00 PM</span>
                </div> */}
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-white/90 text-sm">+58 (424) 311-2771</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badge identificativo */}
          <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-full shadow-lg">
            <span className="text-sm font-bold tracking-wide">CENTRO OFICIAL</span>
          </div>
        </div>
      </motion.div>

      {/* Información de Donaciones */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-1 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-blue-900" />
          </div>
          <h3 className="text-2xl font-heading text-white">
            Formas de Donar
          </h3>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Home className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-semibold">Donaciones en Especie</h4>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Lleva directamente alimentos no perecederos, ropa, medicinas, 
              productos de higiene y agua potable a nuestra iglesia.
            </p>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-semibold">Transferencia Bancaria</h4>
            </div>
            <div className="space-y-2">
              <p className="text-white/80 text-sm">Cuenta: 0102-0117-90-0000050102</p>
              <p className="text-white/80 text-sm">Banco: Venezuela - Corriente</p>
              <p className="text-white/80 text-sm">Beneficiario: MISION VENEZOLANA DE LOS LLANOS CENTRALES</p>
              <p className="text-white/80 text-sm">RIF: J-311369430</p>
            </div>
          </div>
          
          {/* <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-semibold">PayPal Internacional</h4>
            </div>
            <p className="text-white/80 text-sm">donaciones@mivellacen.org</p>
          </div> */}
        </div>

        <div className="mt-6 bg-blue-500/20 border border-blue-400 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm">100% Transparente</span>
          </div>
          <p className="text-white/90 text-xs leading-relaxed">
            Todas las donaciones se registran y distribuyen bajo supervisión de la Misión. 
            
          </p>
        </div>
      </motion.div>

      {/* Formas de Ayudar */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-2 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-heading text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3" />
              Otras Formas de Ayudar
            </h3>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/20 hover:bg-white/30 p-4 rounded-lg text-left transition-colors duration-300 border border-white/30"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-white font-semibold">Voluntariado</p>
                    <p className="text-white/80 text-sm">Únete a nuestro equipo</p>
                  </div>
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/20 hover:bg-white/30 p-4 rounded-lg text-left transition-colors duration-300 border border-white/30"
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-white font-semibold">Difundir</p>
                    <p className="text-white/80 text-sm">Comparte en redes sociales</p>
                  </div>
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/20 hover:bg-white/30 p-4 rounded-lg text-left transition-colors duration-300 border border-white/30"
              >
                <div className="flex items-center space-x-3">
                  <HandHeart className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-white font-semibold">Donaciones en Especie</p>
                    <p className="text-white/80 text-sm">Alimentos y medicinas</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
          
          <div className="bg-yellow-400/20 border border-yellow-400 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-heading text-white">Transparencia Total</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              El 100% de las donaciones se destina directamente a la ayuda humanitaria. 
              Publicamos reportes periódicos del uso de los fondos.
            </p>
            
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white font-semibold text-sm">Entrega Directa</span>
                </div>
                <p className="text-white/80 text-xs">Las donaciones llegan directamente a las familias</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-white font-semibold text-sm">Supervisión Pastoral</span>
                </div>
                <p className="text-white/80 text-xs">Cada distribución es supervisada por líderes religiosos</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Versículo bíblico */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-center mt-16"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto border border-white/20">
        <p className="text-white/90 text-lg italic leading-relaxed">
          "En cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis"
        </p>
        <p className="text-yellow-400 font-semibold mt-2">Mateo 25:40</p>
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
          emergencia por inundaciones en Camaguán, Apure y Amazonas.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Mail className="w-6 h-6 text-blue-400" />
            <a 
              href="mailto:contabilidadmvlc@uvoriental.org" 
              className="hover:text-blue-400 transition-colors"
            >
              contabilidadmvlc@uvoriental.org
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-6 h-6 text-blue-400" />
            <a 
              href="tel:+584148751003" 
              className="hover:text-blue-400 transition-colors"
            >
              +58 (414) 875-1003
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="w-6 h-6 text-blue-400" />
            <span className="text-white/90">
              Camagüán, Estado Apure, Venezuela
            </span>
          </div>
        </div>
      </div>

      {/* Enlaces de Emergencia */}
      {/* <div>
        <h3 className="font-heading text-2xl mb-6">Enlaces de Emergencia</h3>
        <ul className="space-y-3">
          <li>
            <Link 
              href="/situacion-actual" 
              className="hover:text-blue-400 transition-colors flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Situación Actual</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/como-donar" 
              className="hover:text-blue-400 transition-colors flex items-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Cómo Donar</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/voluntariado" 
              className="hover:text-blue-400 transition-colors flex items-center space-x-2"
            >
              <HandHeart className="w-4 h-4" />
              <span>Ser Voluntario</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/refugios" 
              className="hover:text-blue-400 transition-colors flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Ubicación de Refugios</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/reportes" 
              className="hover:text-blue-400 transition-colors flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Reportes de Transparencia</span>
            </Link>
          </li>
        </ul>
      </div> */}

      {/* Redes Sociales y Urgencia */}
      <div>
        <h3 className="font-heading text-2xl mb-6">Mantente Informado</h3>
        <div className="space-y-6">
            <div className="bg-blue-400/20 border border-blue-400 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-blue-400">LÍNEA DE EMERGENCIA</span>
            </div>
            <p className="text-white text-sm mb-2"></p>
            <a 
              href="tel:+584148751003" 
              className="text-blue-400 font-bold text-lg hover:underline"
            >
              +58 (414) 875-1003
            </a>
          </div>          <div>
            <p className="text-white/90 mb-4">Síguenos en redes sociales:</p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/mivellacen/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 text-blue-900 p-3 rounded-full transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              {/* <Link
                href="https://wa.me/58"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 text-blue-900 p-3 rounded-full transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Copyright y Información Legal */}
    <div className="mt-12 pt-8 border-t border-white/20">
      <div className="text-center">
        <div className="bg-blue-800/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-blue-400 text-lg">EMERGENCIA ACTIVA</span>
          </div>
          <p className="text-white/90">
            Más de 19,000 familias necesitan tu ayuda urgente en Camagüán, Apure y Amazonas
          </p>
        </div>
        
        <p className="text-sm text-white/80 mb-4">
          © {new Date().getFullYear()} MIVELLACEN - Misión Venezolana de los Llanos Centrales. 
          Todos los derechos reservados.
        </p>
        
        <div className="space-y-2 text-xs text-white/60">
          <p>RIF: J-311369430</p>
          <p>Esta es una emergencia humanitaria real. Todas las donaciones son verificables y transparentes.</p>
        </div>
      </div>
    </div>
  </div>
</footer>

    </main>
  );
}
