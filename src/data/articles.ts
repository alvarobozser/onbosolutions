export interface Article {
  slug: string
  category: string
  title: string
  excerpt: string
  readTime: string
  sections: { heading?: string; paragraphs: string[] }[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'agentes-ia-que-hacen-y-cuando-usarlos',
    category: 'Agentes de IA',
    title: 'Agentes de IA: qué hacen, qué no hacen y cuándo tiene sentido usarlos',
    excerpt: 'No son robots, no son magia y no lo hacen todo solos. Esto es lo que hace realmente un agente de IA y en qué casos le saca partido una empresa como la tuya.',
    readTime: '5 min',
    sections: [
      {
        paragraphs: [
          'Un agente de IA es un programa que puede percibir su entorno, tomar decisiones y ejecutar acciones para alcanzar un objetivo. A diferencia de un chatbot —que solo responde preguntas— un agente actúa: busca información, redacta un correo, actualiza una hoja de cálculo, llama a una API externa.',
          'La clave es que lo hace solo, sin que tengas que estar presente en cada paso.',
        ],
      },
      {
        heading: '¿En qué se diferencia de la IA que ya conozco?',
        paragraphs: [
          'Herramientas como ChatGPT son conversacionales: tú preguntas, ellas responden. Un agente va más allá: recibe un objetivo ("clasifica todos los correos de clientes de esta semana y resume los que requieren respuesta urgente") y lo ejecuta de principio a fin.',
          'Puede combinar varias herramientas —tu correo, tu CRM, tu hoja de cálculo— sin que tú intervengas en cada paso.',
        ],
      },
      {
        heading: '¿Qué puede hacer por una empresa como la tuya?',
        paragraphs: [
          'Los casos más habituales que vemos en pymes y empresas medianas: automatizar el seguimiento de presupuestos, clasificar y priorizar incidencias de soporte, generar informes semanales a partir de datos dispersos, o responder preguntas frecuentes de clientes con información actualizada de tu propio sistema.',
          'No se trata de tecnología futurista. Se trata de eliminar las tareas repetitivas que hoy hace una persona —o que simplemente no se hacen porque no hay tiempo.',
        ],
      },
      {
        heading: '¿Cuándo tiene sentido implantarlo?',
        paragraphs: [
          'Tiene sentido cuando hay una tarea que se repite con frecuencia, que sigue un patrón claro y que consume tiempo de personas que deberían estar haciendo otras cosas. Si la tarea es única o muy creativa, el agente no añade valor.',
          'Lo que más nos encontramos: empresas que llevan años haciendo algo manualmente porque "siempre se ha hecho así", sin pararse a pensar que se podría automatizar en semanas.',
        ],
      },
      {
        heading: 'El siguiente paso',
        paragraphs: [
          'No hace falta implementarlo todo de golpe. Empieza por identificar una tarea concreta que consuma tiempo real. Si quieres una valoración honesta de si tu caso encaja, cuéntanos tu situación y te decimos qué es viable y qué no.',
        ],
      },
    ],
  },
  {
    slug: 'automatizar-sin-saber-programar',
    category: 'Automatización',
    title: 'Automatizar sin saber programar: cómo empezar en una empresa que no es tech',
    excerpt: 'No hace falta un equipo técnico para dar el primer paso. El secreto está en elegir bien el proceso, no en la tecnología.',
    readTime: '4 min',
    sections: [
      {
        paragraphs: [
          'La automatización tiene mala fama: suena cara, complicada y lenta. En la práctica, los proyectos que mejor funcionan son los más acotados. No los más ambiciosos.',
        ],
      },
      {
        heading: 'El error más común',
        paragraphs: [
          'Querer automatizarlo todo a la vez. Una empresa que intenta digitalizar diez procesos simultáneamente acaba sin mejorar ninguno. El foco es lo que marca la diferencia.',
          'El punto de partida correcto no es "¿qué podríamos automatizar?" sino "¿qué tarea específica consume más horas de mi equipo cada semana?".',
        ],
      },
      {
        heading: 'Cómo identificar el proceso adecuado',
        paragraphs: [
          'Busca tareas que cumplan tres condiciones: se repiten con frecuencia (al menos semanalmente), siguen un patrón predecible (no requieren juicio humano en cada caso) y su resultado es verificable (puedes saber si se hizo bien o mal).',
          'Ejemplos típicos: enviar un correo de confirmación cuando llega un pedido, pasar datos de un formulario web a una hoja de cálculo, generar un PDF con los datos de una factura.',
        ],
      },
      {
        heading: 'El criterio para priorizar',
        paragraphs: [
          'Multiplica la frecuencia de la tarea por el tiempo que consume cada vez. El proceso con mayor producto es tu primera candidatura. Luego evalúa el riesgo: empieza por tareas donde un error no sea catastrófico.',
          'Con ese criterio, la mayoría de empresas tiene un proceso claro que automatizar en menos de una hora de análisis.',
        ],
      },
      {
        heading: 'Lo que pasa después',
        paragraphs: [
          'Cuando el primer proceso funciona solo, el equipo lo ve. Deja de ser una promesa y se convierte en algo concreto. Eso genera confianza para el siguiente paso.',
          'No es un proyecto de transformación digital. Es una tarea menos que hacer a mano. Empieza por ahí.',
        ],
      },
    ],
  },
  {
    slug: 'herramienta-generica-o-software-propio',
    category: 'Software a medida',
    title: 'Herramienta genérica o software propio: cómo elegir sin equivocarte',
    excerpt: 'Hay empresas que llevan años pagando suscripciones que no encajan. Y otras que construyeron algo a medida cuando no hacía falta. El criterio para no caer en ninguno de los dos errores.',
    readTime: '6 min',
    sections: [
      {
        paragraphs: [
          'Esta es una de las preguntas que más nos hacen. Y la respuesta honesta es: depende. Hay casos claros para cada opción, y confundirlos sale caro.',
        ],
      },
      {
        heading: 'Cuándo el SaaS es la respuesta correcta',
        paragraphs: [
          'Si tu necesidad es estándar —facturación, gestión de proyectos, comunicación interna, CRM básico— un SaaS ya resuelto es casi siempre mejor opción. Está listo, tiene soporte, y el coste es predecible.',
          'Forzar software a medida para algo que Notion, HubSpot o cualquier herramienta consolidada ya resuelve bien es tirar dinero. No lo hagas.',
        ],
      },
      {
        heading: 'Cuándo el SaaS empieza a ser el problema',
        paragraphs: [
          'El SaaS genérico te limita cuando tu proceso no encaja en sus moldes. Cuando llevas meses adaptando cómo trabaja tu empresa para que encaje con la herramienta, en lugar de al revés. Cuando exportas datos a Excel cada semana porque la herramienta no hace el informe que necesitas. Cuando pagas por funcionalidades que nunca usas y te faltan las que sí necesitas.',
          'En esos casos, el coste real del SaaS no es la suscripción mensual. Es el tiempo perdido, los errores de datos y la fricción constante.',
        ],
      },
      {
        heading: 'Las señales que indican que necesitas algo a medida',
        paragraphs: [
          'Tu proceso tiene reglas propias que ninguna herramienta genérica contempla. Necesitas integrar varios sistemas que no hablan entre sí. Tu equipo ha construido un ecosistema de hojas de cálculo para compensar lo que la herramienta no hace. O tienes datos sensibles que no quieres en servidores de terceros.',
        ],
      },
      {
        heading: 'El criterio práctico',
        paragraphs: [
          'Pregúntate: ¿estoy adaptando mi negocio a la herramienta, o la herramienta a mi negocio? Si la respuesta es lo primero, y ese proceso es importante, merece la pena evaluar una solución a medida.',
          'No es una decisión de capricho técnico. Es una decisión de negocio: ¿cuánto te cuesta la fricción actual comparado con lo que costaría resolverla bien?',
        ],
      },
    ],
  },
  {
    slug: 'tres-preguntas-antes-de-integrar-ia',
    category: 'IA para empresas',
    title: 'Antes de integrar IA en tu empresa, responde estas tres preguntas',
    excerpt: '¿Datos ordenados? ¿Procesos definidos? ¿El equipo va a usarlo? Si alguna respuesta es no, hay trabajo previo más rentable que la IA. Te lo explicamos sin rodeos.',
    readTime: '5 min',
    sections: [
      {
        paragraphs: [
          'Integrar IA sin las condiciones mínimas es como instalar un motor de Formula 1 en un coche sin frenos. El potencial está, pero el resultado no es bueno.',
          'Antes de hablar de tecnología, hay tres preguntas que vale la pena responder con honestidad.',
        ],
      },
      {
        heading: '1. ¿Tienes datos utilizables?',
        paragraphs: [
          'La IA necesita datos para funcionar. No necesariamente millones de registros, pero sí datos estructurados, consistentes y accesibles. Si tus datos viven en correos, PDFs dispersos o en la cabeza de una persona, el primer trabajo es organizarlos, no implementar IA.',
          'Una señal de que estás listo: puedes responder preguntas básicas sobre tu negocio (¿cuántos clientes has tenido este trimestre?, ¿qué producto tiene más incidencias?) consultando un sistema, no preguntando a alguien.',
        ],
      },
      {
        heading: '2. ¿Tienes procesos definidos?',
        paragraphs: [
          'La IA automatiza procesos. Si el proceso no está definido, la IA no lo define por ti: lo perpetúa con más velocidad. Un proceso mal documentado o que varía según quién lo ejecute es un mal candidato para automatizar.',
          'El mejor punto de partida es un proceso que ya funciona bien manualmente pero consume demasiado tiempo.',
        ],
      },
      {
        heading: '3. ¿Va a usarlo el equipo?',
        paragraphs: [
          'El fracaso más habitual en proyectos de IA no es técnico. Es la falta de adopción. Si el equipo no entiende qué hace la herramienta, no confía en ella o siente que la reemplaza, no la usará.',
          'La tecnología más sofisticada no sirve de nada si nadie la incorpora a su día a día. Involucrar al equipo desde el principio —en la definición del problema, no solo en el despliegue— cambia el resultado.',
        ],
      },
      {
        heading: 'Lo que esto significa en práctica',
        paragraphs: [
          'Si las tres respuestas son positivas, tienes una base sólida para empezar. Si alguna falla, el trabajo previo es la inversión más rentable que puedes hacer antes de hablar de IA.',
          'No es un retraso. Es lo que separa los proyectos que funcionan de los que se abandonan a los seis meses.',
        ],
      },
    ],
  },
  {
    slug: 'tareas-que-roban-tiempo-en-tu-empresa',
    category: 'Automatización',
    title: 'Las tareas que más tiempo roban en cualquier empresa (y cómo dejar de hacerlas a mano)',
    excerpt: 'No hace falta reinventar nada. Hay cinco tipos de tarea que aparecen en casi todas las empresas y que se pueden eliminar con tecnología accesible.',
    readTime: '4 min',
    sections: [
      {
        paragraphs: [
          'No hay que reinventar nada. Estos cinco procesos aparecen en casi cualquier empresa y se automatizan con tecnología accesible. Si reconoces alguno, tienes trabajo concreto por delante.',
        ],
      },
      {
        heading: '1. Confirmaciones y seguimiento de correo',
        paragraphs: [
          'Enviar un correo de confirmación cuando llega un pedido, una solicitud o un formulario. Mandar un recordatorio automático si no hay respuesta en X días. Escala sin esfuerzo y elimina el "¿le habremos respondido?".',
        ],
      },
      {
        heading: '2. Informes periódicos',
        paragraphs: [
          'El informe de ventas del lunes, el resumen de incidencias del viernes, el estado del inventario a fin de mes. Si alguien los hace a mano cada semana, se pueden generar solos con los datos que ya tienes en tus sistemas.',
        ],
      },
      {
        heading: '3. Clasificación de solicitudes entrantes',
        paragraphs: [
          'Correos de clientes, formularios de contacto, tickets de soporte. Clasificarlos manualmente consume tiempo y genera inconsistencias. Un sistema que los categoriza y prioriza automáticamente libera horas reales cada semana.',
        ],
      },
      {
        heading: '4. Sincronización entre sistemas',
        paragraphs: [
          'Copiar datos de un sistema a otro: del formulario web al CRM, de la hoja de cálculo a la base de datos, del pedido a la factura. Si alguien lo hace a mano de forma rutinaria, es un candidato claro para automatizar.',
        ],
      },
      {
        heading: '5. Notificaciones internas',
        paragraphs: [
          'Avisar al equipo cuando pasa algo: un pedido supera cierto importe, un cliente lleva X días sin actividad, un indicador sale del rango normal. En lugar de revisar dashboards manualmente, la información llega sola a quien debe actuar.',
          'El denominador común: todos estos procesos siguen reglas claras y se repiten con frecuencia. Eso los hace automatizables sin complicaciones técnicas.',
        ],
      },
    ],
  },
  {
    slug: 'por-que-fracasan-los-proyectos-de-ia',
    category: 'IA para empresas',
    title: 'Por qué fracasan los proyectos de IA (y cómo no caer en los mismos errores)',
    excerpt: 'La mayoría de proyectos de IA que no funcionan no fallaron por la tecnología. Fallaron antes de arrancar. Estos son los patrones que vemos una y otra vez.',
    readTime: '7 min',
    sections: [
      {
        paragraphs: [
          'Hay mucho ruido alrededor de la IA. Promesas de transformación inmediata, casos de éxito de grandes corporaciones, herramientas que "lo hacen todo". La realidad en pymes y empresas medianas es más matizada.',
          'Esto es lo que no suele aparecer en los artículos de prensa.',
        ],
      },
      {
        heading: 'La mayoría de fracasos no son técnicos',
        paragraphs: [
          'Cuando un proyecto de IA no funciona, rara vez es porque la tecnología falle. Lo más habitual: los datos estaban más desordenados de lo que parecía, el proceso que se quería automatizar no estaba suficientemente definido, o el equipo nunca adoptó la herramienta porque no entendía qué hacía.',
          'Estos son problemas organizativos, no tecnológicos. Y se detectan antes de escribir una sola línea de código si alguien se toma el tiempo de preguntar.',
        ],
      },
      {
        heading: 'El piloto que nunca escala',
        paragraphs: [
          'Muchas empresas hacen un piloto que funciona bien. Resuelve un problema concreto, el equipo lo usa, los resultados son visibles. Y ahí se queda. Nunca escala al resto de la organización.',
          'La razón habitual: el piloto se hizo en un silo, sin conectar con los procesos del resto de la empresa. Cuando quieres expandirlo, las dependencias y las resistencias lo frenan.',
        ],
      },
      {
        heading: 'La expectativa de automatización total',
        paragraphs: [
          'La IA no elimina el criterio humano. Reduce el trabajo repetitivo y acelera decisiones, pero en la mayoría de los casos prácticos hay un punto donde una persona tiene que revisar, validar o decidir.',
          'Esperar que la IA lo resuelva todo sola, sin intervención humana, lleva a proyectos sobredimensionados que tardan meses en desplegarse y que cuando lo hacen, no funcionan como se esperaba.',
        ],
      },
      {
        heading: 'Lo que sí funciona',
        paragraphs: [
          'Proyectos acotados con un objetivo medible. Un proceso, un resultado concreto, un plazo razonable. Cuando el equipo ve que funciona, la confianza se construye sola y el siguiente paso es más fácil.',
          'No es falta de ambición. Es la forma más eficaz de llegar lejos: paso a paso, con cada paso bien asentado.',
        ],
      },
      {
        heading: 'La pregunta que vale la pena hacerse',
        paragraphs: [
          '¿Estás implementando IA porque resuelve un problema real que tienes hoy, o porque sientes que deberías hacerlo? Las dos pueden llevar a proyectos, pero solo la primera lleva a resultados.',
          'Si tienes un problema concreto, cuéntanoslo. Si no lo tienes todavía, no pasa nada. Mejor esperarlo que forzarlo.',
        ],
      },
    ],
  },
]
