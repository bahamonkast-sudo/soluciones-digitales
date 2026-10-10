import type { DolorDef } from "../dolores";

// Parte 3 · "Ventas" + "Estrategia": cierre, seguimiento, recompra, medición
// y presupuesto. Orden 17–24.
export const P3: DolorDef[] = [
  {
    id: "seguimiento",
    orden: 17,
    momento: "Ventas",
    pregunta: "Cuando alguien pregunta y no compra, ¿qué haces?",
    porQue: "La mayoría de ventas se cierra entre el 2º y 5º contacto.",
    factorId: "proceso_comercial",
    modo: "valor",
    queMedimos:
      "Medimos si existe un proceso de seguimiento después del primer contacto: si el negocio vuelve a escribirle a quien preguntó y no compró. Ese dato manda porque la venta rara vez ocurre en la primera conversación; ocurre en las siguientes, y ahí es donde se decide cuánto se aprovecha el esfuerzo de captación ya hecho.",
    causas: [
      "El negocio atiende por WhatsApp y el chat se pierde entre conversaciones nuevas: nadie lleva una lista de pendientes.",
      "Se asume que si el cliente no compró fue porque no le interesó, cuando en realidad muchas veces solo pospuso la decisión.",
      "No hay un responsable ni un momento del día asignado a retomar conversaciones anteriores.",
      "No se registra qué se conversó, así que el segundo mensaje tendría que empezar de cero y da flojera o vergüenza escribirlo.",
    ],
    efectos: [
      "Cada interesado que no recibe un segundo mensaje es una oportunidad que ya costó tiempo y dinero de captación y se queda en el primer contacto.",
      "El flujo de ventas depende de la memoria del dueño, así que cae justo en las semanas más ocupadas.",
      "Se gasta más en conseguir clientes nuevos para compensar lo que se pierde, cuando retomar lo ya conversado cuesta casi nada.",
      "El negocio no aprende por qué la gente no compra, porque nunca vuelve a preguntar.",
    ],
    senales: [
      "Abres WhatsApp y encuentras conversaciones de la semana pasada sin respuesta ni cierre.",
      "No sabrías decir cuántos interesados quedaron pendientes este mes.",
      "Las ventas suben solo con promoción o temporada alta, y el resto del mes queda flojo.",
      "Clientes te escriben después de semanas diciendo que quedaron en confirmar y ya no recuerdas el contexto.",
    ],
    practicas: [
      "Crea una lista única de interesados pendientes (una hoja de cálculo o las etiquetas de WhatsApp Business) con la fecha del último contacto.",
      "Define una cadencia fija de tres intentos: a las 24 horas, al tercer día y al séptimo; escribe cada mensaje una sola vez y reutilízalo.",
      "Cierra cada intento con una pregunta de decisión simple, del tipo si lo dejan para la próxima semana o lo descartan, para que el silencio no se alargue.",
      "Reserva quince minutos diarios a revisar la lista y escribirle a los pendientes del día.",
      "Anota el motivo por el que no compran; al mes, esa lista te dice qué corregir en la oferta o en el precio.",
    ],
    evitar: [
      "Escribir '¿entonces?' sin aportar nada nuevo: el segundo mensaje debe traer información, no solo presión.",
      "Insistir más de cinco veces sin respuesta; después de eso se percibe como acoso y daña la reputación.",
      "Automatizar el seguimiento antes de tener claro el mensaje: un robot repitiendo un texto malo multiplica el daño.",
    ],
    kpis: [
      "Porcentaje de interesados contactados por segunda vez en menos de 24 horas.",
      "Número de seguimientos hechos por semana (referencia simple: tantos como conversaciones nuevas).",
      "Tasa de respuesta al segundo mensaje y ventas cerradas después del primer contacto.",
    ],
    soluciones: ["whatsapp", "crm", "automatizacion", "remarketing"],
    tags: ["seguimiento", "proceso_comercial", "whatsapp", "crm"],
    siguientePaso:
      "Abre hoy tu WhatsApp, lista las últimas diez conversaciones que quedaron sin cierre y escríbele un mensaje distinto a cada una antes de que termine el día.",
    noAplica:
      "Si tu negocio cierra casi todo en una sola visita de mostrador o ventanilla y no hay conversación pendiente que retomar, este dolor tiene poco recorrido. Aun así vale revisar si el cliente podría volver por un segundo producto o un servicio posterior.",
    opciones: [
      {
        value: "sistematico",
        estado: "bien",
        diagnostico:
          "Tienes un proceso que no depende de la memoria: vuelves a contactar a quien no compró. Eso significa que tu embudo no pierde ventas por olvido, y que el siguiente salto está en la calidad del mensaje y en el momento del contacto, no en crear un hábito que ya tienes. Documenta esa secuencia y revísala cada mes para que sobreviva a las temporadas ocupadas.",
      },
      {
        value: "aveces",
        estado: "alerta",
        diagnostico:
          "El seguimiento existe, pero depende de que te acuerdes, así que funciona en semanas tranquilas y desaparece cuando entra trabajo. El costo es invisible: no ves la venta que no ocurrió, solo notas que el mes quedó flojo. La oportunidad inmediata es convertir ese 'a veces' en una lista con fechas y tres intentos definidos, sin cambiar nada más del negocio.",
      },
      {
        value: "no",
        estado: "critico",
        diagnostico:
          "Hoy cada interesado recibe un solo intento: si no compra en la primera conversación, se pierde. Estás pagando captación completa para obtener una única oportunidad de cierre, y el negocio queda atado a que la gente decida rápido y sola. Antes de invertir en más tráfico, conviene exprimir lo que ya llega: una lista de pendientes y tres intentos ordenados destraban ventas que ya estaban a medio camino.",
      },
    ],
  },
  {
    id: "tiempo_respuesta",
    orden: 18,
    momento: "Ventas",
    pregunta: "¿En cuánto respondes un mensaje de un cliente?",
    porQue: "Responder en minutos multiplica el cierre.",
    factorId: "proceso_comercial",
    modo: "valor",
    queMedimos:
      "Medimos cuánto tarda el negocio en contestar el primer mensaje de un cliente potencial. Es el indicador más directo de cuánta demanda real se enfría antes de que la conversación empiece, y no depende del talento comercial sino del diseño de la atención.",
    causas: [
      "Una sola persona atiende el negocio y el chat a la vez, así que responde entre tareas y los mensajes quedan abajo.",
      "Las notificaciones están apagadas o se revisan dos veces al día, y fuera de horario nadie avisa que llegó un mensaje.",
      "No hay respuestas guardadas: cada consulta exige pensar y redactar de nuevo, lo que alarga cada respuesta.",
      "Se cree que contestar tarde no afecta, porque el cliente casi nunca reclama por escrito.",
    ],
    efectos: [
      "Mientras esperas, el interesado escribe a dos o tres competidores y suele decidir con quien le contestó primero.",
      "La conversación empieza cuesta arriba: el cliente llega comparando precios en lugar de resolver su necesidad.",
      "Se paga publicidad que genera mensajes que el negocio no alcanza a atender, así que esa inversión se diluye.",
      "La demora se interpreta como desinterés y afecta la percepción de seriedad, sobre todo en servicios urgentes.",
    ],
    senales: [
      "Tienes mensajes sin leer de hace horas o días en WhatsApp, Instagram o el formulario de la web.",
      "Los clientes escriben '¿hola?' o '¿sigues ahí?' antes de que respondas.",
      "Muchos interesados preguntan y desaparecen justo después de tu primera respuesta tardía.",
      "No sabrías decir cuál fue tu tiempo de respuesta promedio de la semana pasada.",
    ],
    practicas: [
      "Define un horario de atención visible y responde fuera de él con un mensaje automático que indique cuándo contestarás.",
      "Guarda respuestas rápidas para las cinco preguntas más repetidas: precio, disponibilidad, ubicación, formas de pago y tiempos.",
      "Activa notificaciones solo para consultas y revisa el canal cada hora en bloques cortos, en lugar de dejarlo todo para el final del día.",
      "Separa el saludo del desarrollo: confirma en minutos que recibiste el mensaje y da el detalle cuando puedas.",
      "Si el volumen crece, reparte la atención con otra persona o con respuestas preparadas antes de sumar más publicidad.",
    ],
    evitar: [
      "Dejar el mensaje en visto sin responder: se percibe peor que contestar tarde, porque el cliente lo lee como abandono.",
      "Depender solo de respuestas automáticas sin nadie detrás; cuando el cliente pide algo distinto, se atasca y se va.",
      "Prometer un tiempo de respuesta que no puedes sostener fuera de horario.",
    ],
    kpis: [
      "Tiempo promedio entre el primer mensaje del cliente y tu primera respuesta.",
      "Porcentaje de mensajes contestados en menos de una hora dentro del horario de atención.",
      "Consultas atendidas y agendadas por semana, comparadas con la demora de respuesta.",
    ],
    soluciones: ["whatsapp", "bot", "automatizacion", "crm"],
    tags: ["whatsapp", "conversion", "proceso_comercial", "seguimiento"],
    siguientePaso:
      "Durante los próximos tres días, anota a qué hora llega cada consulta y a qué hora respondes; con ese promedio decide si necesitas respuestas rápidas, más manos o un horario explícito.",
    noAplica:
      "Si vendes por mostrador con atención presencial y prácticamente no recibes consultas por escrito, este dolor no es tu prioridad. En ese caso mira más bien la rapidez y la calidad de la atención en el local.",
    opciones: [
      {
        value: "minutos",
        estado: "bien",
        diagnostico:
          "Respondes casi en el momento, que es la posición más fuerte para convertir: la conversación arranca con el interés intacto y el cliente no tiene tiempo de comparar. Con ese nivel, la mejora ya no está en la velocidad sino en la calidad del primer mensaje, es decir en una oferta clara y un siguiente paso obvio. Cuida que el ritmo se mantenga cuando suba el volumen, antes de duplicar la publicidad.",
      },
      {
        value: "horas",
        estado: "alerta",
        diagnostico:
          "Contestas en horas, así que parte del interés se enfría en el camino y compites con quien fue más rápido aunque tu oferta sea mejor. Funciona cuando el cliente tiene urgencia baja, pero pierdes justo los casos que querían decidir hoy. Una respuesta preparada para tus tres preguntas más comunes recorta ese tiempo sin exigirte estar pegado al teléfono.",
      },
      {
        value: "dias",
        estado: "critico",
        diagnostico:
          "Responder en días significa que la decisión del cliente casi siempre se toma antes de que abras la boca, y que tu publicidad está financiando conversaciones que otro cierra. El problema no es de esfuerzo sino de diseño: nadie tiene asignado revisar el canal. Empieza por un horario de atención explícito, un mensaje automático fuera de horario y respuestas guardadas; es la mejora de menor costo con mayor efecto sobre las ventas.",
      },
    ],
  },
  {
    id: "recompra",
    orden: 19,
    momento: "Estrategia",
    pregunta: "¿Tus clientes vuelven o te recomiendan?",
    porQue: "Fidelizar es más barato que captar.",
    factorId: "fidelizacion",
    modo: "valor",
    queMedimos:
      "Medimos si la base de clientes actual vuelve a comprar o recomienda el negocio. Es la prueba de que lo entregado estuvo a la altura y de que el negocio puede crecer sin depender únicamente de gente nueva cada mes.",
    causas: [
      "Nadie vuelve a contactar al cliente después de la venta: no hay recordatorio, ni beneficio, ni motivo concreto para regresar.",
      "El esfuerzo se concentra en captar y nada en mantener, así que el cliente no se lleva una experiencia que recuerde.",
      "No se guardan datos de contacto ni historial de compra, de modo que no se puede saber quién compró qué y cuándo.",
      "La entrega o el servicio posterior quedó por debajo de lo prometido, y el cliente simplemente no regresa ni se queja.",
    ],
    efectos: [
      "Hay que conseguir cada mes clientes nuevos solo para reemplazar a los que no volvieron, lo que encarece toda la operación.",
      "El negocio no acumula reputación: sin recompra ni recomendación, cada venta empieza de cero.",
      "Se compite por precio, porque sin relación previa el cliente solo compara números.",
      "El voz a voz se apaga y el flujo de clientes queda atado a la publicidad pagada.",
    ],
    senales: [
      "No podrías nombrar a tus diez mejores clientes del último año con la fecha de su última compra.",
      "Los ingresos dependen casi por completo de clientes nuevos.",
      "Nadie ha recibido un mensaje tuyo después de comprar, salvo el comprobante de pago.",
      "Cuando preguntas de dónde vienen los clientes, el voz a voz no aparece entre las respuestas.",
    ],
    practicas: [
      "Registra a cada comprador con nombre, contacto, qué compró y fecha; basta una hoja de cálculo o las etiquetas de WhatsApp.",
      "Define el ciclo natural de recompra de tu producto y escribe una sola vez el mensaje de regreso para ese momento.",
      "Cierra cada venta con una acción que provoque el retorno: garantía, próximo servicio, recordatorio de consumo o beneficio por volver.",
      "Pide la recomendación o la reseña en el momento de mayor satisfacción, que suele ser justo después de entregar.",
      "Reconoce a los clientes repetidos con algo concreto (atención preferente, condición de cliente frecuente o un extra), no solo con descuento.",
    ],
    evitar: [
      "Comprar la recompra solo con descuentos: enseña al cliente a esperar la rebaja y acostumbra al negocio a trabajar con margen mínimo.",
      "Escribirle a toda la base con el mismo mensaje genérico; quema la lista y hace que la gente deje de abrir tus mensajes.",
      "Pedir reseña o recomendación antes de que el cliente haya visto el resultado.",
    ],
    kpis: [
      "Porcentaje de clientes que compran más de una vez en el periodo.",
      "Número de recomendaciones o clientes nuevos que llegan mencionando a un cliente actual.",
      "Reseñas nuevas por mes y cantidad de clientes registrados con contacto y fecha de compra.",
    ],
    soluciones: ["whatsapp", "email", "resenas", "crm"],
    tags: ["resenas", "confianza", "reputacion", "captacion"],
    siguientePaso:
      "Escríbele hoy a tus cinco últimos clientes, con un mensaje distinto para cada uno: agradece la compra y ofrece un motivo concreto para volver.",
    noAplica:
      "Si tu modelo vende una sola vez en la vida del cliente (trámites únicos, mudanzas, venta de un inmueble), la recompra directa no aplica. Ahí el equivalente es la recomendación, y ese sí debería ser tu indicador principal.",
    opciones: [
      {
        value: "frecuente",
        estado: "bien",
        diagnostico:
          "Tus clientes vuelven y te recomiendan, lo que significa que la experiencia sostiene el negocio y que tu costo real de captación es menor que el de tu competencia. Esta es una base sólida: el siguiente paso es hacer visible y repetible lo que ya funciona (cuándo escribir, qué ofrecer, cuándo pedir la reseña) para que no dependa de la buena voluntad. Un cliente frecuente bien atendido suele traer a otro.",
      },
      {
        value: "aveces",
        estado: "alerta",
        diagnostico:
          "Vuelven algunos, no todos, y eso indica una experiencia despareja: hay algo que a una parte de tus clientes no le queda claro o no le llega. Sin un motivo explícito para regresar, la recompra queda a merced de la memoria del cliente. La oportunidad está en el seguimiento posterior a la venta: un mensaje en el momento correcto y una razón concreta para volver cambian la proporción sin tocar precios.",
      },
      {
        value: "nunca",
        estado: "critico",
        diagnostico:
          "Si casi nadie vuelve ni recomienda, estás en el modelo más caro que existe: comprar cada venta desde cero. Puede ser que la experiencia no esté a la altura o, más seguido, que nadie esté invitando al cliente a volver. Antes de invertir en más publicidad, revisa la entrega real y arma un registro de clientes con fecha de compra, porque sobre eso se construye cualquier programa de recompra.",
      },
    ],
  },
  {
    id: "medicion",
    orden: 20,
    momento: "Estrategia",
    pregunta: "¿Cómo sabes si tu marketing funciona?",
    porQue: "Sin datos decides a ciegas.",
    factorId: "medicion",
    modo: "valor",
    queMedimos:
      "Medimos con qué referencia decide el negocio si su marketing funciona: con números anotados, con impresiones o sin ninguna. Define si los errores se pueden corregir a tiempo o si todo se juzga por corazonadas.",
    causas: [
      "Nunca se definió qué había que mejorar, así que no hay una cifra concreta que seguir.",
      "Los datos están repartidos entre plataformas y el negocio no tiene tiempo de entrar a cada panel.",
      "Se cree que medir exige herramientas de pago o conocimientos técnicos.",
      "Las decisiones se toman por urgencia del día y la revisión de números nunca entra en la agenda.",
    ],
    efectos: [
      "Cuando algo no funciona, no se sabe si el problema es la oferta, el canal o el mensaje, así que se cambia todo a la vez.",
      "Se sigue pagando lo que no rinde y se abandona lo que sí, por no distinguir el resultado de la sensación.",
      "No se puede repetir un buen mes, porque nadie sabe qué lo produjo.",
      "El negocio queda atado a la intuición del dueño y se vuelve difícil de delegar o de escalar.",
    ],
    senales: [
      "No puedes decir cuántos contactos o consultas recibiste la semana pasada.",
      "Las decisiones de presupuesto se justifican con un 'me parece que funcionó'.",
      "Nunca has calculado cuánto te cuesta conseguir un cliente.",
      "Los informes de las plataformas se miran una vez y no se comparan con nada después.",
    ],
    practicas: [
      "Elige tres números y nada más: contactos nuevos, ventas cerradas y de dónde vinieron.",
      "Anótalos cada semana en el mismo lugar y con la fecha; cinco minutos alcanzan y el valor aparece en la comparación.",
      "Registra la fuente de cada cliente nuevo con una pregunta simple al cerrar: cómo nos encontraste.",
      "Fija una revisión mensual para decidir con los datos: qué se repite, qué se corta y qué se prueba después.",
      "Añade herramientas de medición solo cuando esos tres números ya se estén anotando de forma constante.",
    ],
    evitar: [
      "Llenar paneles de métricas que no cambian ninguna decisión: medir de más paraliza igual que no medir.",
      "Anotar solo los buenos meses y dejar fuera los flojos, porque sin los malos no hay comparación posible.",
      "Comprar una herramienta de analítica antes de tener claro qué decisión vas a tomar con ella.",
    ],
    kpis: [
      "Semanas del mes con los tres números anotados.",
      "Contactos nuevos por semana comparados con la semana anterior.",
      "Porcentaje de ventas del mes con la fuente identificada.",
    ],
    soluciones: ["analitica", "crm", "whatsapp", "landing"],
    tags: ["estrategia", "conversion", "proceso_comercial", "crm"],
    siguientePaso:
      "Abre una hoja con tres columnas (fecha, contactos nuevos, ventas) y llena hoy la fila de esta semana; repite cada viernes a la misma hora.",
    noAplica:
      "Si el negocio arranca esta semana y todavía no registró ni un contacto, medir no es la prioridad: primero genera conversaciones y, desde el primer día, anota esos tres números para poder comparar después.",
    opciones: [
      {
        value: "kpis",
        estado: "bien",
        diagnostico:
          "Mides ventas, contactos y fuentes, así que tus decisiones se pueden corregir con evidencia: sabes qué canal trae clientes y en qué punto se pierden los interesados. Esta posición permite comparar meses y detectar rápido cuando algo se rompe. El siguiente nivel es reducir la lista a los pocos números que cambian decisiones y fijar una revisión mensual, para que la medición no dependa de que alguien tenga tiempo.",
      },
      {
        value: "sensacion",
        estado: "alerta",
        diagnostico:
          "Te guías por impresiones: a veces aciertas, pero no puedes saber por qué ni repetirlo, y tampoco defenderlo ante un socio o un proveedor. El riesgo es cortar lo que sí funciona porque un mes se sintió flojo, o mantener lo que no rinde porque generó movimiento visible. Anotar tres números cada semana te da en un mes la comparación que hoy no tienes, sin comprar ninguna herramienta.",
      },
      {
        value: "nada",
        estado: "critico",
        diagnostico:
          "Sin ninguna referencia, cada decisión de marketing es una apuesta: no hay forma de saber si el problema es la oferta, el canal o el mensaje, ni de justificar el gasto. Lo habitual es cambiar varias cosas al mismo tiempo y no aprender nada del intento. Empieza por dos números escritos a mano, contactos y ventas, y por preguntarle a cada cliente cómo te encontró; eso ya cambia la calidad de tus decisiones.",
      },
    ],
  },
  {
    id: "intentos",
    orden: 21,
    momento: "Estrategia",
    pregunta: "¿Qué has intentado antes en marketing? (opcional)",
    porQue: "Aprendemos de lo que ya probaste para no repetir errores.",
    factorId: null,
    modo: "texto",
    textoOkLargo: 15,
    queMedimos:
      "Recogemos qué acciones de marketing ya se probaron y cómo terminaron. Ese historial evita proponer caminos ya recorridos y muestra qué tipo de esfuerzo está dispuesto a sostener el negocio en el tiempo.",
    causas: [
      "El negocio es nuevo y todavía no invirtió en marketing, ni en dinero ni en tiempo asignado de forma regular.",
      "Lo intentado se hizo sin registro: nadie anotó qué se gastó, cuánto duró ni qué resultado dejó.",
      "La experiencia anterior fue frustrante (una agencia que no entregó, pauta sin ventas) y da flojera volver a hablar del tema.",
      "Se probaron varias cosas a la vez y ninguna durante el tiempo suficiente para saber si funcionaba.",
    ],
    efectos: [
      "Se repiten los mismos errores con el mismo dinero, y el negocio concluye que el marketing no sirve para su caso.",
      "Se descartan canales útiles porque se probaron mal una sola vez.",
      "El diagnóstico parte sin contexto y propone pasos que en la práctica ya se intentaron sin éxito.",
      "Cada intento nuevo arranca de cero y desaprovecha aprendizajes, contactos y materiales que ya existen.",
    ],
    senales: [
      "No podrías decir cuánto gastaste el año pasado en publicidad ni qué devolvió.",
      "Recuerdas el intento por la emoción (fue un desastre) y no por los datos.",
      "Hay cuentas, perfiles o materiales abandonados de intentos anteriores.",
      "Repites la misma promoción o el mismo mensaje esperando otro resultado.",
    ],
    practicas: [
      "Escribe en media página qué probaste, cuánto tiempo y dinero destinaste y qué pasó, aunque las cifras sean aproximadas.",
      "Separa el resultado del canal: si un anuncio sin oferta clara no vendió, el problema pudo estar en la oferta y no en la plataforma.",
      "Antes de repetir un canal, corrige las tres piezas que lo acompañan: oferta, destino (landing o perfil) y medición.",
      "Reutiliza lo que ya existe y sirve: contactos, contenidos, fotos, reseñas o cuentas creadas.",
      "Prueba una sola variable por vez y durante un plazo definido, para poder atribuir el resultado a algo concreto.",
    ],
    evitar: [
      "Volver a contratar el mismo tipo de servicio con el mismo brief esperando un resultado distinto.",
      "Culpar al canal cuando el problema estaba en la oferta o en el destino del tráfico.",
      "Gastar de nuevo sin haber definido antes cómo se va a medir el intento.",
    ],
    kpis: [
      "Historial escrito con al menos un intento anterior documentado: qué fue, cuánto costó y qué pasó.",
      "Variables cambiadas por prueba (lo sano es una por vez).",
      "Costo del intento anterior comparado con los resultados que dejó.",
    ],
    soluciones: ["landing", "contenido", "analitica", "publicidad"],
    tags: ["estrategia", "emprendedor", "presupuesto", "conversion"],
    siguientePaso:
      "Dedica veinte minutos hoy a escribir en una hoja qué intentaste antes, cuánto invertiste y qué resultado tuviste; guarda ese documento como punto de partida del plan.",
    noAplica:
      "Si nunca hiciste nada de marketing y el negocio acaba de empezar, este dolor no aplica como revisión. Solo deja anotado tu punto de partida para poder comparar más adelante.",
    opciones: [
      {
        value: "ok",
        estado: "contexto",
        diagnostico:
          "Ya invertiste esfuerzo o dinero en marketing, y eso es información valiosa: sabes por dónde pasaste y qué no funcionó. Antes de repetir cualquier canal, conviene arreglar las tres piezas que suelen arruinar un intento: la oferta, para que se entienda qué vendes y para quién; el destino, es decir dónde cae la persona que hace clic; y la medición, o cómo sabrás si funcionó. Con esas piezas ordenadas, el mismo canal que falló puede dar otro resultado.",
      },
      {
        value: "corto",
        estado: "contexto",
        diagnostico:
          "Quedó sin detallar qué habías probado antes. No es obligatorio responderlo, pero un par de líneas sobre eso ayudan a no proponerte caminos ya recorridos y a aprovechar lo que hiciste. Cuando quieras, anota aunque sea el canal, cuánto duró y qué pasó: con eso el plan deja de empezar de cero.",
      },
    ],
  },
  {
    id: "dolor",
    orden: 22,
    momento: "Estrategia",
    pregunta: "¿Cuál es tu mayor freno hoy, en tus palabras? (opcional)",
    porQue: "Tu frase centra todo el diagnóstico en lo concreto.",
    factorId: null,
    modo: "texto",
    textoOkLargo: 10,
    queMedimos:
      "Recogemos el freno principal del negocio en palabras del propio dueño. Es la prioridad declarada y sirve para ordenar la lectura del resto del diagnóstico, porque indica qué problema se siente más urgente desde adentro.",
    causas: [
      "El freno real suele estar en una parte del proceso que nadie mira: el seguimiento, el precio o la entrega, más que en la falta de clientes.",
      "Se convive tanto tiempo con el problema que se vuelve paisaje y cuesta nombrarlo con precisión.",
      "Hay varios problemas a la vez y el más ruidoso, la falta de ventas, tapa la causa que lo produce.",
      "El negocio define su problema por lo que le falta (más publicidad, más seguidores) y no por lo que no está funcionando.",
    ],
    efectos: [
      "Sin una prioridad declarada, el esfuerzo se reparte en cinco frentes y ninguno avanza lo suficiente.",
      "Se compra la solución equivocada y después se concluye que el marketing no funciona para ese negocio.",
      "El trabajo avanza en cosas secundarias mientras el cuello de botella sigue igual.",
      "El dueño carga con la preocupación sin traducirla en una acción concreta y verificable.",
    ],
    senales: [
      "Puedes describir el problema en una frase y es la misma desde hace meses.",
      "Cada semana aparece una urgencia distinta y ninguna se resuelve.",
      "Sabes que algo no funciona, pero no cuál es el eslabón que lo produce.",
      "Probaste varias cosas sin tocar el punto que tú mismo señalas como freno.",
    ],
    practicas: [
      "Escribe el freno en una sola frase con sujeto y consecuencia: 'me escriben y no compran' es más útil que 'no vendo'.",
      "Ubícalo en el recorrido del cliente (visibilidad, interés, decisión o recompra) para ver qué corresponde arreglar primero.",
      "Elige un solo frente para las próximas cuatro semanas y deja los demás en espera consciente.",
      "Define cómo sabrás que el freno cedió: una cifra simple y una fecha de revisión.",
      "Revisa al mes si la frase sigue siendo la misma; si cambió, ya moviste algo real.",
    ],
    evitar: [
      "Convertir la frase en una queja general del tipo 'no hay plata en el mercado': eso no se resuelve con acciones concretas.",
      "Atacar cinco frenos al mismo tiempo y no terminar ninguno.",
      "Cambiar de prioridad cada semana según lo que aparezca en la conversación.",
    ],
    kpis: [
      "Freno escrito en una frase, con una cifra asociada y fecha de revisión.",
      "Semanas seguidas trabajando el mismo frente elegido.",
      "Movimiento de la cifra asociada al freno: contactos, cierres o recompra.",
    ],
    soluciones: ["analitica", "crm", "whatsapp", "embudo"],
    tags: ["estrategia", "etapa", "emprendedor", "proceso_comercial"],
    siguientePaso:
      "Escribe hoy tu freno en una sola frase, asígnale una cifra que lo represente y agenda una revisión para dentro de cuatro semanas.",
    opciones: [
      {
        value: "ok",
        estado: "contexto",
        diagnostico:
          "Tu propia frase manda: a partir de aquí, el resto del diagnóstico se lee a la luz de lo que señalaste como freno. Eso es una ventaja, porque evita que te propongamos mejoras que no tocan tu problema real. Úsala como filtro: si una recomendación no mueve esa frase, puede esperar. La prueba de que acertaste es que en un mes la frase haya cambiado o su cifra se haya movido.",
      },
      {
        value: "corto",
        estado: "contexto",
        diagnostico:
          "No detallaste cuál es tu freno hoy, así que lo deducimos de los números del diagnóstico. Si los contactos son pocos, el freno está en la visibilidad; si llegan y no compran, está en la oferta o en el seguimiento; si compran y no vuelven, está en la experiencia. Cuando quieras precisarlo con tus palabras, el plan se vuelve más directo y más corto.",
      },
    ],
  },
  {
    id: "presupuesto",
    orden: 23,
    momento: "Estrategia",
    pregunta: "¿Cuánto podrías invertir al mes en mejorar?",
    porQue: "Adaptamos el plan a tu realidad. Nunca asumimos inversión.",
    factorId: null,
    modo: "valor",
    queMedimos:
      "Medimos cuánto podría destinar el negocio al mes a mejorar su marketing, solo para ordenar el plan. La respuesta no habilita ni descarta nada: hay caminos de costo casi nulo y caminos que piden una inversión sostenida, y el orden de los pasos cambia según cuál sea tu caso.",
    causas: [
      "El negocio reinvierte todo en mercadería, sueldos o local, y el marketing se paga con lo que sobra, que casi nunca sobra.",
      "Los meses irregulares de ventas hacen difícil comprometer una suma fija.",
      "Inversiones anteriores sin retorno claro dejaron la sensación de que ese dinero se pierde.",
      "No se separa el dinero del negocio del dinero personal, así que no hay una cifra disponible identificable.",
    ],
    efectos: [
      "Sin un monto definido, cualquier acción de marketing compite contra un gasto urgente y siempre pierde.",
      "El plan se vuelve improvisado: se invierte a golpes en temporada alta y nada el resto del año.",
      "Se descartan canales que exigen un mínimo sostenido por no haber previsto la suma con antelación.",
      "El negocio no puede comparar el retorno de lo invertido porque nunca hay una cifra contra la cual medir.",
    ],
    senales: [
      "Cuando aparece una oportunidad de invertir, no sabes si puedes pagarla sin descuadrar el mes.",
      "El gasto en marketing aparece solo cuando hay una promoción urgente.",
      "No podrías decir cuánto destinaste a marketing el mes pasado.",
      "Cada mes se decide de nuevo desde cero si se invierte o no.",
    ],
    practicas: [
      "Define un monto, aunque sea simbólico, y trátalo como parte de la operación y no como sobrante.",
      "Empieza por lo que cuesta tiempo y no dinero: ficha de negocio, respuestas guardadas, seguimiento, pedido de reseñas y contenido propio.",
      "Separa el presupuesto en dos partes: lo gratuito que sostienes con constancia y lo pagado que pruebas por periodos definidos.",
      "Cuando inviertas, hazlo en un solo canal, con una medición acordada y un plazo para evaluar.",
      "Ajusta el monto cada mes según las ventas, en lugar de comprometer una suma fija que no puedes sostener.",
    ],
    evitar: [
      "Pagar publicidad antes de que la oferta y el destino de los clics estén resueltos.",
      "Repartir un presupuesto pequeño entre cinco canales: ninguno alcanza masa crítica.",
      "Contratar un servicio mensual sin fecha de evaluación ni criterio de corte.",
    ],
    kpis: [
      "Monto mensual destinado a marketing y porcentaje que efectivamente se ejecutó.",
      "Cantidad de acciones de costo cero sostenidas cada semana.",
      "Retorno estimado del canal pagado, comparando lo invertido con las ventas atribuidas.",
    ],
    soluciones: ["tarjeta", "whatsapp", "google_business", "contenido"],
    tags: ["presupuesto", "etapa", "emprendedor", "estrategia"],
    siguientePaso:
      "Define hoy una cifra mensual realista para marketing, aunque sea mínima, y apártala en una cuenta o sobre separado del dinero del negocio.",
    noAplica:
      "Si tu negocio ya tiene un presupuesto asignado y lo ejecuta con medición, esta pregunta es de control y no un dolor: léela como contexto y revisa más bien el retorno por canal.",
    opciones: [
      {
        value: "cero",
        estado: "contexto",
        diagnostico:
          "Sin inversión no estás bloqueado: existe un camino gratuito y funciona. Consiste en ficha de negocio y reseñas, respuestas rápidas en WhatsApp, seguimiento de los interesados que no compraron y contenido propio publicado con constancia. Lo que sí exige es tiempo y orden, y ese es el recurso que vas a invertir. Cuando el flujo de clientes ya se sostenga, el primer dinero suele rendir más en un solo canal medido que repartido entre varios.",
      },
      {
        value: "bajo",
        estado: "contexto",
        diagnostico:
          "Con una inversión baja el criterio es concentrar, no repartir: un solo canal, con una oferta clara y un destino que convierta antes de poner dinero. Ese monto alcanza para probar, pero no para sostener cinco frentes a la vez, y repartirlo suele dejar la sensación de que nada funcionó. Úsalo primero para amplificar lo que ya da resultado de forma orgánica, y evalúa con una cifra concreta antes de renovar o cortar.",
      },
      {
        value: "medio",
        estado: "contexto",
        diagnostico:
          "Un presupuesto medio permite sostener un canal pagado y, al mismo tiempo, ordenar la casa: oferta, destino de los clics y medición. La prioridad no es gastar más, sino que cada unidad invertida tenga un camino claro hasta la venta; sin eso, el monto se consume en clics que no llegan a ninguna parte. Define el resultado esperado y el plazo de evaluación antes de encender la campaña.",
      },
      {
        value: "alto",
        estado: "contexto",
        diagnostico:
          "Con capacidad de inversión alta el riesgo cambia de naturaleza: ya no es la falta de recursos sino la velocidad. Si el negocio no puede atender ni hacer seguimiento a lo que la publicidad genera, el dinero se pierde en oportunidades mal atendidas. Acondiciona primero la capacidad de respuesta, el destino de los clics y la medición, y después escala el gasto de a un paso por vez, comparando periodos.",
      },
    ],
  },
  {
    id: "quiere_publicidad",
    orden: 24,
    momento: "Estrategia",
    pregunta: "¿Has pensado en pagar publicidad?",
    porQue: "Determinamos si es momento o quemarías dinero.",
    factorId: "conversion",
    modo: "valor",
    queMedimos:
      "Medimos si el negocio está pensando en pagar publicidad y si ese paso corresponde ahora. La pregunta ubica el momento: pautar antes de tener la conversión resuelta quema presupuesto, y pautar después multiplica lo que ya está funcionando.",
    causas: [
      "La publicidad se percibe como la solución rápida a la falta de ventas, sin revisar antes si la oferta y el destino convierten.",
      "Se vio a un competidor pautar y se asumió que ahí está el motivo de su éxito.",
      "El negocio ya probó y no funcionó, pero el problema estaba en la página de destino o en la falta de seguimiento.",
      "No hay claridad sobre cuánto cuesta conseguir un cliente, así que la publicidad parece un gasto sin retorno.",
    ],
    efectos: [
      "Pagar tráfico hacia una oferta confusa o un destino que no convierte multiplica las visitas sin multiplicar las ventas.",
      "El presupuesto se agota en la etapa de prueba y se concluye que la publicidad no sirve para ese negocio.",
      "Llegan consultas que el negocio no alcanza a atender y se pierden, con lo cual el gasto se lee como pérdida.",
      "Se compite por precio con otros anunciantes y el margen se reduce.",
    ],
    senales: [
      "Piensas en publicidad porque las ventas bajaron, sin saber en qué punto del recorrido se pierde la gente.",
      "Tu perfil o tu página recibe visitas y no genera consultas ni compras.",
      "Nadie responde los mensajes en minutos ni hace seguimiento de quien no compró.",
      "No tienes una cifra de cuánto puedes pagar por conseguir un cliente.",
    ],
    practicas: [
      "Antes de pautar, arregla la conversión: oferta en una frase clara, un solo llamado a la acción y un destino simple donde la persona pueda avanzar.",
      "Asegura la capacidad de respuesta: mensajes contestados en minutos y un seguimiento definido para quien no compra.",
      "Define cuánto vale un cliente para el negocio y cuánto estás dispuesto a invertir por conseguirlo.",
      "Empieza con un solo canal, un público acotado y un presupuesto de prueba con plazo de evaluación.",
      "Mide origen y resultado: qué anuncio trajo consultas y cuántas terminaron en venta.",
    ],
    evitar: [
      "Pautar con la esperanza de que la publicidad arregle una oferta que no se entiende.",
      "Enviar el tráfico pagado al perfil general o al inicio de la web en lugar de a un destino preparado para esa promesa.",
      "Escalar el presupuesto antes de saber cuál es el resultado por unidad invertida.",
    ],
    kpis: [
      "Costo por consulta conseguida en el canal pagado.",
      "Porcentaje de consultas pagadas que se convierten en venta.",
      "Contactos y ventas del canal orgánico, para comparar contra lo pagado.",
    ],
    soluciones: ["publicidad", "landing", "remarketing", "analitica"],
    tags: ["publicidad", "conversion", "landing", "presupuesto"],
    siguientePaso:
      "Antes de encender cualquier anuncio, abre tu landing o tu perfil en el teléfono, recórrelo como si fueras cliente y corrige el punto donde tú mismo dudarías qué hacer.",
    noAplica:
      "Si tu negocio crece solo con referidos y ya no da abasto con la demanda actual, la publicidad no es la prioridad: primero amplía la capacidad de atención o ajusta el precio antes de traer más gente.",
    opciones: [
      {
        value: "si",
        estado: "alerta",
        diagnostico:
          "Estás pensando en pagar publicidad y esa decisión puede ser buena o cara, según el orden en que la hagas. La regla es simple: primero una oferta que se entienda y un destino que convierta, después el tráfico pago. Pautar sin landing ni oferta validada quema presupuesto y además deja la falsa conclusión de que la publicidad no funciona. Si la conversión y el seguimiento ya están resueltos, entonces sí: empieza con un solo canal, presupuesto de prueba y medición definida.",
      },
      {
        value: "no",
        estado: "contexto",
        diagnostico:
          "No pagar publicidad es una decisión válida, y para muchas etapas es la correcta. El camino orgánico primero consiste en ficha de negocio y reseñas, contenido propio publicado con constancia, respuestas rápidas y seguimiento de los interesados que no compraron. Ese trabajo construye activos que no se apagan cuando dejas de pagar. Cuando el flujo orgánico ya se sostenga y la conversión esté resuelta, podrás evaluar si la publicidad amplifica algo que funciona.",
      },
    ],
  },
];
