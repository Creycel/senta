import Menu from "../components/Menu";
import banner from "../media/banner-senta.png"
import "../display/Inicio.css"
export default function Contacto() {

    const correo = "sentabebo@gmail.com";
    const asunto = "Contacto desde la página web Senta.com";
    const mensaje = "Hola Senta, necesito más información sobre sus servicios.";

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(correo)}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;

    return (
        <>
            <div className="banner">
                <img src={banner} alt="banner-senta.png" />
            </div>

            <div className="menu">
                <Menu />
            </div>

            <div className="cuerpo-inicio">
                <p>
                    Si como cliente necesitas algo más específico, puedes comunicarte con Senta para explicarnos tus ideas y así nosotros poder hacer realidad tus ideas.
                    Estamos disponibles de lunes a viernes a partir de las 8:00 a.m. hasta las 8:00 p.m.

                    <p>Envíanos un correo a nuestra dirección Gmail:{" "}
                        <strong>
                            <a href={gmailLink} target="_blank" rel="noopener noreferrer">
                                {correo}
                            </a>
                        </strong>
                    </p>
                </p>

            </div>

            <div className="inicio-pie-pagina">
                <footer className="inicio-pie-pagina">

                    <div className="informacion-contacto">
                        <strong>Información de contacto</strong>
                        <a href="mailto:sentabebo@gmail.com">Correo electrónico</a>
                        <a href="tel:+0000000000">Teléfono</a>
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