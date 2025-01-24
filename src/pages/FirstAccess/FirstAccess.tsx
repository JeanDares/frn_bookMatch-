import React, { useState } from "react";
import styles from "./FirstAccess.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust the import path according to your project structure

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
    const user = useSelector((state: RootState) => state.user.user);





    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleConfirm = () => {
        console.log("Gêneros selecionados:", selectedGenres);
        // Chamar API para salvar as preferências
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
                    disabled={selectedGenres.length === 0}
                >
                    Confirmar Preferências
                </button>
            </div>
        </div>
    );
};

export default FirstAccess;
