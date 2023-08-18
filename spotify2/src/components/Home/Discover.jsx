import React from 'react';
import styled from "styled-components";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";

function Discover() {

return(
  <Container>
    <h1>Descubra coisas novas!</h1>
    <div className="collapsibles">
        <button type="button" class="collapsible">
            <MdOutlineKeyboardArrowDown />
            Recomendações baseadas nas suas músicas mais ouvidas
            </button>
            <div class="content">
            <p>Viversos conteúdos aaaaaaaaaaaaaaa</p>
        </div>
    </div>
  </Container>
);
}

const Container = styled.div`
`;

export default Discover;