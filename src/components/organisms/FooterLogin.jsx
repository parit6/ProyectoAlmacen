import { GiPadlock } from "react-icons/gi";
import styled from "styled-components";

// componente del footer del login, toma el año de forma automatica
export function FooterLogin() {
  return (
    <Container>
      <section className="lock">
        <GiPadlock />
        <span>
          Iberostar Hotels & Resorts | Sistema Interno
          <br />
          <strong>
            Todos los derechos reservados © {new Date().getFullYear()}
          </strong>
        </span>
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12.2px;
  color: #91a4b7;
  gap: 5px;
  .lock {
    border-bottom: 1px solid rgba(145, 164, 183, 0.3);
    gap: 5px;
    display: flex;
    align-items: center;
  }
  .derechos {
    display: flex;
    justify-content: space-between;
    .separador {
      width: 1px;
      background-color: rgba(145, 164, 183, 0.3);
      margin-top: 4px;
      height: 80%;
      align-items: center;
      display: flex;
    }
    span {
      margin-top: 5px;
    }
  }
`;
