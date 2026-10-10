import type { DolorDef } from "../dolores";

// Parte 2 · "Descubrimiento" + "Confianza" + "Ventas": de dónde vienen los
// clientes, cómo se comporta el motor comercial, con quién se compite, cuánta
// prueba social existe y por dónde se cierra. Orden canónico 9–16.
export const P2: DolorDef[] = [
  {
    id: "origen_clientes",
    orden: 9,
    momento: "Descubrimiento",
    pregunta: "¿Cómo llegan hoy nuevos clientes a tu negocio?",
    porQue: "Si dependen de conocidos, el flujo no es escalable.",
    factorId: "captacion",
    modo: "array",
    claveArray: "origen_clientes",
    queMedimos:
      "Mide de qué fuentes dependen tus clientes nuevos, no cuántos son. Saber si el flujo nace de la confianza de conocidos, del paso de gente por tu local o de canales digitales define qué sistema de captación necesitas construir primero.",
    causas: [
      "El negocio creció por recomendación: los primeros clientes llegaron de la red personal y nunca hizo falta un canal propio.",
      "No existe una acción diaria o semanal destinada a conseguir clientes nuevos; el flujo llega solo o no llega.",
      "El negocio está en un punto con buen paso de gente, así que el propio local hace de canal de captación.",
      "Se probaron canales digitales sin constancia ni medición, se abandonaron y quedó únicamente lo que ya funcionaba."
    ],
    efectos: [
      "El ingreso depende de factores que no controlas: que te recomienden, que pase gente o que la zona siga igual.",
      "Cuando la fuente se seca no hay un plan alterno activo ni claridad sobre a quién avisar.",
      "El crecimiento queda limitado por el tamaño de tu red personal, no por la demanda real del mercado.",
      "Todo el negocio queda atado a tu presencia física: cerrar unos días o mudarse golpea las ventas sin aviso."
    ],
    senales: [
      "Puedes nombrar de memoria a casi todos los clientes nuevos de las últimas semanas.",
      "Cuando un mes baja la facturación, la explicación suele ser que nadie recomendó nada.",
      "No hay lista, ficha ni registro donde se anote de dónde vino cada cliente.",
      "En el local, los ingresos siguen el ritmo del paso de gente: feriados, clima o temporada."
    ],
    practicas: [
      "Pregunta a cada cliente nuevo cómo te encontró y anótalo en una ficha simple; sin ese dato todo lo demás es intuición.",
      "Separa los orígenes en dos grupos: los que dependen de terceros o del azar y los que tú activas con una acción propia.",
      "Elige un canal propio y sostenlo con una rutina fija antes de sumar un segundo canal.",
      "Ordena el voz a voz: define el momento exacto después de la venta en que pides el referido y qué entregas a quien recomienda.",
      "Revisa cada mes cuántos contactos nuevos llegaron por canal y qué pasó con ellos."
    ],
    evitar: [
      "Sumar canales nuevos sin saber todavía de dónde vienen tus clientes actuales: refuerzas el desorden, no la captación.",
      "Confundir estar presente con captar: tener perfil abierto no significa que llegue gente nueva.",
      "Pagar publicidad cuando el origen es solo conocidos y la oferta aún no está clara; el pago amplifica lo que ya existe, incluida la confusión."
    ],
    kpis: [
      "Contactos nuevos por mes, separados por canal de origen.",
      "Porcentaje de clientes nuevos que llegan por un canal que tú activas, frente a los que dependen de la recomendación o del paso de gente.",
      "Contactos nuevos con origen anotado, sobre el total de clientes nuevos del mes."
    ],
    soluciones: ["google_business", "landing", "embudo", "whatsapp"],
    tags: ["captacion", "visibilidad", "estrategia"],
    siguientePaso:
      "Abre hoy una libreta o una hoja de cálculo con tres columnas (fecha, cliente, cómo te encontró) y úsala en cada venta de esta semana.",
    opciones: [
      {
        value: "ninguno",
        estado: "critico",
        diagnostico:
          "Casi no llegan clientes nuevos: vives de la cartera que ya tenías y de la recompra. Es el freno más grave del diagnóstico, porque sin entradas el negocio solo puede encogerse, aunque la operación sea buena. La prioridad no es publicidad ni rediseño: es abrir un canal de captación, uno, y sostenerlo. Mientras no exista, cualquier inversión en marca se queda sin personas que la vean."
      },
      {
        value: "solo_conocidos",
        estado: "alerta",
        diagnostico:
          "Tu flujo descansa en conocidos, voz a voz y referidos. Es prueba de que haces bien el trabajo, pero se trata de un canal prestado: depende de que otros hablen de ti y se apaga cuando dejas de estar presente. La ventaja es que ya tienes reputación; el trabajo es convertirla en un sistema que pida y ordene esos referidos, y abrir un canal propio en paralelo. Sin ese paso el crecimiento tiene techo: el tamaño de tu red."
      },
      {
        value: "local",
        estado: "contexto",
        diagnostico:
          "Tu captación viene del tráfico peatonal, del paso de gente por tu local o tu zona. Es un dato neutro: hay flujo real y eso vale, pero no lo controlas, no es replicable en otro punto y no escala más allá del horario y la ubicación. Sirve como base, no como estrategia. Lo urgente es capturar ese tráfico para que quien entra deje un contacto, y sumar un canal digital que siga trabajando cuando el local está cerrado."
      },
      {
        value: "digital",
        estado: "bien",
        diagnostico:
          "Llegan clientes nuevos por Google o por redes sociales: tienes un canal propio que no depende de tu red personal. Es una buena señal de captación. Ahora conviene saber cuál de los dos pesa más y si el flujo es constante o en picos, porque de eso depende dónde poner el esfuerzo. El siguiente nivel es que ese tráfico llegue a una oferta clara y quede registrado, en lugar de perderse entre conversaciones."
      },
      {
        value: "mixto",
        estado: "bien",
        diagnostico:
          "Combinas referidos con canales digitales: una posición sólida, porque repartes el riesgo entre lo que otros dicen de ti y lo que tú activas. El cuidado está en el orden: si los referidos siguen siendo la mayor parte, el negocio aún depende de terceros. Mantén los dos motores, mide cuál trae clientes que realmente compran y evita que el digital sea solo vitrina sin contactos."
      }
    ]
  },
  {
    id: "flujo",
    orden: 10,
    momento: "Descubrimiento",
    pregunta: "¿Cómo describirías tu flujo de personas interesadas?",
    porQue: "Medimos el motor comercial.",
    factorId: "conversion",
    modo: "valor",
    queMedimos:
      "Mide el comportamiento del motor comercial: cuánta gente interesada entra y con qué regularidad. No es lo mismo un flujo que gotea, uno que sube y baja sin control y otro que se puede anticipar, porque cada caso pide una decisión distinta.",
    causas: [
      "No hay una actividad de captación programada; el flujo depende de la temporada, del ánimo o de la suerte.",
      "Se atiende todo lo que llega, pero nadie alimenta la entrada, así que el volumen solo se mueve cuando algo externo lo empuja.",
      "La oferta cambia con frecuencia o nunca se comunicó con claridad, y el mercado no sabe cuándo ni por qué acudir a ti.",
      "Hubo un pico por una promoción, un video o una recomendación puntual y, al terminar, nada sostuvo el ritmo."
    ],
    efectos: [
      "Planificar se vuelve imposible: no sabes cuánto vas a vender, cuánto comprar ni a quién contratar.",
      "En los meses flojos se recurre a descuentos de urgencia, que enseñan al cliente a esperar rebajas.",
      "Se pierden oportunidades buenas porque, cuando llega el volumen, no hay capacidad ni orden para atenderlas.",
      "El equipo vive en montaña rusa: saturado una semana y ocioso la siguiente, con desgaste y errores en la atención."
    ],
    senales: [
      "No puedes anticipar el mes que viene con un mínimo de confianza.",
      "Las decisiones se toman reaccionando a lo que pasó, no preparando lo que viene.",
      "Hay semanas en que no alcanzas a responder a todos y otras en que no hay nada que hacer.",
      "No existe un registro de cuántos interesados entraron por mes; la sensación reemplaza al dato."
    ],
    practicas: [
      "Cuenta los interesados nuevos por mes, aunque sea a mano; sin línea base no puedes saber si mejoras.",
      "Anota de dónde vino cada interesado y qué pasó con él, para distinguir falta de entrada de falta de seguimiento.",
      "Fija una rutina mínima y repetible de captación semanal y protégela en la agenda como cualquier otra obligación.",
      "Ataca primero las fugas del proceso: quien llega y no recibe respuesta rápida es una entrada que ya habías ganado.",
      "Con el flujo más estable, recién ahí sube el volumen con publicidad o alianzas."
    ],
    evitar: [
      "Tapar la irregularidad con descuentos cada vez que baja el mes; terminan siendo el motivo por el que te compran.",
      "Invertir en publicidad para arreglar un flujo irregular mientras los interesados que ya llegan se pierden por falta de respuesta.",
      "Confundir visitas o seguidores con un flujo comercial real y medir solo esas cifras."
    ],
    kpis: [
      "Interesados nuevos por mes y su variación frente al mes anterior.",
      "Porcentaje de interesados que recibe respuesta el mismo día.",
      "Semanas del mes con actividad de captación efectivamente realizada."
    ],
    soluciones: ["embudo", "analitica", "crm"],
    tags: ["captacion", "embudo", "estrategia"],
    siguientePaso:
      "Cuenta esta semana, en una hoja, cuántas personas interesadas nuevas entraron y cuántas recibieron respuesta; ese número es tu punto de partida.",
    opciones: [
      {
        value: "muy_bajo",
        estado: "critico",
        diagnostico:
          "El motor comercial está prácticamente apagado: casi no entra gente interesada nueva y lo que sostiene la caja es la cartera existente. Es la prioridad número uno del diagnóstico, por encima de la marca, la web o el diseño, porque sin entradas ninguna otra mejora tiene sobre qué operar. Empieza por lo que ya controlas: una acción de captación repetible y respuesta inmediata a quien te busque. Y antes de pagar tráfico, asegúrate de atender bien al poco que llega."
      },
      {
        value: "irregular",
        estado: "alerta",
        diagnostico:
          "Entra gente, pero sin ritmo: picos y valles que no puedes anticipar. El problema no suele ser la falta de demanda, sino la falta de una rutina de captación sostenida. Es una posición recuperable, porque ya sabes que hay mercado para ti; falta convertir acciones sueltas en un hábito semanal medible. Mientras el flujo siga siendo una montaña rusa, planificar compras, personal o inversión seguirá siendo adivinar."
      },
      {
        value: "estable",
        estado: "bien",
        diagnostico:
          "El flujo es constante y predecible: entra gente de forma regular y eso te permite planificar y sostener la operación. Es una buena base, aunque estable no significa suficiente: un flujo constante que no crece tiene techo. El trabajo ahora es exprimir lo que ya entra (respuesta, seguimiento, conversión) antes de buscar más volumen. Cuando esas fugas estén cerradas, subir el caudal con publicidad o alianzas tendrá sentido y se podrá medir."
      },
      {
        value: "creciendo",
        estado: "bien",
        diagnostico:
          "El número de interesados viene en aumento: lo que haces está funcionando y el mercado responde. El riesgo en esta etapa es la capacidad: crecer en entradas sin orden en la atención genera clientes mal atendidos y reputación dañada. Documenta lo que estás haciendo bien para poder repetirlo y sistematiza o delega la respuesta. Si vas a invertir para acelerar, hazlo sobre lo que ya convierte y no sobre lo que aún no mides."
      }
    ]
  },
  {
    id: "nivel",
    orden: 11,
    momento: "Descubrimiento",
    pregunta: "¿Cuál es tu nivel actual en marketing digital?",
    porQue: "No es lo mismo partir de cero que auditar campañas activas.",
    factorId: "conversion",
    modo: "valor",
    queMedimos:
      "Mide tu punto de partida en marketing digital: desde no tener presencia hasta operar campañas activas. El dato ordena las acciones, porque lo que sirve en un nivel puede ser un desperdicio de tiempo y presupuesto en otro.",
    causas: [
      "El negocio se construyó en el mundo físico y el canal digital nunca fue necesario para vender.",
      "Se abrieron perfiles por obligación o por imitación, sin una oferta ni un objetivo detrás.",
      "Hubo ventas digitales por casualidad o por recomendación, sin un proceso que las vuelva a producir.",
      "Se contrató publicidad o se compró una herramienta antes de tener oferta y medición, y quedó abandonada."
    ],
    efectos: [
      "Se invierte tiempo y dinero en tácticas de un nivel que no es el tuyo, no se ve retorno y se pierde la motivación para insistir.",
      "Sin presencia digital, la venta depende por completo de tu tiempo y de tu presencia física.",
      "Con redes que no venden, se acumula esfuerzo sin contactos ni ingresos medibles.",
      "Con campañas activas sin medición, el presupuesto se reparte por intuición y no sabes qué funciona."
    ],
    senales: [
      "Cuando alguien te busca en Google por tu nombre o por tu servicio, no encuentra nada útil.",
      "Publicas con cierta frecuencia y aun así casi nadie escribe ni pregunta precios.",
      "Tienes campañas o herramientas abiertas y no podrías decir cuál trae clientes.",
      "La venta se cierra siempre con tu intervención personal, sin importar de dónde venga el interesado."
    ],
    practicas: [
      "Ubícate con honestidad en un solo nivel y trabaja ese antes de saltar al siguiente.",
      "En nivel cero: ficha de negocio con datos correctos, contacto directo y oferta escrita en una frase.",
      "Con redes que no venden: revisa bio, destacados y llamado a la acción, y publica contenido que responda dudas de compra.",
      "Si ya vendes online: ordena el proceso de respuesta, seguimiento y registro de pedidos para no depender de tu memoria.",
      "Con campañas activas: instala medición, define un objetivo por campaña y apaga lo que no trae contactos."
    ],
    evitar: [
      "Comprar publicidad para compensar la falta de oferta clara: acelera el gasto, no las ventas.",
      "Saltar a herramientas avanzadas cuando todavía no hay un solo canal que traiga clientes de forma repetible.",
      "Copiar la estrategia de un negocio de otro nivel o de otro sector sin revisar si aplica a tu punto de partida."
    ],
    kpis: [
      "Contactos o pedidos digitales por mes.",
      "Origen del último cliente nuevo, para ver si el canal digital ya participa.",
      "Acciones digitales activas con un responsable y una medición asignada."
    ],
    soluciones: ["google_business", "web", "contenido", "analitica"],
    tags: ["etapa", "web", "contenido", "estrategia"],
    siguientePaso:
      "Escribe hoy en una frase qué vendes, a quién y cuál es el siguiente paso que quieres que dé un interesado; esa frase es tu punto de partida, estés en el nivel que estés.",
    noAplica:
      "Esta lectura pierde sentido si tu negocio vive de un canal físico regulado o de una cartera cerrada por contrato y no buscas demanda digital; en ese caso, tu nivel digital es contexto y no una carencia que haya que corregir.",
    opciones: [
      {
        value: "cero",
        estado: "critico",
        diagnostico:
          "Hoy no tienes presencia digital que trabaje por ti: quien te busca no te encuentra y quien te encuentra no tiene claro cómo comprarte. No es una condena, es un punto de partida, y suele ser el más rápido de mejorar porque casi todo está por hacer. Empieza por lo mínimo: ficha de negocio con datos correctos, un contacto directo y tu oferta escrita en una frase. Sin ese piso, ninguna táctica más avanzada va a rendir."
      },
      {
        value: "redes_sin_ventas",
        estado: "alerta",
        diagnostico:
          "Tienes perfiles y publicas, pero eso no se traduce en ventas: hay esfuerzo sin retorno y la sensación de hablarle a nadie. Casi siempre el problema no es la cantidad de contenido, sino que falta oferta clara, un llamado a la acción y una ruta simple para comprar. Es un nivel con ventaja, porque ya tienes audiencia y ya sabes producir. Antes de sumar canales, ordena la bio, define qué quieres que haga la gente y facilita el contacto."
      },
      {
        value: "vendo",
        estado: "bien",
        diagnostico:
          "Ya vendes por canales digitales: tienes algo que funciona y demanda comprobada, que es lo más difícil de conseguir. El riesgo ahora es que todo pase por tus manos y por tu memoria. Ordena lo que ya funciona: registra pedidos y conversaciones, responde rápido y de forma consistente, y repite lo que trajo esas ventas. Con esa base estable, sumar tráfico pagado o contenido tiene sentido y se puede medir."
      },
      {
        value: "campanas",
        estado: "bien",
        diagnostico:
          "Operas campañas activas: estás invirtiendo para conseguir demanda, lo que indica intención de escalar. El punto crítico es la medición, porque con campañas sin datos claros es imposible saber qué funciona y qué solo consume presupuesto. Revisa que cada campaña tenga un objetivo definido, una página de destino con una sola acción y analítica instalada. Y confirma que la conversión del tráfico que ya llegaba estaba resuelta antes de subir el gasto."
      }
    ]
  },
  {
    id: "competencia",
    orden: 12,
    momento: "Descubrimiento",
    pregunta: "¿Tienes competidores claros?",
    porQue: "Saber contra quién compites revela tu ventaja.",
    factorId: "competencia",
    modo: "valor",
    queMedimos:
      "Mide si sabes contra quién compites realmente. Identificarlos revela con qué te comparan tus clientes, en qué eres distinto y dónde estás cediendo ventas sin darte cuenta.",
    causas: [
      "El negocio nunca hizo el ejercicio de mirar el mercado: se concentró en operar el día a día.",
      "Se compite por cercanía o por precio sin haber analizado las alternativas que el cliente realmente considera.",
      "El mercado es amplio y el cliente elige entre opciones muy distintas, incluidas la de no comprar nada o resolverlo por su cuenta.",
      "Se da por hecho que no hay competencia porque nadie hace exactamente lo mismo que tú."
    ],
    efectos: [
      "Se compite por precio sin necesidad, cediendo margen frente a opciones que ni siquiera eran comparables.",
      "Se copian tácticas visibles de otros sin entender su contexto ni su público.",
      "Se comunica una oferta genérica que sirve para cualquiera y por eso no convence a nadie en particular.",
      "Se descubre tarde que otra opción ya ocupó el espacio o el mensaje que podrías haber reclamado."
    ],
    senales: [
      "Los clientes te mencionan opciones, precios o marcas que no tenías en el radar.",
      "No puedes explicar en una frase por qué te eligen a ti y no a la alternativa que traía el cliente.",
      "Te enteras de promociones o lanzamientos de otros por un cliente, no por tu propio seguimiento.",
      "Cuando alguien dice que tu precio es alto, no tienes una respuesta preparada más allá del descuento."
    ],
    practicas: [
      "Lista las alternativas reales que considera tu cliente, incluidas no comprar, resolverlo solo o esperar.",
      "Revisa cómo se presentan esas alternativas y qué prometen, sin copiarlas.",
      "Anota de boca de tus propios clientes por qué te eligieron y por qué dudaron.",
      "Define una diferencia que sea cierta, comprobable y relevante para tu cliente, y úsala en tu oferta y tu comunicación.",
      "Revisa esa lista cada temporada: el mercado cambia y tu ventaja también."
    ],
    evitar: [
      "Bajar precios como primera respuesta a la competencia: enseña a tus clientes a compararte solo por precio.",
      "Copiar el mensaje o el contenido de otro negocio sin su contexto, su público y su capacidad de sostenerlo.",
      "Dar por hecho que no tienes competencia porque nadie ofrece exactamente tu servicio."
    ],
    kpis: [
      "Alternativas identificadas y con seguimiento activo.",
      "Motivos de elección mencionados por clientes nuevos, registrados por escrito.",
      "Ventas perdidas por precio frente a las perdidas por cualquier otra razón."
    ],
    soluciones: ["contenido", "landing", "analitica", "publicidad"],
    tags: ["competencia", "oferta", "estrategia"],
    siguientePaso:
      "Pregunta hoy a tus últimos tres clientes por qué te eligieron y qué otra opción evaluaron; escribe las respuestas tal como te las dieron.",
    noAplica:
      "Si compites en un mercado regulado o por licitación, donde la comparación se define por requisitos formales, este análisis cambia de forma; revisa primero las reglas de tu sector antes de invertir en diferenciación de marca.",
    opciones: [
      {
        value: "si",
        estado: "bien",
        diagnostico:
          "Tienes claros a tus competidores: sabes con quién te comparan y eso te da una base sólida para diferenciarte. Aprovéchala: revisa qué prometen ellos y qué no cubren bien, y usa ese hueco en tu oferta. El error a evitar es convertir la competencia en obsesión y terminar copiando sus tácticas en lugar de reforzar tu propia ventaja. Documenta la comparación para que no dependa de tu memoria."
      },
      {
        value: "no_directos",
        estado: "contexto",
        diagnostico:
          "No identificas competidores directos, y eso puede significar dos cosas muy distintas: que estás en un espacio poco atendido, o que no has mirado con suficiente detalle. El dato es neutro hasta resolverlo, así que no lo celebres todavía. Busca las alternativas que tu cliente evalúa en la práctica, aunque no se parezcan a ti. Si confirmas que el espacio está libre, es una oportunidad: reclama el mensaje antes de que otro lo haga."
      },
      {
        value: "no_se",
        estado: "alerta",
        diagnostico:
          "No tienes certeza de con quién compites, y esa falta de claridad afecta directamente cómo comunicas tu oferta. Cuando no sabes contra qué te comparan, es fácil competir por precio o hablar de características que al cliente no le importan. Resuélvelo con la fuente más barata y confiable que tienes: tus propios clientes. Con esa información podrás definir una diferencia real y dejar de adivinar."
      }
    ]
  },
  {
    id: "frecuencia",
    orden: 13,
    momento: "Confianza",
    pregunta: "¿Cada cuánto publicas contenido?",
    porQue: "La constancia construye autoridad.",
    factorId: "redes_sociales",
    modo: "valor",
    queMedimos:
      "Mide la constancia con que publicas contenido, no la cantidad ni la calidad en abstracto. La frecuencia es la señal más visible de que el negocio está activo y sostiene su mensaje en el tiempo.",
    causas: [
      "No hay plan ni calendario: se publica cuando aparece una idea o cuando sobra tiempo.",
      "Cada pieza se produce desde cero y el esfuerzo de crear agota las ganas de seguir.",
      "Se espera a tener algo perfecto antes de publicar, y esa espera se convierte en silencio.",
      "Nadie tiene asignada la tarea de contenido, así que siempre pierde frente a lo urgente."
    ],
    efectos: [
      "La audiencia se enfría: quien te seguía deja de verte y el esfuerzo anterior pierde valor.",
      "El negocio parece inactivo o cerrado a quien llega nuevo a tus perfiles.",
      "Se cede autoridad frente a quien publica con regularidad, aunque tu trabajo sea mejor.",
      "Cada regreso implica empezar de nuevo, en lugar de construir sobre lo ya publicado."
    ],
    senales: [
      "En tus perfiles, la última publicación tiene semanas o meses.",
      "Publicas varias cosas el mismo día y luego desapareces por semanas.",
      "Cada vez que te dispones a publicar empiezas por pensar qué subir, sin nada preparado.",
      "Recibes mensajes preguntando si sigues atendiendo o si el negocio está abierto."
    ],
    practicas: [
      "Define una frecuencia que puedas sostener en tus peores semanas, no en las mejores.",
      "Arma un calendario simple por semana y deja los temas definidos por adelantado.",
      "Trabaja por pilares: educar, probar con casos o resultados reales y ofrecer algo concreto.",
      "Produce en tandas: graba o escribe varias piezas en una sola sesión y prográmalas.",
      "Reutiliza: una idea central puede vivir en varios formatos y canales sin inventar nada nuevo."
    ],
    evitar: [
      "Comprometerte con publicar a diario cuando no tienes tiempo ni material, y abandonar a las dos semanas.",
      "Publicar solo cuando hay promoción o descuento: el perfil se convierte en un catálogo de rebajas.",
      "Perseguir tendencias sin relación con tu oferta solo por conseguir alcance."
    ],
    kpis: [
      "Publicaciones por semana frente a la frecuencia que te comprometiste a sostener.",
      "Semanas consecutivas sin interrupción de la rutina.",
      "Conversaciones o contactos iniciados desde el contenido."
    ],
    soluciones: ["contenido", "instagram", "tiktok", "facebook"],
    tags: ["contenido", "redes_sociales", "instagram"],
    siguientePaso:
      "Elige hoy un día y una hora fijos de la semana para publicar, anótalo en el calendario con tres temas concretos y cumple la primera fecha.",
    noAplica:
      "No aplica si tu negocio no vende por canales donde el contenido influya y tus clientes llegan por contrato, licitación o cartera cerrada; en ese caso la frecuencia de publicación es contexto, no un indicador de tu salud comercial.",
    opciones: [
      {
        value: "diario",
        estado: "bien",
        diagnostico:
          "Publicas casi a diario: la constancia está resuelta y eso se nota en reconocimiento y familiaridad con tu audiencia. Vigila el otro extremo: publicar mucho sin dirección convierte el perfil en ruido y desgasta al equipo. Revisa si esas piezas responden a lo que tu cliente necesita saber antes de comprar y si alguna conduce a una acción concreta. Bajar un poco el ritmo para subir la intención suele rendir más que mantener el volumen."
      },
      {
        value: "semanal",
        estado: "bien",
        diagnostico:
          "Publicas con regularidad semanal: es una frecuencia sostenible y suficiente para mantenerte presente y construir autoridad de a poco. La clave es que cada pieza tenga un propósito y que la rutina no dependa de la inspiración del día. Si un tema funciona, conviértelo en serie en lugar de buscar ideas nuevas cada semana. Y protege la constancia, porque interrumpirla cuesta más que mantenerla."
      },
      {
        value: "aveces",
        estado: "alerta",
        diagnostico:
          "Publicas de forma intermitente: apareces, desapareces y vuelves a empezar. El problema no es la falta de ideas ni de capacidad, sino la ausencia de una rutina, así que cada publicación compite con lo urgente y pierde. Esa intermitencia también confunde a tu audiencia, que no sabe cuándo volver a mirarte. Elige una frecuencia baja pero fija y cúmplela antes de intentar publicar más."
      },
      {
        value: "nunca",
        estado: "critico",
        diagnostico:
          "No publicas contenido, así que tu presencia digital no comunica nada: el negocio parece inactivo y pierdes la construcción de confianza que ocurre antes de la compra. No significa que debas convertirte en creador de contenido; significa que necesitas un mínimo de señal de vida y de valor. Empieza por una pieza simple a la semana, enfocada en dudas reales de tus clientes. Si no vas a sostenerlo, es más honesto elegir un solo canal y hacerlo bien que abrir cinco y abandonarlos."
      }
    ]
  },
  {
    id: "resenas",
    orden: 14,
    momento: "Confianza",
    pregunta: "¿Qué pasa cuando alguien busca opiniones de tu negocio?",
    porQue: "Sin prueba social, el tráfico no convierte.",
    factorId: "confianza",
    modo: "valor",
    queMedimos:
      "Mide la prueba social disponible cuando alguien te evalúa: qué encuentran sobre tu negocio en opiniones y reseñas. Es el dato que confirma o desmiente lo que promete tu oferta, justo en el momento de decidir.",
    causas: [
      "Nunca se pidió la reseña: el cliente satisfecho se va contento y no deja rastro público.",
      "No hay un momento definido después de la venta para solicitarla, así que queda a la buena voluntad.",
      "Las quejas no se respondieron a tiempo y quedaron visibles sin contexto ni solución.",
      "El negocio es nuevo o de poco volumen, y la ausencia de reseñas se lee como desconfianza."
    ],
    efectos: [
      "El tráfico que ya llega duda y te compara con negocios mejor valorados, aunque tu servicio sea igual o mejor.",
      "Una queja sin respuesta pesa más que varias opiniones positivas, porque el visitante la lee como confirmación.",
      "Se paga por atraer gente a una ficha o un perfil que no genera confianza suficiente para convertir.",
      "Se pierde el efecto de la reputación en la visibilidad local y en la decisión de contactarte."
    ],
    senales: [
      "Clientes contentos te lo dicen en persona o por chat, pero nunca aparecen en las opiniones públicas.",
      "Hay comentarios negativos sin responder desde hace semanas o meses.",
      "Alguien te pregunta si eres confiable o pide referencias antes de comprar.",
      "No existe un enlace directo ni un paso claro para dejar la reseña."
    ],
    practicas: [
      "Define el momento exacto después de la venta en que pides la reseña, cuando el cliente acaba de recibir el valor.",
      "Facilita el camino: un enlace directo a tu ficha y una frase corta que explique cómo hacerlo.",
      "Pide a todos los clientes, no solo a los que sabes contentos, y nunca ofrezcas nada a cambio.",
      "Responde todas las reseñas: agradece las buenas con algo específico y atiende las malas con una solución concreta.",
      "Cuando una queja revela un fallo de operación, corrígelo antes de buscar más volumen de gente."
    ],
    evitar: [
      "Comprar reseñas o incentivar opiniones falsas: va contra las políticas de Google y Meta y puede costarte la ficha o la cuenta.",
      "Pedir opiniones solo a los clientes contentos o filtrar a los insatisfechos: además del riesgo de sanción, deja el problema de fondo intacto.",
      "Discutir o justificarte en público con un cliente molesto; responde con hechos y ofrece resolver por un canal privado."
    ],
    kpis: [
      "Reseñas nuevas por mes.",
      "Calificación promedio y su tendencia.",
      "Porcentaje de reseñas, buenas y malas, que tienen respuesta del negocio."
    ],
    soluciones: ["resenas", "google_business", "crm", "automatizacion"],
    tags: ["resenas", "reputacion", "confianza", "compliance"],
    siguientePaso:
      "Escribe hoy el mensaje que enviarás después de cada venta para pedir la reseña, con el enlace directo a tu ficha, y envíalo al próximo cliente que atiendas.",
    opciones: [
      {
        value: "muchas_buenas",
        estado: "bien",
        diagnostico:
          "Tienes muchas opiniones positivas: es uno de los activos más rentables y más difíciles de conseguir, porque convence sin que tengas que intervenir. El reto ya no es lograr prueba social, sino mantenerla: sigue pidiendo reseñas a cada cliente y respondiendo todas, incluidas las buenas. Una ficha activa y con respuestas recientes transmite que el negocio está vivo y pendiente del cliente."
      },
      {
        value: "pocas",
        estado: "alerta",
        diagnostico:
          "Tienes pocas reseñas: hay señales de confianza, pero insuficientes para sostener una decisión frente a alternativas mejor evaluadas. Casi siempre es un problema de proceso y no de calidad, porque nunca se pidió de forma sistemática. Define el momento posterior a la venta y entrega el enlace directo, pidiendo a todos los clientes por igual. Con constancia, un volumen pequeño de opiniones se convierte en una base sólida."
      },
      {
        value: "ninguna",
        estado: "critico",
        diagnostico:
          "No hay opiniones públicas sobre tu negocio: quien te busca antes de comprar no encuentra prueba social y esa ausencia se interpreta como riesgo. Es una desventaja frente a competidores mejor valorados, incluso si tu servicio es mejor. La solución depende de ti y es simple: pedir la reseña en el momento correcto y facilitar el enlace. Empieza con los clientes recientes que ya tuvieron una buena experiencia y a quienes puedes escribirles hoy."
      },
      {
        value: "malas",
        estado: "critico",
        diagnostico:
          "Hay quejas visibles sobre tu negocio, y eso pesa más que cualquier campaña o rediseño, porque el visitante las lee como confirmación de un riesgo. Antes de atraer más gente, corrige la operación que originó esas quejas y responde cada una en público con hechos, sin discutir y ofreciendo una solución concreta. No compres reseñas ni pidas solo a los clientes contentos: además de ir contra las políticas de Google y Meta, deja el problema de fondo intacto y puede costarte la ficha o la cuenta. Con la operación corregida, vuelve a pedir opiniones a todos por igual y deja que las reseñas recientes cuenten la historia."
      }
    ]
  },
  {
    id: "oferta_clara",
    orden: 15,
    momento: "Ventas",
    pregunta:
      "Si un extraño ve tu oferta 5 segundos, ¿entiende qué ofreces y qué hacer?",
    porQue: "La oferta confusa mata la conversión.",
    factorId: "oferta",
    modo: "valor",
    queMedimos:
      "Mide si tu oferta se entiende en segundos: qué vendes, para quién y qué debe hacer el interesado. Es la prueba más rápida de si tu comunicación convierte o solo describe lo que haces.",
    causas: [
      "La oferta se armó por acumulación: cada servicio nuevo se agregó sin revisar el conjunto.",
      "Se comunica desde las características y el proceso interno, no desde el resultado que busca el cliente.",
      "Se intenta hablarle a varios públicos a la vez para no descartar a nadie y el mensaje se diluye.",
      "Hay varias acciones posibles (llamar, escribir, visitar, comprar) y ninguna destaca sobre las demás."
    ],
    efectos: [
      "El tráfico que ya llega se va sin contactar porque no entiende qué le ofreces ni qué hacer.",
      "Cada conversación empieza desde cero explicando lo básico, lo que consume tiempo y desgasta al equipo.",
      "Llegan consultas de personas que no son tu cliente y se descuidan las que sí lo son.",
      "La publicidad y el contenido rinden menos, porque la claridad de la oferta limita cuánto convierte el mismo tráfico."
    ],
    senales: [
      "Tienes que explicar tu negocio cada vez que alguien pregunta a qué te dedicas.",
      "Los clientes piden algo distinto a lo que ofreces o llegan con expectativas equivocadas.",
      "Preguntan el precio antes de entender el servicio, o preguntan qué incluye.",
      "Tu portada, bio o ficha enumeran servicios sin decir cuál es el siguiente paso."
    ],
    practicas: [
      "Escribe en una frase qué vendes, para quién y qué resultado obtiene el cliente.",
      "Elige un destinatario principal y deja fuera, por ahora, a los secundarios.",
      "Define una sola acción como siguiente paso y hazla visible en cada punto de contacto.",
      "Añade la prueba que respalde tu promesa: casos, resultados reales, opiniones o fotos del trabajo.",
      "Prueba la claridad con alguien ajeno al negocio: si no entiende qué haces en pocos segundos, la oferta todavía no está lista."
    ],
    evitar: [
      "Publicar una oferta que solo tú entiendes porque usas el lenguaje interno de tu sector.",
      "Anunciar descuentos para compensar la confusión: bajas el margen sin resolver el problema de comprensión.",
      "Sumar servicios para no perder ninguna oportunidad, hasta que el mensaje deja de significar algo."
    ],
    kpis: [
      "Contactos o consultas calificadas por cada cien visitas a tu perfil, ficha o página.",
      "Consultas fuera de tu oferta, sobre el total de consultas recibidas.",
      "Tiempo que tarda un cliente nuevo en entender qué ofreces, medido en conversaciones reales."
    ],
    soluciones: ["landing", "contenido", "web", "catalogo"],
    tags: ["oferta", "conversion", "landing", "estrategia"],
    siguientePaso:
      "Muestra hoy tu perfil, ficha o página a alguien que no conozca tu negocio y pídele que repita en voz alta qué vendes y qué haría a continuación.",
    noAplica:
      "Si vendes por licitación o por un catálogo cerrado donde las condiciones ya las define el comprador, la claridad de la oferta se juega en otro terreno; revisa esos requisitos antes de reescribir tu mensaje.",
    opciones: [
      {
        value: "si",
        estado: "bien",
        diagnostico:
          "Un extraño entiende tu oferta en segundos: sabe qué vendes, para quién y qué debe hacer el interesado. Es una ventaja real, porque la misma cantidad de tráfico convierte mejor que en negocios con mensajes confusos. Aprovecha esa claridad para escalar: revisa que cada canal repita la misma promesa y el mismo siguiente paso, sin variantes que confundan. Y actualízala cuando cambie tu servicio, antes de que la oferta quede desfasada."
      },
      {
        value: "maso",
        estado: "alerta",
        diagnostico:
          "Tu oferta se entiende a medias: quien ya te conoce la capta, pero un extraño necesita contexto y tiempo. Esa fricción se paga en contactos perdidos, porque el interesado no suele quedarse a descifrar. Revisa el orden de tu mensaje: primero el resultado que buscas para el cliente y después cómo lo haces. Y deja un solo siguiente paso visible, en lugar de varias opciones que compiten entre sí."
      },
      {
        value: "no",
        estado: "critico",
        diagnostico:
          "Un extraño no entiende qué ofreces ni qué hacer: es el freno más costoso de tu comunicación, porque desperdicia todo el tráfico que ya llega. No es un problema de diseño ni de presupuesto, sino de claridad: falta decir qué vendes, para quién y cuál es el siguiente paso. Reescribe tu mensaje en una frase con esas tres piezas y ponlo en cada punto de contacto. Antes de pagar publicidad o rediseñar, resuelve esto."
      }
    ]
  },
  {
    id: "cierre",
    orden: 16,
    momento: "Ventas",
    pregunta: "¿Por dónde cierras la mayoría de tus ventas?",
    porQue: "Cada canal de cierre pide un guion y herramientas distintas.",
    factorId: "proceso_comercial",
    modo: "valor",
    queMedimos:
      "Mide por dónde se cierran la mayoría de tus ventas y, con eso, qué herramientas y qué guion necesita tu proceso comercial. Cada canal tiene su propia fricción y su propia forma de perder al interesado.",
    causas: [
      "El canal de cierre se eligió por costumbre o comodidad, no por lo que prefiere el cliente.",
      "Se atienden varios canales a la vez sin guion ni respuestas preparadas para ninguno.",
      "El equipo improvisa cada conversación porque no hay materiales de apoyo ni pasos definidos.",
      "El proceso nunca se documentó: si la persona que cierra no está, la venta se detiene."
    ],
    efectos: [
      "Se pierden ventas en el tramo final, justo cuando el interesado ya estaba decidido.",
      "El tiempo de respuesta se alarga y el interés se enfría mientras el mensaje espera.",
      "Cada persona cierra con su propio método, así que el resultado no se puede repetir ni mejorar.",
      "Sin registro de las conversaciones no hay forma de saber en qué punto se cae la venta."
    ],
    senales: [
      "Respondes una y otra vez las mismas preguntas desde cero, sin material preparado.",
      "Hay conversaciones iniciadas que quedan sin respuesta o sin seguimiento durante días.",
      "Los clientes preguntan algo que ya está escrito en tu perfil o en tu web.",
      "Dependes de una sola persona para cerrar y, cuando falta, las ventas se detienen."
    ],
    practicas: [
      "Escribe el guion del canal que más usas, con las preguntas frecuentes y las respuestas exactas.",
      "Prepara los materiales de apoyo que ese canal necesita antes de la conversación, no durante.",
      "Define el siguiente paso de cada conversación y el plazo en que se ejecuta el seguimiento.",
      "Registra cada interesado con su estado, para que el seguimiento no dependa de tu memoria.",
      "Revisa el canal donde más ventas se pierden y corrige ese eslabón antes de abrir uno nuevo."
    ],
    evitar: [
      "Abrir canales nuevos de cierre sin haber ordenado el que ya te trae la mayoría de las ventas.",
      "Dejar conversaciones sin seguimiento porque el cliente no respondió al primer intento.",
      "Improvisar un descuento como cierre cuando el cliente duda; resuelve la duda y mantén el precio."
    ],
    kpis: [
      "Tasa de cierre del canal principal: conversaciones que terminan en venta.",
      "Tiempo entre el primer contacto del interesado y la respuesta del negocio.",
      "Conversaciones con seguimiento registrado, sobre el total de conversaciones abiertas."
    ],
    soluciones: ["whatsapp", "crm", "catalogo", "landing"],
    tags: ["proceso_comercial", "seguimiento", "conversion", "whatsapp"],
    siguientePaso:
      "Escribe hoy el guion completo del canal por donde cierras más: apertura, tres preguntas clave, respuesta a la objeción de precio y siguiente paso con plazo.",
    noAplica:
      "Si tus ventas se cierran por contrato marco, distribuidor o marketplace, donde el comprador define el proceso, el guion cambia de dueño; revisa las reglas de ese canal antes de rediseñar el tuyo.",
    opciones: [
      {
        value: "whatsapp",
        estado: "bien",
        diagnostico:
          "Cierras por WhatsApp, el canal más directo y con mayor respuesta cuando está bien armado. Necesita catálogo actualizado con fotos y precios, respuestas rápidas guardadas para las preguntas de siempre y un guion de chat que conduzca a la decisión en lugar de dejar la conversación abierta. Cuida dos cosas: el tiempo de respuesta, porque el interés se enfría rápido, y el registro de cada conversación, para que el seguimiento no dependa de recordar el chat."
      },
      {
        value: "llamada",
        estado: "bien",
        diagnostico:
          "Cierras por teléfono: un canal consultivo, donde puedes detectar la necesidad real y resolver objeciones en el momento. Para que rinda necesita una agenda clara, un guion con las preguntas que califican al interesado y un cierre definido, no una charla que termina sin siguiente paso. Antes de llamar, ten a mano precios, disponibilidad y condiciones para no dejar dudas abiertas. Y al colgar, confirma por escrito lo acordado."
      },
      {
        value: "zoom",
        estado: "contexto",
        diagnostico:
          "Cierras por videollamada, algo típico de servicios de ticket medio o alto donde hay que explicar antes de vender. Este canal vive de la preparación: una presentación ordenada, una propuesta escrita que el cliente pueda revisar después y un siguiente paso acordado al terminar. Sin esos elementos, la reunión queda como una conversación agradable que no avanza. Envía la propuesta el mismo día y agenda el seguimiento antes de que el interés se enfríe."
      },
      {
        value: "web",
        estado: "bien",
        diagnostico:
          "Cierras con compra automática en tu web: es el canal con más potencial de escalar, porque no depende de tu tiempo. Exige una landing con un solo llamado a la acción, medios de pago funcionando sin fricción y analítica instalada para ver dónde se abandona el proceso. Cada paso extra entre el interés y el pago es una venta que se cae. Revisa también que las políticas de envío, cambios y devoluciones estén visibles, porque su ausencia frena la compra."
      },
      {
        value: "dm",
        estado: "alerta",
        diagnostico:
          "Cierras por mensajes directos de Instagram o Facebook: un canal con mucha intención pero frágil, porque depende de tu presencia y de la bandeja de entrada. Necesita respuestas guardadas para las preguntas repetidas y una bio que filtre y aclare a quién sirves, para no gastar el día en consultas que no aplican. El riesgo mayor es el desorden: mensajes sin etiquetar, conversaciones olvidadas y seguimientos que nunca llegan. Define un horario para revisar la bandeja y registra cada interesado con su estado."
      },
      {
        value: "presencial",
        estado: "contexto",
        diagnostico:
          "Cierras en el local o en visitas cara a cara: es el canal con más confianza y el que menos depende de la tecnología, pero también el que más tiempo consume. Necesita material de apoyo para mostrar y dejar, un registro de cada visita, seguimiento posterior por escrito y un momento definido para pedir la reseña. Lo que no se registra en el momento se pierde al día siguiente. Con esos pasos, el contacto presencial se vuelve un canal repetible y no una conversación suelta."
      }
    ]
  }
];
