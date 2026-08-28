import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProdutoDTO } from '../DTO/ProdutoDTO';
import ProdutoRequest from '../fetch/ProdutoRequest';

type ProdutoFormData = {
    nome: string;
    preco_unitario: string;
    quantidade_disponivel: string;
};

function FormProduto() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ProdutoFormData>({
        nome: '',
        preco_unitario: '',
        quantidade_disponivel: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof ProdutoFormData;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload: Partial<ProdutoDTO> = {
            nome: formData.nome,
            preco_unitario: Number(formData.preco_unitario),
            quantidade_disponivel: Number(formData.quantidade_disponivel),
        };

        const resposta = await ProdutoRequest.enviarFormularioProduto(payload);

        if (resposta) {
            alert('Produto cadastrado com sucesso');
        } else {
            alert('Erro ao cadastrar produto');
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Produto
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Nome do Produto
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    value={formData.nome}
                                    placeholder="Digite o nome"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="preco_unitario" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Preço
                                </label>
                                <input
                                    type="number"
                                    name="preco_unitario"
                                    id="preco_unitario"
                                    required
                                    min="0"
                                    step="0.01"
                                    onChange={handleChange}
                                    value={formData.preco_unitario}
                                    placeholder="R$ 0,00"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="quantidade_disponivel" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Disponibilidade
                                </label>
                                <input
                                    type="number"
                                    name="quantidade_disponivel"
                                    id="quantidade_disponivel"
                                    min="0"
                                    onChange={handleChange}
                                    value={formData.quantidade_disponivel}
                                    placeholder="Quantidade disponível"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR PRODUTO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />

                        <button
                            type="button"
                            onClick={() => navigate('/lista/produto')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormProduto;