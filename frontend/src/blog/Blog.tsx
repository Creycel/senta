import Menu from "../components/Menu";
import banner from "../media/banner-senta.png"
import "../display/Inicio.css"
export default function Contacto() {

    return (
        <>
            <div className="banner">
                <img src={banner} alt="banner-senta.png" />
            </div>

            <div className="menu">
                <Menu />
            </div>

            <div className="cuerpo-inicio">
                <div>
                    <h1>Sobre SENTA</h1>
                    <p>
                        Es una plataforma para que las empresas y personas con necesidades de desarrollar una idea
                        con la tecnología puedan contratar a profesionales de la informática a través de SENTA.
                        Es una plataforma única y exclusivamente para reclutar a profesionales de la informática.
                    </p>

                    <p>
                        Las empresas tendrán que pagar una suscripción en Senta.
                    </p>

                    <b>Beneficios de la suscripción</b>
                    <ol>
                        <li>Los profesionales serán filtrados (evaluados para verificar que sean personas de alto nivel competitivo en lo que se les requiere).</li>
                        <li>Las evaluaciones serán presenciales y virtuales solo en casos especiales (entrevistas en la plataforma Senta que no les dará la oportunidad de hacer trampa). </li>
                        <b>¿Por que serán virtuales las entrevistas?</b>
                        <ul>
                            <p>
                                Casos verídicos de los que se pueden encontrar evidencias en TikTok, Instagram, etc:
                            </p>
                            <li>Casos verídicos en los que se ven a profesionales full stack engañando a reclutadores del talento humano usando la inteligencia artificial para superar las pruebas.</li>
                            <li>Developers de Norcorea aplicando para trabajos remotos usando filtros faciales para aparentar parecer más occidentales o europeos para así conseguir los empleos.</li>
                        </ul>
                        <li>De manera periódica Senta va a evaluar a los profesionales que les asignó a la empresa.</li>
                        <li>Si las empresas necesitan hacer el cambio de lo análogo a lo digital Senta también puede hacer de eso una realidad.</li>
                        <li>Senta también gestiona el outsourcing.</li>
                    </ol>

                    <details>
                        <summary>Tipos de suscripciones</summary>
                        <ol>
                            <li>Plan A: En Senta se asumirá toda la responsabilidad y supervisión de los procesos hasta completar el periodo de todo el proceso.</li>
                            <li>Plan B: Senta solo va a cumplir con la gestión del talento humano.</li>
                        </ol>
                    </details>

                    <p>
                        Los profesionales informáticos podrán registrarse de manera gratuita en la plataforma,
                        pero su registro; primero se va a verificar por un profesional, el cual va a determinar si puede formar parte de la
                        plataforma si o no.
                    </p>
                </div>
            </div>

            <div className="inicio-pie-pagina">
                <footer className="inicio-pie-pagina">

                    <div className="informacion-contacto">
                        <strong>Información de contacto</strong>
                        <a href="mailto:sentabebo@gmail.com">Correo electrónico</a>
                        <a href="tel:8093426279">Teléfono</a>
                        <a href="#">WhatsApp</a>
                    </div>

                    <div className="accesos-rapidos">
                        <strong>Accesos rápidos</strong>
                        <a href="#">Sobre nosotros</a>
                        <a href="#">Servicios</a>
                        <a href="#">Blog</a>
                        <a href="#">Preguntas frecuentes</a>
                        <a href="#">Contacto</a>
                    </div>

                    <div className="avisos-legales">
                        <strong>Avisos legales</strong>
                        <a href="#">Política de privacidad</a>
                        <a href="#">Términos y condiciones</a>
                        <a href="#">Política de cookies</a>
                        <a href="#">Aviso legal</a>
                    </div>

                    <div className="redes-sociales">
                        <strong>Redes sociales</strong>
                        <a href="https://web.facebook.com/profile.php?id=61578108566666" target="_blank">Facebook</a>
                        <a href="https://www.instagram.com/sentab__/" target="_blank">Instagram</a>
                        <a href="https://www.tiktok.com/@creycel" target="_blank">TikTok</a>
                        <a href="https://www.youtube.com/@creycel" target="_blank">YouTube</a>
                        <a href="https://x.com/sentaB_" target="_blank">X (Twitter)</a>
                        <a href="https://do.linkedin.com/in/creycel-poleon-yan-2b7745231" target="_blank">LinkedIn</a>
                    </div>

                    <p className="copyright">© 2025 Senta. Todos los derechos reservados.</p>

                </footer>
            </div>
        </>
    )
}



