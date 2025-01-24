import React, { useState } from "react";
import styles from "./FirstAccess.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { savePreferences } from "../../services/preferencesService";
import { useNavigate } from "react-router-dom";

const genres = [
    "Ficção", "Romance", "Fantasia", "Terror",
    "História", "Biografia", "Aventura",
    "Mistério", "Ciência", "Autoajuda",
    "Esportes", "Crimes Reais", "Quadrinhos", "Humor",
    "Parentalidade", "Artesanato", "Música",
    "Natureza", "Espiritualidade", "Culinária",
    "Negócios", "Poesia", "Tecnologia"
];

const FirstAccess: React.FC = () => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();

    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleConfirm = async () => {
        if (!user) {
            console.error("Usuário não autenticado.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token não encontrado. Usuário não autenticado.");
            }

            const response = await savePreferences(token, selectedGenres);
            console.log("Preferências salvas com sucesso:", response);


            alert("Preferências salvas com sucesso!");

            navigate("/home");
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar preferências. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Bem-vindo, {user?.name || "😉"}</h1>
                <p className={styles.subtitle}>
                    Quais são seus gêneros favoritos? <br />
                    Selecione abaixo para personalizar suas sugestões. 😉
                </p>
                <div className={styles.genresGrid}>
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            className={`${styles.genreButton} ${selectedGenres.includes(genre) ? styles.selected : ""
                                }`}
                            onClick={() => toggleGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
                <button
                    className={styles.confirmButton}
                    onClick={handleConfirm}
                    disabled={selectedGenres.length === 0 || loading}
                >
                    {loading ? "Salvando..." : "Confirmar Preferências"}
                </button>
            </div>
        </div>
    );
};

export default FirstAccess;
