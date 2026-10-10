import type { DolorDef } from "../dolores";

// Parte 1 · "Conocerte" + primer dolor de "Descubrimiento": quién eres, a quién
// sirves, por qué te elegirían, en qué etapa y nicho estás y dónde te encuentran.
// Orden canónico 1–8.
export const P1: DolorDef[] = [
  {
    id: "negocio",
    orden: 1,
    momento: "Conocerte",
    pregunta: "¿Qué hace tu negocio y a quién ayuda?",
    porQue: "Sin propuesta clara, nada más convierte.",
    factorId: "propuesta_valor",
    modo: "texto",
    textoOkLargo: 25,
    queMedimos:
      "Medimos si tu propuesta está dicha en una frase concreta: qué haces, para quién y con qué resultado. Esa frase alimenta la bio, el titular de la web, el primer mensaje de venta y el guion de cualquier anuncio; si aquí hay humo, todo lo demás lo hereda.",
    causas: [
      "Nunca se escribió: el negocio creció por oficio y boca a boca, y la explicación se improvisa distinta cada vez.",
      "Se habla en términos de producto o de procesos internos (materiales, técnicas, marcas) en lugar de hablar del problema del cliente.",
      "El negocio hace demasiadas cosas a la vez para no perder clientes, y entonces ninguna cabe en una frase.",
      "Se copió la descripción de la categoría o de un competidor, así que suena igual a todo el mercado.",
    ],
    efectos: [
      "Cada persona que te descubre tiene que hacer el trabajo de entenderte, y muchas simplemente se van sin preguntar.",
      "El mensaje cambia entre canales, así que el cliente recibe versiones distintas y ninguna se acumula como recuerdo.",
      "Se compite por precio porque no queda ningún otro criterio visible para elegir.",
      "Repites explicaciones largas en cada conversación, tiempo que no se recupera ni se factura.",
    ],
    senales: [
      "Cuando te preguntan a qué te dedicas, respondes con una lista de servicios en lugar de una frase.",
      "Tus propios clientes te describen con palabras distintas a las que usas tú.",
      "Recibes consultas por cosas que no ofreces o que no quieres hacer.",
      "Te cuesta llenar la bio, el titular de la web o el primer mensaje de una campaña.",
    ],
    practicas: [
      "Escribe una frase con esta estructura: ayudo a [cliente concreto] a [resultado concreto] mediante [tu servicio].",
      "Bájala a las palabras que usaría tu cliente, no a los términos técnicos de tu rubro.",
      "Léela a tres clientes reales y pídeles que te la repitan con sus propias palabras.",
      "Fija dos versiones: una corta de diez palabras para perfiles y una de treinta segundos para conversaciones y video.",
      "Colócala en los tres puntos de mayor tráfico: perfil, portada o web y primer mensaje de WhatsApp.",
    ],
    evitar: [
      "No uses superlativos ni frases que cualquier negocio de tu rubro podría firmar (calidad, compromiso, años de experiencia).",
      "No abras con tu historia personal ni con la lista completa de servicios: primero el cliente y su problema.",
      "No cambies la frase cada semana: una promesa clara necesita repetición para quedarse en la memoria.",
    ],
    kpis: [
      "Porcentaje de personas que, después de leer tu perfil o tu web, describen tu negocio como tú lo describes.",
      "Consultas que llegan pidiendo exactamente lo que ofreces frente a consultas fuera de foco.",
      "Tiempo que tardas en explicar qué haces cuando te lo preguntan en una conversación.",
    ],
    soluciones: ["web", "landing", "contenido", "tarjeta"],
    tags: ["oferta", "estrategia", "contenido", "conversion"],
    siguientePaso:
      "Escribe hoy tu frase en el formato ayudo a X a Y mediante Z y mándala por WhatsApp a tres clientes actuales pidiéndoles que te digan si los describe.",
    noAplica:
      "No aplica si ya tienes una frase escrita y validada que tus propios clientes repiten: seguir puliéndola es un lujo, no la prioridad del momento.",
    opciones: [
      {
        value: "ok",
        estado: "bien",
        diagnostico:
          "Tu propuesta está dicha en una frase con destinatario y resultado, así que cualquier persona puede entenderte en segundos y tus canales pueden repetir el mismo mensaje. La oportunidad ya no está en reescribirla sino en usarla con disciplina: mismo titular en el perfil, en la web y en el primer mensaje de venta. Con esa base, invertir en tráfico o en contenido tiene dónde aterrizar.",
      },
      {
        value: "corto",
        estado: "critico",
        diagnostico:
          "Tu descripción es tan breve o tan genérica que deja todo el trabajo de interpretación en el cliente, y la mayoría no lo hace: se va sin preguntar. Esto no se arregla con diseño ni con publicidad, porque el problema está antes de la vitrina; de hecho, pautar con este mensaje multiplica la confusión al mismo costo. Es el arreglo más barato y rápido de todo el diagnóstico: una frase con cliente y resultado, repetida en cada canal.",
      },
    ],
  },
  {
    id: "cliente_definido",
    orden: 2,
    momento: "Conocerte",
    pregunta: "¿Tienes claro quién es tu cliente ideal?",
    porQue: "Quien habla a todos no convierte.",
    factorId: "cliente_objetivo",
    modo: "valor",
    queMedimos:
      "Medimos si puedes nombrar a tu cliente ideal con rasgos concretos: quién es, qué situación vive y qué problema paga por resolver. Ese dato define el mensaje, los canales donde vale la pena estar y hasta el precio que puedes sostener.",
    causas: [
      "Se empezó vendiendo a quien llegara y nunca se revisó qué tipo de cliente deja margen y vuelve.",
      "Existe el miedo a perder ventas si se excluye a alguien, así que el discurso se deja abierto a propósito.",
      "El negocio atiende segmentos muy distintos y cada uno exige un mensaje diferente, así que no se eligió ninguno.",
      "Nunca se registraron datos de los clientes que ya compran: sin lista ni patrón, el perfil queda en la intuición.",
    ],
    efectos: [
      "El mensaje se diluye: al hablarle a todos, ninguno siente que le hablas a él.",
      "Llegan prospectos que no pueden pagar o que consumen un tiempo desproporcionado frente a lo que dejan.",
      "El contenido y la publicidad rinden menos porque el público es demasiado amplio y disperso.",
      "La recomendación pierde fuerza: quien te quiere recomendar no sabe a quién exactamente recomendarte.",
    ],
    senales: [
      "Describes a tu cliente con expresiones como cualquiera, toda persona o empresas de todo tipo.",
      "Atiendes pedidos muy distintos con el mismo guion y la misma lista de precios.",
      "Tienes clientes que dan mucho trabajo y poco margen, y no podrías anticipar cuáles serán.",
      "Tus publicaciones mezclan públicos y ninguna audiencia crece de forma sostenida.",
    ],
    practicas: [
      "Revisa tus últimos diez o veinte clientes y anota de cada uno quién es, qué compró, cuánto dejó y de dónde vino.",
      "Marca los rasgos que se repiten: ese patrón es tu cliente ideal real, no el que imaginas.",
      "Escribe su ficha en pocas líneas: situación, problema, qué intentó antes y qué le frena para comprar.",
      "Define también a quién no le vendes: eso ordena precios, tiempos de atención y esfuerzo.",
      "Revisa con esa ficha los canales donde ya estás y corrige el mensaje para que le hable a ese perfil.",
    ],
    evitar: [
      "No definas el cliente ideal por lo que te gustaría vender, sino por lo que ya te compra y vuelve.",
      "No reduzcas el foco a un solo dato demográfico: la situación y el problema pesan más que la edad.",
      "No descartes clientes rentables que no encajan en el estereotipo que tenías en la cabeza.",
    ],
    kpis: [
      "Porcentaje de clientes nuevos que pertenecen al perfil definido.",
      "Ticket promedio y recompra del segmento elegido frente al resto de tu cartera.",
      "Consultas descartadas por no encajar en el perfil, que deberían bajar con el tiempo.",
    ],
    soluciones: ["landing", "contenido", "embudo", "analitica"],
    tags: ["captacion", "conversion", "oferta", "estrategia"],
    siguientePaso:
      "Toma tus últimos diez clientes, anota de cada uno quién es y qué le vendiste, y escribe en una línea el patrón que se repite en al menos cinco casos.",
    noAplica:
      "No aplica si tu negocio atiende por diseño un solo tipo de cliente, por ejemplo una clínica especializada en un único tratamiento o un proveedor con un solo contrato grande, y ese perfil ya está fijado por la operación.",
    opciones: [
      {
        value: "si",
        estado: "bien",
        diagnostico:
          "Tener el cliente definido significa que puedes hablarle a una persona concreta y elegir canales donde esa persona ya está, en lugar de repartir esfuerzo. El riesgo ahora es la comodidad: el mercado se mueve y el perfil que funcionaba hace dos años puede haberse saturado o cambiado de hábitos. Revisa cada trimestre a tus últimos clientes para confirmar que el patrón sigue vivo y ajusta el mensaje si aparece otro segmento con mejor margen.",
      },
      {
        value: "maso",
        estado: "alerta",
        diagnostico:
          "Tienes una idea del cliente, pero descrita en rasgos amplios como mujeres, dueños de negocio o gente de la ciudad: alcanza para intuir y no para decidir dónde publicar ni qué decir. El resultado típico es un mensaje que sirve para varios perfiles y no convence a ninguno, con canales elegidos por costumbre más que por presencia real de tu cliente. El arreglo es de una tarde: saca el patrón de tus compradores reales y conviértelo en una ficha con situación y problema.",
      },
      {
        value: "no",
        estado: "critico",
        diagnostico:
          "Vender a quien llegue sostiene el negocio al principio, pero deja el crecimiento en manos de la casualidad: no sabes a quién buscar, ni dónde, ni con qué argumento, así que toda acción de marketing se vuelve un disparo al aire. Suele venir acompañado de clientes de bajo margen que consumen tiempo y desgastan la operación. Antes de invertir en publicidad o en contenido, define con datos de tus propias ventas quién paga, vuelve y recomienda; con eso, hasta los canales que ya usas empiezan a rendir mejor.",
      },
    ],
  },
  {
    id: "diferencial",
    orden: 3,
    momento: "Conocerte",
    pregunta: "¿Por qué deberían elegirte a ti y no a otro?",
    porQue: "Detectamos posicionamiento.",
    factorId: "posicionamiento",
    modo: "valor",
    queMedimos:
      "Medimos si existe una razón concreta y comprobable para elegirte: qué haces distinto, mejor o más rápido que la alternativa que tu cliente realmente considera. Sin ese diferencial, la única variable que queda sobre la mesa es el precio.",
    causas: [
      "El rubro es maduro y todos prometen lo mismo, así que el negocio se acostumbró a competir bajando precios.",
      "La ventaja existe en la operación (garantía, tiempos, trato, especialización), pero nunca se nombró ni se comunicó.",
      "Se tomó como diferencial algo que todo el mercado ya ofrece, como buena atención o productos de calidad.",
      "Nunca se preguntó a los clientes por qué compraron, así que la razón real sigue invisible incluso para ti.",
    ],
    efectos: [
      "Cada negociación empieza y termina en el precio, y el margen es la primera víctima.",
      "El cliente compara sin criterio y decide por descuento o por quién le respondió primero.",
      "El esfuerzo de contenido y publicidad no se acumula en una idea reconocible.",
      "Pierdes ventas frente a competidores peores pero mejor explicados.",
    ],
    senales: [
      "Tus clientes piden descuento antes de conocer el detalle de lo que ofreces.",
      "Cuando te preguntan por qué elegirte, tu respuesta se parece a la de cualquier competidor.",
      "Ganas trabajos por ser el más barato o el más disponible, no por lo que haces.",
      "Copias promociones del competidor para no quedarte atrás.",
    ],
    practicas: [
      "Pregunta a cinco clientes actuales por qué te compraron y por qué no fueron a otro: sus frases son el insumo del posicionamiento.",
      "Lista tres competidores reales y compara qué prometen, cuánto tardan y qué tan fácil es comprarles.",
      "Convierte tu ventaja en algo comprobable: tiempo de entrega, garantía por escrito, especialización, proceso, stock o acompañamiento.",
      "Elige un solo diferencial principal: dos o tres ventajas comunicadas a la vez se recuerdan como ninguna.",
      "Úsalo como argumento de cierre y como tema recurrente de tu contenido, siempre con prueba real y no con adjetivos.",
    ],
    evitar: [
      "No uses palabras que todos usan (calidad, confianza, experiencia) sin una prueba que las respalde.",
      "No declares una superioridad que no puedes sostener: una promesa incumplida cuesta más caro que no tener diferencial.",
      "No compitas bajando precio de forma permanente: le enseña al cliente a esperar el próximo descuento.",
    ],
    kpis: [
      "Porcentaje de clientes nuevos que mencionan tu diferencial como motivo de compra.",
      "Consultas y ventas que se cierran sin pedir descuento.",
      "Tu precio promedio frente al de tus competidores directos.",
    ],
    soluciones: ["contenido", "landing", "resenas", "web"],
    tags: ["competencia", "oferta", "confianza", "estrategia"],
    siguientePaso:
      "Escribe en una línea tu diferencial principal y mándala por WhatsApp a tres clientes preguntando si eso fue lo que los decidió; corrige la frase según sus respuestas.",
    noAplica:
      "No aplica si vendes un producto totalmente estandarizado donde la decisión es de precio y disponibilidad, por ejemplo reventa de commodities: ahí el diferencial se construye en logística y servicio, no en el discurso.",
    opciones: [
      {
        value: "claro",
        estado: "bien",
        diagnostico:
          "Cuando el diferencial está claro, tu precio pasa a ser una variable entre varias y el cliente tiene un motivo para elegirte incluso sin descuento. La ventaja real es que ese argumento se puede repetir: en el contenido, en el cierre y en cada propuesta. Mantenlo vivo comprobándolo: revisa cada trimestre que la competencia no haya copiado la ventaja y que sigas cumpliéndola en la operación, porque un diferencial prometido y no entregado se convierte en queja pública.",
      },
      {
        value: "no_se",
        estado: "critico",
        diagnostico:
          "Si tú no puedes nombrar por qué te eligen, tu cliente tampoco puede, y en ese vacío la decisión se resuelve casi siempre por precio, por cercanía o por quién contestó primero. Esto no significa que tu negocio sea igual a los demás: casi siempre el diferencial existe en la operación, pero nadie lo escribió ni lo probó. Empieza por las razones que te dieron tus propios clientes al comprar; de ahí sale un argumento defendible que puedes usar en ventas y en contenido sin cambiar tu producto.",
      },
    ],
  },
  {
    id: "etapa",
    orden: 4,
    momento: "Conocerte",
    pregunta: "¿En qué etapa está tu negocio?",
    porQue: "Adaptamos todo a tu realidad (modo emprendedor si empiezas).",
    factorId: null,
    modo: "valor",
    queMedimos:
      "Registramos en qué punto está tu negocio para calibrar el nivel de las recomendaciones: no pide lo mismo validar una idea que ordenar la operación de un negocio que ya vende. No es un juicio de valor, es el punto de partida para priorizar.",
    causas: [
      "Cada etapa arrastra urgencias distintas: en la idea falta evidencia de demanda, en la operación falta sistema.",
      "El negocio cambió de tamaño y las herramientas y hábitos siguen siendo los del inicio.",
      "La etapa se declara por expectativa (querer escalar) más que por evidencia de ventas repetidas.",
      "Conviven dos etapas a la vez: una línea madura que sostiene la caja y otra que apenas arranca.",
    ],
    efectos: [
      "Recomendaciones fuera de etapa: invertir en herramientas avanzadas sin demanda validada, o quedarse corto cuando ya hay flujo de clientes.",
      "Se eligen tácticas por imitación de negocios mucho más grandes.",
      "Presupuesto y tiempo se asignan a lo que no mueve la aguja en este momento.",
      "El esfuerzo se reparte entre demasiadas iniciativas y ninguna se completa.",
    ],
    senales: [
      "Usas herramientas pensadas para volúmenes que todavía no tienes.",
      "No puedes decir cuántas ventas hiciste el mes pasado ni de qué canal vinieron.",
      "Tu semana mezcla operación diaria con decisiones de crecimiento y ninguna de las dos avanza.",
      "Cambias de estrategia cada pocas semanas.",
    ],
    practicas: [
      "Define en una línea la prueba que tu etapa exige: si estás en idea, vender una vez sin regalar; si ya vendes, repetir la venta.",
      "Escribe las tres tareas que sí mueven esa prueba y aparca todo lo demás por este trimestre.",
      "Elige herramientas mínimas para esa etapa y pospone las avanzadas hasta tener el volumen que las justifique.",
      "Revisa cada mes si cambiaste de etapa: cuando eso ocurre, cambian las prioridades y el plan.",
      "Ajusta contenido y canales al tiempo real que puedes sostener hoy, no al que te gustaría tener.",
    ],
    evitar: [
      "No compres sistemas empresariales para problemas de etapa inicial: sobran funciones y falta constancia.",
      "No midas tu etapa por lo que quieres ser, sino por ventas repetidas y capacidad instalada.",
      "No saltes de etapa por impulso ni por presión de otros negocios.",
    ],
    kpis: [
      "Ventas repetidas por mes, ya sea con el mismo cliente o con la misma demanda.",
      "Capacidad de atención: cuántos clientes puedes servir sin bajar la calidad.",
      "Número de iniciativas activas al mismo tiempo.",
    ],
    soluciones: ["catalogo", "whatsapp", "crm", "analitica"],
    tags: ["etapa", "emprendedor", "estrategia", "presupuesto"],
    siguientePaso:
      "Escribe en una frase qué prueba tu etapa actual, por ejemplo cerrar tres ventas sin depender de conocidos, y elige las tres tareas de esta semana que apunten solo a eso.",
    noAplica:
      "No aplica como dolor a resolver: es una pregunta de contexto. Solo se vuelve un problema cuando tus acciones del día no corresponden a la etapa en la que realmente estás.",
    opciones: [
      {
        value: "idea",
        estado: "contexto",
        diagnostico:
          "Estás en la etapa de la evidencia: todavía no sabes si alguien paga por esto ni cuánto. Aquí corresponde lo barato y manual, conversar con personas del perfil, ofrecer una versión simple del servicio y cobrar desde la primera vez. Cualquier inversión grande en web, marca o publicidad llega antes de saber si hay demanda, y por eso se quema. En esta etapa decide la conversación directa, no la vitrina.",
      },
      {
        value: "emprendedor",
        estado: "contexto",
        diagnostico:
          "Operas desde casa o un local pequeño, con ventas que ya ocurren pero que aún dependen de tu presencia y de los conocidos. El desafío no es conseguir herramientas avanzadas sino construir repetibilidad: saber de dónde vienen los clientes, responder rápido y sostener un mensaje estable. Aquí rinde más ordenar WhatsApp, catálogo y reseñas que comprar sistemas pensados para equipos. La señal de avance es que las ventas dejen de depender de que tú estés en todo.",
      },
      {
        value: "creciendo",
        estado: "contexto",
        diagnostico:
          "Ya vendes de forma regular y el cuello de botella se movió del producto a la operación: seguimiento, capacidad de atención y consistencia del mensaje. Es el punto donde una hoja de cálculo deja de alcanzar y aparecen los prospectos olvidados. Prioriza capturar y dar seguimiento a los contactos que ya llegan, medir de dónde vienen y documentar el proceso de venta antes de aumentar el gasto en publicidad. Escalar el tráfico sin orden interno solo amplifica el desorden.",
      },
      {
        value: "estable",
        estado: "contexto",
        diagnostico:
          "Tienes operación y clientela consolidadas, así que tus decisiones son de eficiencia y expansión, no de supervivencia. El riesgo típico es la complacencia: procesos que funcionan por inercia y márgenes que se erosionan sin que nadie lo note. Conviene medir con datos propios, documentar lo que ya funciona para poder delegarlo y probar canales nuevos con presupuesto acotado antes de comprometer la estructura. La ganancia no está en hacer más, sino en sostener mejor lo que ya rinde.",
      },
    ],
  },
  {
    id: "nicho",
    orden: 5,
    momento: "Conocerte",
    pregunta: "¿A qué categoría pertenece tu negocio?",
    porQue: "Cada nicho vende en canales distintos y tiene reglas propias. ⚠️ = nicho sensible.",
    factorId: null,
    modo: "valor",
    queMedimos:
      "Identificamos la categoría de tu negocio porque cada nicho tiene canales donde la demanda ya existe y restricciones propias, incluidas las reglas de plataforma para sectores sensibles. Con este dato filtramos recomendaciones que en tu categoría serían pérdida de tiempo o un riesgo.",
    causas: [
      "Cada categoría concentra su demanda en lugares distintos: búsqueda local, redes visuales, comunidades o marketplaces.",
      "Las plataformas aplican reglas especiales a salud, nutrición, finanzas y multinivel.",
      "El mismo tipo de servicio se vende distinto según el ticket, el ciclo de decisión y la urgencia.",
      "Las prácticas que funcionan en un rubro se copian sin revisar si aplican al propio.",
    ],
    efectos: [
      "Esfuerzo invertido en canales donde tu cliente no busca ni compra.",
      "Anuncios o cuentas rechazadas por incumplir políticas de tu sector.",
      "Mensajes que no respetan el ciclo de decisión de la categoría, con presión donde hace falta educación.",
      "Comparaciones equivocadas con negocios de otros rubros que te llevan a conclusiones falsas.",
    ],
    senales: [
      "Publicas donde tus competidores directos no están y no llega nadie.",
      "Tus anuncios o publicaciones son rechazados sin motivo aparente.",
      "Tu cliente pregunta cosas que en tu rubro ya debería tener resueltas antes de contactarte.",
      "Copias tácticas de un negocio de otra categoría y no funcionan en la tuya.",
    ],
    practicas: [
      "Confirma en qué canal busca tu cliente cuando tiene la necesidad y empieza por ese.",
      "Revisa las reglas y restricciones publicitarias de tu categoría antes de invertir un peso.",
      "Ajusta el lenguaje al ciclo de tu nicho: urgencia práctica en servicios locales, educación y confianza en salud o finanzas.",
      "Documenta qué canal te trae clientes que pagan y cierra los que solo traen curiosos.",
      "Si estás en un nicho sensible, sostén todo en contenido educativo y consentimiento explícito.",
    ],
    evitar: [
      "No apliques el mismo plan de canales a todos los nichos por imitación.",
      "No prometas resultados ni uses antes y después en categorías reguladas.",
      "No envíes mensajes masivos a listas que nunca te autorizaron.",
    ],
    kpis: [
      "Clientes nuevos por canal, separados por nicho y por tipo de oferta.",
      "Publicaciones o anuncios rechazados por políticas de plataforma.",
      "Porcentaje de consultas que corresponden a tu categoría real.",
    ],
    soluciones: ["google_business", "contenido", "whatsapp", "youtube"],
    tags: ["visibilidad", "contenido", "compliance", "estrategia"],
    siguientePaso:
      "Escribe los dos canales principales de tu categoría y verifica hoy mismo si tu negocio aparece en ellos; si no, corrige primero el más importante antes de sumar otro.",
    noAplica:
      "No aplica como dolor a resolver: es una clasificación de contexto. Se vuelve relevante cuando tu categoría tiene restricciones de plataforma (salud, nutrición, finanzas, multinivel), porque ahí las reglas mandan sobre las tácticas.",
    opciones: [
      {
        value: "gastronomia",
        estado: "contexto",
        diagnostico:
          "En gastronomía la decisión se toma cerca y ahora: Google y Maps definen dónde come la gente hoy, Instagram muestra el plato y TikTok amplía el descubrimiento con videos de preparación. Lo que no funciona es LinkedIn ni el correo masivo, porque nadie busca dónde almorzar ahí. Prioriza la ficha con horarios, fotos y reseñas al día, y usa las redes visuales para las promociones del día.",
      },
      {
        value: "salud",
        estado: "contexto",
        diagnostico:
          "En salud el paciente busca con intención alta en Google y decide por confianza: las reseñas y las respuestas claras pesan antes que el precio, y WhatsApp con agenda reduce la fricción de pedir cita. TikTok solo rinde si es educativo, sin diagnósticos ni promesas de curación. Cuida la privacidad de los pacientes y no publiques imágenes clínicas sin consentimiento.",
      },
      {
        value: "servicios_local",
        estado: "contexto",
        diagnostico:
          "Los servicios locales viven de la urgencia y la cercanía: Google y Maps capturan a quien busca taller, estética o técnico en su zona, WhatsApp gana el trabajo para quien cotiza primero, y Facebook con grupos y Marketplace sostiene la venta local. YouTube rara vez compensa por el costo de producir. Publica trabajos antes y después honestos, precios orientativos y la garantía bien explicada.",
      },
      {
        value: "profesionales",
        estado: "contexto",
        diagnostico:
          "En servicios profesionales el cliente llega buscando resolver un problema concreto: Google captura esa búsqueda y LinkedIn concentra la relación entre empresas y los referidos. El contenido educativo es el que construye autoridad y baja la resistencia al honorario. Lo que sobra es el entretenimiento sin sustancia: si publicas humor o tendencias, el cliente no asocia eso con criterio profesional.",
      },
      {
        value: "ecommerce",
        estado: "contexto",
        diagnostico:
          "En comercio electrónico el comprador ya está en modo compra: los marketplaces concentran demanda lista, Instagram funciona como vitrina y prueba social, y TikTok vende por demostración del producto en uso. LinkedIn no es un canal de compra masiva. Cuida la ficha, porque ahí se decide la conversión: fotos reales, medidas, tiempos de envío y política de devolución clara.",
      },
      {
        value: "educacion",
        estado: "contexto",
        diagnostico:
          "En educación se compra después de probar: el contenido gratuito demuestra criterio, YouTube responde búsquedas y sostiene autoridad en el tiempo, y el embudo con material descargable captura interesados para nutrirlos antes de vender. Los marketplaces no son vitrina de conocimiento. Evita prometer resultados de alumnos y muestra procesos y trabajos reales.",
      },
      {
        value: "inmobiliaria",
        estado: "contexto",
        diagnostico:
          "En bienes raíces la decisión es lenta y de ticket alto: Facebook y Marketplace concentran la búsqueda local y los grupos de zona, Google captura búsquedas del tipo apartamento más sector, y los recorridos en video generan las visitas. TikTok da descubrimiento pero rara vez cierra una operación seria. Publica precios o rangos y requisitos desde el inicio para filtrar curiosos.",
      },
      {
        value: "multinivel",
        estado: "contexto",
        diagnostico:
          "El multinivel es un nicho sensible: las plataformas y la propia audiencia castigan el spam. Lo que funciona es marca personal con contenido de proceso, conversaciones uno a uno por WhatsApp con permiso previo y una comunidad que ve resultados verificables. Queda fuera el mensaje masivo no solicitado, el reclutamiento por grupos y cualquier promesa de ingresos. Si tu comunicación depende de esas promesas, este plan no te va a servir.",
      },
      {
        value: "suplementos",
        estado: "contexto",
        diagnostico:
          "Nutrición y suplementos es un nicho sensible: la publicidad está muy restringida y las promesas de resultados se penalizan. El camino es educación sobre hábitos y uso correcto, rutinas explicadas y testimonios con permiso explícito; nunca antes y después milagrosos ni garantías de resultado. Valida primero en orgánico y en WhatsApp con seguimiento humano antes de intentar pauta.",
      },
      {
        value: "finanzas",
        estado: "contexto",
        diagnostico:
          "Finanzas, inversión y cripto es un nicho sensible: prometer rentabilidad está prohibido y buena parte de la publicidad está restringida. YouTube y el contenido educativo construyen la confianza que este sector exige, con riesgos explicados y sin recomendaciones personalizadas. Los grupos y los mensajes masivos destruyen reputación y ponen en riesgo tus cuentas. Vende criterio y acompañamiento, no rendimientos.",
      },
      {
        value: "otro",
        estado: "contexto",
        diagnostico:
          "Si tu categoría no está en la lista, el punto de partida razonable es Google para capturar la búsqueda y WhatsApp para cerrar la conversación, porque esos dos canales funcionan en casi cualquier rubro. Antes de sumar redes, confirma con tus propios clientes dónde te encontraron y qué revisaron antes de escribirte. Ajusta después según lo que ya te trae ventas, no según lo que hace un negocio de otro sector.",
      },
    ],
  },
  {
    id: "objetivo",
    orden: 6,
    momento: "Conocerte",
    pregunta: "¿Cuál es tu principal objetivo ahora?",
    porQue: "Lo urgente manda: validar, conseguir, vender más o escalar piden planes distintos.",
    factorId: null,
    modo: "valor",
    queMedimos:
      "Registramos cuál es tu prioridad declarada para ordenar el plan, porque validar, conseguir clientes, vender más o escalar exigen acciones distintas y a veces contradictorias. Sin esta jerarquía, todo parece urgente y nada se termina.",
    causas: [
      "Varias necesidades compiten al mismo tiempo y ninguna se declara prioritaria.",
      "La urgencia de caja manda sobre el objetivo de fondo.",
      "El objetivo cambia según el mes o según la última idea que se leyó.",
      "El objetivo se expresa en deseos amplios como crecer, en lugar de un resultado verificable.",
    ],
    efectos: [
      "Plan disperso: se ejecutan acciones que no apuntan al mismo resultado.",
      "Esfuerzo repartido entre captar, vender y fidelizar sin profundidad en ninguna.",
      "Presupuesto asignado a tácticas de etapas que todavía no te tocan.",
      "Sensación de trabajar mucho sin poder mostrar avance.",
    ],
    senales: [
      "No puedes decir cuál sería el resultado que te dejaría satisfecho este trimestre.",
      "Tu lista de pendientes mezcla captación, atención y administración sin ningún orden.",
      "Empiezas iniciativas y las abandonas al poco tiempo.",
      "Cada semana cambia tu táctica principal.",
    ],
    practicas: [
      "Escribe un solo objetivo para los próximos noventa días con un resultado observable.",
      "Traduce ese objetivo a una métrica simple que puedas revisar cada semana.",
      "Elige dos o tres acciones directamente ligadas a esa métrica y aparca el resto.",
      "Comparte el objetivo si tienes equipo o colaboradores, para que las decisiones se alineen.",
      "Revisa a mitad de trimestre si la métrica se mueve; si no se mueve, cambia la acción, no el objetivo.",
    ],
    evitar: [
      "No persigas cuatro objetivos a la vez: la dispersión es la causa más común de no avanzar.",
      "No cambies de objetivo antes de completar un ciclo de medición.",
      "No confundas actividad (publicar, pautar) con resultado (contactos, ventas).",
    ],
    kpis: [
      "Avance del objetivo principal medido cada semana.",
      "Porcentaje de tareas de la semana que están ligadas al objetivo.",
      "Número de iniciativas activas al mismo tiempo, idealmente tres o menos.",
    ],
    soluciones: ["embudo", "landing", "analitica", "whatsapp"],
    tags: ["estrategia", "captacion", "conversion", "presupuesto"],
    siguientePaso:
      "Escribe el resultado que quieres ver en noventa días, la métrica que lo refleja y las tres acciones de esta semana que apuntan solo a eso.",
    noAplica:
      "No aplica como dolor a resolver: es una pregunta de contexto. Se vuelve un problema cuando el objetivo que declaras y las acciones de tu semana apuntan a cosas distintas.",
    opciones: [
      {
        value: "clientes",
        estado: "contexto",
        diagnostico:
          "Tu prioridad es captar, así que el plan gira alrededor de la visibilidad y de convertir el interés que ya existe: aparecer donde tu cliente busca, tener una oferta clara y responder rápido. El error frecuente en esta etapa es pagar publicidad antes de que la conversación funcione, porque eso multiplica el gasto sin mejorar el cierre. Mide contactos nuevos por canal y tiempo de primera respuesta: con esos dos datos sabrás si el problema es llegar o cerrar.",
      },
      {
        value: "ventas",
        estado: "contexto",
        diagnostico:
          "Quieres vender más con lo que ya tienes, y eso se gana sobre todo en el proceso comercial: tiempo de respuesta, seguimiento de quienes preguntaron y argumentos de cierre. Antes de buscar más tráfico, revisa cuántas conversaciones quedaron sin respuesta y cuántos presupuestos no tuvieron seguimiento; ahí suele estar la venta perdida. Mide tasa de cierre y seguimientos realizados, no cantidad de publicaciones.",
      },
      {
        value: "validar",
        estado: "contexto",
        diagnostico:
          "Estás comprobando si hay demanda, así que corresponde lo económico, manual y con contacto directo: conversaciones reales, oferta simple y cobro desde el inicio. En esta etapa la publicidad y la marca son gasto prematuro, porque todavía no sabes si el problema que resuelves se paga. Define de antemano qué evidencia te haría continuar, por ejemplo ventas repetidas o clientes que vuelven, y no solo si la idea te gusta.",
      },
      {
        value: "escalar",
        estado: "contexto",
        diagnostico:
          "Quieres crecer sobre una base que ya funciona, y eso exige orden antes que volumen: proceso de venta documentado, seguimiento que no dependa de tu memoria y medición de qué canal trae clientes rentables. Escalar con desorden multiplica los errores y el desgaste del equipo. Prueba primero un canal nuevo con presupuesto acotado y un criterio de corte definido, y amplía solo lo que demuestre retorno.",
      },
    ],
  },
  {
    id: "pais",
    orden: 7,
    momento: "Conocerte",
    pregunta: "¿En qué país/ciudad operas? (opcional)",
    porQue: "El contexto local cambia los canales (Maps, Marketplace, grupos).",
    factorId: null,
    modo: "texto",
    textoOkLargo: 3,
    queMedimos:
      "Ubicamos tu operación geográfica porque la demanda local se comporta distinto: cambian los canales que la gente usa, las plataformas con más penetración y la forma de comprar. Es un dato de contexto para ajustar recomendaciones, no un indicador de desempeño.",
    causas: [
      "La búsqueda local y los mapas son el primer punto de contacto en la mayoría de los servicios presenciales.",
      "La penetración de marketplaces y grupos locales varía entre países y entre ciudades.",
      "Las formas de pago y de entrega disponibles condicionan qué canal puede cerrar la venta.",
      "El negocio atiende más de una zona, y cada una tiene dinámicas de compra diferentes.",
    ],
    efectos: [
      "Recibes recomendaciones genéricas que no consideran cómo compra la gente de tu zona.",
      "Eliges canales por tendencia global y no por uso real en tu mercado.",
      "Inviertes en tácticas que en tu ciudad no alcanzan masa crítica.",
      "Publicas mensajes que ignoran horarios, moneda o formas de pago locales.",
    ],
    senales: [
      "Tu público no usa el canal donde más publicas.",
      "Recibes consultas de zonas donde no puedes atender.",
      "Tus competidores locales están en canales donde tú no apareces.",
      "Los grupos y marketplaces de tu zona mueven más interés que tus propios perfiles.",
    ],
    practicas: [
      "Verifica que tu ficha de negocio esté bien ubicada, con horarios y zona de cobertura reales.",
      "Pregunta a tus últimos clientes dónde te encontraron y qué revisaron antes de escribirte.",
      "Observa qué hacen los negocios de tu rubro en tu ciudad, sin copiar a los de otros mercados.",
      "Ajusta horarios de atención, formas de pago y entrega según los hábitos de tu zona.",
      "Si atiendes varias zonas, decide si las tratas igual o con mensajes y ofertas separadas.",
    ],
    evitar: [
      "No copies campañas de otros países sin revisar los hábitos locales de compra.",
      "No abras canales para zonas donde no puedes prestar el servicio.",
      "No publiques precios sin aclarar moneda, alcance y condiciones locales.",
    ],
    kpis: [
      "Consultas por zona y porcentaje que cae dentro de tu área de cobertura.",
      "Clientes nuevos que llegaron desde búsqueda local o mapas.",
      "Esfuerzo por contacto en tu zona principal frente a las secundarias.",
    ],
    soluciones: ["google_business", "seo_local", "facebook", "tarjeta"],
    tags: ["visibilidad", "seo_local", "estrategia", "captacion"],
    siguientePaso:
      "Revisa hoy tu ficha en Google o el canal local principal y confirma que la dirección, el horario y la zona de cobertura estén correctos y actualizados.",
    noAplica:
      "No aplica si vendes cien por ciento en línea a cualquier país y tu operación no depende de la ubicación: en ese caso el dato relevante es el idioma y la zona horaria de tu cliente, no la ciudad.",
    opciones: [
      {
        value: "ok",
        estado: "contexto",
        diagnostico:
          "Con la ubicación registrada, el plan puede apoyarse en los canales que la gente de tu zona realmente usa para buscar y comprar, y en las condiciones locales de pago y entrega. Ese contexto también sirve para filtrar recomendaciones globales que no aplican a tu mercado y para decidir en qué zona concentrar el esfuerzo si atiendes varias. Revísalo cuando cambies de cobertura o abras una zona nueva.",
      },
      {
        value: "corto",
        estado: "contexto",
        diagnostico:
          "Sin ubicación, las recomendaciones quedan en genérico: puedes terminar invirtiendo en canales con poca penetración en tu mercado o publicando precios y condiciones que no encajan con la forma de comprar de tu zona. No es un problema de desempeño, solo un dato que falta. Complétalo cuando puedas y, mientras tanto, guíate por lo que ya observas en tus clientes: dónde te encontraron y qué revisaron antes de escribirte.",
      },
    ],
  },
  {
    id: "canales",
    orden: 8,
    momento: "Descubrimiento",
    pregunta: "¿Dónde pueden encontrarte tus clientes?",
    porQue: "Mapeamos tu infraestructura real.",
    factorId: "presencia_digital",
    modo: "array",
    claveArray: "canales",
    queMedimos:
      "Mapeamos dónde puede encontrarte hoy un cliente antes de conocerte: ficha local, redes, web, marketplace o WhatsApp. Con eso sabemos si el problema es que no existes donde te buscan o si existes y aun así no conviertes.",
    causas: [
      "El negocio creció por boca a boca y nunca se abrió una ficha ni un perfil propio.",
      "Se abrieron canales por moda o por recomendación, sin relación con dónde busca el cliente.",
      "Hay perfiles creados y abandonados, con información incompleta o desactualizada.",
      "El negocio depende de un solo canal por comodidad o por miedo a dispersarse.",
    ],
    efectos: [
      "Los clientes que ya te buscan no te encuentran y terminan en un competidor.",
      "El boca a boca no tiene dónde aterrizar: quien te recomienda no puede mostrar nada verificable.",
      "Toda la captación queda dependiendo de la memoria del cliente o de la suerte.",
      "Los registros y reseñas que se acumularían en tu ficha se van a la competencia.",
    ],
    senales: [
      "Alguien te pregunta si tienes página o perfil y no sabes qué responder.",
      "No apareces cuando buscas tu servicio junto con tu ciudad.",
      "Tus clientes nuevos llegan siempre por conocidos y nunca por búsqueda.",
      "Tienes perfiles creados que llevan meses sin información, fotos ni horarios.",
    ],
    practicas: [
      "Comprueba cómo te encuentra hoy un desconocido: busca tu servicio más tu ciudad y anota qué aparece.",
      "Abre o corrige primero el canal de mayor intención: ficha local con dirección, horarios, fotos y servicios.",
      "Completa un perfil por completo antes de abrir otro: los datos desactualizados restan más que la ausencia.",
      "Deja en cada canal un camino claro al contacto, con enlace a WhatsApp o formulario simple.",
      "Revisa cada mes que horarios, precios y disponibilidad sigan vigentes.",
    ],
    evitar: [
      "No abras cinco canales a la vez si no puedes mantenerlos actualizados.",
      "No uses tu perfil personal como única presencia del negocio si vendes a desconocidos.",
      "No publiques datos de contacto que ya no usas ni enlaces rotos.",
    ],
    kpis: [
      "Apariciones propias, no de terceros, en los primeros resultados de tu servicio más tu ciudad.",
      "Contactos nuevos por canal, separando búsqueda, redes y referidos.",
      "Porcentaje de perfiles activos con información completa y vigente.",
    ],
    soluciones: ["google_business", "whatsapp", "instagram", "web"],
    tags: ["visibilidad", "seo_local", "redes_sociales", "captacion"],
    siguientePaso:
      "Busca hoy tu servicio más tu ciudad y comprueba qué aparece; si no sales, crea o completa tu ficha de negocio con dirección, horario, fotos y enlace a WhatsApp.",
    noAplica:
      "No aplica si tu modelo es estrictamente relacional y de alta confianza, por ejemplo consultoría que llega solo por referidos, y ese flujo ya te mantiene ocupado: abrir canales ahí puede restar tiempo sin traer mejores clientes.",
    opciones: [
      {
        value: "ninguno",
        estado: "critico",
        diagnostico:
          "Hoy un cliente que te descubre por recomendación no tiene dónde verificarte ni cómo contactarte sin pedir tu número a otra persona, y un desconocido que te busca no te encuentra. Eso deja la captación enteramente en manos de terceros y hace que cada mes dependa de la casualidad. Empezar es más simple de lo que parece: una ficha de negocio completa, con horarios, servicios, fotos y enlace a WhatsApp, recupera demanda que ya existe en tu zona sin invertir en publicidad.",
      },
      {
        value: "pocos",
        estado: "alerta",
        diagnostico:
          "Con uno o dos canales ya tienes una base, pero la cobertura es frágil: si esa red cambia su alcance o ese perfil se cae, la captación se detiene. Además, cuando el canal no coincide con donde busca tu cliente, el esfuerzo rinde poco y parece que el marketing no funciona cuando en realidad está mal ubicado. Revisa si tu canal principal es el de mayor intención en tu rubro y suma el segundo solo cuando el primero esté completo y con respuesta rápida.",
      },
      {
        value: "varios",
        estado: "bien",
        diagnostico:
          "Tienes presencia en tres o más lugares, lo que reduce la dependencia de una sola plataforma y te da varias puertas de entrada. El riesgo cambia de forma: con varios canales aparece la dispersión y la información desactualizada, que resta confianza justo donde alguien iba a contactarte. Prioriza mantener dos canales impecables y medir de dónde vienen los clientes que pagan, en lugar de publicar poco y mal en todos.",
      },
    ],
  },
];
