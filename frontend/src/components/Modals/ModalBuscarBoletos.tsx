import React, { useEffect, useState } from 'react';
import { boletoAPI } from '../../services/boleto';
import Alert from '../Alert';

interface ModalBuscarBoletosProps {
  isOpen: boolean;
  setModalOpen: () => void;
  pessoaId: string;
}

const ModalBuscarBoletos: React.FC<ModalBuscarBoletosProps> = ({ isOpen, setModalOpen, pessoaId }) => {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [alert, setAlert] = useState<[string, "error" | "success"] | null>(null);
  const api = boletoAPI();

  const fetchBoletos = async () => {
    try {
      setAlert(null);
      const response = await api.get(`boleto/pessoa/${pessoaId}`);
      setBoletos(response.data);
      console.log(response.data)
    } catch (error: any) {
      setAlert([error?.response?.data?.message || 'Erro ao buscar boletos', 'error']);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBoletos();
    }
  }, [isOpen]);

  return (
    isOpen ?
      <div className="fixed z-40 text-gray-900 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="fixed z-50 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold border-b py-2">Boletos </h2>
            <button
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={setModalOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {alert ? <Alert message={alert[0]} showAlert={true} alertType={alert[1]} /> : <></>}
          {boletos.length > 0 ? (
            <ul>
              {boletos.map(boleto => (
                <li key={boleto.id} className="border-b py-2">
                  <div>ID: {boleto.id}</div>
                  <div>Valor: {boleto.valor}</div>
                  <div>Status: {boleto.status}</div>
                  <div>Data de Vencimento: {boleto.dataVencimento}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">Nenhum boleto encontrado.</div>
          )}
        </div>
      </div>
      : null
  );
};

export default ModalBuscarBoletos;
