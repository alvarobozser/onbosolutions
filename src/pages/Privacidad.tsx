import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config/constants'

const LAST_UPDATED = '31 de agosto de 2025'
const COMPANY     = 'ONBO Solutions'
const EMAIL       = CONTACT_EMAIL

export default function Privacidad() {
  return (
    <main className="bg-white">
      <section className="py-20 border-b border-black/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Legal</p>
          <h1 className="text-4xl font-black text-black">Política de Privacidad</h1>
          <p className="mt-3 text-sm text-gray-500">Última actualización: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-custom">

          <Block title="1. Responsable del tratamiento">
            <p>
              El responsable del tratamiento de los datos personales recogidos a través de este sitio web es
              <strong> {COMPANY}</strong>, con dirección de contacto: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </Block>

          <Block title="2. Datos que recogemos">
            <p>A través del formulario de contacto recogemos únicamente los datos que tú nos proporcionas voluntariamente:</p>
            <ul>
              <li>Nombre</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Mensaje libre</li>
            </ul>
            <p>No recogemos datos de navegación, no usamos cookies de seguimiento ni instalamos ningún código de analítica de terceros.</p>
          </Block>

          <Block title="3. Finalidad y base legal">
            <p>
              Los datos se usan exclusivamente para responder a tu consulta y, si así lo acuerdas, para mantener una
              relación comercial. La base legal es el <strong>interés legítimo</strong> en atender solicitudes de
              información (art. 6.1.f RGPD) y, en su caso, la <strong>ejecución de un contrato</strong> (art. 6.1.b RGPD).
            </p>
          </Block>

          <Block title="4. Plazo de conservación">
            <p>
              Conservamos tus datos mientras dure la relación comercial o el tiempo necesario para atender tu consulta.
              Una vez finalizada, los datos se eliminan en un plazo máximo de <strong>3 años</strong>, salvo que la ley
              exija un período distinto.
            </p>
          </Block>

          <Block title="5. Destinatarios">
            <p>
              Los datos se transmiten a <strong>Web3Forms</strong> (web3forms.com), servicio técnico de envío de
              formularios, que actúa como encargado del tratamiento bajo contrato de confidencialidad. No cedemos tus
              datos a terceros con fines comerciales.
            </p>
          </Block>

          <Block title="6. Tus derechos">
            <p>Puedes ejercer en cualquier momento los derechos de:</p>
            <ul>
              <li><strong>Acceso</strong> — saber qué datos tenemos sobre ti</li>
              <li><strong>Rectificación</strong> — corregir datos inexactos</li>
              <li><strong>Supresión</strong> — solicitar el borrado de tus datos</li>
              <li><strong>Limitación</strong> — restringir el tratamiento en ciertos casos</li>
              <li><strong>Portabilidad</strong> — recibir tus datos en formato estructurado</li>
              <li><strong>Oposición</strong> — oponerte al tratamiento basado en interés legítimo</li>
            </ul>
            <p>
              Para ejercerlos escríbenos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Si consideras que tus derechos no
              han sido atendidos, puedes reclamar ante la{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
                Agencia Española de Protección de Datos (AEPD)
              </a>.
            </p>
          </Block>

          <Block title="7. Cookies">
            <p>
              Este sitio web <strong>no utiliza cookies</strong> de analítica ni de seguimiento. No se instala ningún
              código de terceros que identifique o rastree a los visitantes.
            </p>
          </Block>

          <Block title="8. Seguridad">
            <p>
              Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no
              autorizados, pérdida o destrucción accidental, conforme al RGPD y la LOPDGDD.
            </p>
          </Block>

          <Block title="9. Cambios en esta política">
            <p>
              Podemos actualizar esta política cuando sea necesario. La fecha de la última revisión aparece al inicio
              del documento. Te recomendamos revisarla periódicamente.
            </p>
          </Block>

          <div className="mt-12 pt-8 border-t border-black/10">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black border border-black px-5 py-2.5 hover:bg-black hover:text-white transition-colors"
            >
              ← Volver al contacto
            </Link>
          </div>

        </div>
      </section>

      <style>{`
        .prose-custom p  { color: #374151; line-height: 1.75; margin-bottom: 1rem; font-size: 0.9375rem; }
        .prose-custom ul { color: #374151; line-height: 1.75; margin: 0.75rem 0 1rem 1.25rem; list-style: disc; font-size: 0.9375rem; }
        .prose-custom a  { color: #000; text-decoration: underline; text-underline-offset: 3px; }
        .prose-custom a:hover { opacity: 0.7; }
        .prose-custom strong { color: #000; font-weight: 600; }
      `}</style>
    </main>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-black text-black mb-3">{title}</h2>
      {children}
    </div>
  )
}
