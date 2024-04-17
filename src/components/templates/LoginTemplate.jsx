import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import carrito from "../../assets/carrito.svg";
import logo from "../../assets/inventarioslogo.png";
import {
  FooterLogin,
  InputText,
  RegistrarAdmin,
} from "../../components/organisms/index";
import { ThemeContext } from "../../index";
import { useAuthStore } from "../../store/index";
import { Device, v } from "../../styles/index";
import { Btnsave } from "../molecules/index";

// componente del template para el login
export function LoginTemplate() {
  // fija el tema como claro y llama a la funcion de iniciar sesion con el correo y la contraseña desde el store
  const { setTheme } = useContext(ThemeContext);
  setTheme("light");
  const { signInWithEmail } = useAuthStore();
  const [state, setState] = useState(false);
  const [stateInicio, setStateInicio] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // funcion para iniciar sesion con el correo y la contraseña usa un metodo de supabase para verificar que el usuario este registrado y compara el correo y la contraseña que se le enviaron
  async function iniciar(data) {
    try {
      const response = await signInWithEmail({
        correo: data.correo,
        password: data.pass,
      });
      // si la respuesta es verdadera navega a la pagina principal si no muestra un mensaje de error
      if (response) {
        navigate("/");
      } else {
        setStateInicio(true);
      }
    } catch (error) {
      setStateInicio(true);
    }
  }

  return (
    <Container>
      <div className="contentLogo">
        <img src={logo}></img>
        <span>Almacen</span>
      </div>
      <div className="bannerlateral">
        <img src={carrito}></img>
      </div>

      <div className="contentCard">
        <div className="card">
          {state && (
            // si el boton que llama a este componente esta activo muestra el componente de registrar admin
            <RegistrarAdmin
              setState={() => {
                setState(!state);
              }}
            />
          )}
          <Titulo>Almacen Sistemas</Titulo>
          {stateInicio && (
            <TextoStateInicio>¡Datos incorrectos!</TextoStateInicio>
          )}

          <form onSubmit={handleSubmit(iniciar)}>
            <InputText icono={<v.iconoemail color="#3AA597" />}>
              <input
              // formulario para el correo y la contraseña, ambos son requeridos para funcionar correctamente
                className="form__field"
                type="text"
                placeholder="correo"
                {...register("correo", {
                  required: true,
                })}
              />
              <label className="form__label">Correo</label>
              {errors.correo?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <InputText icono={<v.iconopass color="#3AA597" />}>
              <input
                className="form__field"
                type={showPassword ? "text" : "password"}
                placeholder="contraseña"
                {...register("pass", {
                  required: true,
                })}
              />
              <label className="form__label">Contraseña</label>
              {errors.pass?.type === "required" && <p>Campo requerido</p>}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </InputText>
            <ContainerBtn>
              <Btnsave
                titulo="Iniciar Sesion"
                bgcolor="#3AA597"
              />

            </ContainerBtn>
          </form>
        </div>
        <FooterLogin />
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-size: cover;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #555555;
  @media ${Device.tablet} {
    grid-template-columns: 1fr 2fr;
  }
  .contentLogo {
    position: absolute;
    top: 15px;
    font-weight: 700;
    display: flex;
    left: 15px;
    align-items: center;
    color: #fff;

    img {
      width: 50px;
    }
  }
  .cuadros {
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    transition: 0.6s;
  }

  .bannerlateral {
    background-color: #3aa597;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .contentCard {
    grid-column: 2;
    background-color: #ffffff;
    background-size: cover;
    z-index: 100;
    position: relative;
    gap: 30px;
    display: flex;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content: center;
    width: auto;
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .card {
      padding-top: 80px;
      width: 100%;
      @media ${Device.laptop} {
        width: 50%;
      }
    }
    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 40%;

        animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #3aa597;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .ayuda {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #666666;
      font-size: 15px;
      font-weight: 500;
    }
    &:hover {
      .contentsvg {
        top: -100px;
        opacity: 1;
      }
      .cuadros {
        transform: rotate(37deg) rotateX(5deg) rotateY(12deg) rotate(3deg)
          skew(2deg) skewY(1deg) scaleX(1.2) scaleY(1.2);
        color: red;
      }
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;
const Titulo = styled.span`
  font-size: 3rem;
  font-weight: 700;
`;
const ContainerBtn = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
const TextoStateInicio = styled.p`
  color: #3aa597;
  font-weight: bold;
`;
