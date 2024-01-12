import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Ticket = () => {
  const {userid}=useParams()
  const TicketContainer = styled.div`
    background-image: url('assets/back2.jpg');
  `;

  const SaloonPass = styled.div`
    width: 100%;
    text-align: center;
    font-size: 7vw;
  `;

  const TicketDetails = styled.div`
    margin-left: 35vw;
    margin-right: 35vw;
    border: 2px solid black;
    border-radius: 20px;
    padding-top: 2vw;
    padding-bottom: 2vw;
    padding-left: 1vw;
    padding-bottom: 1vw;
    background-color: white;
  `;

  const ReturnLink = styled.div`
    width: 100%;
    text-align: center;
  `;

  const StyledLink = styled.a`
    text-decoration: none;
    color: rgb(0, 0, 0);
    font-size: 2vw;
  `;

  const Content = styled.div`
    padding-left: 2vw;
  `;

  return (
    <TicketContainer>
      <SaloonPass>Saloon Pass</SaloonPass>
      <TicketDetails>
        <div>
          <img src="static/images/cs1.jpeg" alt="" />
        </div>
        <Content>
          <p>
            <h2>Name: Nishitha</h2>
          </p>
          <p>
            <h2>TimeSlot: 10am-11am</h2>
          </p>
          <p>
            <h2>Services: Spa Bath</h2>
          </p>
          <p>
            <h2>Center: Lucky Shamrock Salon</h2>
          </p>
        </Content>
      </TicketDetails>

      <ReturnLink>
        <StyledLink href={`/user/main/${userid}`}>Return to homepage</StyledLink>
      </ReturnLink>
    </TicketContainer>
  );
};

export default Ticket;
