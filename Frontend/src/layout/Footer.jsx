import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
  background-color: #f5f5f5;
  margin-top: 30vh;
  padding: 2.5vh;
  text-align: center;
  font-size: 0.8rem;
  color: #999;
  .name {
    font-weight: bold;
    font-size: 1rem;
  }
  .copyright {
    font-size: 1rem;
  }
`;

function Footer() {
  return (
    <div>
      <FooterStyle>
        <p className="name">이규정, 김윤서, 방지환, 정희진</p>
        <p className="copyright">© With 신한은행</p>
      </FooterStyle>
    </div>
  );
}

export default Footer;
