import styled from 'styled-components';

type Props = {
  italic?: boolean
}
export const SubtitleText = styled.span<Props>`
  color: #6b7280;
  font-style: ${props => props.italic ? 'italic' : 'none'};
`