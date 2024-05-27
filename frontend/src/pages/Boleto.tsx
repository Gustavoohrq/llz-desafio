import { useEffect, useState } from "react";
import { boletoAPI } from "../services/boleto";
import ModalBoleto from "../components/Modals/ModalBoleto";
import Loading from "../components/Loading";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import BoletoIcon from "../assets/BoletoIcon.png"

const Boleto = () => {
  const [boletos, setBoletos] = useState([]);
  const [boleto, setPessoa] = useState<Boleto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const api = boletoAPI();

  useEffect(() => {
    api.get('/boleto')
      .then(response => { console.log(response.data); setBoletos(response.data); })
      .catch(error => console.error('Error ao buscar boletos:', error));
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [openModal]);

  return (
    <div className="my-14 mx-20">
      <ModalBoleto
        isOpen={openModal}
        setModalOpen={() => setOpenModal(!openModal)}
        deleteModal={deleteModal}
        detailsModal={detailsModal}
        title={detailsModal ? "Detalhes do boleto" : `${boleto ? "Pagar boleto" : "Criar boleto"}`}
        boleto={boleto}
      />

      {loading ?
        <Loading />
        :
        <div className="p-4 border-2 border-gray-200 rounded-lg relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
          <div className="pb-4  dark:bg-gray-900 ">
            <button type="submit" onClick={() => { setOpenModal(true); setPessoa(null); setDeleteModal(false); setDetailsModal(false); }} className="text-white mr-6 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Criar boletos
            </button>
          </div>
          <table className="w-full text-sm text-left text-gray-900 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Pessoa</th>
                <th scope="col" className="px-6 py-3">Valor</th>
                <th scope="col" className="px-6 py-3">Data de Vencimento</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Pesquisar</span></th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              {boletos.map((boleto: Boleto, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{boleto.pessoaId}</th>
                  <td className="px-6 py-4">{boleto.valor}</td>
                  <td className="px-6 py-4">{boleto.dataVencimento}</td>
                  <td className="px-6 py-4">{boleto.status.toUpperCase()}</td>
                  <td className="px-6 py-4 text-right">
                    <EyeIcon
                      width={24}
                      height={24}
                      title="Detalhes"
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => { setOpenModal(true); setPessoa(boleto); setDeleteModal(false); setDetailsModal(true); }}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <img src={BoletoIcon} onClick={() => { setOpenModal(true); setPessoa(boleto); setDeleteModal(false); setDetailsModal(false); }} width={30} height={30} title="Pagar boleto" className="cursor-pointer text-blue-500 hover:text-blue-700" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <TrashIcon onClick={() => { setOpenModal(true); setPessoa(boleto); setDeleteModal(true); setDetailsModal(false); }} width={24} height={24} title="Remover boleto" className="cursor-pointer text-red-500 hover:text-red-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default Boleto;
