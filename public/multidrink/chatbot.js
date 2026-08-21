const knowledgeBase = {
  product: {
    name: 'MultyDrink',
    description: 'Bebida antioxidante 100% natural en sobres de 10g. Contiene Ganoderma Lucidum, Té Negro, Extracto de Uva, Mucílago de Café y Miel de Agave. Registro INVIMA: NSA-0019488-2025.',
    howToUse: 'Disolver un sobre en agua fría o caliente, jugo o smoothie. Dosis sugerida: 3 sobres al día antes de las comidas.',
    calories: '24 kcal por sobre (10g). 72 kcal en 3 sobres.',
    isMedicine: 'No. Es un suplemento dietario de origen natural. No reemplaza consulta ni tratamiento médico.',
    caffeine: 'Contiene baja cafeína del extracto de café y té negro. Menor que una taza de café tradicional.',
    suitableFor: 'Personas que buscan antioxidantes naturales, energía sostenida, salud inmunológica y bienestar general. También para deportistas.',
    whereToBuy: 'A través de la tienda online multy360.com o contactando a un distribuidor autorizado MultyHealth.'
  },
  ingredients: [
    {
      name: 'Ganoderma Lucidum (Reishi)',
      benefits: 'Inmunomodulador, antioxidante, antiinflamatorio. Apoya función inmune y salud cardiovascular.',
      evidence: 'Metaanálisis de 17 RCTs (971 participantes) muestra reducción de BMI y mejora inmunológica. Cochrane Review (5 RCTs, 373 pacientes): 1.27x más respuesta a quimio/radioterapia. PubMed: 17597499, 37048331, 28183232.',
      mechanism: 'β-glucanos y triterpenoides modulan sistema inmune y activan señalización celular.'
    },
    {
      name: 'Té Negro (Teaflavinas)',
      benefits: 'Mejora función cardiovascular, función cognitiva y alerta mental. Efecto ansiolítico.',
      evidence: 'Revisión de 71 ensayos clínicos (2025): mejora significativa de función endotelial y vasodilatación. PubMed: 40008375, 25079225.',
      mechanism: 'Teaflavinas + L-teanina + cafeína en sinergia mejoran flujo vascular y concentración.'
    },
    {
      name: 'Extracto de Uva (Resveratrol)',
      benefits: 'Activa SIRT1 (gen de longevidad), protege endotelio vascular, efecto antienvejecimiento cutáneo.',
      evidence: 'Frontiers in Genetics 2024: SIRT1 activado por resveratrol promueve longevidad en modelos animales. Ensayo clínico (2025): reduce signos de envejecimiento cutáneo en mujeres >40. PubMed: 38784035, 37447275.',
      mechanism: 'Activa sirtuinas dependientes de NAD+, protege ADN del estrés oxidativo.'
    },
    {
      name: 'Mucílago de Café (Ácido Clorogénico)',
      benefits: 'Regula metabolismo de glucosa, mejora sensibilidad a insulina, apoya termogénesis y salud cardiovascular.',
      evidence: 'Revisión sistemática de 94 estudios (Eur J Nutrition 2017). Reduce presión arterial (PubMed 29858625). Mejora sensibilidad a insulina (PubMed 29261010).',
      mechanism: 'Inhibe α-glucosidasa, regula metabolismo de carbohidratos y promueve termogénesis.'
    },
    {
      name: 'Miel de Agave (Inulina)',
      benefits: 'Prebiótico, fibra soluble, aumenta Bifidobacterium, mejora digestión y absorción de minerales.',
      evidence: 'Journal of Nutrition 2015: 5-7.5g inulina de agave/día aumenta 3-4x Bifidobacterium en 21 días. Frontiers in Nutrition 2022: miel tiene capacidad prebiótica documentada.',
      mechanism: 'Fermentación por microbiota produce SCFA (butirato) que nutre colon y reduce inflamación.'
    }
  ],
  orac: {
    perSachet: '1,280 unidades ORAC por sobre (10g)',
    dailyDose: '3,840 unidades ORAC al día (3 sobres)',
    recommendation: 'Cubre la recomendación OMS de 3,000-5,000 unidades ORAC/día',
    comparison: '700% más que la uva, 600% más que el arándano, 500% más que el té verde (por gramo)',
    whatIsORAC: 'Oxygen Radical Absorbance Capacity. Método USDA para medir capacidad antioxidante total.',
    whyImportant: 'El estrés oxidativo está implicado en más de 100 enfermedades crónicas. Los antioxidantes neutralizan radicales libres y protegen las células.'
  },
  healthBenefits: {
    energy: 'Energía Natural: Extracto de café (baja cafeína) + té negro proporcionan energía sostenida sin picos. El magnesio apoya el metabolismo energético.',
    immune: 'Sistema Inmune: β-glucanos de Ganoderma + vitamina C + D3 fortalecen defensas naturales.',
    cardiovascular: 'Salud Cardiovascular: Teaflavinas mejoran función endotelial. Ácido clorogénico regula presión arterial. Potasio y magnesio apoyan ritmo cardíaco.',
    cognitive: 'Función Cognitiva: Teaflavinas + L-teanina mejoran alerta y concentración. Resveratrol protege contra deterioro cognitivo.',
    digestive: 'Salud Digestiva: Inulina de agave (prebiótico) aumenta Bifidobacterium 4x. Fibra soluble regula tránsito intestinal.',
    antiaging: 'Anti-Envejecimiento: Resveratrol activa SIRT1. Polifenoles protegen ADN. Vitamina C y E combaten radicales libres.',
    sports: 'Recuperación Deportiva: Magnesio relaja musculatura. Antioxidantes neutralizan ROS del ejercicio. Deportistas requieren >11,000 unidades ORAC/día.'
  },
  business: {
    company: 'MultyHealth Colombia SAS. Fundada en 2011. 100% colombiana.',
    ceo: 'Dr. Alvaro Guzmán - Premio nacional de investigación, 30+ años en MLM.',
    scientificDirector: 'Dra. Erika Piedrahita - Coach en medicina del estilo de vida (Harvard), especialista en nutrigenómica.',
    factory: 'Propia y libre de deuda.',
    certifications: 'INVIMA NSA-0019488-2025 (Colombia), RGSEAA:01639-02445435 (España).',
    income: '4 formas de ingreso: consumir, vender, recomendar, liderar.',
    affiliation: 'Gratuita. Paquetes de productos para activar bonos.',
    model: 'Marketing multinivel (MLM) con plan de compensación simple, generoso y duplicable.',
    platform: 'Multy360: plataforma educativa, ecommerce, embudos digitales y acompañamiento.',
    isPyramid: 'No. Empresa legítima con 15+ años, registros sanitarios y productos reales. Compensación basada en ventas reales.',
    socialResponsibility: 'Genera ingresos a familias campesinas caficultoras aprovechando residuos orgánicos del café.'
  },
  neurosales: {
    whatIs: 'Las neuroventas estudian cómo el cerebro del cliente procesa información y toma decisiones de compra. El 95% de las decisiones son emocionales (Harvard Business School).',
    brainTriune: 'El cerebro tiene 3 partes: Reptiliano (instinto, acción), Límbico (emoción, confianza), Neocórtex (razón, análisis). Las neuroventas activan primero el reptiliano y límbico antes del racional.',
    keyPrinciples: '1. Familiaridad (repetición genera confianza)\n2. Anclaje (precio de referencia)\n3. Urgencia/escasez\n4. Storytelling (activa oxitocina)\n5. Prueba social (efecto arrastre)\n6. Efecto Halo (atributo positivo generaliza)\n7. Reciprocidad (da valor primero)\n8. Autoridad (respaldo científico)',
    storytelling: 'Las historias activan corteza cerebral y liberan oxitocina. Estructura: Gancho → Problema → Solución → Resultado → Llamado a la acción.',
    applyMLM: 'Usa escasez ("cupo limitado en tu ciudad"), reciprocidad (guía gratis), autoridad (Dr. Álvaro Guzmán, Dra. Erika Piedrahita), y prueba social (testimonios de clientes).'
  },
  mlmMarketing: {
    whatIs: 'MLM o mercadeo en red: vendes productos directamente y construyes un equipo de distribuidores. Diferencia clave con pirámides: el ingreso viene de ventas reales, no de reclutamiento.',
    strategies: '1. Relaciones primero (la gente compra a quien conoce y confía)\n2. Prospección cálida (conocidos) + inbound (contenido de valor)\n3. Embudo: Atracción → Captura → Nutrición → Conversión → Retención → Duplicación\n4. Cierre por alternativa, resumen, urgencia o prueba',
    objections: '"Es caro" → Compara costo/dosis vs valor. "No tengo tiempo" → 30 segundos 3x/día. "Es estafa" → Muestra registros INVIMA. "No sé vender" → No vendes, compartes. El sistema Multy360 te capacita.',
    keyMetrics: 'Tasa de conversión, VVP (ventas personales), VVG (ventas de grupo), retención de clientes, tasa de duplicación del equipo.',
    mistakes: '❌ Prometer riqueza rápida ❌ Solo reclutar sin vender ❌ No hacer seguimiento (80% de ventas ocurre tras el 5to contacto) ❌ No capacitar al equipo ❌ Presionar amigos'
  },
  socialMedia: {
    instagram: 'Red prioritaria para MLM. Usa Reels (favorecidos por el algoritmo). Publica 3-5 Reels/semana, 2-3 Historias/día. Contenido: educativo 80%, promocional 20%.',
    facebook: 'Crea un grupo privado para clientes y equipo. Usa Facebook Live para capacitaciones semanales. Contenido exclusivo para miembros.',
    contentMix: 'Educativo (tips de salud), Inspiracional (tu historia), Entretenido (detrás de cámaras), Social proof (testimonios), Promocional (ofertas).',
    storytelling: 'Estructura: 1. Gancho (3s) 2. Problema (dolor) 3. Solución (MultyDrink) 4. Resultado (transformación) 5. CTA (link en bio, DM)',
    hashtags: '#SaludNatural #Bienestar #Antioxidantes #MultyDrink #SaludCelular #Emprendimiento #NegocioDesdeCasa'
  },
  whatsappOrganic: {
    whyWhatsApp: '90%+ de apertura (vs 20-30% email). 66% de consumidores prefiere comprar en marcas que usan WhatsApp. 3x más conversiones que redes sociales.',
    businessTools: 'Perfil de negocio, catálogo de productos, listas de difusión (256 contactos), etiquetas para segmentar, respuestas rápidas para FAQ.',
    strategy: 'Embudo de conversación: Contacto → Valor gratuito → Detectar interés → Presentar solución → Seguimiento → Cierre → Post-venta. Envía 2-3 tips/semana, no satures.',
    followUp: 'Día 1: Presentación breve. Día 3: Video educativo (3 min). Día 5: Pregunta sobre su situación. Día 7: Invitación a probar 7 días. Día 10: Seguimiento amable.',
    dont: '❌ SPAM masivo sin permiso ❌ Cadenas reenviadas ❌ Ser insistente (>3 msgs sin respuesta) ❌ Info no verificada ❌ Saturar a diario',
    channels: 'Los Canales de WhatsApp permiten difusión ilimitada a suscriptores voluntarios. Ideal para tips diarios de salud y posicionar autoridad.'
  },
  faq: [
    { q: '¿qué es multydrink', a: 'Bebida antioxidante 100% natural en sobres de 10g con 5 ingredientes: Ganoderma Lucidum, Té Negro, Extracto de Uva, Mucílago de Café y Miel de Agave.' },
    { q: '¿cómo se consume', a: 'Disolver un sobre en agua (fría o caliente), jugo o smoothie. Dosis sugerida: 3 sobres al día antes de las comidas.' },
    { q: '¿es un medicamento', a: 'No. Es un suplemento dietario de origen natural. No reemplaza consulta ni tratamiento médico.' },
    { q: '¿tiene cafeína', a: 'Sí, en baja cantidad. Significativamente menor que una taza de café.' },
    { q: '¿cuántas calorías', a: '24 kcal por sobre (10g). Sólo 72 kcal en la dosis diaria de 3 sobres.' },
    { q: '¿qué es orac', a: 'Método para medir capacidad antioxidante. MultyDrink aporta 1,280 unidades ORAC por sobre y 3,840 unidades en 3 sobres.' },
    { q: '¿sirve para deportistas', a: 'Sí. Los antioxidantes neutralizan ROS por ejercicio. El magnesio apoya recuperación muscular y el potasio la hidratación.' },
    { q: '¿tiene efectos secundarios', a: 'No se reportan efectos adversos significativos con el consumo recomendado. Consulte a su médico si tiene condiciones preexistentes.' },
    { q: '¿cuánto cuesta afiliarse', a: 'La afiliación a MultyHealth es gratuita.' },
    { q: '¿cómo ganar dinero', a: '4 formas: consumiendo con descuento, vendiendo directamente, recomendando (bonos por referidos) y liderando equipos (comisiones).' },
    { q: '¿es una estafa piramidal', a: 'No. MultyHealth tiene 15+ años, fábrica propia, registros INVIMA y productos reales. Las compensaciones son por ventas reales, no por reclutamiento.' },
    { q: '¿dónde comprar', a: 'A través de multy360.com o contactando a un distribuidor autorizado MultyHealth.' },
    { q: 'qué son neuroventas', a: 'Ciencia que estudia cómo el cerebro decide comprar. 95% de decisiones son emocionales. Usa principios como anclaje, escasez, storytelling y prueba social para vender más.' },
    { q: 'cómo vender en mlm', a: 'Construye relaciones, no presiones. Usa inbound marketing (contenido de valor), embudo de ventas, y técnica de cierre por alternativa. Capacita a tu equipo para duplicar.' },
    { q: 'qué contenido publicar', a: '80% contenido de valor (educativo, inspiracional, entretenido) y 20% promocional. En Instagram prioriza Reels. En WhatsApp usa tips y testimonios.' },
    { q: 'cómo vender por whatsapp', a: 'Embudo: contacto → valor gratis → detectar interés → presentar solución → seguimiento → cierre. 90%+ de apertura. No hagas SPAM, sé útil primero.' },
    { q: 'cómo manejar objeciones', a: '"Es caro" → costo/dosis. "No tengo tiempo" → 30s. "Es estafa" → INVIMA. "No sé vender" → sistema Multy360. Escucha activa antes de responder.' }
  ]
};

function findAnswer(query) {
  const q = query.toLowerCase().trim();
  const results = [];

  // FAQ exact match
  for (const faq of knowledgeBase.faq) {
    if (q.includes(faq.q.replace('¿', '').replace('?', ''))) {
      return { type: 'answer', text: faq.a };
    }
  }

  // Keyword scoring
  const keywords = {
    ingrediente: 'ingredients',
    componente: 'ingredients',
    ganoderma: 'ingredients',
    reishi: 'ingredients',
    'té negro': 'ingredients',
    resveratrol: 'ingredients',
    uva: 'ingredients',
    cafeína: 'product',
    'ácido clorogénico': 'ingredients',
    inulina: 'ingredients',
    agave: 'ingredients',
    orac: 'orac',
    antioxidante: 'orac',
    energía: 'healthBenefits',
    'salud cardiovascular': 'healthBenefits',
    inmune: 'healthBenefits',
    cognitivo: 'healthBenefits',
    digestivo: 'healthBenefits',
    microbiota: 'healthBenefits',
    envejecimiento: 'healthBenefits',
    longevidad: 'healthBenefits',
    deport: 'healthBenefits',
    negocio: 'business',
    ganar: 'business',
    ingreso: 'business',
    compensación: 'business',
    mlm: 'business',
    multinivel: 'business',
    afiliar: 'business',
    vender: 'business',
    calorías: 'product',
    caloría: 'product',
    consumo: 'product',
    dosis: 'product',
    registro: 'product',
    invima: 'product',
    científico: 'ingredients',
    ciencia: 'ingredients',
    estudio: 'ingredients',
    evidencia: 'ingredients',
    fuente: 'ingredients',
    empresa: 'business',
    multyhealth: 'business',
    multy360: 'business',
    quien: 'business',
    dr: 'business',
    álvaro: 'business',
    guzmán: 'business',
    colombia: 'business',
    neuroventa: 'neurosales',
    neuromarketing: 'neurosales',
    'cerebro triuno': 'neurosales',
    persuasión: 'neurosales',
    persuasivo: 'neurosales',
    storytelling: 'neurosales',
    anclaje: 'neurosales',
    escasez: 'neurosales',
    urgencia: 'neurosales',
    'prueba social': 'neurosales',
    'marketing mlm': 'mlmMarketing',
    'mercadeo en red': 'mlmMarketing',
    'network marketing': 'mlmMarketing',
    prospección: 'mlmMarketing',
    prospeccion: 'mlmMarketing',
    prospecto: 'mlmMarketing',
    cierre: 'mlmMarketing',
    objeciones: 'mlmMarketing',
    objeción: 'mlmMarketing',
    obje: 'mlmMarketing',
    reclutar: 'mlmMarketing',
    duplicación: 'mlmMarketing',
    duplicacion: 'mlmMarketing',
    inbound: 'mlmMarketing',
    'redes sociales': 'socialMedia',
    instagram: 'socialMedia',
    tiktok: 'socialMedia',
    facebook: 'socialMedia',
    contenido: 'socialMedia',
    reels: 'socialMedia',
    publicación: 'socialMedia',
    hashtag: 'socialMedia',
    'whatsapp': 'whatsappOrganic',
    'whatsapp business': 'whatsappOrganic',
    'difusión': 'whatsappOrganic',
    'lista de difusión': 'whatsappOrganic',
    'mensaje masivo': 'whatsappOrganic',
    'canal de whatsapp': 'whatsappOrganic'
  };

  let maxCategory = null;
  let maxScore = 0;
  const scores = {};

  for (const [word, category] of Object.entries(keywords)) {
    if (q.includes(word)) {
      scores[category] = (scores[category] || 0) + 1;
    }
  }

  for (const [cat, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxCategory = cat;
    }
  }

  if (maxCategory === 'ingredients') {
    return { type: 'list', title: '🌿 Ingredientes y sus beneficios:', items: knowledgeBase.ingredients.map(i => ({
      label: i.name,
      text: `${i.benefits}\n📚 ${i.evidence}`
    }))};
  }

  if (maxCategory === 'orac') {
    const o = knowledgeBase.orac;
    return { type: 'answer', text: `📊 Capacidad Antioxidante ORAC:\n\n• ${o.perSachet}\n• ${o.dailyDose}\n• ${o.recommendation}\n• ${o.comparison}\n\n${o.whatIsORAC}\n\n${o.whyImportant}` };
  }

  if (maxCategory === 'healthBenefits') {
    const b = knowledgeBase.healthBenefits;
    const matched = [];
    if (q.includes('energ')) matched.push(b.energy);
    if (q.includes('inmune') || q.includes('defensa')) matched.push(b.immune);
    if (q.includes('cardiovasc') || q.includes('corazón') || q.includes('presión')) matched.push(b.cardiovascular);
    if (q.includes('cognit') || q.includes('mente') || q.includes('concentra')) matched.push(b.cognitive);
    if (q.includes('digesti') || q.includes('microbiota') || q.includes('intest')) matched.push(b.digestive);
    if (q.includes('envej') || q.includes('longev') || q.includes('anti')) matched.push(b.antiaging);
    if (q.includes('deport') || q.includes('ejercicio') || q.includes('recupera')) matched.push(b.sports);
    if (matched.length) return { type: 'answer', text: '✅ Beneficios:\n\n' + matched.join('\n\n') };
    return { type: 'answer', text: '✅ Beneficios de MultyDrink:\n\n' + Object.values(b).join('\n\n') };
  }

  if (maxCategory === 'business') {
    const b = knowledgeBase.business;
    const matched = [];
    if (q.includes('empresa') || q.includes('multyhealth') || q.includes('colombia')) matched.push(`🏢 ${b.company}\nCEO: ${b.ceo}\nDirectora Científica: ${b.scientificDirector}\n${b.factory}\n${b.certifications}`);
    if (q.includes('ganar') || q.includes('ingreso') || q.includes('compensa') || q.includes('mlm')) matched.push(`💰 ${b.model}\n${b.income}\n${b.affiliation}`);
    if (q.includes('pirámide') || q.includes('estafa')) matched.push(`⚠️ ${b.isPyramid}`);
    if (q.includes('social') || q.includes('caficult')) matched.push(`🌱 ${b.socialResponsibility}`);
    if (matched.length) return { type: 'answer', text: matched.join('\n\n') };
    return { type: 'answer', text: `🏢 ${b.company}\n💰 ${b.model}\n${b.income}\n🔗 Plataforma: ${b.platform}` };
  }

  if (maxCategory === 'neurosales') {
    const n = knowledgeBase.neurosales;
    const matched = [];
    if (q.includes('neuroventa') || q.includes('qu')) matched.push(`🧠 ${n.whatIs}`);
    if (q.includes('cerebro') || q.includes('triuno')) matched.push(n.brainTriune);
    if (q.includes('principio') || q.includes('técnica') || q.includes('clave')) matched.push(n.keyPrinciples);
    if (q.includes('storytelling')) matched.push(n.storytelling);
    if (q.includes('mlm') || q.includes('vender') || q.includes('aplica')) matched.push(n.applyMLM);
    if (matched.length) return { type: 'answer', text: matched.join('\n\n') };
    return { type: 'answer', text: `🧠 ${n.whatIs}\n\n${n.keyPrinciples}\n\n💡 Aplicación en MLM: ${n.applyMLM}` };
  }

  if (maxCategory === 'mlmMarketing') {
    const m = knowledgeBase.mlmMarketing;
    const matched = [];
    if (q.includes('qué') || q.includes('mlm') || q.includes('multinivel') || q.includes('network')) matched.push(`📊 ${m.whatIs}`);
    if (q.includes('estrat') || q.includes('técnica') || q.includes('método') || q.includes('prospección')) matched.push(m.strategies);
    if (q.includes('obje') || q.includes('rechazo') || q.includes('excusa')) matched.push(m.objections);
    if (q.includes('métrica') || q.includes('medir') || q.includes('kpi')) matched.push(m.keyMetrics);
    if (q.includes('error') || q.includes('equivoc') || q.includes('evitar')) matched.push(m.mistakes);
    if (matched.length) return { type: 'answer', text: matched.join('\n\n') };
    return { type: 'answer', text: `📊 ${m.whatIs}\n\n📋 ${m.strategies}\n\n❌ ${m.mistakes}` };
  }

  if (maxCategory === 'socialMedia') {
    const s = knowledgeBase.socialMedia;
    const matched = [];
    if (q.includes('instagram') || q.includes('reels')) matched.push(`📸 ${s.instagram}`);
    if (q.includes('facebook')) matched.push(s.facebook);
    if (q.includes('contenido') || q.includes('publicar') || q.includes('qué')) matched.push(s.contentMix);
    if (q.includes('storytelling') || q.includes('historia')) matched.push(s.storytelling);
    if (q.includes('hashtag')) matched.push(s.hashtags);
    if (matched.length) return { type: 'answer', text: matched.join('\n\n') };
    return { type: 'answer', text: `📱 Estrategias en Redes Sociales:\n\n📸 ${s.instagram}\n\n📖 ${s.facebook}\n\n🎯 ${s.contentMix}` };
  }

  if (maxCategory === 'whatsappOrganic') {
    const w = knowledgeBase.whatsappOrganic;
    const matched = [];
    if (q.includes('por qué') || q.includes('importancia') || q.includes('canal')) matched.push(`📱 ${w.whyWhatsApp}`);
    if (q.includes('business') || q.includes('herramienta') || q.includes('etiqueta')) matched.push(w.businessTools);
    if (q.includes('estrat') || q.includes('cómo') || q.includes('vender') || q.includes('embudo')) matched.push(w.strategy);
    if (q.includes('seguimiento') || q.includes('secuencia') || q.includes('día')) matched.push(w.followUp);
    if (q.includes('spam') || q.includes('error') || q.includes('evitar') || q.includes('no hacer')) matched.push(w.dont);
    if (q.includes('canal') || q.includes('difusión')) matched.push(w.channels);
    if (matched.length) return { type: 'answer', text: matched.join('\n\n') };
    return { type: 'answer', text: `📱 WhatsApp para MLM:\n\n${w.whyWhatsApp}\n\n${w.strategy}\n\n${w.dont}` };
  }

  // Default product info
  if (q.includes('qué') || q.includes('multydrink') || q.includes('producto')) {
    return { type: 'answer', text: `🧪 ${knowledgeBase.product.description}\n\n📝 ${knowledgeBase.product.howToUse}\n\n📊 ${knowledgeBase.product.calories}` };
  }

  return null;
}

function addWhatsAppTransfer() {
  const chatBody = document.getElementById('multychat-body');
  if (!chatBody) return;
  const div = document.createElement('div');
  div.className = 'multychat-msg bot';
  const waURL = 'https://wa.me/573115893220?text=' + encodeURIComponent(
    'hola, por favor dame mas informacion referente a la marca, quiero asistir a una reunion virtual, mi nombre es :'
  );
  div.innerHTML = `<div class="msg-content">
    <strong>📞 Serás remitido a un asesor</strong><br><br>
    Un asesor especializado te invitará a conocer más sobre la marca.<br><br>
    <a href="${waURL}" target="_blank" style="display:inline-block;background:#25D366;color:white;padding:12px 24px;border-radius:25px;text-decoration:none;font-weight:700;font-size:0.95rem;">
      💬 Contactar por WhatsApp
    </a>
  </div>`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return '¡Buenos días';
  if (h < 18) return '¡Buenas tardes';
  return '¡Buenas noches';
}

document.addEventListener('DOMContentLoaded', function() {
  const chatbotHTML = `
  <div id="multychat-toggle" class="multychat-toggle">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  </div>
  <div id="multychat-widget" class="multychat-widget">
    <div class="multychat-header">
      <div>
        <div class="multychat-title">🤖 Asistente MultyHealth</div>
        <div class="multychat-status">🟢 Online · Responde en segundos</div>
      </div>
      <button id="multychat-close" class="multychat-close-btn">&times;</button>
    </div>
    <div id="multychat-body" class="multychat-body">
      <div class="multychat-msg bot">
        <div class="msg-content">${getGreeting()}! Soy tu asistente de MultyHealth. Puedo resolver dudas sobre el producto, ciencia, negocio, neuroventas, marketing MLM, redes sociales y WhatsApp.<br><br><strong>Pregúntame:</strong><br>• ¿Qué es MultyDrink?<br>• ¿Qué son neuroventas?<br>• ¿Cómo vender en MLM?<br>• ¿Qué publicar en Instagram?<br>• ¿Cómo vender por WhatsApp?<br>• ¿Qué contiene?</div>
      </div>
    </div>
    <div class="multychat-footer">
      <input type="text" id="multychat-input" placeholder="Escribe tu pregunta..." autocomplete="off">
      <button id="multychat-send" class="multychat-send-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
  </div>
  <div id="multychat-styles"></div>`;

  const style = document.createElement('style');
  style.textContent = `
.multychat-toggle {
  position: fixed; bottom: 24px; right: 24px; width: 60px; height: 60px;
  background: linear-gradient(135deg, #d08f2c, #b87a1f); color: white;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 9999; box-shadow: 0 6px 20px rgba(208,143,44,0.5);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: multychat-pulse 2s infinite;
}
.multychat-toggle:hover { transform: scale(1.1); box-shadow: 0 8px 30px rgba(208,143,44,0.7); }
@keyframes multychat-pulse { 0% { box-shadow: 0 6px 20px rgba(208,143,44,0.5); } 50% { box-shadow: 0 6px 30px rgba(208,143,44,0.8); } 100% { box-shadow: 0 6px 20px rgba(208,143,44,0.5); } }
.multychat-widget {
  position: fixed; bottom: 100px; right: 24px; width: 380px; height: 560px;
  background: white; border-radius: 20px; box-shadow: 0 10px 50px rgba(0,0,0,0.2);
  display: none; flex-direction: column; z-index: 9998; overflow: hidden;
  font-family: 'Outfit', -apple-system, sans-serif;
  border: 1px solid rgba(208,143,44,0.3);
}
.multychat-widget.active { display: flex; }
.multychat-header {
  background: linear-gradient(135deg, #2D6A4F, #1F4E3D); color: white;
  padding: 20px; display: flex; justify-content: space-between; align-items: center;
}
.multychat-title { font-weight: 700; font-size: 1rem; }
.multychat-status { font-size: 0.75rem; opacity: 0.9; margin-top: 4px; }
.multychat-close-btn {
  background: none; border: none; color: white; font-size: 1.8rem;
  cursor: pointer; line-height: 1; padding: 0 4px; opacity: 0.8;
}
.multychat-close-btn:hover { opacity: 1; }
.multychat-body {
  flex: 1; overflow-y: auto; padding: 16px; background: #f8faf9;
  display: flex; flex-direction: column; gap: 12px;
}
.multychat-msg { display: flex; margin-bottom: 4px; }
.multychat-msg.bot { justify-content: flex-start; }
.multychat-msg.user { justify-content: flex-end; }
.msg-content {
  max-width: 85%; padding: 12px 16px; border-radius: 16px;
  font-size: 0.9rem; line-height: 1.5; white-space: pre-wrap;
}
.multychat-msg.bot .msg-content {
  background: white; border: 1px solid rgba(45,106,79,0.15);
  border-bottom-left-radius: 4px; color: #1F4E3D;
}
.multychat-msg.user .msg-content {
  background: linear-gradient(135deg, #2D6A4F, #1F4E3D); color: white;
  border-bottom-right-radius: 4px;
}
.multychat-footer {
  display: flex; padding: 12px 16px; border-top: 1px solid rgba(0,0,0,0.08);
  background: white; gap: 8px;
}
#multychat-input {
  flex: 1; padding: 10px 16px; border: 1px solid rgba(0,0,0,0.12);
  border-radius: 25px; font-size: 0.9rem; outline: none;
  font-family: inherit;
}
#multychat-input:focus { border-color: #d08f2c; box-shadow: 0 0 0 2px rgba(208,143,44,0.15); }
.multychat-send-btn {
  width: 42px; height: 42px; background: #d08f2c; border: none;
  border-radius: 50%; color: white; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s; flex-shrink: 0;
}
.multychat-send-btn:hover { background: #b87a1f; }
.multychat-suggestions {
  display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;
}
.multychat-suggestions button {
  background: rgba(208,143,44,0.1); border: 1px solid rgba(208,143,44,0.25);
  color: #8a6a20; padding: 6px 12px; border-radius: 15px; font-size: 0.78rem;
  cursor: pointer; transition: all 0.2s; font-family: inherit;
}
.multychat-suggestions button:hover {
  background: #d08f2c; color: white; border-color: #d08f2c;
}
.multychat-ingredient-item {
  background: rgba(45,106,79,0.05); border-radius: 10px; padding: 12px;
  margin-bottom: 8px; cursor: pointer; transition: background 0.2s;
  border-left: 3px solid #d08f2c;
}
.multychat-ingredient-item:hover { background: rgba(45,106,79,0.1); }
.multychat-ingredient-item strong { color: #2D6A4F; display: block; margin-bottom: 4px; }
.multychat-ingredient-item span { font-size: 0.82rem; color: #555; }
@media (max-width: 480px) {
  .multychat-widget { width: calc(100vw - 32px); right: 16px; bottom: 90px; height: 500px; }
}
`;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'multychat-container';
  container.innerHTML = chatbotHTML;
  document.body.appendChild(container);

  const toggle = document.getElementById('multychat-toggle');
  const widget = document.getElementById('multychat-widget');
  const closeBtn = document.getElementById('multychat-close');
  const input = document.getElementById('multychat-input');
  const sendBtn = document.getElementById('multychat-send');
  const body = document.getElementById('multychat-body');

  function addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `multychat-msg ${isUser ? 'user' : 'bot'}`;
    const content = document.createElement('div');
    content.className = 'msg-content';

    if (typeof text === 'object' && text.type === 'list') {
      let html = `<strong>${text.title}</strong><br>`;
      text.items.forEach(item => {
        html += `<div class="multychat-ingredient-item"><strong>${item.label}</strong><span>${item.text}</span></div>`;
      });
      content.innerHTML = html;
    } else if (typeof text === 'object' && text.type === 'answer') {
      content.innerHTML = text.text.replace(/\n/g, '<br>');
    } else {
      content.textContent = text;
    }

    div.appendChild(content);
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  async function handleQuery(query) {
    if (!query.trim()) return;
    addMessage(query, true);
    input.value = '';

    const result = findAnswer(query);
    if (result) {
      setTimeout(() => addMessage(result, false), 300);
      return;
    }

    // No está en la base de conocimiento → transferencia a asesor
    setTimeout(() => {
      addMessage('🤝 No tengo más información sobre eso en mi base de conocimientos. Serás remitido a un asesor especializado.', false);
      setTimeout(() => addWhatsAppTransfer(), 500);
    }, 300);
  }

  toggle.addEventListener('click', () => {
    widget.classList.toggle('active');
    if (widget.classList.contains('active')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    widget.classList.remove('active');
  });

  sendBtn.addEventListener('click', () => {
    handleQuery(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleQuery(input.value);
    }
  });

  // Add suggestion chips
  const suggestionsDiv = document.createElement('div');
  suggestionsDiv.className = 'multychat-suggestions';
  const suggestions = ['¿Qué es MultyDrink?', '¿Qué son neuroventas?', '¿Cómo vender en MLM?', '¿Qué subir a Instagram?', '¿Cómo vender por WhatsApp?', '¿Qué contiene?'];
  suggestions.forEach(s => {
    const btn = document.createElement('button');
    btn.textContent = s;
    btn.addEventListener('click', () => handleQuery(s));
    suggestionsDiv.appendChild(btn);
  });
  body.appendChild(suggestionsDiv);
});
