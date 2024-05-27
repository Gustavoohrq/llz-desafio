import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { pessoaAPI } from "../services/pessoa";
import { MagnifyingGlassCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import ModalPessoa from "../components/Modals/ModalPessoa";
import ModalBuscarBoletos from "../components/Modals/ModalBuscarBoletos";
import moment from "moment";

const Pessoa = () => {
    const [pessoas, setPessoas] = useState([]);
    const [pessoa, setPessoa] = useState<Pessoa | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [boletoModal, setBoletoModal] = useState<boolean>(false);
    const [selectedPessoaId, setSelectedPessoaId] = useState<string | null>(null);
    const api = pessoaAPI();

    useEffect(() => {
        api.get('/pessoa')
            .then(response => {  setPessoas(response.data); })
            .catch(error => console.error('Error ao buscar pessoas:', error));
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [openModal]);
    const handleOpenBoletoModal = (pessoaId: string) => {
        setSelectedPessoaId(pessoaId);
        setBoletoModal(true);
    };
    return (
        <div className="my-14 mx-20">
            <ModalPessoa isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} deleteModal={deleteModal} title={`${pessoa ? "Editar pessoa" : "Criar pessoa"}`} pessoa={pessoa} />
            <ModalBuscarBoletos isOpen={boletoModal} setModalOpen={() => setBoletoModal(!boletoModal)} pessoaId={selectedPessoaId!} />

            {loading ?

                <Loading />
                :
                <div className="p-4 border-2 border-gray-200 rounded-lg relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
                    <div className="pb-4  dark:bg-gray-900 ">
                        <button type="submit" onClick={() => { setOpenModal(true); setPessoa(null); setDeleteModal(false) }} className="text-white mr-6 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Criar pessoas
                        </button>
                    </div>
                    <table className="w-full text-sm text-left text-gray-900 rounded-lg">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">CPF</th>
                                <th scope="col" className="px-6 py-3">Data de Nascimento</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only"></span></th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Remove</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pessoas.map((pessoa: Pessoa, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pessoa.nome}</th>
                                    <td className="px-6 py-4">{pessoa.cpf}</td>
                                    <td className="px-6 py-4">{moment(pessoa.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                    <td className="px-6 py-4 text-right">
                                        <MagnifyingGlassCircleIcon onClick={() => handleOpenBoletoModal(pessoa.id)} width={24} height={24} title="Pesquisar boletos" className="cursor-pointer text-blue-500 hover:text-blue-700" />

                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <PencilIcon onClick={() => { setOpenModal(true); setPessoa(pessoa); setDeleteModal(false) }} width={24} height={24} title="Editar pessoa" className="cursor-pointer text-blue-500 hover:text-blue-700" />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <TrashIcon onClick={() => { setOpenModal(true); setPessoa(pessoa); setDeleteModal(true) }} width={24} height={24} title="Remover pessoa" className="cursor-pointer text-red-500 hover:text-red-700" />
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



export default Pessoa
