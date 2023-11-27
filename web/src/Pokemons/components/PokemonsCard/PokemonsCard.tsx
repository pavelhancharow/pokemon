import { useMemo, useState } from 'react';
import { Modal } from '../../../shared/components';
import PokemonsModal from '../PokemonsModal/PokemonsModal';
import { PokemonsCardContainer } from './styles';

interface IPokemon {
  title: string;
  url: string;
}

const PokemonsCard = ({ title, url }: IPokemon) => {
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const pokemonId= useMemo(() => {
    if (!url) return '';

    const srcArray = url.split('/');
    return srcArray[srcArray.length - 2];
  }, [url]);

  return (
    <>
      <PokemonsCardContainer onClick={handleOpenModal}>
        <span>{title}</span>

        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={title} />
      </PokemonsCardContainer>

      <Modal isOpen={modal} onClose={handleCloseModal} title={title}>
        <PokemonsModal pokemonId={pokemonId} />
      </Modal>
    </>
  )
};

export default PokemonsCard;