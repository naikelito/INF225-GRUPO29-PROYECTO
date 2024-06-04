import React from 'react'
import "./css/inicio.css";

export default function Login() {
  return (

    <div>

     <header class="xd">
        <nav class="navegation">
            <a href="#">Inicio</a>
            <a href="#">Contacto</a>

        </nav>
    </header>
    <div className="login-box">
        <div class="login-header">
            <header>Login</header>
        </div>
        <div class="input-box">
            <input type="text" class="input-field" placeholder="Email" autocomplete="off" required/>
        </div>
        <div class="input-box"><input type="text" class="input-field" placeholder="Contraseña" autocomplete="off" required/>
        </div>
        <div class="forgot">
            <section>
                <input type="checkbox" id="check"/>
                <label for="check">Recordarme</label>
            </section>
        </div>
        <div class="input-summit">
            <button class="submit-btn" id="submit">ingresar</button>
        </div>
        <div class="sign-up-link"><p>
            No tienes cuenta ? <a href="#">Registrarse</a>
        </p></div>
    </div>
    </div>
  )
}
