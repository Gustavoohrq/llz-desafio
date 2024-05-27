
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ModalBuscarBoletos from './ModalBuscarBoletos';

jest.mock('../../services/boleto', () => ({
    boletoAPI: jest.fn(() => ({
        get: jest.fn(() => ({
            data: [{ id: '1', valor: 100, status: 'Pago', dataVencimento: '2024-05-30' }],
        })),
    })),
}));

describe('ModalBuscarBoletos', () => {
    it('renderiza o componente corretamente', async () => {
        const { getByText } = render(<ModalBuscarBoletos isOpen={true} setModalOpen={() => { }} pessoaId="1" />);
        await waitFor(() => {
            expect(getByText('Boletos')).toBeInTheDocument();

            expect(getByText('ID: 1')).toBeInTheDocument();
            expect(getByText('Valor: 100')).toBeInTheDocument();
            expect(getByText('Status: Pago')).toBeInTheDocument();
            expect(getByText('Data de Vencimento: 2024-05-30')).toBeInTheDocument();
        });

    });

    
});
