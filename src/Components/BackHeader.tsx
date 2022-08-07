import { BackHeaderStyled, BackIcon } from './Styled/BackHeader.styled'
import Back from '../img/back.svg';
import { useNavigate } from 'react-router';
import { TweetIcon } from './Styled/Tweet.styled';

type Props = {
  children: JSX.Element,
}

function BackHeader({children}: Props) {
  const navigate = useNavigate();
  return (
    <BackHeaderStyled>
      <BackIcon onClick = {() => {
        navigate(-1);
      }}><TweetIcon style = {{height: '1.4rem',}} src = {Back} alt = 'Go Back'/></BackIcon>
      {children}</BackHeaderStyled>
  )
}

export default BackHeader