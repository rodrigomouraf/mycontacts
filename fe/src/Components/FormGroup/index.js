import PropType from 'prop-types';

import { Container } from './styles';

export default function FormGroup({ children, error }) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropType.node.isRequired,
  error: PropType.string,
};

FormGroup.defaultProps = {
  error: null,
};
