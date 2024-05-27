
import React from 'react';
import { render } from '@testing-library/react';
import Loading from '.';

describe('Componente de Carregamento', () => {
  test('renderiza com a classe de spinner correta', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
    expect(spinner?.classList.contains('animate-spin')).toBeTruthy();
  });
});
