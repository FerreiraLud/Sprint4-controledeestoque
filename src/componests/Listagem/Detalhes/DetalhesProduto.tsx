import { useEffect, useState, type JSX } from "react";
import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import ProdutoRequest from "../../fetch/ProdutoRequest";
import type { ProdutoDTO } from "../../DTO/ProdutoDTO";
import { useNavigate, useParams } from "react-router-dom";

function DetalhesProdutos(): JSX.Element {
    const { id_produto } = useParams<{ id_produto: string }>();

    const [produto, setProduto] = useState<ProdutoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        buscarProduto();
    }, [id_produto]);

    const buscarProduto = async () => {
        try {
            if (!id_produto) {
                setErro("ID do produto não informado");
                setLoading(false);
                return;
            }

            const resposta = await ProdutoRequest.obterProdutoPorId(Number(id_produto));

            if (!resposta) {
                setErro("Produto não encontrado");
                return;
            }

            setProduto(resposta);
        } catch (error) {
            setErro("Erro ao buscar produto");
        } finally {
            setLoading(false);
        }
    };

    const getDisponibilidadeSeverity = (disponibilidade: string) => {
        switch (disponibilidade) {
            case "Disponível":
                return "success";
            case "Poucas Unidades":
                return "warn";
            case "Indisponível":
                return "danger";
            default:
                return "info";
        }
    };

    const quantidadeDisponivel = produto?.quantidade_disponivel ?? 0;
    const disponibilidadeTexto = quantidadeDisponivel > 0 ? "Disponível" : "Indisponível";

    if (loading) {
        return (
            <div className="p-4">
                <Skeleton width="100%" height="20rem" />
            </div>
        );
    }

    if (erro) {
        return (
            <div className="p-4">
                <div
                    role="alert"
                    style={{
                        background: '#fee2e2',
                        color: '#991b1b',
                        border: '1px solid #fca5a5',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontWeight: 600,
                    }}
                >
                    {erro}
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-content-center mt-5">
            <div
                className="w-full max-w-3xl p-5 shadow-4"
                style={{
                    background: '#fff',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
                }}
            >
                <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Detalhes do Produto</h2>

                <div className="mb-3">
                    <h3>ID do Produto</h3>
                    <p>{produto?.idProduto}</p>
                </div>

                <Divider />

                <div className="mb-3">
                    <h3>Nome do Produto</h3>
                    <p>{produto?.nome}</p>
                </div>

                <Divider />

                <div className="mb-3">
                    <h3>Preço</h3>
                    <p>R$ {produto?.preco_unitario}</p>
                </div>

                <Divider />

                <div className="mb-3">
                    <h3>Disponibilidade</h3>
                    <Tag
                        value={disponibilidadeTexto}
                        severity={getDisponibilidadeSeverity(disponibilidadeTexto)}
                    />
                </div>

                <Divider />

                <div className="flex justify-content-end mt-4">
                    <Button
                        label="Voltar"
                        icon="pi pi-arrow-left"
                        onClick={() => navigate("/lista/produto")}
                    />
                </div>
            </div>
        </div>
    );
}

export default DetalhesProdutos;