import styled from 'styled-components';

type Props = {
  italic?: boolean
}
export const SubtitleText = styled.span<Props>`
overflow: hidden;
text-overflow: ellipsis;
  color: #6b7280;
  font-style: ${props => props.italic ? 'italic' : 'none'};
`