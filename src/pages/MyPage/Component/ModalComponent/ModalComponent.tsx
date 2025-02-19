import BottomModal from '@/components/BottomModal/BottomModal'
import './ModalComponent.css'

interface ModalProps {
  onClose: () => void
  buttonText: string
  instruction: string
  detail?: string
  filter?: boolean
  children: React.ReactNode
}

const ModalComponent = ({
  onClose,
  buttonText,
  instruction,
  detail,
  children,
}: ModalProps) => {
  return (
      <BottomModal
        onClick={onClose}
        buttonText={buttonText}
      >
        <div className='modal-section'>
          <p className='modal-instruction'>{instruction}</p>
          {detail && <p className='modal-label'>{detail}</p>}
          <div className='modal-inner-section'>{children}</div>
        </div>
      </BottomModal>
  )
}

export default ModalComponent
