import './Menu.css';
import { Link } from "react-router-dom";


// Importacion de redes sociales
import Facebook from "../media/redessociales/facebook.png"
import Instagram from "../media/redessociales/instagram.png"
import TikTok from "../media/redessociales/tiktok.png"
import Twitter from "../media/redessociales/x.png"
import LinkedIn from "../media/redessociales/linkedin.png"
import YouTube from "../media/redessociales/youtube.png"
import WhatsApp from "../media/redessociales/whatsapp.png"
import { useState } from 'react';

export default function Menu() {

    const ventanas = [
        { label: "Inicio", path: '/inicio' },
        { label: "Servicios", path: '/servicios' },
        { label: "Contacto", path: '/contacto' },
        { label: "Blog", path: '/blog' },
        { label: "Cuenta", path: '/cuenta' },
        { label: "Agregar perfil", path: '/Registro/profesionales', target: "_blank" }
    ];

    // Brra de busqueda
    const [buscar, setBuscar] = useState('')

    const buscador = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Buscando...', buscar)
    }

    return (
        <>

            <div className='menubarradebusqueda'>
                <div className="contenido-menu">
                    <ul className="ventanas">
                        {ventanas.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='barra-busqueda'>
                    <input type="text" value={buscar} onChange={(e) => setBuscar(e.target.value)} placeholder="Buscar..." />
                    <button onClick={buscador}>🔍</button>
                </div>
            </div>

            <div className='redes-sociales-M'>
                <ul>
                    <li><a href="https://web.facebook.com/profile.php?id=61578108566666" target='_blank'><img src={Facebook} alt="Facebook" width={20} height={20} /></a></li>
                    <li><a href="https://www.instagram.com/sentab__?igsh=OGV4Nzk2bWNxeWJl" target='_blank'><img src={Instagram} alt="Instagram" width={20} height={20} /></a></li>
                    <li><a href="" target='_blank'><img src={TikTok} alt="TikTok" width={20} height={20} /></a></li>
                    <li><a href="" target='_blank'><img src={Twitter} alt="Twitter (X)" width={20} height={20} /></a></li>
                    <li><a href="" target='_blank'><img src={LinkedIn} alt="LinkedIn" width={20} height={20} /></a></li>
                    <li><a href="" target='_blank'><img src={YouTube} alt="YouTube" width={20} height={20} /></a></li>
                    <li><a href="" target='_blank'><img src={WhatsApp} alt="WhatsApp Business" width={20} height={20} /></a></li>
                </ul>
            </div>

        </>
    );
}





{/* <div>
                <button onClick={() => { setAbierto(!abierto) }}>
                    {abierto ? "Cerrar" : "Abrir"}
                </button>

                <ul>
                    {/* <li>{abierto ? "Inicio" : "Inicio"}</li>
                    <li>{abierto ? "Servicios" : "Servicios"}</li>
                    <li>{abierto ? "Contacto" : "Contacto"}</li>
                    <li>{abierto ? "Blog" : "Blog"}</li>
                    <li>{abierto ? "Cuenta" : "Cuenta"}</li>
                    <li>{abierto ? "Cerrar Sesión" : "Cerrar Sesión"}</li> 

                    <li>
                        <Link to={"/inicio"}>Inicio</Link>
                    </li>

                    <li>
                        <Link to={"/servicios"}>Servicios</Link>
                    </li>

                    <li>
                        <Link to={"/contacto"}>Contacto</Link>
                    </li>

                    <li>
                        <Link to={"/blog"}>Blog</Link>
                    </li>

                    <li>
                        <Link to={"/cuenta"}>Cuenta</Link>
                    </li>

                    <li>
                        <Link to={"/cerrar-sesion"}>Cerrar Sesión</Link>
                    </li>
                </ul>
            </div> */}