import { useAppContext } from '@/context/app-context';
import { ReactNode, useEffect } from 'react';
import Modal from 'react-modal';
import ResumeTopBar from '../sub-components/resume-top-bar';

const customStyles = {
  content: {
    overflow: 'hidden',
    padding: '0',
  },
};

type ResumeModalProps = {
  children: ReactNode;
};

export default function ResumeModal({ children }: ResumeModalProps) {
  const { isModalOpen, togglePdfModal } = useAppContext();

  const onClose = () => {
    togglePdfModal(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        togglePdfModal(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isModalOpen, togglePdfModal]);

  return (
    <Modal
      isOpen={isModalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Resume PDF Preview Modal"
      ariaHideApp={false}
    >
      <ResumeTopBar />
      {children}
    </Modal>
  );
}
