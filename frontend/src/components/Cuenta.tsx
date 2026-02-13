import { useState } from "react"
import { Link } from "react-router-dom"

export default function Cuenta() {
    const [persona, setPersona] = useState([])

    useState(() => {

    })

    return (
        <>
            <div style={{
                marginTop: "180px"
            }}>
                <div className="cuerpo">
                    <div>
                        <h1>Informacion sobre la cuenta</h1>
                    </div>

                    <div>
                        <button>
                            <Link to={"/"}>Cerrar cuenta</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}