import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { boletoAPI } from '../../services/boleto';
import Alert from '../Alert';
import moment from 'moment';

interface NavbarProps {
    isOpen: boolean;
    title: string;
    setModalOpen: any;
    boleto?: Boleto | null;
    deleteModal?: boolean;
    detailsModal?: boolean;
}

export default function ModalBoleto({ isOpen, setModalOpen, title, boleto, deleteModal, detailsModal }: NavbarProps) {
    const [alert, setAlert] = useState<[string, "error" | "success"] | null>(null);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            dataPagamento: '',
            dataVencimento: '',
            pessoaId: '',
            valor: '',
            valorPago: '',
            status: '',
        },
    });
    const api = boletoAPI();

    useEffect(() => {
        reset({
            dataPagamento: boleto?.dataPagamento ? moment(boleto.dataPagamento, 'YYYY-MM-DD').format('YYYY-MM-DD') : "",
            dataVencimento: boleto?.dataVencimento ? moment(boleto.dataVencimento, 'YYYY-MM-DD').format('YYYY-MM-DD') : "",
            pessoaId: boleto?.pessoaId || "",
            valor: boleto?.valor || "",
            valorPago: boleto?.valorPago || "",
            status: boleto?.status.toLowerCase() || "",
        });
    }, [boleto, reset]);

    const onSubmit = (data: any) => {
        if (boleto) {
            pagarBoleto(data);
        } else {
            criarBoleto(data);
        }
    };

    const criarBoleto = async (data: Boleto) => {
        try {
            setAlert(null);
            await api.post('boleto', data);
            setAlert(["Boleto criado com sucesso.", "success"]);
            reset();
            setModalOpen(false);
        } catch (error: any) {
            setAlert([error?.response?.data?.message || 'Erro ao criar boleto', 'error']);
        }
    };

    const pagarBoleto = async (data: Boleto) => {
        try {
            setAlert(null);
            await api.put(`boleto/pagar/${boleto?.id}?valorPago=${data.valorPago}&dataPagamento=${data.dataPagamento}`);
            setAlert(["Boleto pago com sucesso.", "success"]);
            setModalOpen(false);
            reset();
        } catch (error: any) {
            setAlert([error?.response?.data?.message || 'Erro ao alterar informações do boleto.', 'error']);
        }
    };

    const deletarBoleto = async () => {
        try {
            setAlert(null);
            await api.delete(`boleto/${boleto?.id}`);
            setAlert(["Boleto deletado com sucesso.", "success"]);
            setModalOpen(false);
            reset();
        } catch (error: any) {
            setAlert([error?.response?.data?.message || 'Erro ao excluir boleto.', 'error']);
        }
    };

    return (
        <>
            {alert ? <Alert message={alert[0]} showAlert={true} alertType={alert[1]} /> : <></>}
            <div className={`fixed z-40 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? 'opacity-100 transition-opacity duration-300' : 'opacity-0 transition-opacity duration-300 pointer-events-none'}`}>
                <div className="fixed z-40 w-full max-w-md">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {deleteModal ? (
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Excluir Boleto</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">Tem certeza de que deseja excluir este boleto?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={deletarBoleto}>Excluir</button>
                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={setModalOpen}>Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {title}
                                        </h3>
                                        <button onClick={() => { setModalOpen(); reset() }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2" hidden={!!boleto && !detailsModal}>
                                                <label htmlFor="pessoaId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pessoa ID</label>
                                                <input type="text" {...register('pessoaId', { required: 'Pessoa ID é obrigatório' })} id="pessoaId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={detailsModal || !!boleto} />
                                                {errors.pessoaId && <p className="text-red-500 text-xs mt-1">{errors.pessoaId.message}</p>}
                                            </div>
                                            <div className="col-span-2" hidden={!!boleto && !detailsModal}>
                                                <label htmlFor="valor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                                                <input type="number" step="0.01" {...register('valor', { required: 'Valor é obrigatório', min: { value: 0, message: 'Valor deve ser positivo' } })} id="valor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={detailsModal || !!boleto} />
                                                {errors.valor && <p className="text-red-500 text-xs mt-1">{errors.valor.message}</p>}
                                            </div>
                                            <div className="col-span-2" hidden={!boleto} >
                                                <label htmlFor="valorPago" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Pago</label>
                                                <input type="number" step="0.01" {...register('valorPago')} id="valorPago" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={detailsModal} />
                                            </div>
                                            <div className="col-span-2" hidden={!!boleto && !detailsModal}>
                                                <label htmlFor="dataVencimento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de Vencimento</label>
                                                <input type="date" {...register('dataVencimento', { required: 'Data de vencimento é obrigatória' })} id="dataVencimento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={detailsModal || !!boleto} />
                                                {errors.dataVencimento && <p className="text-red-500 text-xs mt-1">{errors.dataVencimento.message}</p>}
                                            </div>
                                            <div className="col-span-2" hidden={!boleto}>
                                                <label htmlFor="dataPagamento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de Pagamento</label>
                                                <input type="date" {...register('dataPagamento')} id="dataPagamento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={detailsModal} />
                                            </div>


                                        </div>
                                        {!detailsModal ? (
                                            <div>
                                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                                    {boleto ? 'Pagar' : 'Criar'}
                                                </button>
                                            </div>
                                        ) : null}
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
