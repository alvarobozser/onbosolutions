export interface Guia {
  slug: string
  titleEs: string
  titleEn: string
  category: 'ia' | 'backend' | 'arquitectura' | 'financiacion' | 'digital'
  date: string
  pattern: 'chevrons' | 'dots' | 'diagonals' | 'triangles' | 'grid' | 'circles'
}

export const GUIAS: Guia[] = [
  {
    slug: 'rag-en-produccion',
    titleEs: 'Cómo implementar RAG en producción sin morir en el intento',
    titleEn: 'How to implement RAG in production without losing your mind',
    category: 'ia',
    date: '2026-08-01',
    pattern: 'chevrons',
  },
  {
    slug: 'hexagonal-spring-boot',
    titleEs: 'Arquitectura hexagonal en Spring Boot: guía práctica',
    titleEn: 'Hexagonal architecture in Spring Boot: practical guide',
    category: 'backend',
    date: '2026-07-15',
    pattern: 'dots',
  },
  {
    slug: 'ddd-en-5-pasos',
    titleEs: 'DDD aplicado: del dominio al código en 5 pasos',
    titleEn: 'Applied DDD: from domain to code in 5 steps',
    category: 'arquitectura',
    date: '2026-07-01',
    pattern: 'diagonals',
  },
  {
    slug: 'ayudas-next-generation',
    titleEs: 'Cómo acceder a las ayudas Next Generation para tu startup',
    titleEn: 'How to access Next Generation grants for your startup',
    category: 'financiacion',
    date: '2026-06-20',
    pattern: 'triangles',
  },
  {
    slug: 'evaluacion-llm-produccion',
    titleEs: 'Evaluación de modelos LLM en producción: métricas reales',
    titleEn: 'Evaluating LLM models in production: real metrics',
    category: 'ia',
    date: '2026-06-05',
    pattern: 'grid',
  },
  {
    slug: 'kafka-microservicios',
    titleEs: 'Apache Kafka en microservicios: patrones y antipatrones',
    titleEn: 'Apache Kafka in microservices: patterns and anti-patterns',
    category: 'backend',
    date: '2026-05-20',
    pattern: 'circles',
  },
  {
    slug: 'transformacion-digital-pymes',
    titleEs: 'Transformación digital para pymes: por dónde empezar',
    titleEn: 'Digital transformation for SMEs: where to begin',
    category: 'digital',
    date: '2026-05-05',
    pattern: 'chevrons',
  },
  {
    slug: 'api-first-openapi',
    titleEs: 'API-First con OpenAPI: diseña antes de programar',
    titleEn: 'API-First with OpenAPI: design before you code',
    category: 'arquitectura',
    date: '2026-04-15',
    pattern: 'dots',
  },
]

export const CATEGORIES = ['ia', 'backend', 'arquitectura', 'financiacion', 'digital'] as const
export type Category = typeof CATEGORIES[number]
