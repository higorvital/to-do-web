import React, { useState } from 'react';
import {FaUser} from 'react-icons/fa';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router';
import { useAuth } from '../../hooks/auth';

import { Container, Content, Logo, Profile, ProfileIcon, ProfileToggle } from './styles';

const Header: React.FC = () => {

  const {signOut, user} = useAuth();
  const [toggleActive, setToggleActive] = useState(false);
  const history = useHistory();

  return (
      <Container>
        <Content>

          <Logo href="/">
            <div>
              <span>
                2
              </span>
              <h1>
                Do
              </h1>
            </div>
          </Logo>
          <div>
            <Profile onClick={()=>setToggleActive(!toggleActive)}>
              <span>{user.name}</span>
              <ProfileIcon>
                <FaUser size={36} />
              </ProfileIcon>
            </Profile>
            <ProfileToggle isActive={toggleActive}>
              <button onClick={()=>{history.push('/profile')}}><FaUser size={12} />Alterar dados</button>
              <button onClick={signOut}><FiPower size={12} />Sair</button>
            </ProfileToggle>
          </div>


          {/* <button onClick={signOut}>
            <FiPower />
          </button> */}
        
        </Content>

      </Container>
  );
}

export default Header;