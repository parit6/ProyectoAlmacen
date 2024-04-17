import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LinksArray } from "../../index";
import { v } from "../../styles/index";
import { ToggleTema } from "../organisms/index";

// menu del sidebar ya desplegado trae los valores de los links desde utils y hace un map para mostrarlos en el menu y retomar la direccion donde envian

export function MenuHambur() {
  const [click, setClick] = useState(false);
  return (
    <Container>
      <NavBar>
        <section>
          <HamburguerMenu
            onClick={() => {
              setClick(!click);
            }}
          >
            <label
              htmlFor="checkbox"
              className={click ? "toggle active" : "toggle"}
            >
              <div
                className="bars"
                id="bar1"
              ></div>
              <div
                className="bars"
                id="bar2"
              ></div>
              <div
                className="bars"
                id="bar3"
              ></div>
            </label>
          </HamburguerMenu>
        </section>
        <Menu $click={click.toString()}>
          {LinksArray.map(({ icon, label, to }) => (
            <div
              onClick={() => {
                setClick(!click);
              }}
              className="LinkContainer"
              key={label}
            >
              <NavLink
                to={to}
                className="Links"
              >
                <div className="Linkicon">{icon}</div>
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
          <Divider />

          <ToggleTema />
          <Divider />
        </Menu>
      </NavBar>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.body};
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

const HamburguerMenu = styled.div`
  position: fixed;
  top: 1rem;
  left: 15px;
  z-index: 100;
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition-duration: 0.5s;
    &.active {
      transition-duration: 0.5s;
      transform: rotate(180deg);

      .bars {
        position: absolute;
        transition-duration: 0.5s;
      }

      #bar2 {
        transform: scaleX(0);
        transition-duration: 0.5s;
      }

      #bar1 {
        width: 100%;
        transform: rotate(45deg);
        transition-duration: 0.5s;
      }

      #bar3 {
        width: 100%;
        transform: rotate(-45deg);
        transition-duration: 0.5s;
      }
    }
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: ${(props) => props.theme.bg5};
    border-radius: 4px;
  }

  #bar2 {
    transition-duration: 0.8s;
  }

  #bar1,
  #bar3 {
    width: 70%;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  z-index: 10;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background-color: ${(props) => `rgba(${props.theme.bodyRgba},0.85)`};
  backdrop-filter: blur(3px);
  transform: ${(props) =>
    props.$click == "true" ? "translateY(0)" : "translateY(1000%)"};
  transition: all 0.8s ease-in-out;

  .LinkContainer {
    &:hover {
      background: ${(props) => props.theme.bgAlpha};
    }

    .Links {
      width: 100vw;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${(props) => props.theme.text};
    }
    .Linkicon {
      padding: ${v.smSpacing} ${v.mdSpacing};
      display: flex;
      svg {
        font-size: 25px;
      }
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;
