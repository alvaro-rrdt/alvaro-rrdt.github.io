---
title: "Sustituyendo Claude con openwebui, deepseek y searxng"
description: "Cómo moví mi flujo de trabajo diario de IA desde una suscripción de Claude a openwebui autoalojado con deepseek, searxng y playwright: búsqueda web y visión desde cualquier dispositivo por tailnet, a la mitad del coste."
pubDate: 2026-08-30
category: platform
locale: es
tags: [openwebui, deepseek, searxng, playwright, self-hosted, ai]
---

El objetivo era simple: quería que mi configuración de IA se comportara
como el resto de mi homelab. Autoalojada, accesible desde cualquier
dispositivo por mi tailnet, privada por defecto y sin cuota mensual
fija.

Usaba Claude de pago, y el producto es bueno. Pero veinte euros al mes
lo usara o no, más una ventana de uso de cinco horas, empezó a sentirse
como alquilar algo que podía ser mío.

## El modelo: la visión era la parte difícil

Código y texto ya los podía conseguir baratos. La visión era el
requisito que me mantenía en Claude: capturas, diagramas de
arquitectura, volcados de errores.

Entonces encontré deepseek v4 flash vision. DeepSeek afirma un
rendimiento de visión comparable al de claude opus 4.8, y en mi día a
día (capturas de interfaces, fotos de pizarras, logs pegados) coincidió
con lo que vi. Ese fue el momento en que la suscripción dejó de ser
necesaria.

## La comparativa de búsqueda web

Con el modelo resuelto me volví ambicioso: la búsqueda web de claude es
genuinamente útil, y yo también la quería. Quizá incluso mejor, porque
el pipeline lo controlaría yo.

La búsqueda web en openwebui se divide en dos decisiones: quién busca y
quién lee las páginas. En el lado de la búsqueda comparé las opciones
alojadas (linkup, tavily) contra autoalojar searxng. En el lado de los
loaders: playwright, firecrawl y los proyectos más nuevos como
crawl4ai.

Mi filtro era simple: código abierto, gratis y corriendo en mi
hardware. Eso, más un fin de semana de pruebas, lo decidió:

- searxng como metabuscador: sin API key, sin cuota, sin coste por
  llamada, y resultados que puedo afinar motor a motor.
- playwright como loader: renderizado completo de JavaScript, que es lo
  que la mayoría de páginas modernas necesitan antes de que un modelo
  pueda leerlas.

Para mis consultas el par rinde a la par de lo que hacía claude, y hace
el trabajo lo bastante bien como para dejar de comparar. Sigo ajustándolo:
los pesos de los motores en searxng, los timeouts de playwright y lo
agresivo del paso de página a texto.

## La parte del dinero

Seré honesto con el detonante: ahora mismo estoy algo sin dinero, y una
suscripción mensual fija de IA es un mal trato cuando el uso es irregular.

La plataforma de deepseek es de pago por uso: cargo créditos y los gasto
cuando quiero. Frente a los veinte euros fijos, me cuesta la mitad o
menos incluso con un uso abundante, y no hay ventana de cinco horas.
Pequeña diferencia sobre el papel, gran diferencia en un presupuesto de
estudiante.

## Por qué esto importa más allá de mí

openwebui autoalojado, un modelo con visión de pago por créditos y
búsqueda web propia sustituyen mi flujo de trabajo de claude: el mismo
acceso desde cualquier dispositivo por tailnet, datos que nunca salen de
mi red y un coste que sigue al uso en lugar de al calendario.

A escala de empresa este patrón funciona, si se hace bien: openwebui
detrás de authentik para SSO, modelos facturados por créditos o
autoalojados, y la búsqueda sobre una instancia interna de searxng. El
ahorro se multiplica por cada empleado, y los datos se quedan dentro del
perímetro. Es un proyecto de platform engineering que merece la pena, no
un parche.
