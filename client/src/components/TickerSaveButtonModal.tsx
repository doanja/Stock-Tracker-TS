import React, { Fragment } from 'react';
import { TickerSaveButtonChild } from './';
import { Modal, Form, Button } from 'react-bootstrap';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../redux/Store';

interface TickerSaveButtonModalProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  tickerSymbol: string;
}

const TickerSaveButtonModal: React.FC<TickerSaveButtonModalProps> = ({ toggleModal, showModal, tickerSymbol }) => {
  // redux
  const { watchlistPrices, watchlists } = useSelector((state: RootStore) => state.stock);

  return (
    <Modal show={showModal} onHide={toggleModal} backdrop={true} animation={true}>
      <Modal.Body>
        <Modal.Title>
          <Form.Label>Add or Remove from Watchlists</Form.Label>
        </Modal.Title>

        {watchlistPrices.length > 0 ? (
          <Fragment>
            {watchlistPrices.map((wl: WatchlistPrice) => (
              <TickerSaveButtonChild key={wl._id} tickerSymbol={tickerSymbol} watchlistId={wl._id} watchlistName={wl.name} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {watchlists.map((wl: Watchlist) => (
              <TickerSaveButtonChild key={wl._id} tickerSymbol={tickerSymbol} watchlistId={wl._id} watchlistName={wl.name} />
            ))}
          </Fragment>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' type='submit' onClick={() => toggleModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TickerSaveButtonModal;
